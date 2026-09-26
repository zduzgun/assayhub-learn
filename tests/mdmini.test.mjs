// mdmini.js birim testleri: node --test tests/
import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const M = require('../assets-src/mdmini.js');

test('tohumlu üreteç tekrar üretilebilir', () => {
  const a = M.createRng(42), b = M.createRng(42), c = M.createRng(43);
  const sa = [a.next(), a.next(), a.normal()], sb = [b.next(), b.next(), b.normal()];
  assert.deepEqual(sa, sb);
  assert.notEqual(sa[0], c.next());
  for (let i = 0; i < 1000; i++) { const u = a.next(); assert.ok(u >= 0 && u < 1); }
});

test('minimum görüntü, 9 görüntünün en kısasına eşit', () => {
  const r = M.createRng(1), L = 7.3;
  for (let k = 0; k < 500; k++) {
    const dx = (r.next() - 0.5) * 3 * L, dy = (r.next() - 0.5) * 3 * L;
    const [mx, my] = M.minImage(dx, dy, L);
    let best = Infinity;
    for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) best = Math.min(best, Math.hypot(dx + i * L, dy + j * L));
    assert.ok(Math.abs(Math.hypot(mx, my) - best) < 1e-12);
    assert.ok(Math.abs(mx) <= L / 2 + 1e-12 && Math.abs(my) <= L / 2 + 1e-12);
  }
});

test('komşu listesi kurulduğu anda kaba kuvvet çiftlerini içerir', () => {
  const s = M.createSystem({ N: 144, rho: 0.7, T0: 1.0, seed: 7, rc: 2.5, skin: 0.5, nstlist: 10 });
  s.step(57); // yeniden kurulumdan 7 adım sonra: yeterli deri, rc içindeki bütün çiftleri hâlâ kapsamalı
  const brute = s.brutePairs(), list = s.listPairsWithin();
  assert.equal(list.size, brute.size);
  for (const p of brute) assert.ok(list.has(p));
});

test('NVE: toplam enerji dalgalanması kinetik enerjininkinden çok küçük (kaydırılmış potansiyel)', () => {
  const s = M.createSystem({ N: 100, rho: 0.6, T0: 1.0, seed: 3, rc: 2.5, shift: true, skin: 0.4, nstlist: 10, dt: 0.004 });
  s.step(200);
  const E = [], K = [];
  for (let i = 0; i < 100; i++) { s.step(20); const e = s.energies(); E.push(e.total); K.push(e.ke); }
  const sd = (a) => { const m = a.reduce((x, y) => x + y) / a.length; return Math.sqrt(a.reduce((x, y) => x + (y - m) ** 2, 0) / a.length); };
  assert.ok(sd(E) < 0.05 * sd(K), `sd(E)=${sd(E)} sd(K)=${sd(K)}`);
});

test('düz kesmede izlenen toplam enerji daha çok dalgalanır (yörünge aynı; fark enerji tanımında)', () => {
  const run = (shift) => { const s = M.createSystem({ N: 100, rho: 0.6, T0: 1.0, seed: 3, rc: 1.5, shift, skin: 0.4, nstlist: 10, dt: 0.004 }); s.step(200); const E = []; for (let i = 0; i < 100; i++) { s.step(20); E.push(s.energies().total); } const m = E.reduce((a, b) => a + b) / E.length; return Math.sqrt(E.reduce((a, b) => a + (b - m) ** 2, 0) / E.length); };
  assert.ok(run(false) > 2 * run(true));
});

test('periyodik kutuda momentum korunur', () => {
  const s = M.createSystem({ N: 100, rho: 0.6, T0: 1.2, seed: 5 });
  s.step(500);
  const [px, py] = s.momentum();
  assert.ok(Math.abs(px) < 1e-9 && Math.abs(py) < 1e-9);
});

test('duvarlı kutuda parçacıklar kutunun içinde kalır, duvardan yansır ve enerji korunur', () => {
  const s = M.createSystem({ N: 64, rho: 0.5, T0: 2.0, seed: 9, pbc: false, dt: 0.002 });
  const e0 = s.energies().total;
  s.step(2000);
  for (let i = 0; i < s.N; i++) { assert.ok(s.x[2 * i] >= 0 && s.x[2 * i] <= s.L); assert.ok(s.x[2 * i + 1] >= 0 && s.x[2 * i + 1] <= s.L); }
  assert.ok(s.stats.wallHits > 0);
  assert.ok(Math.abs(s.energies().total - e0) / s.N < 0.05, 'yansıma hızı tersine çevirmezse enerji korunmaz');
});

