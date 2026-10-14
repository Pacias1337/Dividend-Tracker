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
};
let cache;

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

const server = http.createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname === '/api/quotes') {
    try {
      if (!cache || Date.now() - cache.time > 30000) cache = { time: Date.now(), data: await getQuotes() };
      return json(res, 200, cache.data);
    } catch {
      return json(res, 502, { error: 'Notowania są chwilowo niedostępne.' });
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
server.listen(port, '127.0.0.1', () => console.log(`Dywidendy IKE: http://127.0.0.1:${port}`));
