# Dividend Tracker

Prosty tracker portfela dywidendowego GPW. Aplikacja działa lokalnie w przeglądarce, a portfel i historia pozostają zapisane na tym urządzeniu.
Aplikacja oferuje przejrzysty interfejs, statystyki oraz 70 spółek dywidendowych (jeśli chcesz abym dodał jakąś spółkę prosze o kontakt lub o feedback pod projektem)

## Wymagania

- Node.js 18 lub nowszy
- Połączenie z internetem do pobierania notowań Yahoo Finance

## Uruchomienie

1. Sklonuj repozytorium:
   ```sh
   git clone https://github.com/Pacias1337/Dividend-Tracker.git
   ```
2. Przejdź do katalogu:
   ```sh
   cd Dividend-Tracker
   ```
3. Uruchom serwer:
   ```sh
   npm start
   ```
4. Otwórz w przeglądarce [http://127.0.0.1:4173](http://127.0.0.1:4173).

Zatrzymaj serwer skrótem `Ctrl+C`. Jeśli port 4173 jest zajęty, ustaw zmienną środowiskową `PORT` przed uruchomieniem.

## Edycja stylów

Style źródłowe znajdują się w `src/styles.css`. Aplikacja używa Tailwind CSS 4; skompilowany `app.css` jest częścią repozytorium, więc do samego uruchomienia nie trzeba instalować zależności. Do przebudowania stylów potrzebne są Node.js 20+ i pnpm 11.25:

```sh
pnpm install --frozen-lockfile
pnpm run build
```

## Dane i notowania

Portfel nie jest wysyłany na serwer. Aby przenieść go na inny komputer, zapisz kopię JSON w ustawieniach aplikacji i zaimportuj ją na drugim urządzeniu. Yahoo Finance może udostępniać opóźnione notowania lub czasowo nie zwracać części kursów; aplikacja nie gwarantuje danych w czasie rzeczywistym.
