# Dywidendy IKE

Uruchom lokalny serwer poleceniem `node server.js` i otwórz adres `http://127.0.0.1:4173` w przeglądarce.

Aplikacja pobiera kursy GPW z publicznych notowań Yahoo Finance. Serwer lokalny pośredniczy w zapytaniach, aby ominąć blokadę CORS przeglądarki. Kursy odświeżają się co minutę; Yahoo oznacza część notowań GPW jako opóźnione, więc nie są to gwarantowane dane giełdowe w czasie rzeczywistym. Portfel pozostaje w pamięci lokalnej przeglądarki.
