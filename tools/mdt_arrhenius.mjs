// MD-T Lab 1 defterinin "beklenen eğim" değerlerini yeniden üretir: sayfadaki Langevin modeliyle (BAOAB, Δt 0,5 fs,
// sürtünme 10 ps⁻¹, 300 K, U = E_b((x/0,5 Å)² − 1)²) her kütle için 8, 11, 14, 17 kJ/mol bariyerlerde geçiş sayar ve
// ln(ns başına geçiş) ile E_b arasındaki doğrunun eğiminden "e kat azaltan bariyer artışını" (−1/eğim) verir.
// Kullanım: node tools/mdt_arrhenius.mjs [ns_per_barrier=40]   Çıktı: JSON
const X0 = 0.5, DT = 0.5, GAM = 0.01, KT = 0.0083144626 * 300;
function rng(s) { return function () { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function gauss(r) { const u = r() || 1e-12, v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
const F = (x, Eb) => { const q = x / X0; return -4 * Eb * x * (q * q - 1) / (X0 * X0); };
function runNs(m, Eb, seed) {
  const r = rng(seed), c1 = Math.exp(-GAM * DT), c2 = Math.sqrt((1 - c1 * c1) * KT / m * 1e-4);
  let x = -X0, v = 0, a = F(x, Eb) / m * 1e-4, st = -1, n = 0;
  for (let i = 0, N = Math.round(1e6 / DT); i < N; i++) {
    v += 0.5 * DT * a; x += 0.5 * DT * v; v = c1 * v + c2 * gauss(r); x += 0.5 * DT * v; a = F(x, Eb) / m * 1e-4; v += 0.5 * DT * a;
    if (st < 0 && x > X0 / 2) { st = 1; n++; } else if (st > 0 && x < -X0 / 2) { st = -1; n++; }
  }
  return n;
}
const NS = +(process.argv[2] || 40), BARRIERS = [8, 11, 14, 17];
const MASSES = { H: 1.008, C: 12.011, M: 15.035, R: 110 };
const out = { model: 'MD-T Lab 1 Langevin', ns_per_barrier: NS, barriers: BARRIERS, per_e: {} };
for (const [id, m] of Object.entries(MASSES)) {
  const xs = [], ys = [];
  for (const Eb of BARRIERS) { let n = 0; for (let k = 0; k < NS; k++) n += runNs(m, Eb, 900001 + 1000 * k + Eb * 7 + Math.round(m)); xs.push(Eb); ys.push(Math.log(n / NS)); }
  const N = xs.length, sx = xs.reduce((a, b) => a + b), sy = ys.reduce((a, b) => a + b), sxx = xs.reduce((a, b) => a + b * b, 0), sxy = xs.reduce((a, b, i) => a + b * ys[i], 0);
  out.per_e[id] = +(-1 / ((N * sxy - sx * sy) / (N * sxx - sx * sx))).toFixed(2);
}
console.log(JSON.stringify(out));
