(function (root) {
  function createSafeStorage(getStorage, onError = () => {}) {
    let warned = false;
    const report = () => { if (!warned) { warned = true; onError(); } };
    return {
      get(key) { try { return getStorage().getItem(key); } catch { report(); return null; } },
      set(key, value) { try { getStorage().setItem(key, value); return true; } catch { report(); return false; } },
      remove(key) { try { getStorage().removeItem(key); return true; } catch { report(); return false; } },
    };
  }
  const api = { createSafeStorage };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.safeStorage = createSafeStorage(() => root.localStorage, () => {
    const toast = root.document?.querySelector('#toast');
    if (!toast) return;
    toast.textContent = 'Nie udało się zapisać danych. Sprawdź miejsce w przeglądarce i zapisz kopię zapasową.';
    toast.classList.remove('hidden');
    root.setTimeout(() => toast.classList.add('hidden'), 5000);
  });
})(typeof window !== 'undefined' ? window : globalThis);
