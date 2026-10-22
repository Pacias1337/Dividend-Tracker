# AGENTS.md

Zasady pracy nad projektem Dividend Tracker. Przeczytaj je przed wprowadzeniem zmian.

## Opis

Dividend Tracker to prosty kalkulator dywidend i tracker portfela na IKE. Użytkownik wybiera spółki GPW oraz obsługiwane ETF-y, które posiada u prawdziwego brokera (aplikacja nie łączy się z brokerem), i wpisuje liczbę akcji lub jednostek.

Skąd pochodzą dane:

- **Ceny akcji**: Yahoo Finance, endpoint `/api/quotes` (bufor w pamięci serwera 30 sekund).
- **Dywidendy**: endpoint `/api/dividends?symbols=PZU,PEO` (bufor w pamięci serwera 6 godzin). Źródła są sprawdzane po kolei, pierwsze, które coś zwróci, wygrywa:
  1. Agent Rynku (publiczne uchwały WZA): zatwierdzona dywidenda z płatnością w bieżącym roku (`status: 'approved'`),
  2. Agent Rynku: ostatnia wypłacona dywidenda (`status: 'last-paid'`),
  3. Yahoo Finance: zdarzenia dywidendowe z ostatnich 5 lat (`status: 'last-paid'`),
  4. brak danych: serwer zwraca `null`, a aplikacja zostaje przy wartości z tablicy `companies`.
- **Wartości zapasowe**: pola `dividend` i `year` w tablicy `companies` w `app.js` to tylko wartość domyślna, używana, gdy żadne źródło nie odpowie. Po pobraniu danych aplikacja nadpisuje je tym, co zwrócił serwer.
- **Własna dywidenda użytkownika**: pozycja w portfelu dostaje `year: 'własna'`, gdy użytkownik wpisze kwotę inną niż ta zapisana w `companies`. Pobieranie dywidend nie może takiej kwoty nadpisywać.

## Stack

- Node.js (serwer w `server.js`, bez zewnętrznych paczek w działaniu aplikacji)
- HTML, JavaScript (`index.html`, `app.js`)
- Moduł obliczeń widoku Analiza (`analysis.js`)
- Moduł symulatora IKE (`simulation.js`) i samouczek (`tutorial.js`)
- Tailwind CSS 4: źródło w `src/styles.css`, wynik w `app.css`
- Yahoo Finance (ceny i zapasowo dywidendy) oraz Agent Rynku (dywidendy z uchwał WZA)
- Testy: wbudowany `node:test`, pliki `test/dividends.test.js`, `test/analysis.test.js` i `test/simulation.test.js`
- Dane użytkownika są zapisywane w `localStorage` przeglądarki, serwer niczego nie przechowuje

## Uruchamianie

```sh
npm start
```

lub

```sh
node server.js
```

Domyślny adres to `http://127.0.0.1:4173`. Jeśli port jest zajęty i nie ustawiono `PORT`, serwer próbuje kolejnych portów (do 10 następnych). Prawdziwy adres wypisuje w konsoli, więc zawsze go stamtąd odczytaj. Zmienna środowiskowa `PORT` wymusza konkretny port (wtedy brak automatycznego szukania). Serwer słucha tylko na `127.0.0.1`.

## Czego nie ruszać

