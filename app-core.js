(function (root) {
  const money = value => new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  const percent = value => value === null || !Number.isFinite(value) ? '—' : `${(value * 100).toLocaleString('pl-PL', { maximumFractionDigits: 2 })}%`;
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  function isMarketOpen(symbols, date = new Date()) {
    return symbols.some(symbol => {
      const zone = symbol?.endsWith('.WA') ? 'Europe/Warsaw' : symbol?.endsWith('.DE') || symbol?.endsWith('.AS') ? 'Europe/Berlin' : null;
      if (!zone) return false;
      const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', { timeZone: zone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date).map(part => [part.type, part.value]));
      const minutes = Number(parts.hour) * 60 + Number(parts.minute);
      return !['Sat', 'Sun'].includes(parts.weekday) && minutes >= 540 && minutes < (zone === 'Europe/Warsaw' ? 1020 : 1050);
    });
  }
  function calculateHolding(shares, price, dividend) {
    return { income: shares * dividend, value: Number.isFinite(price) && price > 0 ? shares * price : null, yieldRate: price > 0 ? dividend / price * 100 : null };
  }
  function summarizePortfolio(holdings, prices, companies) {
    return holdings.reduce((summary, holding) => {
      const company = companies[holding.ticker];
      if (!company) return summary;
      const row = calculateHolding(holding.shares, prices[holding.ticker], holding.dividend ?? company.dividend);
      summary.annual += row.income;
      if (row.value !== null) summary.value += row.value;
      return summary;
    }, { annual: 0, value: 0 });
  }
  function validateBackup(backup, { tickers, validAnalysisFields, validSimulationState }) {
    const data = backup?.data;
    if (backup?.app !== 'Dividend Tracker' || backup.version !== 1 || !data || !Array.isArray(data.portfolio) || data.portfolio.length > tickers.length + 1 || !Array.isArray(data.history) || data.history.length > 400 || !Array.isArray(data.activity) || data.activity.length > 500 || !data.prices || typeof data.prices !== 'object' || !data.priceTimes || typeof data.priceTimes !== 'object' || !['light', 'dark'].includes(data.theme) || !Number.isFinite(Date.parse(data.historyStartedAt))) return false;
    const known = new Set([...tickers, 'SPL']), seen = new Set(), validDate = value => typeof value === 'string' && Number.isFinite(Date.parse(value));
    if (!data.portfolio.every(h => h && known.has(h.ticker) && !seen.has(h.ticker) && seen.add(h.ticker) && Number.isFinite(h.shares) && h.shares >= 0 && (h.dividend == null || Number.isFinite(h.dividend) && h.dividend >= 0))) return false;
    if (!data.history.every(h => h && validDate(h.at) && Number.isFinite(h.value) && h.value >= 0 && Number.isFinite(h.annualIncome) && h.annualIncome >= 0)) return false;
    if (!data.activity.every(a => a && validDate(a.at) && known.has(a.ticker) && ['Dodano pozycję', 'Zaktualizowano pozycję', 'Usunięto pozycję'].includes(a.action) && Number.isFinite(a.shares) && a.shares >= 0 && (a.valueChange === undefined || a.valueChange === null || Number.isFinite(a.valueChange)))) return false;
    if (!validAnalysisFields(data)) return false;
    if (data.simulation !== undefined && !validSimulationState(data.simulation)) return false;
    if (data.tour !== undefined && (!data.tour || typeof data.tour.completed !== 'boolean' || !Number.isInteger(data.tour.lastStep) || data.tour.lastStep < -1 || data.tour.lastStep >= 9)) return false;
    return Object.entries(data.prices).every(([ticker, value]) => known.has(ticker) && Number.isFinite(value) && value > 0) && Object.entries(data.priceTimes).every(([ticker, value]) => known.has(ticker) && validDate(value));
  }
  const api = { calculateHolding, escapeHtml, isMarketOpen, money, percent, summarizePortfolio, validateBackup };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.AppCore = api;
})(typeof window !== 'undefined' ? window : globalThis);
