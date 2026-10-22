const assert = require('node:assert/strict');
const { test } = require('node:test');
const AppCore = require('../app-core');
const { validBackupFields } = require('../analysis');

const validSimulationState = value => value && typeof value === 'object' && typeof value.enabled === 'boolean';

test('escapes values before inserting them in HTML templates', () => {
  assert.equal(AppCore.escapeHtml(`<img src="x" onerror='alert(1)'>&`), '&lt;img src=&quot;x&quot; onerror=&#39;alert(1)&#39;&gt;&amp;');
});

test('formats money and percentages using Polish locale', () => {
  assert.match(AppCore.money(1234.5), /1\s?234,50\s?zł/);
  assert.equal(AppCore.percent(0.125), '12,5%');
  assert.equal(AppCore.percent(null), '—');
});

test('calculates holding and portfolio totals', () => {
  assert.deepEqual(AppCore.calculateHolding(3, 20, 2), { income: 6, value: 60, yieldRate: 10 });
  assert.deepEqual(AppCore.summarizePortfolio([{ ticker: 'PZU', shares: 3 }], { PZU: 20 }, { PZU: { dividend: 2 } }), { annual: 6, value: 60 });
});

test('accepts old backup copies without optional fields, including SPL', () => {
  const backup = {
    app: 'Dividend Tracker', version: 1,
    data: {
      portfolio: [{ ticker: 'SPL', shares: 4, dividend: 2, year: 2020 }],
      prices: {}, priceTimes: {}, history: [], activity: [], theme: 'light',
      historyStartedAt: '2020-01-01T00:00:00.000Z',
    },
  };
  assert.equal(AppCore.validateBackup(backup, { tickers: ['PZU'], validAnalysisFields: validBackupFields, validSimulationState }), true);
  assert.equal(AppCore.validateBackup({ ...backup, version: 2 }, { tickers: ['PZU'], validAnalysisFields: validBackupFields, validSimulationState }), false);
});
