# AGENTS.md

## Opis

Dividend Tracker to prosty kalkulator dywidend z rynku GPW (portfel na IKE). Użytkownik wybiera spółki, które posiada u prawdziwego brokera (aplikacja nie łączy się z brokerem, tak jest zaplanowane), i wpisuje tylko liczbę posiadanych akcji. Aplikacja pobiera z Yahoo Finance wyłącznie cenę akcji.

Kwoty dywidend **nie pochodzą z Yahoo**. Są wpisane na sztywno w tablicy `companies` w `app.js` (pola `dividend` i `year`) i trzeba je aktualizować ręcznie.

## Stack

- Node.js (serwer w `server.js`, bez zewnętrznych paczek)
- HTML, JavaScript (`index.html`, `app.js`)
- Tailwind CSS 4: źródło w `src/styles.css`, wynik w `app.css`
- Yahoo Finance: tylko ceny, przez endpoint `/api/quotes`
- Dane użytkownika są zapisywane w `localStorage` przeglądarki, serwer niczego nie przechowuje

## Uruchamianie

```sh
npm start
```

lub

```sh
node server.js
```

Następnie otwórz `http://127.0.0.1:4173`. Port można zmienić zmienną środowiskową `PORT`. Serwer słucha tylko na `127.0.0.1`.

## Czego nie ruszać

- Klucze w `localStorage` (`dividend-ike-portfolio`, `dividend-ike-prices`, `dividend-ike-price-times`, `dividend-ike-history`, `dividend-ike-history-started`, `dividend-ike-activity`, `dividend-ike-theme`). Zmiana nazwy oznacza, że użytkownik traci swój portfel.
- Format kopii zapasowej (`app: 'Dividend Tracker'`, `version: 1`) oraz funkcję `validateBackup`. Stare kopie muszą dalej się importować.
- Kształt odpowiedzi `/api/quotes`: `quotes.<TICKER>.price`, `currency`, `asOf`. Front na nim polega.
- `app.css` nie edytuj ręcznie, to plik generowany. Zmieniaj `src/styles.css` i przebuduj style:

```sh
pnpm install --frozen-lockfile
pnpm run build
```

Budowanie stylów wymaga Node.js 20+ i pnpm 11.25. Samo uruchomienie aplikacji tego nie wymaga.

## Praca z kodem

- Rób małe zmiany i nie przepisuj całych plików bez potrzeby.
- Nie dodawaj paczek (zależności) bez pytania. Aplikacja ma działać bez instalowania czegokolwiek.
- Teksty w interfejsie piszemy po polsku.
- Dodanie nowej spółki wymaga zmian w trzech plikach:
  1. `server.js`: wpis w `tickers` (np. `PZU: 'PZU.WA'`),
  2. `app.js`: wpis w `companies` (`ticker`, `name`, `sector`, `dividend`, `year`, `quoteSymbol`); kwotę dywidendy i rok wypłaty trzeba podać ręcznie,
  3. `company-logos.js`: logo spółki pod kluczem tickera.
- Po zmianie `company-logos.js` zwiększ numer wersji w `index.html` (`company-logos.js?v=...`), bo serwer cache'uje ten plik.

## Sprawdzenie, czy działa

Do wykonania przez Codexa (bez przeglądarki). Serwer musi być wcześniej uruchomiony (`node server.js`).

1. Uruchom `node --check app.js` i `node --check server.js`. Oczekiwane: komendy kończą się bez żadnego komunikatu. Błąd składni pokaże nazwę pliku i numer linii.
2. Uruchom `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4173/`. Oczekiwane: `200`.
3. Uruchom `curl -s http://127.0.0.1:4173/api/quotes`. Oczekiwane: JSON z polami `provider`, `updatedAt` i `quotes`, a w `quotes` każdy ticker ma `price`, `currency`, `asOf`.

Uwaga: `price` równe `null` nie musi oznaczać błędu w kodzie. Dzieje się tak, gdy Yahoo nie odpowiada, brakuje internetu albo waluta nie jest PLN. Nie "naprawiaj" tego bez wyraźnej przyczyny.
