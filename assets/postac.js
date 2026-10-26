/* Krąg Cieni — wspólny skrypt stron postaci: pamięć w przeglądarce, rzuty kośćmi,
   wjazd sekcji i galeria w powiększeniu. Dodatki konkretnej postaci są na jej stronie. */
(function () {
  'use strict';

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Zapis w przeglądarce bywa zablokowany (tryb prywatny) — wtedy strona działa bez pamięci.
  var store = {
    get: function (klucz, domyslnie) {
      try {
        var v = window.localStorage.getItem(klucz);
        return v === null ? domyslnie : JSON.parse(v);
      } catch (e) { return domyslnie; }
    },
    set: function (klucz, wartosc) {
      try { window.localStorage.setItem(klucz, JSON.stringify(wartosc)); } catch (e) { /* bez pamięci */ }
    }
  };

  function roll(scianki) {
    if (window.crypto && window.crypto.getRandomValues) {
      var a = new Uint32Array(1);
      window.crypto.getRandomValues(a);
      return 1 + (a[0] % scianki);
    }
    return 1 + Math.floor(Math.random() * scianki);
  }

  function wybierz(lista) { return lista[roll(lista.length) - 1]; }

  window.Krag = { reduce: reduce, store: store, roll: roll, wybierz: wybierz };

  // Wjazd sekcji
  var wjazdy = document.querySelectorAll('.wjazd');
  if (reduce || !('IntersectionObserver' in window)) {
    wjazdy.forEach(function (el) { el.classList.add('widoczne'); });
  } else {
    var io = new IntersectionObserver(function (wpisy) {
      wpisy.forEach(function (w) {
        if (w.isIntersecting) { w.target.classList.add('widoczne'); io.unobserve(w.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    wjazdy.forEach(function (el) { io.observe(el); });
  }

  // Galeria: <a href="oryginał" data-galeria="grupa" data-duzy="podgląd.webp" data-podpis="...">
  var linki = Array.prototype.slice.call(document.querySelectorAll('a[data-galeria]'));
  if (!linki.length) return;

  var lb = document.createElement('div');
  lb.className = 'lb';
  lb.hidden = true;
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.setAttribute('aria-label', 'Galeria');
  lb.innerHTML =
    '<div class="lb-gora"><span class="lb-licznik"></span><button type="button" class="lb-x" aria-label="Zamknij">×</button></div>' +
    '<figure><img alt=""></figure>' +
    '<div class="lb-dol"><span class="lb-podpis"></span><a class="lb-org" href="#">Otwórz oryginał</a></div>' +
    '<button type="button" class="lb-poprz" aria-label="Poprzednia grafika">‹</button>' +
    '<button type="button" class="lb-nast" aria-label="Następna grafika">›</button>';
  document.body.appendChild(lb);

  var img = lb.querySelector('img');
  var podpis = lb.querySelector('.lb-podpis');
  var licznik = lb.querySelector('.lb-licznik');
  var org = lb.querySelector('.lb-org');
  var grupa = [], indeks = 0, powrot = null;

  function pokaz(i) {
    indeks = (i + grupa.length) % grupa.length;
    var a = grupa[indeks];
    img.src = a.getAttribute('data-duzy') || a.href;
    img.alt = a.getAttribute('data-podpis') || '';
    podpis.textContent = a.getAttribute('data-podpis') || '';
    org.href = a.href;
    licznik.textContent = (indeks + 1) + ' / ' + grupa.length;
  }

  function otworz(a) {
    var nazwa = a.getAttribute('data-galeria');
    grupa = linki.filter(function (l) { return l.getAttribute('data-galeria') === nazwa; });
    if (grupa.length < 2) lb.setAttribute('data-jeden', ''); else lb.removeAttribute('data-jeden');
    powrot = a;
    pokaz(grupa.indexOf(a));
    lb.hidden = false;
    document.body.classList.add('lb-blokada');
    requestAnimationFrame(function () { lb.classList.add('otwarte'); });
    lb.querySelector('.lb-x').focus();
  }

  function zamknij() {
    lb.classList.remove('otwarte');
    document.body.classList.remove('lb-blokada');
    setTimeout(function () { lb.hidden = true; img.removeAttribute('src'); }, reduce ? 0 : 250);
    if (powrot) powrot.focus();
  }

  linki.forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      otworz(a);
    });
  });

  lb.querySelector('.lb-x').addEventListener('click', zamknij);
  lb.querySelector('.lb-poprz').addEventListener('click', function () { pokaz(indeks - 1); });
  lb.querySelector('.lb-nast').addEventListener('click', function () { pokaz(indeks + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.tagName === 'FIGURE') zamknij(); });

  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') zamknij();
    else if (e.key === 'ArrowLeft' && grupa.length > 1) pokaz(indeks - 1);
    else if (e.key === 'ArrowRight' && grupa.length > 1) pokaz(indeks + 1);
    else if (e.key === 'Tab') {
      var f = Array.prototype.slice.call(lb.querySelectorAll('button, a')).filter(function (el) { return el.offsetParent !== null; });
      var i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });

  var startX = null;
  lb.addEventListener('pointerdown', function (e) { startX = e.clientX; });
  lb.addEventListener('pointerup', function (e) {
    if (startX === null || grupa.length < 2) return;
    var dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 50) pokaz(indeks + (dx < 0 ? 1 : -1));
  });
})();