test('deri yetersiz ve liste seyrek yenilenirse etkileşim kaçar; yeterliyse kaçmaz', () => {
  const bad = M.createSystem({ N: 144, rho: 0.7, T0: 1.5, seed: 11, skin: 0.0, nstlist: 20, diagnose: true });
  bad.step(400);
  assert.ok(bad.stats.missed > 0);
  const good = M.createSystem({ N: 144, rho: 0.7, T0: 1.5, seed: 11, skin: 0.5, nstlist: 10, diagnose: true });
  good.step(400);
  assert.equal(good.stats.missed, 0);
  assert.ok(good.stats.pairEvals < 400 * 144 * 143 / 2);
});

test('aynı tohum, aynı yörünge', () => {
  const a = M.createSystem({ N: 64, rho: 0.6, T0: 1, seed: 21 }), b = M.createSystem({ N: 64, rho: 0.6, T0: 1, seed: 21 });
  a.step(300); b.step(300);
  assert.deepEqual(Array.from(a.x), Array.from(b.x));
});

test('serbestlik derecesi: PBC 2N-2, duvar 2N; sıcaklık 2K/dof', () => {
  const s = M.createSystem({ N: 100, rho: 0.6, T0: 1.3, seed: 2 });
  const w = M.createSystem({ N: 100, rho: 0.6, T0: 1.3, seed: 2, pbc: false });
  assert.equal(s.dof, 198); assert.equal(w.dof, 200);
  let ke = 0; for (let k = 0; k < 200; k++) ke += 0.5 * s.v[k] * s.v[k];
  assert.ok(Math.abs(s.energies().T - 2 * ke / 198) < 1e-12 && Math.abs(s.energies().T - 1.3) < 1e-9);
});

test('başlangıç kafesi: kare olmayan N ve yüksek yoğunlukta da parçacıklar üst üste binmez', () => {
  for (const N of [101, 150, 399]) {
    const s = M.createSystem({ N, rho: 1.0, T0: 1, seed: 1 });
    let dmin = Infinity;
    for (let i = 0; i < N - 1; i++) for (let j = i + 1; j < N; j++) { const [dx, dy] = M.minImage(s.x[2 * j] - s.x[2 * i], s.x[2 * j + 1] - s.x[2 * i + 1], s.L); dmin = Math.min(dmin, Math.hypot(dx, dy)); }
    assert.ok(dmin > 0.9, `N=${N} dmin=${dmin}`);
  }
});

test('tohum 0 ile tohum 1 farklı dizi verir', () => {
  assert.notEqual(M.createRng(0).next(), M.createRng(1).next());
});

test('1B iyon zinciri: doğrudan toplam 2 ln 2 ye yakınsar; Ewald ayrışımı 1/r yi verir', () => {
  const exact = 2 * Math.log(2);
  assert.ok(Math.abs(M.chainDirectSum(10000) - exact) < 2e-4);
  assert.ok(Math.abs(M.chainDirectSum(10) - exact) > 0.05);
  for (const r of [0.3, 1, 2.5]) { const e = M.ewaldSplit(r, 1.2); assert.ok(Math.abs(e.real + e.recip - 1 / r) < 1e-6); }
  assert.ok(Math.abs(M.erf(0.5) - 0.5204998778) < 2e-7);
});

test('potansiyel kaydırma kuvveti değiştirmez: aynı tohumla düz ve kaydırılmış koşular aynı yörüngeyi verir', () => {
  const a = M.createSystem({ N: 100, rho: 0.6, T0: 1, seed: 4, rc: 1.5, shift: true });
  const b = M.createSystem({ N: 100, rho: 0.6, T0: 1, seed: 4, rc: 1.5, shift: false });
  a.step(500); b.step(500);
  assert.deepEqual(Array.from(a.x), Array.from(b.x));
  assert.notEqual(a.energies().pe, b.energies().pe);
});
