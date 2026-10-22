const assert = require('node:assert/strict');
const { after, test } = require('node:test');

const {
  callPublicDividends,
  dividendCache,
  getDividends,
  getQuotes,
  getLastPaidDividend,
  quoteCache,
  quoteResponseCache,
  selectApprovedDividend,
  selectLastPaidDividend,
} = require('../server');

const originalFetch = global.fetch;
after(() => {
  global.fetch = originalFetch;
});

function dividendEvent(amountPerShare, paymentDate, overrides = {}) {
  return {
    amountPerShare,
    currency: 'PLN',
    status: 'approved',
    paymentDate,
    sourceUrl: 'https://www.gpw.pl/komunikat?geru_id=123',
    ...overrides,
  };
}

function mcpResponse(data) {
  return {
    jsonrpc: '2.0',
    id: 1,
    result: {
      content: [{ type: 'text', text: JSON.stringify(data) }],
    },
  };
}

test('sums approved PLN dividend tranches scheduled for the current year', () => {
  const currentYear = new Date().getFullYear();
  const data = {
    asOf: '2026-10-03T07:00:00.934Z',
    events: [
      dividendEvent(1.25, `${currentYear}-06-10T00:00:00.000Z`),
      dividendEvent(0.75, `${currentYear}-11-10T00:00:00.000Z`),
      dividendEvent(9, `${currentYear}-12-10T00:00:00.000Z`, { status: 'proposed' }),
      dividendEvent(4, `${currentYear}-12-10T00:00:00.000Z`, { currency: 'EUR' }),
    ],
  };

  assert.deepEqual(selectApprovedDividend(data), {
    amount: 2,
    year: currentYear,
    status: 'approved',
    asOf: data.asOf,
    sourceUrl: 'https://www.gpw.pl/komunikat?geru_id=123',
  });
});

test('uses the latest year with past approved payment dates as the fallback', () => {
  const currentYear = new Date().getFullYear();
  const data = {
    events: [
      dividendEvent(3, `${currentYear - 2}-08-10T00:00:00.000Z`),
      dividendEvent(1.5, `${currentYear - 1}-06-10T00:00:00.000Z`),
      dividendEvent(0.5, `${currentYear - 1}-09-10T00:00:00.000Z`),
      dividendEvent(8, `${currentYear + 1}-06-10T00:00:00.000Z`),
    ],
  };

  assert.equal(selectApprovedDividend(data), null);
  assert.equal(selectLastPaidDividend(data).amount, 2);
  assert.equal(selectLastPaidDividend(data).year, currentYear - 1);
});

test('parses the documented MCP JSON-RPC response format', async () => {
  const payload = { symbol: 'PZU', events: [dividendEvent(4.8, '2026-10-08T00:00:00.000Z')] };
  let request;
  global.fetch = async (_url, options) => {
    request = JSON.parse(options.body);
    return {
      ok: true,
      headers: { get: () => 'application/json' },
      text: async () => JSON.stringify(mcpResponse(payload)),
    };
  };

  assert.deepEqual(await callPublicDividends('PZU'), payload);
  assert.equal(request.method, 'tools/call');
  assert.equal(request.params.name, 'get_public_dividends');
  assert.deepEqual(request.params.arguments, { symbol: 'PZU', limit: 50 });
});

test('reads and totals the most recent year of Yahoo dividend events', async () => {
  const currentYear = new Date().getFullYear();
  const dateA = Math.floor(new Date(`${currentYear}-05-01T00:00:00.000Z`).getTime() / 1000);
  const dateB = Math.floor(new Date(`${currentYear}-08-01T00:00:00.000Z`).getTime() / 1000);
  const previousDate = Math.floor(new Date(`${currentYear - 1}-08-01T00:00:00.000Z`).getTime() / 1000);
  global.fetch = async () => ({
    ok: true,
    json: async () => ({
      chart: {
        result: [{
          meta: { currency: 'PLN' },
          events: { dividends: {
            [dateA]: { amount: 1.25, date: dateA },
            [dateB]: { amount: 0.75, date: dateB },
            [previousDate]: { amount: 3, date: previousDate },
          } },
        }],
      },
    }),
  });

  const dividend = await getLastPaidDividend('PZU');
  assert.equal(dividend.amount, 2);
  assert.equal(dividend.year, currentYear);
  assert.equal(dividend.status, 'last-paid');
});

