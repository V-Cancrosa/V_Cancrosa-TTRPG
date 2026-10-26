# Krąg Cieni

Archiwum kampanii D&D 5e „Krąg Cieni”: postacie, notatki z sesji i materiały o świecie. Strona jest statyczna i działa na GitHub Pages bez budowania.

## Co gdzie jest

- `index.html` to strona główna z kartami postaci. Każda karta prowadzi do strony postaci.
- `postacie/<postać>/index.html` to strona postaci, w wyglądzie jej własnych dokumentów, z dodatkami do gry i archiwum wszystkich plików.
- `postacie/<postać>/` zawiera też oryginalne pliki tej postaci: dossier w HTML, PDF-y, DOCX i grafiki.
- `assets/styl.css` odpowiada za wygląd strony głównej (jasny i ciemny motyw według ustawień urządzenia).
- `assets/postac.css` i `assets/postac.js` to elementy wspólne dla stron postaci: pasek nawigacji, galeria w powiększeniu, pamięć w przeglądarce, rzuty kośćmi.
- `assets/miniatury/` (ok. 720 px) i `assets/portrety/` (ok. 1400 px) zawierają lekkie kopie grafik w WEBP. Oryginały leżą w folderach postaci.
- `sesje/` zawiera notatki z sesji, a `swiat/` Whitewood i architekturę języka Birdfolk.

## Strony postaci

| Strona | Wygląd | Dodatki |
| --- | --- | --- |
| `postacie/jack-leothern/` | dossier: brzoza, lis, struny G·D·A·E | imię prawdziwe „wypowiadane cicho”, liście brzozy, struny do szarpania (dźwięk po włączeniu, „grubsze struny” dodają kontrabas), licznik ki, Legenda Roga |
| `postacie/fretka-auri/` | Kompendium: pergamin, zieleń, szwy | guzikowe oczy patrzą za kursorem, imię szeptane w szwie, mysz Pisk, orkiestra lokatorów, rzut czaru z kadrem z Kompendium i testem dzikiej magii, sloty i sorcery pointy |
| `postacie/welian-sink/` | dossier: miedź, patyna, świeca | trzy postaci z przełącznikiem (prawdziwa forma faluje jak płynna miedź), światło świecy za kursorem, seans ze zdaniami z pamiętnika, kości psioniczne Soul Knife |
| `postacie/durgan-vundrakkun/` | iluminacja: welin, złoto, lazur | imię składa się z rozsypanych liter, echa na iluminacji, złote okruchy do zebrania, widzenie w szarości, łacińska dewiza słowo po słowie |
| `postacie/opi/` | teczka projektu: krem, mosiądz, stemple | suwak skóra ↔ mechanizm, serce i usypiany umysł, zaczernione „NIE WIE” do odsłonięcia, trzy imiona |
| `postacie/fusk-yaki/` | konosament: pokład, linia wodna, morze | pieczęcie na karcie, plomba o stałej temperaturze, prywatna lista długów, rejestr zdarzeń, saldo paktu, głębokościomierz |

Stan liczników (ki, sloty, kości, lista długów, liczba seansów) zapisuje się tylko w przeglądarce, na danym urządzeniu.

Dokumenty, które istniały tylko jako Word lub PDF, dostały strony w stylu postaci, z tekstem przeniesionym bez zmian:

- `postacie/jack-leothern/karta.html` — karta z Google Docs „Jack - Vulpin”,
- `postacie/opi/teczka.html` — „Opus — Teczka projektu” (z PDF, z zachowaniem pogrubień, kursyw i stempli),
- `postacie/opi/magnum-opus.html` — „Magnum Opus” (z Google Docs).

## Skąd są pliki

Pliki pochodzą z Dysku Google (`TTRPG u Kanii → D&D` oraz dokumenty „Krąg Cieni - …”).

- Pliki HTML, PDF, PNG, JPG, WEBP i DOCX są skopiowane bajt w bajt, pod oryginalnymi nazwami.
- Dokumenty Google (`Jack - Vulpin`, `Magnum Opus`, `birdfolk_architektura_v2`, `Krąg Cieni - Kania`, `Krąg Cieni - S. Stacjo - Obremont`) zostały 26.10.2026 wyeksportowane do PDF (do czytania) i DOCX (do edycji). Jeśli dokument na Dysku się zmieni, trzeba wyeksportować go ponownie i podmienić oba pliki.

## Jak dodać nowy plik

1. Wrzuć plik do folderu postaci, np. `postacie/jack-leothern/`.
2. Na stronie postaci (`postacie/jack-leothern/index.html`) znajdź sekcję „Archiwum” i skopiuj jedną pozycję listy.
3. Podmień nazwę i adres. Spacje w adresie zapisuj jako `%20`, np. `Nowy%20plik.pdf`.

Nową postać dodasz, kopiując folder jednej z postaci, podmieniając treść strony i dopisując kartę w `index.html`. Miniaturę portretu (ok. 720 px, WEBP) wrzuć do `assets/miniatury/`, większą kopię do `assets/portrety/`.

## Publikacja na GitHub Pages

Settings → Pages → Build and deployment → Source: **Deploy from a branch**, Branch: **main**, folder **/ (root)** → Save. Strona jest pod adresem `https://v-cancrosa.github.io/V_Cancrosa-TTRPG/`.

Plik `.nojekyll` wyłącza przetwarzanie przez Jekyll, dzięki czemu wszystkie pliki trafiają na stronę bez zmian.

Repozytorium jest publiczne, więc strona i wszystkie pliki są widoczne dla każdego, kto ma link.
