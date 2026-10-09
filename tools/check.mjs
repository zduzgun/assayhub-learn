// dist/ için yayın öncesi denetim (iki dilli). Bağımlılık yok. Bir kural bozulursa çıkış kodu 1 olur
// ve Cloudflare Pages yapısı durur (yapı komutu: node tools/build.mjs && node tools/check.mjs).
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runLangTests } from './test-lang.mjs';
import { checkSources } from './sync-engine.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const LANGS = ['tr', 'en'];
const errs = [], notes = [];
const fail = (m) => errs.push(m);

if (!existsSync(DIST)) { console.error('dist yok: önce node tools/build.mjs'); process.exit(1); }
const M = JSON.parse(readFileSync(join(ROOT, 'modules.json'), 'utf8'));

// 0) dil kuralı birim testleri
const lt = runLangTests();
lt.fails.forEach((f) => fail(`dil testi: ${f}`));

// 1) kimlikler tekil ve biçimli; yayındaki modülün iki dilde de sayfası var
const ids = new Set();
for (const m of M.modules) {
  if (!/^(DK|MD)-(T|O|U|Q|[A-Z]{2,5})$/.test(m.id)) fail(`Kimlik biçimi: ${m.id}`);
  if (ids.has(m.id)) fail(`Yinelenen kimlik: ${m.id}`);
  ids.add(m.id);
  if (m.status !== 'planned' && !m.path) fail(`${m.id}: yayındaki modülün path alanı yok`);
  if (!m.en || !m.en.title) fail(`${m.id}: İngilizce başlık (en.title) yok`);
  for (const L of LANGS) if (m.path && !existsSync(join(DIST, L, m.path, 'index.html'))) fail(`${m.id}: dist/${L}/${m.path}index.html yok`);
}
for (const a of M.apps) if (!a.en || !a.en.title || !a.en.summary) fail(`${a.id}: uygulamanın İngilizce başlığı/özeti yok`);

// 2) her kısa adres var olan bir hedefe gider; iki dilde de bütün kimlikler var
const red = readFileSync(join(DIST, '_redirects'), 'utf8').split('\n').filter((l) => l && !l.startsWith('#'));
if (red.length > 2000) fail(`_redirects çok uzun: ${red.length} satır (sınır 2000)`);
const srcs = new Set();
for (const l of red) {
  const [src, dst, code] = l.trim().split(/\s+/);
  if (!src || !dst || !code) { fail(`Bozuk yönlendirme satırı: ${l}`); continue; }
  srcs.add(src);
  const path = dst.split('#')[0];
  const file = path.endsWith('/') ? join(DIST, path, 'index.html') : join(DIST, path);
  if (!existsSync(file)) fail(`Yönlendirme hedefi yok: ${src} -> ${dst}`);
  const ls = src.split('/')[1], ld = dst.split('/')[1];
  if (ls !== ld) fail(`Yönlendirme dili değiştiriyor: ${src} -> ${dst}`);
}
for (const L of LANGS) for (const m of M.modules) if (!srcs.has(`/${L}/l/${m.id}`)) fail(`Kısa adres yok: /${L}/l/${m.id}`);

// 3) işlev yolları yalnız dil öneksiz adresleri kapsar
const routes = JSON.parse(readFileSync(join(DIST, '_routes.json'), 'utf8'));
for (const r of routes.include) if (/^\/(tr|en)(\/|$)|^\/assets/.test(r)) fail(`_routes.json statik bir yolu işleve bağlıyor: ${r}`);
if (!existsSync(join(ROOT, 'functions'))) fail('functions/ klasörü yok');

