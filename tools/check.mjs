// dist/ için yayın öncesi denetim. Bağımlılık yok. Bir kural bozulursa çıkış kodu 1 olur
// ve Cloudflare Pages yapısı durur (yapı komutu: node tools/build.mjs && node tools/check.mjs).
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const errs = [], notes = [];
const fail = (m) => errs.push(m);

if (!existsSync(DIST)) { console.error('dist yok: önce node tools/build.mjs'); process.exit(1); }
const M = JSON.parse(readFileSync(join(ROOT, 'modules.json'), 'utf8'));

// 1) kimlikler tekil ve biçimli
const ids = new Set();
for (const m of M.modules) {
  if (!/^(DK|MD)-(T|O|U)$/.test(m.id)) fail(`Kimlik biçimi: ${m.id}`);
  if (ids.has(m.id)) fail(`Yinelenen kimlik: ${m.id}`);
  ids.add(m.id);
  if (m.status !== 'planned' && !m.path) fail(`${m.id}: yayındaki modülün path alanı yok`);
  if (m.path && !existsSync(join(DIST, m.path, 'index.html'))) fail(`${m.id}: dist/${m.path}index.html yok`);
}

// 2) her kısa adres var olan bir hedefe gider
const red = readFileSync(join(DIST, '_redirects'), 'utf8').split('\n').filter((l) => l && !l.startsWith('#'));
if (red.length > 2000) fail(`_redirects çok uzun: ${red.length} satır (sınır 2000)`);
for (const l of red) {
  const [src, dst, code] = l.trim().split(/\s+/);
  if (!src || !dst || !code) { fail(`Bozuk yönlendirme satırı: ${l}`); continue; }
  const path = dst.split('#')[0];
  const file = path.endsWith('/') ? join(DIST, path, 'index.html') : join(DIST, path);
  if (!existsSync(file)) fail(`Yönlendirme hedefi yok: ${src} -> ${dst}`);
}

// 3) HTML kuralları
function walk(d, out = []) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p, out) : out.push(p); } return out; }
const files = walk(DIST);
for (const f of files) {
  const size = statSync(f).size;
  if (size > 25 * 1024 * 1024) fail(`Dosya 25 MiB sınırını aşıyor: ${f}`);
  if (!f.endsWith('.html')) continue;
  const h = readFileSync(f, 'utf8'), rel = f.slice(DIST.length + 1);
  if (h.includes(String.fromCharCode(0x2014))) fail(`${rel}: em-dash (U+2014) içeriyor`);
  if (!/<html lang="tr"/.test(h)) fail(`${rel}: <html lang="tr"> yok`);
  if (!/<title>[^<]+<\/title>/.test(h)) fail(`${rel}: <title> yok`);
  if (/file:\/\/|[A-Z]:\\\\Users|\/home\/claude|\/tmp\/claude/.test(h)) fail(`${rel}: yerel dosya yolu sızıntısı`);
  const ext = [...h.matchAll(/<script[^>]+src="(https?:[^"]+)"/g)].map((x) => x[1]);
  if (ext.length) notes.push(`${rel}: dış betik ${ext.join(', ')}`);
}

// 4) lisans notu gereken modüller
for (const m of M.modules) {
  if (!m.path) continue;
  const h = readFileSync(join(DIST, m.path, 'index.html'), 'utf8');
  const needs = (m.data || []).some((d) => /ChEMBL/.test(d));
  if (needs && !/CC BY-SA 3\.0/.test(h)) fail(`${m.id}: ChEMBL verisi var ama CC BY-SA 3.0 notu yok`);
}

notes.forEach((n) => console.log('not:', n));
if (errs.length) { errs.forEach((e) => console.error('HATA:', e)); console.error(`${errs.length} hata`); process.exit(1); }
console.log(`denetim geçti: ${files.length} dosya, ${ids.size} modül kimliği, ${red.length} yönlendirme`);
