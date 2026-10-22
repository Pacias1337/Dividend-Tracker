(function (root) {
  const MAX_ENTRIES = 400;
  const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;
  const validEntry = item => item && validDate(item.date) && Number.isFinite(item.deposit) && item.deposit >= 0 && Number.isFinite(item.balance) && item.balance >= 0 && (item.positionProfit === undefined || Number.isFinite(item.positionProfit)) && (item.start === undefined || item.start === true);
  const roundMoney = value => Math.round((value + Number.EPSILON) * 100) / 100;
  const normalizeEntries = entries => Array.isArray(entries) ? entries.filter(validEntry).sort((a, b) => a.date.localeCompare(b.date)).slice(-MAX_ENTRIES).map(({ date, deposit, balance, positionProfit, start }) => ({ date, deposit: roundMoney(deposit), balance: roundMoney(balance), ...(positionProfit === undefined ? {} : { positionProfit: roundMoney(positionProfit) }), ...(start ? { start: true } : {}) })) : [];
  const validBackupFields = data => {
    if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
    if (data.deposits !== undefined && (!Array.isArray(data.deposits) || data.deposits.length > MAX_ENTRIES || !data.deposits.every(validEntry))) return false;
    if (data.inflation !== undefined && (!data.inflation || typeof data.inflation !== 'object' || Array.isArray(data.inflation) || !Object.entries(data.inflation).every(([key, value]) => /^\d{4}-Q[1-4]$/.test(key) && Number.isFinite(value) && value >= -1 && value <= 10))) return false;
    return data.depositRate === undefined || Number.isFinite(data.depositRate) && data.depositRate >= 0 && data.depositRate <= 10;
  };
  const quarterOf = date => {
    const [year, month] = date.split('-').map(Number);
    const quarter = Math.floor((month - 1) / 3) + 1;
    return { year, quarter, key: `${year}-Q${quarter}` };
  };

  function calculateXirr(entries, balance, days) {
    if (days < 365 || !Number.isFinite(balance) || balance <= 0) return null;
    const flows = entries.flatMap(item => {
      const amount = item.deposit > 0 ? -item.deposit : item.start ? -item.balance : 0;
      return amount ? [{ date: Date.parse(`${item.date}T00:00:00Z`), amount }] : [];
    });
    if (!flows.length) return null;
    flows.push({ date: Date.parse(`${entries.at(-1).date}T00:00:00Z`), amount: balance });
    const origin = flows[0].date;
    const npv = rate => flows.reduce((sum, flow) => sum + flow.amount / (1 + rate) ** ((flow.date - origin) / 86400000 / 365), 0);
    let low = -0.999999, high = 1;
    if (npv(low) <= 0) return null;
    while (high < 1000000 && npv(high) > 0) high *= 2;
    if (npv(high) > 0) return null;
    for (let i = 0; i < 100; i++) {
      const middle = (low + high) / 2;
      if (npv(middle) > 0) low = middle;
      else high = middle;
    }
    return (low + high) / 2;
  }

  function calculateAnalysis(input, inflation = {}, monthlyInflation = {}) {
    const entries = normalizeEntries(input);
    if (!inflation || typeof inflation !== 'object' || Array.isArray(inflation)) inflation = {};
    if (!monthlyInflation || typeof monthlyInflation !== 'object' || Array.isArray(monthlyInflation)) monthlyInflation = {};
    const inflationForMonth = (year, month) => Number.isFinite(monthlyInflation[`${year}-${String(month).padStart(2, '0')}`]) ? monthlyInflation[`${year}-${String(month).padStart(2, '0')}`] : null;
    let deposits = 0;
    const rows = entries.map(item => {
      deposits += item.deposit;
      const profit = item.balance - deposits;
      const quarter = quarterOf(item.date);
      return { ...item, cumulativeDeposits: deposits, profit, returnRate: deposits > 0 ? profit / deposits : null, inflation: Number.isFinite(inflation[quarter.key]) ? inflation[quarter.key] : inflationForMonth(quarter.year, Number(item.date.slice(5, 7))) };
    });
    const totalDeposits = deposits;
    const last = rows.at(-1);
    const days = last ? (Date.parse(`${last.date}T00:00:00Z`) - Date.parse(`${entries[0].date}T00:00:00Z`)) / 86400000 : 0;
    const totalReturn = last && totalDeposits > 0 ? (last.balance - totalDeposits) / totalDeposits : null;
    const cagr = days >= 365 && totalDeposits > 0 && totalReturn > -1 ? (1 + totalReturn) ** (365 / days) - 1 : null;
    const xirr = calculateXirr(entries, last?.balance, days);
    const quarters = [];
    if (entries.length) {
      const start = quarterOf(entries[0].date);
      let year = start.year, quarter = start.quarter, priorBalance = 0, cumulative = 0, cursor = 0;
      const end = quarterOf(entries.at(-1).date);
      while (year < end.year || year === end.year && quarter <= end.quarter) {
        const key = `${year}-Q${quarter}`;
        let deposit = 0, balance = null;
        while (cursor < entries.length && quarterOf(entries[cursor].date).key === key) {
          deposit += entries[cursor].deposit;
          balance = entries[cursor].balance;
          cursor++;
        }
        cumulative += deposit;
        if (balance === null) balance = priorBalance;
        const base = priorBalance + deposit;
        const change = balance - base;
        const monthlyRates = [1, 2, 3].map(offset => inflationForMonth(year, (quarter - 1) * 3 + offset)).filter(value => value !== null);
        const inflationRate = Number.isFinite(inflation[key]) ? inflation[key] : monthlyRates.length ? monthlyRates.reduce((sum, value) => sum + value, 0) / monthlyRates.length : null;
        const months = (year - start.year) * 12 + quarter * 3;
        quarters.push({ key, deposit, cumulativeDeposits: cumulative, balance, change, returnRate: base > 0 ? change / base : null, inflation: inflationRate, depositsWithInflation: inflationRate === null ? null : cumulative * (1 + inflationRate * months / 12) });
        priorBalance = balance;
        quarter++;
        if (quarter === 5) { quarter = 1; year++; }
      }
    }
    const shownQuarters = quarters.filter(item => item.deposit > 0);
    const knownInflation = quarters.map(item => item.inflation).filter(value => value !== null);
    const finalQuarter = quarters.at(-1);
    return { rows, quarters: shownQuarters, totalDeposits, balance: last?.balance ?? null, totalProfit: last ? last.balance - totalDeposits : null, totalReturn, cagr, xirr, days, summary: { deposit: quarters.reduce((sum, item) => sum + item.deposit, 0), cumulativeDeposits: finalQuarter?.cumulativeDeposits ?? 0, balance: finalQuarter?.balance ?? null, change: quarters.reduce((sum, item) => sum + item.change, 0), returnRate: finalQuarter && finalQuarter.cumulativeDeposits > 0 ? (finalQuarter.balance - finalQuarter.cumulativeDeposits) / finalQuarter.cumulativeDeposits : null, inflation: knownInflation.length ? knownInflation.reduce((sum, value) => sum + value, 0) / knownInflation.length : null, depositsWithInflation: finalQuarter?.depositsWithInflation ?? null } };
  }

  const api = { MAX_ENTRIES, validDate, validEntry, normalizeEntries, validBackupFields, quarterOf, calculateXirr, calculateAnalysis };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.DividendAnalysis = api;
})(typeof window !== 'undefined' ? window : globalThis);