// 4) HTML kuralları
function walk(d, out = []) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p, out) : out.push(p); } return out; }
const files = walk(DIST);
let pages = 0;
for (const f of files) {
  const size = statSync(f).size;
  if (size > 25 * 1024 * 1024) fail(`Dosya 25 MiB sınırını aşıyor: ${f}`);
  if (!f.endsWith('.html')) continue;
  const h = readFileSync(f, 'utf8'), rel = f.slice(DIST.length + 1);
  pages++;
  if (h.includes(String.fromCharCode(0x2014))) fail(`${rel}: em-dash (U+2014) içeriyor`);
  if (!/<title>[^<]+<\/title>/.test(h)) fail(`${rel}: <title> yok`);
  if (/file:\/\/|[A-Z]:\\\\Users|\/home\/claude|\/tmp\/claude/.test(h)) fail(`${rel}: yerel dosya yolu sızıntısı`);
  const L = rel.split('/')[0];
  if (LANGS.includes(L)) {
    const lm = h.match(/<html[^>]*\slang="([a-z]+)"/);
    if (!lm || lm[1] !== L) fail(`${rel}: <html lang="${L}"> bekleniyordu, bulunan: ${lm ? lm[1] : 'yok'}`);
    if (!rel.endsWith('404.html')) {
      const counterpart = join(DIST, rel.replace(/^(tr|en)\//, (x, y) => `${y === 'tr' ? 'en' : 'tr'}/`));
      if (!existsSync(counterpart)) fail(`${rel}: diğer dildeki karşılığı yok`);
      for (const x of LANGS) if (!h.includes(`hreflang="${x}"`)) fail(`${rel}: hreflang="${x}" bağlantısı yok`);
      if (!h.includes('data-setlang=')) fail(`${rel}: dil düğmesi yok`);
    }
    if (L === 'en' && /[çğıöşüÇĞİÖŞÜ]/.test(h.replace(/<!--[\s\S]*?-->/g, '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"])\/\/[^\n]*/g, '$1').replace(/<[^>]*lang="tr"[\s\S]*?<\/[a-z]+>/g, '').replace(/<span class="on"[^>]*lang="tr"[^>]*>TR<\/span>|lang="tr"/g, ''))) {
      const m = h.match(/.{0,40}[çğıöşüÇĞİÖŞÜ].{0,40}/);
      notes.push(`${rel}: İngilizce sayfada Türkçe harf (yorum dışı olabilir): ${JSON.stringify(m && m[0])}`);
    }
  }
  const ext = [...h.matchAll(/<script[^>]+src="(https?:[^"]+)"/g)].map((x) => x[1]);
  if (ext.length) notes.push(`${rel}: dış betik ${ext.join(', ')}`);
}

// 4b) kitap haritası: her bölümün en az bir modülü var, modüllerin bölümleri book.json'da, sayfa iki dilde
{ const BK = JSON.parse(readFileSync(join(ROOT, 'book.json'), 'utf8')), chIds = new Set(BK.chapters.map((c) => c.id));
  for (const m of M.modules) for (const c of ((m.book || '').match(/CH\d\d/g) || [])) if (!chIds.has(c)) fail(`${m.id}: kitap bölümü ${c} book.json'da yok`);
  for (const c of BK.chapters) if (!M.modules.some((m) => m.path && ((m.book || '').match(/CH\d\d/g) || []).includes(c.id))) fail(`${c.id}: bağlı modül yok`);
  for (const L of LANGS) { const f = join(DIST, L, 'book', 'index.html'); if (!existsSync(f)) { fail(`dist/${L}/book/index.html yok`); continue; }
    const h = readFileSync(f, 'utf8'); for (const c of BK.chapters) if (!h.includes(`id="${c.id}"`)) fail(`${L} kitap sayfasında ${c.id} yok`); } }

// 4c) sözlük: kimlikler tekil, bölümler book.json'da (ya da DK), her terimin en az bir modülü var, metinlerde uzun ya da orta tire yok, sayfa iki dilde bütün terimleri içerir
{ const G = JSON.parse(readFileSync(join(ROOT, 'glossary.json'), 'utf8')), BK = JSON.parse(readFileSync(join(ROOT, 'book.json'), 'utf8'));
  const chIds = new Set(BK.chapters.map((c) => c.id)), seen = new Set(), GD = JSON.parse(readFileSync(join(DIST, 'glossary.json'), 'utf8'));
  for (const e of G.terms) {
    if (seen.has(e.id)) fail(`sözlük: ${e.id} iki kez`); seen.add(e.id);
    if (!/^[a-z0-9-]+$/.test(e.id)) fail(`sözlük: kimlik ${e.id} yalnız küçük harf, rakam ve kısa çizgi içermeli`);
    if (e.ch !== 'DK' && !chIds.has(e.ch)) fail(`sözlük: ${e.id} bölümü ${e.ch} book.json'da yok`);
    for (const x of [e.tr, e.def, e.en.term, e.en.def, ...e.alt, ...e.en.alt]) if (/[–—]/.test(x)) fail(`sözlük: ${e.id} metninde uzun ya da orta tire`);
    if (!e.def || !e.en.def) fail(`sözlük: ${e.id} tanımı eksik`);
    const d = GD.terms.find((x) => x.id === e.id);
    if (!d || !d.mods.length) fail(`sözlük: ${e.id} hiçbir modülde bulunamadı`);
    else { const miss = d.mods.filter((x) => !d.en_found[x.id]).map((x) => x.id); if (miss.length) notes.push(`sözlük: ${e.id} İngilizce karşılığı (${e.en.term}) şu modüllerin İngilizce metninde bulunamadı: ${miss.join(', ')}`); }
  }
  for (const L of LANGS) { const f = join(DIST, L, 'glossary', 'index.html'); if (!existsSync(f)) { fail(`dist/${L}/glossary/index.html yok`); continue; }
    const h = readFileSync(f, 'utf8'); for (const e of G.terms) if (!h.includes(`id="${e.id}"`)) fail(`${L} sözlük sayfasında ${e.id} yok`); } }

// 5) lisans notu gereken modüller (iki dilde)
for (const m of M.modules) {
  if (!m.path) continue;
  const needs = (m.data || []).some((d) => /ChEMBL/.test(d));
  if (!needs) continue;
  for (const L of LANGS) {
    const h = readFileSync(join(DIST, L, m.path, 'index.html'), 'utf8');
    if (!/CC BY-SA 3\.0/.test(h)) fail(`${m.id} (${L}): ChEMBL verisi var ama CC BY-SA 3.0 notu yok`);
  }
}

// 7) modül geçiş şeridi: yayındaki her modülün sayfasında, aynı uygulamadaki önceki/sonraki yayındaki modüle bağlantı
for (const app of (M.apps || [])) {
  const seq = M.modules.filter((m) => m.app === app.id && m.path);
  seq.forEach((m, i) => {
    for (const L of LANGS) {
      const h = readFileSync(join(DIST, L, m.path, 'index.html'), 'utf8');
      const nav = (h.match(/<nav class="ahl-seq"[\s\S]*?<\/nav>/) || [null])[0];
      if (!nav) { fail(`${m.id} (${L}): modül geçiş şeridi yok`); continue; }
      const prev = seq[i - 1], next = seq[i + 1];
      if (prev && !nav.includes(`href="/${L}/${prev.path}"`)) fail(`${m.id} (${L}): önceki modül bağlantısı ${prev.id} değil`);
      if (next && !nav.includes(`href="/${L}/${next.path}"`)) fail(`${m.id} (${L}): sonraki modül bağlantısı ${next.id} değil`);
      if (!nav.includes(`href="/${L}/${app.path}"`)) fail(`${m.id} (${L}): geçiş şeridinde uygulama sayfası bağlantısı yok`);
      if (!prev && /rel="prev"/.test(nav)) fail(`${m.id} (${L}): ilk modülde önceki bağlantısı olmamalı`);
      if (!next && /rel="next"/.test(nav)) fail(`${m.id} (${L}): son modülde sonraki bağlantısı olmamalı`);
    }
  });
}

// 6) ortak motor bölgesi, assets-src/mdmini.js ile aynı olmalı
{ const e = checkSources(); e.bad.forEach((f) => fail(`${f}: mdmini bölgesi güncel değil (node tools/sync-engine.mjs)`)); if (e.used.length) notes.push(`mdmini kullanan sayfalar: ${e.used.join(', ')}`); }

notes.forEach((n) => console.log('not:', n));
if (errs.length) { errs.forEach((e) => console.error('HATA:', e)); console.error(`${errs.length} hata`); process.exit(1); }
console.log(`denetim geçti: ${pages} sayfa (${LANGS.join(', ')}), ${ids.size} modül kimliği, ${red.length} yönlendirme, dil testleri ${lt.total}/${lt.total}`);
