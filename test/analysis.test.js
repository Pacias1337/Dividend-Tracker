const assert = require('node:assert/strict');
const { test } = require('node:test');
const { calculateAnalysis, normalizeEntries, validBackupFields } = require('../analysis');

test('pusta lista nie ma wartości portfela ani kwartalnych punktów', () => {
  assert.deepEqual(calculateAnalysis([]).quarters, []);
  assert.equal(calculateAnalysis([]).balance, null);
});

test('jeden wpis wylicza wpłatę, zysk i zwrot', () => {
  const result = calculateAnalysis([{ date: '2025-01-15', deposit: 100, balance: 120 }]);
  assert.equal(result.rows[0].profit, 20);
  assert.equal(result.rows[0].returnRate, 0.2);
  assert.equal(result.cagr, null);
  assert.equal(result.xirr, null);
});

test('wpłata zero daje brak procentowego zwrotu zamiast dzielenia przez zero', () => {
  const result = calculateAnalysis([{ date: '2025-01-15', deposit: 0, balance: 100 }]);
  assert.equal(result.rows[0].returnRate, null);
  assert.equal(result.summary.returnRate, null);
});

test('pusty kwartał przenosi stan konta z najbliższego wcześniejszego wpisu', () => {
  const result = calculateAnalysis([{ date: '2025-01-15', deposit: 100, balance: 110 }, { date: '2025-07-15', deposit: 20, balance: 140 }]);
  assert.deepEqual(result.quarters.map(row => row.key), ['2025-Q1', '2025-Q3']);
  assert.deepEqual(result.quarters.map(row => row.balance), [110, 140]);
});

test('rocznej stopy zwrotu nie ma dla wpisów z tą samą datą', () => {
  const result = calculateAnalysis([{ date: '2025-01-15', deposit: 100, balance: 100 }, { date: '2025-01-15', deposit: 0, balance: 120 }]);
  assert.equal(result.cagr, null);
  assert.equal(result.xirr, null);
});

test('XIRR dla jednej wpłaty uwzględnia czas i nie anualizuje okresu poniżej roku', () => {
  const annual = calculateAnalysis([{ date: '2024-01-01', deposit: 100, balance: 100 }, { date: '2025-01-01', deposit: 0, balance: 110 }]);
  assert.ok(Math.abs(annual.xirr - ((1.1 ** (365 / 366)) - 1)) < 1e-8);
  const short = calculateAnalysis([{ date: '2025-01-01', deposit: 100, balance: 100 }, { date: '2025-06-01', deposit: 0, balance: 120 }]);
  assert.equal(short.totalReturn, 0.2);
  assert.equal(short.cagr, null);
  assert.equal(short.xirr, null);
});

test('XIRR traktuje początkowe saldo jako kapitał zainwestowany', () => {
  const result = calculateAnalysis([
    { date: '2024-01-01', deposit: 0, balance: 100, start: true },
    { date: '2025-01-01', deposit: 0, balance: 110 },
  ]);
  assert.ok(Math.abs(result.xirr - ((1.1 ** (365 / 366)) - 1)) < 1e-8);
});

test('XIRR wielu wpłat ma rozwiązanie, a zerowe saldo nie ma annualizowanej stopy', () => {
  const result = calculateAnalysis([
    { date: '2024-01-01', deposit: 100, balance: 100 },
    { date: '2024-07-01', deposit: 100, balance: 200 },
    { date: '2025-01-01', deposit: 0, balance: 220 },
  ]);
  const days = [0, 182, 366];
  const npv = -100 / (1 + result.xirr) ** (days[0] / 365) - 100 / (1 + result.xirr) ** (days[1] / 365) + 220 / (1 + result.xirr) ** (days[2] / 365);
  assert.ok(Number.isFinite(result.xirr));
  assert.ok(Math.abs(npv) < 1e-7);
  const loss = calculateAnalysis([{ date: '2024-01-01', deposit: 100, balance: 100 }, { date: '2025-01-01', deposit: 0, balance: 0 }]);
  assert.equal(loss.totalReturn, -1);
  assert.equal(loss.cagr, null);
  assert.equal(loss.xirr, null);
});

test('kilka kwartałów sumuje wpłaty, przenosi saldo i wylicza proste porównania', () => {
  const result = calculateAnalysis([
    { date: '2025-01-10', deposit: 100, balance: 110 },
    { date: '2025-03-20', deposit: 50, balance: 170 },
    { date: '2025-10-01', deposit: 50, balance: 240 },
  ], { '2025-Q1': 0.04, '2025-Q4': 0.08 });
  // Ręcznie: wpłaty 200, ostatnie saldo 240, zysk 40, zwrot 20%; Q1 zmiana 20, Q2/Q3 bez wpisów, Q4 zmiana 20.
  assert.equal(result.totalProfit, 40);
  assert.equal(result.totalReturn, 0.2);
  assert.deepEqual(result.quarters.map(row => row.change), [20, 20]);
  assert.equal(result.quarters[0].depositsWithInflation, 151.5); // 150 × (1 + 4% × 3/12)
  assert.equal(result.quarters[1].depositsWithInflation, 216); // 200 × (1 + 8% × 12/12)
  assert.equal(result.summary.inflation, 0.06);
  assert.deepEqual(result.quarters.map(row => row.key), ['2025-Q1', '2025-Q4']);
  assert.deepEqual(normalizeEntries([{ date: '2025-02-30', deposit: 4, balance: 5 }]), []);
});

test('inflacja pobrana dla miesiąca zasila wiersz i średnią kwartału, a ręczna wartość ma pierwszeństwo', () => {
  const result = calculateAnalysis([{ date: '2025-02-15', deposit: 100, balance: 100 }], { '2025-Q1': 0.05 }, {
    '2025-01': 0.02, '2025-02': 0.03, '2025-03': 0.04,
  });
  assert.equal(result.rows[0].inflation, 0.05);
  assert.equal(result.quarters[0].inflation, 0.05);
  const automatic = calculateAnalysis([{ date: '2025-02-15', deposit: 100, balance: 100 }], {}, {
    '2025-01': 0.02, '2025-02': 0.03, '2025-03': 0.04,
  });
  assert.equal(automatic.rows[0].inflation, 0.03);
  assert.equal(automatic.quarters[0].inflation, 0.03);
});

test('stara kopia bez pól analizy i poprawna nowa kopia są akceptowane', () => {
  assert.equal(validBackupFields({}), true);
  assert.equal(validBackupFields({ deposits: [{ date: '2025-01-01', deposit: 10, balance: 12 }], inflation: { '2025-Q1': 0.03 }, depositRate: 0.04 }), true);
});

test('wpis startowy przechodzi normalizację i zachowuje znacznik', () => {
  const entries = normalizeEntries([{ date: '2026-10-22', deposit: 1000, balance: 1200, start: true }, { date: '2026-10-23', deposit: 100, balance: 1300, start: 'yes' }]);
  assert.deepEqual(entries, [{ date: '2026-10-22', deposit: 1000, balance: 1200, start: true }]);
  assert.equal(validBackupFields({ deposits: entries }), true);
});

test('uszkodzone lub zbyt duże pola analizy w kopii są odrzucane', () => {
  assert.equal(validBackupFields({ deposits: [{ date: '2025-02-30', deposit: 1, balance: 2 }] }), false);
  assert.equal(validBackupFields({ inflation: { '2025-Q5': 0.03 } }), false);
  assert.equal(validBackupFields({ depositRate: Infinity }), false);
  assert.equal(validBackupFields({ deposits: Array(401).fill({ date: '2025-01-01', deposit: 0, balance: 0 }) }), false);
});