test('caches dividend responses for subsequent requests', async () => {
  dividendCache.clear();
  const currentYear = new Date().getFullYear();
  let calls = 0;
  global.fetch = async () => {
    calls += 1;
    return {
      ok: true,
      headers: { get: () => 'application/json' },
      text: async () => JSON.stringify(mcpResponse({
        asOf: new Date().toISOString(),
        events: [dividendEvent(4.8, `${currentYear}-10-08T00:00:00.000Z`)],
      })),
    };
  };

  const first = await getDividends(['PZU']);
  const second = await getDividends(['PZU']);
  assert.equal(first.dividends.PZU.amount, 4.8);
  assert.equal(second.dividends.PZU.amount, 4.8);
  assert.equal(calls, 1);
  dividendCache.clear();
});

test('does not cache a provider failure as a six-hour absence and keeps the last good dividend', async () => {
  dividendCache.clear();
  const year = new Date().getFullYear();
  global.fetch = async () => ({
    ok: true,
    headers: { get: () => 'application/json' },
    text: async () => JSON.stringify(mcpResponse({ events: [dividendEvent(4, `${year}-06-10T00:00:00.000Z`)] })),
  });
  const good = (await getDividends(['PZU'])).dividends.PZU;
  dividendCache.get('PZU').time = 0;
  global.fetch = async () => { throw new Error('network down'); };
  const stale = (await getDividends(['PZU'])).dividends.PZU;
  assert.deepEqual(stale, good);
  assert.equal(dividendCache.get('PZU').error, true);
  assert.ok(dividendCache.get('PZU').time > Date.now() - 60_000);
  dividendCache.clear();
});

test('caches a confirmed no-dividend result for the normal duration', async () => {
  dividendCache.clear();
  global.fetch = async url => url.includes('agentrynku') ? {
    ok: true,
    headers: { get: () => 'application/json' },
    text: async () => JSON.stringify(mcpResponse({ events: [] })),
  } : {
    ok: true,
    json: async () => ({ chart: { result: [{ meta: { currency: 'PLN' }, events: { dividends: {} } }] } }),
  };
  assert.equal((await getDividends(['PZU'])).dividends.PZU, null);
  assert.equal(dividendCache.get('PZU').error, false);
  dividendCache.clear();
});

test('limits concurrent dividend provider requests to four', async () => {
  dividendCache.clear();
  let active = 0;
  let maximum = 0;
  const year = new Date().getFullYear();
  global.fetch = async () => {
    active++;
    maximum = Math.max(maximum, active);
    await new Promise(resolve => setTimeout(resolve, 5));
    active--;
    return {
      ok: true,
      headers: { get: () => 'application/json' },
      text: async () => JSON.stringify(mcpResponse({ events: [dividendEvent(1, `${year}-06-10T00:00:00.000Z`)] })),
    };
  };
  await getDividends(['PZU', 'PEO', 'ALR', 'ACP', 'BUD', 'DOM', 'GPW', 'KTY']);
  assert.equal(maximum, 4);
  dividendCache.clear();
});

test('retries a failed Yahoo quote request once and returns the last good quote as stale', async () => {
  quoteCache.clear();
  quoteResponseCache.clear();
  quoteCache.set('PZU', {
    time: Date.now() - 60_000,
    data: { price: 42, currency: 'PLN', asOf: '2026-10-22T09:00:00.000Z' },
    staleSince: null,
  });
  let calls = 0;
  global.fetch = async () => { calls++; return { status: 503, ok: false }; };
  const result = await getQuotes(['PZU']);
  assert.equal(calls, 2);
  assert.equal(result.quotes.PZU.price, 42);
  assert.equal(result.quotes.PZU.stale, true);
  assert.ok(result.quotes.PZU.staleSince);
  quoteCache.clear();
  quoteResponseCache.clear();
});

test('returns quotes only for the requested symbols', async () => {
  quoteCache.clear();
  quoteResponseCache.clear();
  global.fetch = async () => ({
    ok: true,
    status: 200,
    json: async () => ({ chart: { result: [{ meta: { currency: 'PLN', regularMarketPrice: 42, regularMarketTime: 1792674000 } }] } }),
  });
  const result = await getQuotes(['PZU']);
  assert.deepEqual(Object.keys(result.quotes), ['PZU']);
  quoteCache.clear();
  quoteResponseCache.clear();
});
