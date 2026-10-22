---
name: dodaj-spolke
description: Użyj, gdy użytkownik prosi o dodanie nowej spółki GPW do aplikacji.
---

# Dodawanie spółki GPW

1. W `server.js` dodaj ticker do mapy `tickers`, np. `PZU: 'PZU.WA'`, aby serwer pobierał ceny i dywidendy.
2. W `app.js` dodaj spółkę do tablicy `companies`, podając `ticker`, `name`, `sector`, `dividend`, `year` i `quoteSymbol`. Wartości `dividend` i `year` ustaw jako zapasowe na podstawie ostatniej znanej dywidendy.
3. W `company-logos.js` dodaj logo pod kluczem tickera.
4. W `index.html` zwiększ numer wersji w adresie `company-logos.js?v=...`, aby odświeżyć cache.
5. Sprawdź składnię i testy, uruchamiając `node --check app.js`, `node --check server.js` oraz `npm test`.
