/* mdmini.js 0.1.1 · AssayHub Learn ortak mini-MD motoru (2B Lennard-Jones, indirgenmiş birimler: sigma = epsilon = m = kB = 1).
   Tarayıcıda ve Node'da çalışır. Testler: tests/mdmini.test.mjs. Lisans: sitenin içerik lisansıyla aynı. */
(function (root) {
  'use strict';
  var VERSION = '0.1.1';

  function createRng(seed) {
    // mulberry32: küçük, hızlı, tohumlu; kriptografik değildir
    var a = ((seed >>> 0) ^ 0x9E3779B9) >>> 0, spare = null; // 0 tohumu da ayrı bir dizi verir
    function next() {
      a = (a + 0x6D2B79F5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    function normal() {
      if (spare !== null) { var s = spare; spare = null; return s; }
      var u, v, q;
      do { u = 2 * next() - 1; v = 2 * next() - 1; q = u * u + v * v; } while (q >= 1 || q === 0);
      var m = Math.sqrt(-2 * Math.log(q) / q);
      spare = v * m;
      return u * m;
    }
    return { next: next, normal: normal };
  }

  function minImage(dx, dy, L) {
    dx -= L * Math.round(dx / L);
    dy -= L * Math.round(dy / L);
    return [dx, dy];
  }

  function erf(x) {
    // Abramowitz ve Stegun 7.1.26 (mutlak hata < 1.5e-7)
    var s = x < 0 ? -1 : 1; x = Math.abs(x);
    var t = 1 / (1 + 0.3275911 * x);
    var y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
    return s * y;
  }

  function ewaldSplit(r, beta) {
    var e = erf(beta * r);
    return { real: (1 - e) / r, recip: e / r };
  }

  function chainDirectSum(n) {
    // Tek boyutlu, aralığı 1 olan +/− iyon zincirinde bir iyonun Madelung toplamı (iki yön): sum 2(−1)^(k+1)/k, k = 1..n
    var s = 0;
    for (var k = 1; k <= n; k++) s += 2 * (k % 2 ? 1 : -1) / k;
    return s;
  }

  function createSystem(o) {
    o = o || {};
    var N = o.N || 100, rho = o.rho || 0.6, T0 = o.T0 != null ? o.T0 : 1.0, seed = o.seed != null ? o.seed : 1;
    var rc = o.rc || 2.5, shift = o.shift !== false, pbc = o.pbc !== false, skin = o.skin != null ? o.skin : 0.3;
    var nstlist = o.nstlist || 10, dt = o.dt || 0.004, useList = o.useList !== false, diagnose = !!o.diagnose;
    var L = o.L || Math.sqrt(N / rho);
    if (pbc && rc > L / 2) throw new Error('kesme mesafesi kutunun yarısından büyük olamaz');
    var rng = createRng(seed);
    var x = new Float64Array(2 * N), v = new Float64Array(2 * N), f = new Float64Array(2 * N);
    var n1 = Math.ceil(Math.sqrt(N)), a = L / n1;
    for (var i = 0; i < N; i++) { x[2 * i] = (i % n1 + 0.5) * a; x[2 * i + 1] = (Math.floor(i / n1) + 0.5) * a; }
    var px = 0, py = 0;
    for (i = 0; i < 2 * N; i++) v[i] = rng.normal();
    for (i = 0; i < N; i++) { px += v[2 * i]; py += v[2 * i + 1]; }
    for (i = 0; i < N; i++) { v[2 * i] -= px / N; v[2 * i + 1] -= py / N; }
    var dof = pbc ? 2 * N - 2 : 2 * N;
    var ke0 = 0; for (i = 0; i < 2 * N; i++) ke0 += 0.5 * v[i] * v[i];
    var sc = Math.sqrt(T0 * dof / 2 / ke0); for (i = 0; i < 2 * N; i++) v[i] *= sc;
    var rc2 = rc * rc, ir6c = 1 / (rc2 * rc2 * rc2), ushift = shift ? 4 * (ir6c * ir6c - ir6c) : 0;
    var list = [], pe = 0, stepCount = 0;
    var stats = { pairEvals: 0, rebuilds: 0, missed: 0, wallHits: 0 };

    function dxy(i, j) {
      var dx = x[2 * j] - x[2 * i], dy = x[2 * j + 1] - x[2 * i + 1];
      if (pbc) { dx -= L * Math.round(dx / L); dy -= L * Math.round(dy / L); }
      return [dx, dy];
    }
    function buildList() {
      var rl = rc + skin, rl2 = rl * rl, out = [];
      for (var i = 0; i < N - 1; i++) for (var j = i + 1; j < N; j++) {
        var d = dxy(i, j); if (d[0] * d[0] + d[1] * d[1] < rl2) out.push(i, j);
      }
      list = out; stats.rebuilds++;
    }
    function forces() {
      f.fill(0); pe = 0;
      var inList = diagnose ? new Set() : null, cnt = 0;
      function pair(i, j) {
        var d = dxy(i, j), r2 = d[0] * d[0] + d[1] * d[1];
        cnt++;
        if (r2 >= rc2) return;
        if (inList) inList.add(i * N + j);
        var ir2 = 1 / r2, ir6 = ir2 * ir2 * ir2, ff = 24 * ir2 * ir6 * (2 * ir6 - 1);
        pe += 4 * ir6 * (ir6 - 1) - ushift;
        f[2 * i] -= ff * d[0]; f[2 * i + 1] -= ff * d[1]; f[2 * j] += ff * d[0]; f[2 * j + 1] += ff * d[1];
      }
      if (useList) { for (var k = 0; k < list.length; k += 2) pair(list[k], list[k + 1]); }
      else { for (var i = 0; i < N - 1; i++) for (var j = i + 1; j < N; j++) pair(i, j); }
      stats.pairEvals += cnt;
      if (diagnose && useList) {
        for (var p = 0; p < N - 1; p++) for (var q = p + 1; q < N; q++) {
          var d = dxy(p, q); if (d[0] * d[0] + d[1] * d[1] < rc2 && !inList.has(p * N + q)) stats.missed++;
        }
      }
    }
    function walls() {
      if (pbc) return;
      for (var k = 0; k < 2 * N; k++) {
        if (x[k] < 0) { x[k] = -x[k]; v[k] = -v[k]; stats.wallHits++; }
        else if (x[k] > L) { x[k] = 2 * L - x[k]; v[k] = -v[k]; stats.wallHits++; }
      }
    }
    function wrap() { if (pbc) for (var k = 0; k < 2 * N; k++) x[k] -= L * Math.floor(x[k] / L); }

    if (useList) buildList();
    forces();

    function step(n) {
      n = n || 1;
      for (var s = 0; s < n; s++) {
        for (var k = 0; k < 2 * N; k++) { v[k] += 0.5 * dt * f[k]; x[k] += dt * v[k]; }
        walls(); wrap();
        stepCount++;
        if (useList && stepCount % nstlist === 0) buildList();
        forces();
        for (k = 0; k < 2 * N; k++) v[k] += 0.5 * dt * f[k];
      }
    }
    function energies() {
      var ke = 0; for (var k = 0; k < 2 * N; k++) ke += 0.5 * v[k] * v[k];
      return { ke: ke, pe: pe, total: ke + pe, T: 2 * ke / dof };
    }
    function momentum() { var a = 0, b = 0; for (var i = 0; i < N; i++) { a += v[2 * i]; b += v[2 * i + 1]; } return [a, b]; }
    function brutePairs() {
      var s = new Set();
      for (var i = 0; i < N - 1; i++) for (var j = i + 1; j < N; j++) { var d = dxy(i, j); if (d[0] * d[0] + d[1] * d[1] < rc2) s.add(i + '-' + j); }
      return s;
    }
    function listPairsWithin() {
      var s = new Set();
      for (var k = 0; k < list.length; k += 2) { var d = dxy(list[k], list[k + 1]); if (d[0] * d[0] + d[1] * d[1] < rc2) s.add(list[k] + '-' + list[k + 1]); }
      return s;
    }
    function surfaceFraction(width) {
      // duvara 'width' mesafeden yakın parçacıkların payı (duvarlı kutuda yüzey etkisinin ölçüsü)
      var c = 0;
      for (var i = 0; i < N; i++) { var X = x[2 * i], Y = x[2 * i + 1]; if (Math.min(X, Y, L - X, L - Y) < width) c++; }
      return c / N;
    }
    return {
      N: N, L: L, rc: rc, dt: dt, x: x, v: v, f: f, stats: stats, pbc: pbc, shift: shift, skin: skin, nstlist: nstlist, seed: seed, dof: dof,
      step: step, energies: energies, momentum: momentum, brutePairs: brutePairs, listPairsWithin: listPairsWithin,
      surfaceFraction: surfaceFraction, get steps() { return stepCount; }, get listLength() { return list.length / 2; }
    };
  }

  var api = { VERSION: VERSION, createRng: createRng, createSystem: createSystem, minImage: minImage, erf: erf, ewaldSplit: ewaldSplit, chainDirectSum: chainDirectSum };
  root.MDMini = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
