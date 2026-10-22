/* Limit: https://www.gov.pl/web/rodzina/ike-limit-wplat (obwieszczenie MRPiPS, 2026); warunki wieku i lat wpłat są uproszczone. */
const IKE_RULES = Object.freeze({ year: 2026, annualLimit: 28260, taxRate: 0.19, retirementAge: 60, minContributionYears: 5 });

function withdrawalTax(value, deposits, amount) {
  if (![value, deposits, amount].every(Number.isFinite) || value <= 0 || deposits < 0 || amount < 0 || amount > value) {
    return { valid: false, error: 'Kwota wypłaty musi mieścić się w aktualnej wartości IKE.' };
  }
  const capital = amount * deposits / value;
  const gain = amount - capital;
  const tax = Math.round(Math.max(0, gain) * IKE_RULES.taxRate * 100) / 100;
  return { valid: true, tax, net: amount - tax, capital, gain, remainingValue: value - amount, remainingDeposits: deposits - capital };
}

function reconcileExisting(value, deposits, profit) {
  if ([value, deposits].some(item => item !== null && (!Number.isFinite(item) || item < 0))) return { valid: false, error: 'Wartość IKE i wpłaty muszą być nieujemne.' };
  if (profit !== null && !Number.isFinite(profit)) return { valid: false, error: 'Zysk musi być poprawną liczbą.' };
  const values = [value, deposits, profit];
  const known = values.filter(item => item !== null).length;
  if (known < 2) return { valid: false, error: 'Wpisz co najmniej dwie z trzech wartości.' };
  let [accountValue, totalDeposits, totalProfit] = values;
  if (accountValue === null) accountValue = totalDeposits + totalProfit;
  else if (totalDeposits === null) totalDeposits = accountValue - totalProfit;
  else if (totalProfit === null) totalProfit = accountValue - totalDeposits;
  if (accountValue < 0 || totalDeposits < 0 || (values.every(item => item !== null) && Math.abs(accountValue - totalDeposits - totalProfit) > 0.01)) {
    return { valid: false, error: 'Wartość IKE musi równać się wpłatom plus zysk.' };
  }
  return { valid: true, value: accountValue, deposits: totalDeposits, profit: totalProfit };
}

function ikeConditions({ birthYear, firstDepositYear, currentYear = new Date().getFullYear() } = {}) {
  const validBirthYear = year => Number.isInteger(year) && year >= 1900 && year <= currentYear;
  const validDepositYear = year => Number.isInteger(year) && year >= 1900 && year <= currentYear + 80;
  const ageKnown = validBirthYear(birthYear), depositsKnown = validDepositYear(firstDepositYear);
  const ageMet = ageKnown ? currentYear - birthYear >= IKE_RULES.retirementAge : null;
  const yearsMet = depositsKnown ? currentYear - firstDepositYear + 1 >= IKE_RULES.minContributionYears : null;
  return { ageMet, yearsMet, eligibleYear: ageKnown && depositsKnown ? Math.max(birthYear + IKE_RULES.retirementAge, firstDepositYear + IKE_RULES.minContributionYears - 1) : null };
}

function projectGrowth({ startValue = 0, startDeposits = 0, monthlyDeposit = 0, annualReturnPct = 0, years = 1, annualLimit = IKE_RULES.annualLimit, capToLimit = false, currentYear = new Date().getFullYear() } = {}) {
  if (![startValue, startDeposits, monthlyDeposit, annualReturnPct, annualLimit].every(Number.isFinite) || startValue < 0 || startDeposits < 0 || monthlyDeposit < 0 || annualLimit < 0 || annualReturnPct < -100 || annualReturnPct > 100 || !Number.isInteger(years) || years < 1 || years > 80) return { valid: false, error: 'Sprawdź wpisane kwoty, stopę zwrotu i liczbę lat.' };
  const monthlyRate = (1 + annualReturnPct / 100) ** (1 / 12) - 1;
  let value = startValue, deposits = startDeposits;
  const rows = [];
  for (let offset = 0; offset < years; offset++) {
    let yearlyDeposit = 0, limitExceeded = false;
    for (let month = 0; month < 12; month++) {
      let payment = monthlyDeposit;
      if (yearlyDeposit + payment > annualLimit) {
        limitExceeded = true;
        if (capToLimit) payment = Math.max(0, annualLimit - yearlyDeposit);
      }
      yearlyDeposit += payment;
      deposits += payment;
      value = (value + payment) * (1 + monthlyRate);
    }
    const tax = Math.round(Math.max(0, value - deposits) * IKE_RULES.taxRate * 100) / 100;
    rows.push({ year: currentYear + offset, yearlyDeposit, deposits, value, profit: value - deposits, tax, net: value - tax, limitExceeded });
  }
  return { valid: true, rows };
}

function projectScenarios(input) {
  return [-2, 0, 2].map(delta => ({ delta, ...projectGrowth({ ...input, annualReturnPct: Math.max(-100, Math.min(100, input.annualReturnPct + delta)) }) }));
}

function realValue(value, years, annualInflationPct) {
  if (![value, years, annualInflationPct].every(Number.isFinite) || years < 0 || annualInflationPct <= -100) return null;
  return value / (1 + annualInflationPct / 100) ** years;
}

const api = { IKE_RULES, withdrawalTax, reconcileExisting, ikeConditions, projectGrowth, projectScenarios, realValue };
if (typeof module !== 'undefined') module.exports = api;
if (typeof window !== 'undefined') window.IkeSimulation = api;
