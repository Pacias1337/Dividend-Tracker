const http = require('node:http');
const { readFile } = require('node:fs/promises');
const path = require('node:path');

const tickers = {
  PZU: 'PZU.WA', PEO: 'PEO.WA', ALR: 'ALR.WA', ACP: 'ACP.WA',
  BUD: 'BDX.WA', DOM: 'DOM.WA', GPW: 'GPW.WA', KTY: 'KTY.WA',
  XTB: 'XTB.WA', PKN: 'PKN.WA', NEU: 'NEU.WA', SKA: 'SKA.WA',
  ABS: 'ABS.WA', ASE: 'ASE.WA', AMB: 'AMB.WA', ASB: 'ASB.WA',
  EBP: 'EBP.WA', OPL: 'OPL.WA', KRU: 'KRU.WA', LPP: 'LPP.WA',
  GPP: 'GPP.WA', ELT: 'ELT.WA', DVL: 'DVL.WA', PKO: 'PKO.WA',
  CDR: 'CDR.WA', DIG: 'DIG.WA', PCR: 'PCR.WA', RBW: 'RBW.WA',
  TAR: 'TAR.WA', SNT: 'SNT.WA', ING: 'ING.WA', AMC: 'AMC.WA',
  APT: 'APT.WA', UNI: 'UNI.WA', BHW: 'BHW.WA', WTN: 'WTN.WA',
  DCR: 'DCR.WA', BBT: 'BBT.WA', ZMT: 'ZMT.WA', VOT: 'VOT.WA',
  TOR: 'TOR.WA', CBF: 'CBF.WA', PAS: 'PAS.WA', TXT: 'TXT.WA',
  KGH: 'KGH.WA', TPE: 'TPE.WA', ENA: 'ENA.WA', MUR: 'MUR.WA',
  SON: 'SON.WA', STX: 'STX.WA', DBC: 'DBC.WA', FRO: 'FRO.WA', BNP: 'BNP.WA',
  PGE: 'PGE.WA', JSW: 'JSW.WA', MBK: 'MBK.WA', MIL: 'MIL.WA', ATT: 'ATT.WA',
  CPS: 'CPS.WA', SPL: 'SPL.WA', COG: 'COG.WA', HUG: 'HUG.WA', TEN: 'TEN.WA',
  GTC: 'GTC.WA', EAT: 'EAT.WA', MRC: 'MRC.WA', LWB: 'LWB.WA', DNP: 'DNP.WA',
  ZAB: 'ZAB.WA', MBR: 'MBR.WA',
};
let cache;
const dividendCache = new Map();
const dividendCacheTtl = 6 * 60 * 60 * 1000;

const json = (res, status, value) => {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  res.end(JSON.stringify(value));
};

