/* Jack Leothern — dodatki: imię prawdziwe, liście brzozy, struny G·D·A·E, licznik ki. */
(function () {
  'use strict';
  var K = window.Krag;

  /* Imię prawdziwe — wypowiadane cicho */
  var tn = document.querySelector('.true-name');
  var btn = tn && tn.querySelector('.wypowiedz');
  if (btn) {
    btn.addEventListener('click', function () {
      var on = !tn.classList.contains('wypowiedziane');
      tn.classList.toggle('wypowiedziane', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.textContent = on ? 'zamilknij' : 'wypowiedz cicho';
    });
  }

  /* Liście brzozy */
  var liscie = document.querySelector('.liscie');
  if (liscie && !K.reduce) {
    var kolory = ['#c9b458', '#d6c46a', '#b9a24a', '#a8a35a', '#d9b45c'];
    for (var i = 0; i < 9; i++) {
      var l = document.createElement('span');
      l.className = 'lisc';
      l.style.left = (5 + Math.random() * 90) + '%';
      l.style.animationDuration = (11 + Math.random() * 10) + 's';
      l.style.animationDelay = (-Math.random() * 20) + 's';
      l.style.setProperty('--dryf', (Math.random() * 160 - 60) + 'px');
      l.style.setProperty('--obrot', (Math.random() * 520 - 260) + 'deg');
      var s = 0.6 + Math.random() * 0.6;
      l.style.width = (18 * s) + 'px';
      l.style.height = (26 * s) + 'px';
      l.innerHTML = '<svg viewBox="0 0 18 26" style="animation-duration:' + (2 + Math.random() * 2).toFixed(2) + 's">' +
        '<path d="M9 1 C15 6 17 12 15 18 C13 22 11 24 9 25 C7 24 5 22 3 18 C1 12 3 6 9 1 Z" fill="' + kolory[i % kolory.length] + '"/>' +
        '<path d="M9 3 L9 25" stroke="#8a7a3a" stroke-width=".7" opacity=".6"/></svg>';
      liscie.appendChild(l);
    }
  }

  /* Dźwięk strun (Karplus–Strong), włączany przyciskiem */
  var ctx = null;
  var dzwiek = K.store.get('krag.jack.dzwiek', false);
  var bufory = {};

  function audio() {
    if (!ctx) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function bufor(c, f) {
    var klucz = f.toFixed(2);
    if (bufory[klucz]) return bufory[klucz];
    var sr = c.sampleRate, n = Math.max(2, Math.round(sr / f)), dl = Math.floor(sr * (f < 120 ? 3.2 : 2.2));
    var b = c.createBuffer(1, dl, sr), d = b.getChannelData(0), r = new Float32Array(n);
    for (var i = 0; i < n; i++) r[i] = Math.random() * 2 - 1;
    var t = f < 120 ? 0.9985 : 0.996, j = 0;
    for (var k = 0; k < dl; k++) {
      var a = r[j], nx = r[(j + 1) % n];
      d[k] = a;
      r[j] = (a + nx) * 0.5 * t;
      j = (j + 1) % n;
    }
    bufory[klucz] = b;
    return b;
  }

  function szarpnij(freq, glosnosc) {
    if (!dzwiek) return;
    var c = audio();
    if (!c) return;
    var src = c.createBufferSource(), g = c.createGain(), lp = c.createBiquadFilter();
    src.buffer = bufor(c, freq);
    lp.type = 'lowpass';
    lp.frequency.value = freq < 120 ? 900 : 3800;
    g.gain.value = glosnosc || 0.22;
    src.connect(lp); lp.connect(g); g.connect(c.destination);
    src.start();
  }

  // Skrzypce G3 D4 A4 E5; kontrabas E1 A1 D2 G2 — lustrzane: G↔G, D↔D, A↔A, E↔E
  var SKRZYPCE = [196.00, 293.66, 440.00, 659.26];
  var KONTRABAS = [98.00, 73.42, 55.00, 41.20];

  function drgaj(el) {
    el.classList.remove('drga');
    void el.offsetWidth;
    el.classList.add('drga');
  }

  /* Separatory: najechanie kursorem szarpie strunę */
  document.querySelectorAll('.strings').forEach(function (sep) {
    var struny = sep.querySelectorAll('.s');
    var bas = sep.classList.contains('strings--bass');
    struny.forEach(function (s, i) {
      s.addEventListener('pointerenter', function () {
        drgaj(s);
        szarpnij(bas ? KONTRABAS[3 - i] : SKRZYPCE[i], 0.12);
      });
    });
  });

  /* Instrument */
  var gryf = document.querySelector('.gryf');
  var przelDzwiek = document.querySelector('[data-dzwiek]');
  var przelGrube = document.querySelector('[data-grube]');

  function ustawDzwiek(on) {
    dzwiek = on;
    K.store.set('krag.jack.dzwiek', on);
    if (przelDzwiek) {
      przelDzwiek.setAttribute('aria-pressed', on ? 'true' : 'false');
      przelDzwiek.textContent = on ? 'Dźwięk: włączony' : 'Dźwięk: wyłączony';
    }
  }
  if (przelDzwiek) {
    ustawDzwiek(dzwiek);
    przelDzwiek.addEventListener('click', function () { ustawDzwiek(!dzwiek); if (dzwiek) audio(); });
  }

  if (gryf) {
    var grube = K.store.get('krag.jack.grube', false);
    var ustawGrube = function (on) {
      grube = on;
      gryf.classList.toggle('grube', on);
      przelGrube.setAttribute('aria-pressed', on ? 'true' : 'false');
      K.store.set('krag.jack.grube', on);
    };
    ustawGrube(grube);
    przelGrube.addEventListener('click', function () { ustawGrube(!grube); });

    var struny = Array.prototype.slice.call(gryf.querySelectorAll('.struna'));
    var graj = function (i) {
      drgaj(struny[i]);
      szarpnij(SKRZYPCE[i], 0.2);
      if (grube) szarpnij(KONTRABAS[i], 0.32);
    };
    var ostatnia = -1, wcisniete = false;
    var ktora = function (y) {
      for (var i = 0; i < struny.length; i++) {
        var r = struny[i].getBoundingClientRect();
        if (y >= r.top && y <= r.bottom) return i;
      }
      return -1;
    };
    gryf.addEventListener('pointerdown', function (e) {
      if (!dzwiek) ustawDzwiek(true);
      wcisniete = true;
      gryf.setPointerCapture(e.pointerId);
      ostatnia = ktora(e.clientY);
      if (ostatnia >= 0) graj(ostatnia);
    });
    gryf.addEventListener('pointermove', function (e) {
      if (!wcisniete) return;
      var i = ktora(e.clientY);
      if (i >= 0 && i !== ostatnia) { ostatnia = i; graj(i); }
    });
    var pusc = function () { wcisniete = false; ostatnia = -1; };
    gryf.addEventListener('pointerup', pusc);
    gryf.addEventListener('pointercancel', pusc);
    struny.forEach(function (s, i) {
      s.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!dzwiek) ustawDzwiek(true); graj(i); }
      });
    });
  }

  /* Licznik ki */
  var ki = document.querySelector('.ki');
  if (ki) {
    var sel = ki.querySelector('select');
    var pule = ki.querySelector('.ki-pule');
    var licz = ki.querySelector('.ki-licznik');
    var staty = ki.querySelector('.ki-staty');
    var wynik = ki.querySelector('.wynik');
    var stan = K.store.get('krag.jack.ki', { poziom: 5, zuzyte: 0 });

    var PB = function (p) { return 2 + Math.floor((p - 1) / 4); };
    var MA = function (p) { return p >= 17 ? 10 : p >= 11 ? 8 : p >= 5 ? 6 : 4; };
    var RUCH = function (p) { return p >= 18 ? 30 : p >= 14 ? 25 : p >= 10 ? 20 : p >= 6 ? 15 : p >= 2 ? 10 : 0; };
    var WIS = 2, DEX = 2;

    for (var p = 1; p <= 20; p++) {
      var o = document.createElement('option');
      o.value = p; o.textContent = 'Poziom ' + p;
      sel.appendChild(o);
    }

    var zapisz = function () { K.store.set('krag.jack.ki', stan); };

    var rysuj = function () {
      var p = stan.poziom, max = p >= 2 ? p : 0;
      stan.zuzyte = Math.min(stan.zuzyte, max);
      var wolne = max - stan.zuzyte;
      sel.value = p;
      staty.innerHTML =
        '<span>PB <b>+' + PB(p) + '</b></span>' +
        '<span>Ki DC <b>' + (8 + PB(p) + WIS) + '</b></span>' +
        '<span>Martial Arts <b>1d' + MA(p) + '</b></span>' +
        '<span>Ruch bez zbroi <b>+' + RUCH(p) + ' ft</b></span>';
      pule.innerHTML = '';
      for (var i = 0; i < max; i++) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'pula' + (i >= wolne ? ' zuzyta' : '');
        b.setAttribute('aria-label', 'Punkt ki ' + (i + 1) + (i >= wolne ? ' (zużyty)' : ''));
        (function (idx) {
          b.addEventListener('click', function () {
            stan.zuzyte = idx >= wolne ? max - idx - 1 : max - idx;
            zapisz(); rysuj();
          });
        })(i);
        pule.appendChild(b);
      }
      licz.textContent = max ? 'Ki: ' + wolne + ' / ' + max : 'Ki pojawia się na 2. poziomie';
      ki.querySelectorAll('.akcja').forEach(function (a) {
        var od = +a.getAttribute('data-od');
        a.disabled = p < od;
        a.title = p < od ? 'Od poziomu ' + od : '';
      });
    };

    sel.addEventListener('change', function () { stan.poziom = +sel.value; zapisz(); rysuj(); });

    ki.querySelectorAll('.akcja').forEach(function (a) {
      a.addEventListener('click', function () {
        var koszt = +a.getAttribute('data-koszt');
        var max = stan.poziom >= 2 ? stan.poziom : 0;
        if (max - stan.zuzyte < koszt) {
          a.classList.remove('brak'); void a.offsetWidth; a.classList.add('brak');
          wynik.innerHTML = 'Za mało ki. <span class="maly">Odpocznij albo wybierz coś tańszego.</span>';
          return;
        }
        stan.zuzyte += koszt;
        zapisz(); rysuj();
        wynik.innerHTML = a.getAttribute('data-nazwa') + ' <span class="maly">−' + koszt + ' ki</span>';
      });
    });

    ki.querySelector('.odpocznij').addEventListener('click', function () {
      stan.zuzyte = 0; zapisz(); rysuj();
      wynik.innerHTML = 'Ki odnowione <span class="maly">krótki odpoczynek · 30 min medytacji</span>';
    });

    ki.querySelector('.rzut').addEventListener('click', function () {
      var p = stan.poziom, k1 = K.roll(20), k2 = K.roll(MA(p));
      var traf = k1 + PB(p) + DEX;
      wynik.innerHTML = 'Pazury: trafienie <b>' + traf + '</b>' + (k1 === 20 ? ' (krytyk!)' : k1 === 1 ? ' (pudło)' : '') +
        ' · obrażenia <b>' + (k2 + DEX) + '</b> <span class="maly">d20 ' + k1 + ' +' + (PB(p) + DEX) + ' · 1d' + MA(p) + ' ' + k2 + ' +' + DEX + ' slashing</span>';
    });

    rysuj();
  }
})();
