const assert = require('node:assert/strict');
const { test } = require('node:test');
const { createSafeStorage } = require('../storage');

test('safeStorage reads, writes and removes without changing stored values', () => {
  const values = new Map();
  const storage = createSafeStorage(() => ({
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key),
  }));
  assert.equal(storage.set('portfolio', '[{"ticker":"PZU"}]'), true);
  assert.equal(storage.get('portfolio'), '[{"ticker":"PZU"}]');
  assert.equal(storage.remove('portfolio'), true);
  assert.equal(storage.get('portfolio'), null);
});

test('safeStorage contains storage errors and reports them once', () => {
  let reports = 0;
  const storage = createSafeStorage(() => ({ setItem() { throw new Error('quota'); } }), () => reports++);
  assert.equal(storage.set('portfolio', 'value'), false);
  assert.equal(storage.set('history', 'value'), false);
  assert.equal(reports, 1);
});