async function getQuotes() {
  const quotes = Object.fromEntries(await Promise.all(Object.entries(tickers).map(async ([ticker, symbol]) => {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=1d&interval=1m`;
      const response = await fetch(url, { headers: { accept: 'application/json', 'user-agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error('Quote unavailable');
      const meta = (await response.json()).chart?.result?.[0]?.meta;
      const price = Number(meta?.regularMarketPrice);
      return [ticker, { price: meta?.currency === 'PLN' && Number.isFinite(price) ? price : null, currency: meta?.currency ?? null, asOf: meta?.regularMarketTime ? new Date(meta.regularMarketTime * 1000).toISOString() : null }];
    } catch {
      return [ticker, { price: null, currency: null, asOf: null }];
    }
  })));
  return { provider: 'Yahoo Finance', updatedAt: new Date().toISOString(), quotes };
}

function unwrapToolResult(response) {
  const result = response?.result;
  if (!result || result.isError) return null;

  if (result.structuredContent) return result.structuredContent;

  for (const item of result.content ?? []) {
    if (item.type !== 'text') continue;

    try {
      return JSON.parse(item.text);
    } catch {
      // Continue in case the response contains a non-JSON text block.
    }
  }

  return null;
}

async function callPublicDividends(ticker) {
  const response = await fetch('https://agentrynku.pl/api/mcp', {
    method: 'POST',
    headers: {
      accept: 'application/json, text/event-stream',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: {
        name: 'get_public_dividends',
        arguments: { symbol: ticker, limit: 50 },
      },
    }),
    signal: AbortSignal.timeout(12000),
  });

  if (!response.ok) throw new Error('Dividend provider unavailable');

  const body = await response.text();
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('text/event-stream')) {
    const message = body.match(/^data:\s*(.+)$/m)?.[1];
    if (!message) throw new Error('Invalid dividend provider response');
    return unwrapToolResult(JSON.parse(message));
  }

  return unwrapToolResult(JSON.parse(body));
}

function selectApprovedDividend(data) {
  const currentYear = new Date().getFullYear();
  const events = (data?.events ?? []).filter((event) =>
    event.currency === 'PLN'
    && event.status === 'approved'
    && Number.isFinite(event.amountPerShare)
    && event.amountPerShare >= 0,
  );
  const currentYearEvents = events.filter((event) => {
    const paymentDate = Date.parse(event.paymentDate);
    return Number.isFinite(paymentDate) && new Date(paymentDate).getFullYear() === currentYear;
  });

  if (!currentYearEvents.length) return null;

  return {
    amount: currentYearEvents.reduce((sum, event) => sum + event.amountPerShare, 0),
    year: currentYear,
    status: 'approved',
    asOf: data.asOf ?? new Date().toISOString(),
    sourceUrl: currentYearEvents.find((event) => event.sourceUrl)?.sourceUrl ?? null,
  };
}

function selectLastPaidDividend(data) {
  const today = Date.now();
  const payments = (data?.events ?? []).filter((event) => {
    const paymentDate = Date.parse(event.paymentDate);
    return event.currency === 'PLN'
      && event.status === 'approved'
      && Number.isFinite(event.amountPerShare)
      && event.amountPerShare >= 0
      && Number.isFinite(paymentDate)
      && paymentDate <= today;
  });
  if (!payments.length) return null;

  const latestYear = Math.max(...payments.map((event) => new Date(event.paymentDate).getFullYear()));
  const latestPayments = payments.filter((event) => new Date(event.paymentDate).getFullYear() === latestYear);

  return {
    amount: latestPayments.reduce((sum, event) => sum + event.amountPerShare, 0),
    year: latestYear,
    status: 'last-paid',
    asOf: data.asOf ?? latestPayments.at(-1).paymentDate,
    sourceUrl: latestPayments.find((event) => event.sourceUrl)?.sourceUrl ?? null,
  };
}

async function getLastPaidDividend(ticker) {
  const symbol = tickers[ticker];
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=5y&interval=1d&events=div`;
  const response = await fetch(url, {
    headers: { accept: 'application/json', 'user-agent': 'Mozilla/5.0' },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error('Dividend history unavailable');

  const chart = (await response.json()).chart?.result?.[0];
  if (chart?.meta?.currency !== 'PLN') return null;

  const payments = Object.values(chart.events?.dividends ?? {}).filter((event) =>
    Number.isFinite(event.amount)
    && event.amount >= 0
    && Number.isFinite(event.date)
    && event.date <= Date.now() / 1000,
  );
  if (!payments.length) return null;

  const latestYear = Math.max(...payments.map((event) => new Date(event.date * 1000).getFullYear()));
  const latestPayments = payments.filter((event) => new Date(event.date * 1000).getFullYear() === latestYear);

  return {
    amount: latestPayments.reduce((sum, event) => sum + event.amount, 0),
    year: latestYear,
    status: 'last-paid',
    asOf: new Date(Math.max(...latestPayments.map((event) => event.date)) * 1000).toISOString(),
    sourceUrl: `https://finance.yahoo.com/quote/${symbol}/history/`,
  };
}

async function fetchDividend(ticker) {
  let publicData = null;
  try {
    publicData = await callPublicDividends(ticker);
  } catch {
    // Use Yahoo's recorded dividend events when the resolutions feed is unavailable.
  }

  const approvedDividend = selectApprovedDividend(publicData);
  if (approvedDividend) return approvedDividend;

  const lastKnownPayment = selectLastPaidDividend(publicData);
  if (lastKnownPayment) return lastKnownPayment;

  try {
    return await getLastPaidDividend(ticker);
  } catch {
    return null;
  }
}

async function getDividends(symbols) {
  const dividends = Object.fromEntries(await Promise.all(symbols.map(async (ticker) => {
    const cached = dividendCache.get(ticker);
    if (cached && Date.now() - cached.time < dividendCacheTtl) return [ticker, cached.data];

    const data = await fetchDividend(ticker);
    dividendCache.set(ticker, { time: Date.now(), data });
    return [ticker, data];
  })));

  return { provider: 'Agent Rynku / Yahoo Finance', updatedAt: new Date().toISOString(), dividends };
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, 'http://localhost');
  const pathname = requestUrl.pathname;
  if (pathname === '/api/quotes') {
    try {
      if (!cache || Date.now() - cache.time > 30000) cache = { time: Date.now(), data: await getQuotes() };
      return json(res, 200, cache.data);
    } catch {
      return json(res, 502, { error: 'Notowania są chwilowo niedostępne.' });
    }
  }
  if (pathname === '/api/dividends') {
    const symbols = [...new Set((requestUrl.searchParams.get('symbols') ?? '')
      .split(',')
      .map((ticker) => ticker.trim().toUpperCase())
      .filter((ticker) => Object.hasOwn(tickers, ticker)))].slice(0, 70);
    try {
      return json(res, 200, await getDividends(symbols));
    } catch {
      return json(res, 502, { error: 'Dane o dywidendach są chwilowo niedostępne.' });
    }
  }
  if (pathname === '/company-logos.js') {
    try {
      res.writeHead(200, { 'content-type': 'text/javascript; charset=utf-8', 'cache-control': 'public, max-age=86400' });
      return res.end(await readFile(path.join(__dirname, 'company-logos.js')));
    } catch {
      return json(res, 500, { error: 'Nie można otworzyć logotypów spółek.' });
    }
  }
  if (pathname === '/app.css' || pathname === '/app.js') {
    try {
      const isCss = pathname === '/app.css';
      res.writeHead(200, { 'content-type': `${isCss ? 'text/css' : 'text/javascript'}; charset=utf-8`, 'cache-control': 'no-store' });
      return res.end(await readFile(path.join(__dirname, isCss ? 'app.css' : 'app.js')));
    } catch {
      return json(res, 500, { error: 'Nie można otworzyć plików aplikacji.' });
    }
  }
  if (pathname === '/' || pathname === '/index.html') {
    try {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' });
      return res.end(await readFile(path.join(__dirname, 'index.html')));
    } catch {
      return json(res, 500, { error: 'Nie można otworzyć aplikacji.' });
    }
  }
  res.writeHead(404);
  res.end('Not found');
});

const port = Number(process.env.PORT) || 4173;
if (require.main === module) {
  server.listen(port, '127.0.0.1', () => console.log(`Dywidendy IKE: http://127.0.0.1:${port}`));
}

module.exports = {
  callPublicDividends,
  dividendCache,
  fetchDividend,
  getDividends,
  getLastPaidDividend,
  selectApprovedDividend,
  selectLastPaidDividend,
  server,
};
