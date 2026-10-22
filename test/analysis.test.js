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
  assert.equal(result.cagr, 0); // Jeden dzień pomiaru oznacza 0 dni między pierwszym i ostatnim wpisem.
});

test('wpłata zero daje brak procentowego zwrotu zamiast dzielenia przez zero', () => {
  const result = calculateAnalysis([{ date: '2025-01-15', deposit: 0, balance: 100 }]);
  assert.equal(result.rows[0].returnRate, null);
  assert.equal(result.summary.returnRate, null);
});

test('pusty kwartał przenosi stan konta z najbliższego wcześniejszego wpisu', () => {
  const result = calculateAnalysis([{ date: '2025-01-15', deposit: 100, balance: 110 }, { date: '2025-07-15', deposit: 20, balance: 140 }]);
  assert.deepEqual(result.quarters.map(row => row.balance), [110, 110, 140]);
  assert.equal(result.quarters[1].deposit, 0);
  assert.equal(result.quarters[1].change, 0);
});

test('CAGR wynosi zero dla jednego dnia, nawet gdy wpisy mają tę samą datę', () => {
  const result = calculateAnalysis([{ date: '2025-01-15', deposit: 100, balance: 100 }, { date: '2025-01-15', deposit: 0, balance: 120 }]);
  assert.equal(result.cagr, 0);
});

test('kilka kwartałów sumuje wpłaty, przenosi saldo i wylicza proste porównania', () => {
  const result = calculateAnalysis([
    { date: '2025-01-10', deposit: 100, balance: 110 },
    { date: '2025-03-20', deposit: 50, balance: 170 },
    { date: '2025-10-01', deposit: 50, balance: 240 },
  ], { '2025-Q1': 0.04, '2025-Q4': 0.08 }, 0.03);
  // Ręcznie: wpłaty 200, ostatnie saldo 240, zysk 40, zwrot 20%; Q1 zmiana 20, Q2/Q3 bez wpisów, Q4 zmiana 20.
  assert.equal(result.totalProfit, 40);
  assert.equal(result.totalReturn, 0.2);
  assert.deepEqual(result.quarters.map(row => row.change), [20, 0, 0, 20]);
  assert.equal(result.quarters[0].depositsWithInflation, 151.5); // 150 × (1 + 4% × 3/12)
  assert.equal(result.quarters[3].depositsWithInflation, 216); // 200 × (1 + 8% × 12/12)
  assert.equal(result.summary.inflation, 0.06);
  assert.deepEqual(normalizeEntries([{ date: '2025-02-30', deposit: 4, balance: 5 }]), []);
});

test('stara kopia bez pól analizy i poprawna nowa kopia są akceptowane', () => {
  assert.equal(validBackupFields({}), true);
  assert.equal(validBackupFields({ deposits: [{ date: '2025-01-01', deposit: 10, balance: 12 }], inflation: { '2025-Q1': 0.03 }, depositRate: 0.04 }), true);
});

test('uszkodzone lub zbyt duże pola analizy w kopii są odrzucane', () => {
  assert.equal(validBackupFields({ deposits: [{ date: '2025-02-30', deposit: 1, balance: 2 }] }), false);
  assert.equal(validBackupFields({ inflation: { '2025-Q5': 0.03 } }), false);
  assert.equal(validBackupFields({ depositRate: Infinity }), false);
  assert.equal(validBackupFields({ deposits: Array(401).fill({ date: '2025-01-01', deposit: 0, balance: 0 }) }), false);
});
