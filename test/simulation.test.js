const assert = require('node:assert/strict');
const { test } = require('node:test');
const { withdrawalTax, reconcileExisting, ikeConditions, projectGrowth, realValue } = require('../simulation');

test('podatek od częściowej wypłaty obejmuje proporcjonalny zysk', () => {
  // Konto 1 200 zł, wpłaty 1 000 zł: z wypłaty 600 zł połowa (100 zł) to zysk, podatek 19 zł.
  assert.deepEqual(withdrawalTax(1200, 1000, 600), { valid: true, tax: 19, net: 581, capital: 500, gain: 100, remainingValue: 600, remainingDeposits: 500 });
});
test('pełna wypłata opodatkowuje zysk, ale nie wpłacony kapitał', () => assert.equal(withdrawalTax(1200, 1000, 1200).tax, 38));
test('strata nie tworzy podatku', () => assert.equal(withdrawalTax(800, 1000, 800).tax, 0));
test('odrzuca wypłatę większą od salda', () => assert.equal(withdrawalTax(100, 80, 101).valid, false));
test('uzupełnia brakującą trzecią wartość, także przy ujemnym zysku', () => {
  assert.deepEqual(reconcileExisting(900, 1000, null), { valid: true, value: 900, deposits: 1000, profit: -100 });
  assert.deepEqual(reconcileExisting(null, 1000, -100), { valid: true, value: 900, deposits: 1000, profit: -100 });
});
test('odrzuca niespójne trzy wartości', () => assert.equal(reconcileExisting(1200, 1000, 100).valid, false));
test('stopa 0% daje saldo równe sumie wpłat', () => {
  const result = projectGrowth({ monthlyDeposit: 100, annualReturnPct: 0, years: 1, annualLimit: 5000, currentYear: 2026 });
  assert.equal(result.rows[0].value, 1200);
  assert.equal(result.rows[0].deposits, 1200);
});
test('sygnalizuje przekroczenie limitu i przycina wpłatę w ostatnim miesiącu', () => {
  const input = { monthlyDeposit: 1000, annualReturnPct: 0, years: 1, annualLimit: 5000, currentYear: 2026 };
  const uncapped = projectGrowth(input).rows[0], capped = projectGrowth({ ...input, capToLimit: true }).rows[0];
  assert.equal(uncapped.limitExceeded, true); assert.equal(uncapped.yearlyDeposit, 12000);
  assert.equal(capped.limitExceeded, true); assert.equal(capped.yearlyDeposit, 5000); assert.equal(capped.value, 5000);
});
test('warunki IKE uwzględniają oba terminy i brak danych', () => {
  assert.deepEqual(ikeConditions({ birthYear: 1960, firstDepositYear: 2022, currentYear: 2026 }), { ageMet: true, yearsMet: true, eligibleYear: 2026 });
  assert.deepEqual(ikeConditions({ birthYear: null, firstDepositYear: 2025, currentYear: 2026 }), { ageMet: null, yearsMet: false, eligibleYear: null });
});
test('przelicza wartości dodatnie i stratę na dzisiejsze złotówki', () => {
  assert.ok(Math.abs(realValue(121, 1, 10) - 110) < 0.001);
  assert.ok(Math.abs(realValue(-110, 1, 10) + 100) < 0.001);
});