- Klucze w `localStorage`: `dividend-ike-portfolio`, `dividend-ike-prices`, `dividend-ike-price-times`, `dividend-ike-history`, `dividend-ike-history-started`, `dividend-ike-activity`, `dividend-ike-theme`. Zmiana nazwy oznacza, że użytkownik traci swój portfel.
- Statystyki i Analiza są w jednej zakładce. Dziennik wpłat jest przechowywany pod `dividend-ike-deposits` (maksymalnie 400 wpisów `{ date, deposit, balance, start? }`), inflacja pod `dividend-ike-inflation`, a stopa lokaty pod `dividend-ike-deposit-rate`. Wpis z `start: true` oznacza punkt początkowy.
- Symulator i samouczek zapisują dane pod kluczami `dividend-ike-simulation` i `dividend-ike-tour`. Nie zmieniaj istniejących kluczy ani nie wpisuj użytkownikowi przykładowych kwot.
- Jedynym źródłem reguł symulatora jest `IKE_RULES` w `simulation.js`. Aktualizuj rok i limit wpłat z oficjalnego obwieszczenia co roku; warunki wypłaty w symulacji są uproszczone i muszą być tak opisane w interfejsie.
- Format kopii zapasowej (`app: 'Dividend Tracker'`, `version: 1`) oraz funkcję `validateBackup`. Stare kopie muszą dalej się importować. Opcjonalne pola kopii obejmują m.in. `inflation`, `depositRate`, `simulation` i `tour`. Funkcja uznaje za znane także ticker `SPL` (na potrzeby starych kopii), więc go stamtąd nie usuwaj.
- Kształt odpowiedzi `/api/quotes`: `quotes.<TICKER>.price`, `currency`, `asOf`.
- Kształt odpowiedzi `/api/dividends`: `dividends.<TICKER>` to albo `null`, albo obiekt z polami `amount`, `year`, `status` (`approved` lub `last-paid`), `asOf`, `sourceUrl`. Front (`refreshDividends` w `app.js`) na tym polega.
- Eksporty z `server.js` (`fetchDividend`, `getDividends`, `selectApprovedDividend`, `selectLastPaidDividend`, `callPublicDividends`, `getLastPaidDividend`, `dividendCache`, `server`) oraz warunek `require.main === module` przy starcie serwera. Testy importują ten plik i nie mogą przy tym uruchamiać serwera.
- Mechanizm `year: 'własna'` (patrz wyżej).
- `app.css` nie edytuj ręcznie, to plik generowany. Zmieniaj `src/styles.css` i przebuduj style:

```sh
pnpm install --frozen-lockfile
pnpm run build
```

Budowanie stylów wymaga Node.js 20+ i pnpm 11.25. Samo uruchomienie aplikacji tego nie wymaga.

- Folder `docs/screenshots/`: README linkuje do tych plików. Jeśli zmienisz ich nazwy lub usuniesz je, obrazki w README przestaną się wyświetlać.

## Praca z kodem

- Rób małe zmiany i nie przepisuj całych plików bez potrzeby.
- Nie dodawaj paczek (zależności) bez pytania. Aplikacja ma działać bez instalowania czegokolwiek, a testy korzystają z wbudowanego `node:test`.
- Teksty w interfejsie piszemy po polsku.
- Dodanie nowej spółki wymaga zmian w trzech plikach:
  1. `server.js`: wpis w `tickers` (np. `PZU: 'PZU.WA'`). Bez tego serwer nie pobierze ani ceny, ani dywidendy tej spółki,
  2. `app.js`: wpis w `companies` (`ticker`, `name`, `sector`, `dividend`, `year`, `quoteSymbol`). Kwota `dividend` i `year` to wartość zapasowa na wypadek braku danych ze źródeł; wpisz ostatnią znaną dywidendę,
  3. `company-logos.js`: logo spółki pod kluczem tickera.
- Po zmianie `company-logos.js` zwiększ numer wersji w `index.html` (`company-logos.js?v=...`), bo serwer cache'uje ten plik.
- Zmieniając logikę wyboru dywidendy w `server.js`, zaktualizuj też testy w `test/dividends.test.js` i opis źródeł w tym pliku oraz w README.

## Sprawdzenie, czy działa

Do wykonania przez Codexa (bez przeglądarki). Komendy `curl` wymagają uruchomionego serwera (`node server.js`); adres i port odczytaj z konsoli (domyślnie `4173`).

1. Uruchom `node --check app.js` i `node --check server.js`. Oczekiwane: komendy kończą się bez żadnego komunikatu. Błąd składni pokaże nazwę pliku i numer linii.
2. Uruchom `npm test`. Oczekiwane: wszystkie testy przechodzą (`# fail 0`). Testy nie łączą się z internetem.
3. Uruchom `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:4173/`. Oczekiwane: `200`.
4. Uruchom `curl -s http://127.0.0.1:4173/api/quotes`. Oczekiwane: JSON z polami `provider`, `updatedAt` i `quotes`, a w `quotes` każdy ticker ma `price`, `currency`, `asOf`.
5. Uruchom `curl -s "http://127.0.0.1:4173/api/dividends?symbols=PZU"`. Oczekiwane: JSON z polami `provider`, `updatedAt` i `dividends`; `dividends.PZU` to obiekt z `amount`, `year`, `status`, `asOf`, `sourceUrl` albo `null`.

Uwaga: `price` lub dywidenda równa `null` nie musi oznaczać błędu w kodzie. Dzieje się tak, gdy Yahoo albo Agent Rynku nie odpowiada, brakuje internetu albo waluta nie jest PLN. Nie "naprawiaj" tego bez wyraźnej przyczyny.
