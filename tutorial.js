(function (root) {
  const STORAGE_KEY = 'dividend-ike-tour';
  const steps = [
    { title: 'Witaj w Dividend Tracker', text: 'Aplikacja pomaga śledzić portfel, dywidendy i wpłaty na IKE. Dane portfela zapisują się w tej przeglądarce.', target: '#portfolioTab', view: 'portfolio' },
    { title: 'Portfel', text: 'Tutaj wpisujesz posiadane instrumenty i ich liczbę. Aplikacja nie łączy się z brokerem ani nie składa zleceń.', target: '#add', view: 'portfolio' },
    { title: 'Podsumowanie portfela', text: 'Największy kafel pokazuje wartość portfela, a pozostałe wspierające dane: szacowaną dywidendę, stopę i oszczędność podatkową.', target: '.summary', view: 'portfolio' },
    { title: 'Statystyki wartości', text: 'W tej zakładce sprawdzisz zmianę wartości portfela w czasie oraz zapisane działania.', target: '#historyTitle', view: 'stats' },
    { title: 'Dziennik wpłat', text: 'Dodaj datę, wpłatę od poprzedniego wpisu oraz wartość konta z tego dnia.', target: '#depositTitle', view: 'stats' },
    { title: 'Jeśli IKE prowadzisz już od lat', text: 'Zacznij od najstarszej dostępnej daty. W pierwszym wpisie podaj łączną sumę wpłat do tego dnia i wartość IKE z tego dnia. W kolejnych wpisach wpisuj wpłaty od poprzedniej daty oraz stan konta. Uzupełniaj historię od najstarszego punktu do najnowszego.', target: '#addDeposit', view: 'stats' },
    { title: 'Analiza wpłat', text: 'Zapisuj wpłaty i stan rachunku, aby śledzić wynik portfela w czasie.', target: '#analysisTitle', view: 'stats' },
    { title: 'Symulator IKE', text: 'Porównaj trzy orientacyjne scenariusze. Możesz ograniczyć wpłaty do limitu z reguł symulatora; warunki wypłaty są uproszczone.', target: '#ikeRulesTitle', view: 'simulation' },
    { title: 'Ustawienia i kopia', text: 'W ustawieniach zapiszesz kopię JSON albo odczytasz ją na innym urządzeniu.', target: '#settingsToggle', view: 'stats' },
    { title: 'To wszystko', text: 'Możesz wrócić do samouczka w dowolnej chwili przyciskiem „Samouczek”.', target: '#startTour', view: 'stats' },
  ];
  let overlay, card, spotlight, title, description, count, previousFocus, index = 0, setView;
  function readState() {
    try { const value = JSON.parse(safeStorage.get(STORAGE_KEY)); return value && typeof value.completed === 'boolean' && Number.isInteger(value.lastStep) && value.lastStep >= -1 && value.lastStep < steps.length ? value : { completed: false, lastStep: -1 }; }
    catch { return { completed: false, lastStep: -1 }; }
  }
  let state = readState();
  function save(completed) {
    state = { completed, lastStep: Math.min(index, steps.length - 1) };
    safeStorage.set(STORAGE_KEY, JSON.stringify(state));
  }
  function visible(element) {
    return element && element.getClientRects().length > 0 && getComputedStyle(element).visibility !== 'hidden';
  }
  function build() {
    if (overlay) return;
    overlay = document.createElement('div'); overlay.className = 'tour-overlay'; overlay.setAttribute('role', 'presentation');
    spotlight = document.createElement('div'); spotlight.className = 'tour-spotlight';
    card = document.createElement('section'); card.className = 'tour-card'; card.setAttribute('role', 'dialog'); card.setAttribute('aria-modal', 'true'); card.setAttribute('aria-labelledby', 'tourTitle');
    title = document.createElement('h2'); title.id = 'tourTitle';
    description = document.createElement('p'); description.className = 'tour-description'; description.setAttribute('aria-live', 'polite');
    count = document.createElement('span'); count.className = 'tour-count';
    const actions = document.createElement('div'); actions.className = 'tour-actions';
    const back = document.createElement('button'), skip = document.createElement('button'), next = document.createElement('button');
    back.type = skip.type = next.type = 'button'; back.className = skip.className = 'secondary'; next.className = 'add';
    back.textContent = 'Wstecz'; skip.textContent = 'Pomiń'; next.textContent = 'Dalej';
    back.addEventListener('click', () => move(-1)); skip.addEventListener('click', () => finish(false)); next.addEventListener('click', () => move(1));
    actions.append(back, skip, next); card.append(title, description, count, actions); overlay.append(spotlight, card); document.body.append(overlay);
    overlay._buttons = { back, next };
    window.addEventListener('resize', position); window.addEventListener('scroll', position, true);
    document.addEventListener('keydown', onKey);
  }
  function position() {
    const step = steps[index], target = document.querySelector(step.target);
    if (!visible(target)) { spotlight.style.display = 'none'; return; }
    const rect = target.getBoundingClientRect(), pad = 8;
    spotlight.style.display = 'block'; spotlight.style.left = `${Math.max(4, rect.left - pad)}px`; spotlight.style.top = `${Math.max(4, rect.top - pad)}px`;
    spotlight.style.width = `${Math.min(innerWidth - 8, rect.width + pad * 2)}px`; spotlight.style.height = `${Math.min(innerHeight - 8, rect.height + pad * 2)}px`;
  }
  function show() {
    if (index < 0 || index >= steps.length) return finish(true);
    const step = steps[index]; if (step.view) setView(step.view);
    requestAnimationFrame(() => {
      const target = document.querySelector(step.target);
      if (!visible(target)) { move(1); return; }
      target.scrollIntoView({ block: 'center', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      title.textContent = step.title; description.textContent = step.text; count.textContent = `Krok ${index + 1} z ${steps.length}`;
      overlay._buttons.back.disabled = index === 0; overlay._buttons.next.textContent = index === steps.length - 1 ? 'Zakończ' : 'Dalej';
      overlay.classList.add('is-open'); position(); overlay._buttons.next.focus();
    });
  }
  function move(direction) {
    index += direction;
    if (index < 0) index = 0;
    if (index >= steps.length) return finish(true);
    show();
  }
  function onKey(event) {
    if (!overlay?.classList.contains('is-open')) return;
    if (event.key === 'Escape') { event.preventDefault(); finish(false); }
    else if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
    else if (event.key === 'Tab') {
      const buttons = [...card.querySelectorAll('button:not(:disabled)')], first = buttons[0], last = buttons.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }
  function finish(completed) {
    if (!overlay) return;
    save(completed); overlay.classList.remove('is-open'); spotlight.style.display = 'none';
    previousFocus?.focus?.();
  }
  function start(options = {}) {
    setView = options.setView;
    previousFocus = document.activeElement;
    index = 0; build(); show();
  }
  root.AppTutorial = { start, readState };
})(typeof window !== 'undefined' ? window : globalThis);
