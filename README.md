# Krąg Cieni

Archiwum kampanii D&D 5e „Krąg Cieni”: postacie, notatki z sesji i materiały o świecie. Strona jest statyczna i działa na GitHub Pages bez budowania.

## Co gdzie jest

- `index.html` to strona główna z kartami postaci i linkami do wszystkich plików.
- `assets/styl.css` odpowiada za wygląd strony głównej (jasny i ciemny motyw według ustawień urządzenia).
- `assets/miniatury/` zawiera lekkie miniatury portretów używane na stronie głównej. Oryginały leżą w folderach postaci.
- `postacie/<postać>/` zawiera wszystkie pliki danej postaci: dossier w HTML, PDF-y i grafiki.
- `sesje/` zawiera notatki z sesji.
- `swiat/` zawiera Whitewood i architekturę języka Birdfolk.

| Folder | Postać |
| --- | --- |
| `postacie/jack-leothern` | Jack [Leothern]: Vulpin, Monk (Open Hand), postać główna |
| `postacie/fretka-auri` | Fretka [Auri]: Ragborn, Wild Magic Sorcerer, postać zapasowa |
| `postacie/welian-sink` | Welian [Legion] Sink: Plazmoid, Soul Knife |
| `postacie/durgan-vundrakkun` | Dûrgan Vundrakkûn: krasnolud |
| `postacie/opi` | Opus „Opi”: Autognom, Mag |
| `postacie/fusk-yaki` | Fusk [Yaki]: Hadozee, Warlock |

## Skąd są pliki

Pliki pochodzą z Dysku Google (`TTRPG u Kanii → D&D` oraz dokumenty „Krąg Cieni - …”).

- Pliki HTML, PDF, PNG, JPG, WEBP i DOCX są skopiowane bajt w bajt, pod oryginalnymi nazwami.
- Dokumenty Google (`Jack - Vulpin`, `Magnum Opus`, `birdfolk_architektura_v2`, `Krąg Cieni - Kania`, `Krąg Cieni - S. Stacjo - Obremont`) zostały 26.10.2026 wyeksportowane do PDF (do czytania) i DOCX (do edycji). Jeśli dokument na Dysku się zmieni, trzeba wyeksportować go ponownie i podmienić oba pliki.

## Jak dodać nowy plik

1. Wrzuć plik do folderu postaci, np. `postacie/jack-leothern/`.
2. W `index.html` znajdź kartę tej postaci (`<article class="postac" id="jack-leothern">`) i skopiuj jedną linię `<li>…</li>` z listy plików.
3. Podmień nazwę i adres. Spacje w adresie zapisuj jako `%20`, np. `postacie/jack-leothern/Nowy%20plik.pdf`.

Nową postać dodasz, kopiując cały blok `<article class="postac">…</article>` i podmieniając treść. Miniaturę portretu (ok. 720 px, WEBP) wrzuć do `assets/miniatury/`.

## Publikacja na GitHub Pages

Settings → Pages → Build and deployment → Source: **Deploy from a branch**, Branch: **main**, folder **/ (root)** → Save. Po minucie lub dwóch strona będzie pod adresem `https://v-cancrosa.github.io/V_Cancrosa-TTRPG/`.

Plik `.nojekyll` wyłącza przetwarzanie przez Jekyll, dzięki czemu wszystkie pliki trafiają na stronę bez zmian.

Repozytorium jest publiczne, więc strona i wszystkie pliki są widoczne dla każdego, kto ma link.
