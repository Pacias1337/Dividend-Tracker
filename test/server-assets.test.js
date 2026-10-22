const assert = require('node:assert/strict');
const { test } = require('node:test');
const { findGusCsvUrl, getQuotes, parseGusInflation, quoteCache, quoteResponseCache, server } = require('../server');

function request(path) {
  return new Promise(resolve => {
    let status, headers, body;
    server.emit('request', { url: path }, {
      writeHead(code, values) { status = code; headers = values; },
      end(value) { body = value; resolve({ status, headers, body: body.toString() }); },
    });
  });
}

test('serwer udostępnia moduły analizy, symulatora i samouczka jako JavaScript', async () => {
  for (const [path, marker] of [['analysis.js', 'DividendAnalysis'], ['simulation.js', 'IkeSimulation'], ['tutorial.js', 'AppTutorial']]) {
    let status, headers, body, finish;
    const completed = new Promise(resolve => { finish = resolve; });
    server.emit('request', { url: `/${path}` }, {
      writeHead(code, values) { status = code; headers = values; },
      end(value) { body = value; finish(); },
    });
    await completed;
    assert.equal(status, 200, path);
    assert.match(headers['content-type'], /text\/javascript/);
    assert.match(body.toString(), new RegExp(marker));
  }
});

test('strona ustawia nagłówki bezpieczeństwa i wersjonuje zasoby', async () => {
  const { status, headers, body } = await request('/');
  assert.equal(status, 200);
  assert.match(headers['content-security-policy'], /default-src 'self'/);
  assert.equal(headers['x-content-type-options'], 'nosniff');
  assert.equal(headers['referrer-policy'], 'no-referrer');
  assert.match(body, /company-logos\.js\?v=[a-f0-9]{10}/);
  assert.match(body, /href="data:image\/svg\+xml,/);
});

test('endpoint notowań ogranicza wynik do symboli z parametru', async () => {
  const originalFetch = global.fetch;
  quoteCache.clear();
  quoteResponseCache.clear();
  global.fetch = async () => ({
    ok: true,
    status: 200,
    json: async () => ({ chart: { result: [{ meta: { currency: 'PLN', regularMarketPrice: 42, regularMarketTime: 1792674000 } }] } }),
  });
  try {
    const { status, body } = await request('/api/quotes?symbols=PZU');
    assert.equal(status, 200);
    assert.deepEqual(Object.keys(JSON.parse(body).quotes), ['PZU']);
  } finally {
    global.fetch = originalFetch;
    quoteCache.clear();
    quoteResponseCache.clear();
  }
});

test('parser GUS wybiera inflację r/r z tabeli miesięcznej', () => {
  const result = parseGusInflation([
    'Nazwa zmiennej;Jednostka terytorialna;Sposób prezentacji;Rok;Miesiąc;Wartość;Flaga;;',
    'Wskaźnik cen;Polska;Grudzień poprzedniego roku = 100;2025;2;101,3;;;',
    'Wskaźnik cen;Polska;Analogiczny miesiąc poprzedniego roku = 100;2025;2;103,4;;;',
    'Wskaźnik cen;Polska;Analogiczny miesiąc poprzedniego roku = 100;2025;3;103,2;;;',
    'Wskaźnik cen;Polska;Analogiczny miesiąc poprzedniego roku = 100;2025;4;;;;',
    'Wskaźnik cen;Polska;Analogiczny okres narastający poprzedniego roku = 100;2025;2;102,2;;;',
  ].join('\n'));
  assert.equal(Math.round(result['2025-02'] * 10000), 340);
  assert.equal(Object.hasOwn(result, '2025-03'), true);
  assert.equal(Object.hasOwn(result, '2025-04'), false);
});

test('odnajduje link CSV GUS także wtedy, gdy adres pobierania nie kończy się na .csv', () => {
  assert.equal(findGusCsvUrl('<a href="/file/123/download?token=abc">csv</a>'), '/file/123/download?token=abc');
});

test('przelicza zagraniczne notowania ETF-ów na PLN', async () => {
  const originalFetch = global.fetch;
  global.fetch = async url => ({
    ok: true,
    json: async () => ({ chart: { result: [{ meta: url.includes('EURPLN=X') ? { regularMarketPrice: 4.3 } : { regularMarketPrice: 100, currency: 'EUR', regularMarketTime: 1790000000 } }] } }),
  });
  try {
    const { quotes } = await getQuotes();
    assert.equal(quotes.WORLD.price, 430);
    assert.equal(quotes.WORLD.currency, 'PLN');
  } finally {
    global.fetch = originalFetch;
  }
});
