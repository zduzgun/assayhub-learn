// AssayHub Learn statik yapı betiği (iki dilli). Bağımlılık yok (yalnız Node yerleşik modülleri).
// Kullanım: node tools/build.mjs   ->   dist/ klasörünü üretir.
// Tek doğruluk kaynağı modules.json'dur. Her sayfa iki dilde üretilir: /tr/... ve /en/...
// Türkçe modül sayfası kaynak HTML'dir; İngilizcesi i18n/<KİMLİK>.en.json tablosuyla yapım sırasında üretilir
// (bkz. docs/superpowers/specs/2026-09-25-iki-dil-design.md). Dil öneksiz adresleri functions/ yönlendirir.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadTable, checkTable, sha256 } from './i18n.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const M = JSON.parse(readFileSync(join(ROOT, 'modules.json'), 'utf8'));
const LANGS = ['tr', 'en'];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const BUILD = {
  built_at: new Date().toISOString(),
  commit: process.env.CF_PAGES_COMMIT_SHA || process.env.GITHUB_SHA || 'yerel',
  branch: process.env.CF_PAGES_BRANCH || process.env.GITHUB_REF_NAME || 'yerel'
};

/* ---------- arayüz metinleri ---------- */
const UI = {
  tr: {
    tagline: 'Etkileşimli eğitim modülleri', learn: 'Learn', nav: 'AssayHub Learn gezinti', langNav: 'Dil seçimi',
    eyebrow: 'AssayHub Learn · önizleme', h1: 'Uygulayarak öğrenmek',
    deck: 'Moleküler docking ve moleküler dinamiği, gerçek verilerle ve adım adım kendiniz yaparak öğrenin. Her modül bir kitap bölümüne karşılık gelir.',
    bookH: 'Kitaptan mı geldiniz?',
    bookP: 'Kitaptaki her karekod kısa ve kalıcı bir adrese gider: <code>/tr/l/</code> ve ardından modül kimliği (örneğin <code>/tr/l/DK-T</code>). Bu adres modülün güncel sürümüne yönlenir; sayfa yenilense bile karekod değişmez.',
    ready: (r, n) => `${r} / ${n} modül yayında`, modsSmall: 'Modüller', modsH: 'Temelden uzmana',
    level: { temel: 'Temel', orta: 'Orta', uzman: 'Uzman' }, status: { pilot: 'pilot', planned: 'planlandı' }, book: 'kitap',
    mdH: 'Koşular nasıl çalışır?',
    mdP: 'Tarayıcıda gerçek MD çalıştırılmaz. Seçimlerinizi yapıp koşuyu başlattığınızda ilerleme ve kayıt satırları gerçek bir koşudakine benzer biçimde akar; sonunda gösterilen bütün sayılar önceden hesaplanmış gerçek bir koşudan gelir. Önceden hesaplanmamış bir seçim için sonuç uydurulmaz; "bu senaryo hesaplanmadı" yazar. Her sayfanın altında verinin kaynağı açıkça belirtilir.',
    foot: (b) => `Önizleme yayınıdır ve arama motorlarına kapalıdır. Modüller tarayıcıda çalışır; sunucuda hesap yapılmaz. MD modüllerinde koşular gerçek zamanlı çalıştırılmaz; önceden hesaplanmış gerçek veriler rehberli olarak yeniden oynatılır ve bu, ilgili sayfada açıkça belirtilir. Veri lisansları: PDB yapıları CC0 1.0; ChEMBL'den türetilen veri CC BY-SA 3.0; mdshare ALA2 CC BY 4.0. Yapı: ${b}.`,
    short: 'Kısa adres', version: 'sürüm', statusW: 'durum',
    preview: 'Önizleme yayınıdır; bilimsel ve hedef-okur incelemesi yapılmadı.', all: 'Bütün modüller',
    mt: '',
    nfTitle: 'Sayfa bulunamadı', nfH: 'Bu adreste bir modül yok',
    nfP: 'Kitaptaki karekoddan geldiyseniz kısa kodu kontrol edin (örneğin <code>/tr/l/DK-T</code>). Bütün modüller <a href="/tr/">ana sayfada</a> listelenir.',
    prepH: 'Bu modülün Türkçesi hazırlanıyor', prepP: (href) => `Şimdilik <a href="${href}">İngilizce sürümü</a> açabilirsiniz.`
  },
  en: {
    tagline: 'Interactive learning modules', learn: 'Learn', nav: 'AssayHub Learn navigation', langNav: 'Language',
    eyebrow: 'AssayHub Learn · preview', h1: 'Learning by doing',
    deck: 'Learn molecular docking and molecular dynamics step by step with real data, by doing it yourself. Each module corresponds to a chapter of the book.',
    bookH: 'Coming from the book?',
    bookP: 'Every QR code in the book leads to a short, permanent address: <code>/en/l/</code> followed by the module ID (for example <code>/en/l/DK-T</code>). The address always points to the current version of the module, so the QR code never changes even when the page is updated.',
    ready: (r, n) => `${r} / ${n} modules published`, modsSmall: 'Modules', modsH: 'From basic to expert',
    level: { temel: 'Basic', orta: 'Intermediate', uzman: 'Expert' }, status: { pilot: 'pilot', planned: 'planned' }, book: 'book',
    mdH: 'How do the runs work?',
    mdP: 'No real MD runs in the browser. When you make your choices and start a run, progress and log lines scroll by as in a real run; every number shown at the end comes from a real run computed in advance. No result is invented for a choice that was not computed in advance; the page says "this scenario was not computed". The data source is stated clearly at the bottom of each page.',
    foot: (b) => `This is a preview and is closed to search engines. Modules run in your browser; nothing is computed on the server. In the MD modules runs are not executed live; precomputed real data are replayed as a guided run, and the page says so explicitly. Data licences: PDB structures CC0 1.0; data derived from ChEMBL CC BY-SA 3.0; mdshare ALA2 CC BY 4.0. Build: ${b}.`,
    short: 'Short address', version: 'version', statusW: 'status',
    preview: 'Preview release; no scientific or target-reader review has been done yet.', all: 'All modules',
    mt: 'The English text is a machine translation of the Turkish original and has not yet been reviewed by a person.',
    nfTitle: 'Page not found', nfH: 'There is no module at this address',
    nfP: 'If you came from a QR code in the book, check the short code (for example <code>/en/l/DK-T</code>). All modules are listed on the <a href="/en/">home page</a>.',
    prepH: 'The English version of this module is in preparation', prepP: (href) => `For now you can open the <a href="${href}">Turkish version</a>.`
  }
};
const other = (L) => (L === 'tr' ? 'en' : 'tr');
const T = (L, obj, key) => (L === 'en' && obj.en && obj.en[key] !== undefined ? obj.en[key] : obj[key]);

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(join(ROOT, 'static'), DIST, { recursive: true });

const appOf = (id) => M.apps.find((a) => a.id === id);
function write(rel, html) {
  const out = join(DIST, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

/* ---------- ortak parçalar ---------- */
// Dil düğmesi: bağlantı JS olmadan da çalışır; JS yalnız seçimi assayhub_lang çerezine yazar.
const LANG_JS = `<script>(function(){document.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a[data-setlang]'):null;if(!a)return;try{var d=/(^|\\.)assayhub\\.app$/.test(location.hostname)?';Domain=.assayhub.app':'';document.cookie='assayhub_lang='+a.getAttribute('data-setlang')+';Max-Age=31536000;Path=/;SameSite=Lax'+(location.protocol==='https:'?';Secure':'')+d;}catch(_){}},true);})();</script>`;
function langSwitch(L, relPath, cls) {
  return `<span class="${cls}" role="group" aria-label="${esc(UI[L].langNav)}">` + LANGS.map((x) =>
    x === L ? `<span class="on" aria-current="true" lang="${x}">${x.toUpperCase()}</span>`
      : `<a href="/${x}/${relPath}" hreflang="${x}" lang="${x}" data-setlang="${x}">${x.toUpperCase()}</a>`).join('<span class="sep">|</span>') + '</span>';
}
const ICON = '<link rel="icon" href="/assets/icon.svg" type="image/svg+xml">';
const alternates = (relPath) => LANGS.map((x) => `<link rel="alternate" hreflang="${x}" href="/${x}/${relPath}">`).join('\n');

/* ---------- modül sayfaları ---------- */
const BAR_CSS = `<style id="ahl-bar-css">
.ahl-bar{font-family:"Segoe UI",system-ui,-apple-system,Arial,sans-serif;font-size:13px;background:#243744;color:#faf9f5;margin:0 -20px;padding:9px 20px;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
.ahl-bar a{color:#faf9f5;text-decoration:none}.ahl-bar a:hover{text-decoration:underline}
.ahl-bar .ahl-r{display:flex;align-items:center;gap:14px;flex-wrap:wrap}.ahl-bar .ahl-meta{opacity:.8}
.ahl-lang{display:inline-flex;align-items:center;gap:6px;font-weight:600;letter-spacing:.04em}
.ahl-lang .on{background:#faf9f5;color:#243744;border-radius:3px;padding:1px 6px}.ahl-lang a{padding:1px 4px}.ahl-lang .sep{opacity:.45}
.ahl-foot{font-family:"Segoe UI",system-ui,-apple-system,Arial,sans-serif;max-width:1060px;margin:40px auto 0;border-top:1px solid #d6d6cd;padding-top:14px;font-size:12.5px;line-height:1.6;color:#5f6a73}
.ahl-notice{background:#f5ecd9;color:#6b4a12;border-left:3px solid #96661c;padding:10px 14px;border-radius:0 4px 4px 0;margin:0 0 10px}
</style>`;
let enModules = 0, enMissing = [];
const tableInfo = {};
for (const m of M.modules) {
  if (!m.source) continue;
  const src = join(ROOT, m.source);
  if (!existsSync(src)) throw new Error(`Kaynak bulunamadı: ${m.source}`);
  const trHtml = readFileSync(src, 'utf8');
  const app = appOf(m.app);
  const table = loadTable(m.id, 'en');
  let enHtml = null;
  if (table) {
    const r = checkTable(m.id, trHtml, table);
    if (r.errors.length) {
      r.errors.slice(0, 20).forEach((e) => console.error(`${m.id} çeviri HATASI: ${e}`));
      throw new Error(`${m.id}: İngilizce çeviri tablosu denetimi başarısız (${r.errors.length} hata). node tools/i18n.mjs check ${m.id}`);
    }
    if (table.source_sha256 && table.source_sha256 !== sha256(trHtml)) console.warn(`${m.id} uyarı: çeviri tablosu farklı bir kaynak sürümü için hazırlanmış`);
    enHtml = r.html; enModules++;
    tableInfo[m.id] = { pairs: table.pairs.length, reviewed: !!table.reviewed };
  } else enMissing.push(m.id);

  for (const L of LANGS) {
    const U = UI[L];
    let html = L === 'tr' ? trHtml : enHtml;
    if (html === null) {
      // çevirisi olmayan modül: bilgilendirme sayfası
      write(join(L, m.path, 'index.html'), page(L, m.path, `${T(L, m, 'title')} · AssayHub Learn`, crumbs(L, app, m.id), `
<div class="mast"><p class="eyebrow">${esc(m.id)}</p><h1>${esc(T(L, m, 'title'))}</h1><p class="deck"><b>${esc(U.prepH)}.</b> ${U.prepP(`/${other(L)}/${m.path}`)}</p></div>`));
      continue;
    }
    const bar = `<nav class="ahl-bar" aria-label="${esc(U.nav)}"><span><a href="/${L}/">AssayHub Learn</a> › <a href="/${L}/${app.path}">${esc(T(L, app, 'title'))}</a> › ${esc(m.id)}</span><span class="ahl-r"><span class="ahl-meta">${esc(U.short)}: /${L}/l/${esc(m.id)} · ${esc(U.version)} ${esc(m.version)}</span>${langSwitch(L, m.path, 'ahl-lang')}</span></nav>`;
    const notice = T(L, m, 'notice');
    const reviewedNote = L === 'en' && tableInfo[m.id] && !tableInfo[m.id].reviewed ? ` ${esc(U.mt)}` : '';
    const foot = `<footer class="ahl-foot">${notice ? `<p class="ahl-notice">${esc(notice)}</p>` : ''}<p>${esc(m.id)} · ${esc(T(L, m, 'title'))} · ${esc(U.version)} ${esc(m.version)} · ${esc(U.statusW)}: ${esc(U.status[m.status] || m.status)} · ${esc(U.book)}: ${esc(T(L, m, 'book'))}. ${esc(U.preview)}${reviewedNote} <a href="/${L}/">${esc(U.all)}</a>.</p></footer>`;
    const bOpen = html.indexOf('<body>');
    const bClose = html.lastIndexOf('</body>');
    if (bOpen < 0 || bClose < 0) throw new Error(`${m.id}: <body> etiketi bulunamadı`);
    html = html.slice(0, bOpen + 6) + '\n' + bar + '\n' + html.slice(bOpen + 6, bClose) + foot + '\n' + LANG_JS + '\n' + html.slice(bClose);
    if (!/<html[^>]*\slang="tr"/.test(html)) throw new Error(`${m.id}: kaynakta <html lang="tr"> bekleniyordu`);
    html = html.replace(/(<html[^>]*\s)lang="tr"/, `$1lang="${L}"`);
    html = html.replace('</head>', alternates(m.path) + '\n' + ICON + '\n' + BAR_CSS + '\n</head>');
    write(join(L, m.path, 'index.html'), html);
  }
}

/* ---------- ana sayfa ve uygulama sayfaları ---------- */
function crumbs(L, app, last) {
  if (!app) return esc(UI[L].tagline);
  return `<a href="/${L}/">${UI[L].learn}</a> › ` + (last ? `<a href="/${L}/${app.path}">${esc(T(L, app, 'title'))}</a> › ${esc(last)}` : esc(T(L, app, 'title')));
}
function page(L, relPath, title, crumbsHtml, body) {
  return `<!doctype html>
<html lang="${L}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)}</title>
${relPath === null ? '' : alternates(relPath)}
<link rel="stylesheet" href="/assets/learn.css">
${ICON}
</head>
<body>
<div class="wrap">
<header class="topline"><a class="brand" href="/${L}/"><b>AssayHub</b><span>Learn</span></a><span class="tl-r"><span class="crumbs">${crumbsHtml}</span>${relPath === null ? '' : langSwitch(L, relPath, 'lang')}</span></header>
${body}
<p class="foot">${UI[L].foot(`${esc(BUILD.commit.slice(0, 8))} · ${esc(BUILD.built_at.slice(0, 10))}`)}</p>
</div>
${LANG_JS}
</body>
</html>
`;
}
function modItem(L, m) {
  const U = UI[L];
  const goals = (T(L, m, 'goals') || []).join(' · ');
  const inner = `<span class="id">${esc(m.id)}</span><span><span class="lvl">${esc(U.level[m.level] || m.level)} · ${esc(U.book)}: ${esc(T(L, m, 'book'))}</span><br><span class="t">${esc(T(L, m, 'title'))}</span><div class="g">${esc(goals)}</div></span><span class="tag ${m.status === 'planned' ? 'planned' : 'pilot'}">${esc(U.status[m.status] || m.status)}</span>`;
  return m.path ? `<li><a class="mod" id="${esc(m.id)}" href="/${L}/${m.path}">${inner}</a></li>` : `<li><div class="mod" id="${esc(m.id)}">${inner}</div></li>`;
}

for (const L of LANGS) {
  const U = UI[L];
  const cards = M.apps.map((a) => {
    const mods = M.modules.filter((m) => m.app === a.id);
    const ready = mods.filter((m) => m.status !== 'planned').length;
    return `<a class="card" href="/${L}/${a.path}"><span class="lvl">${esc(U.ready(ready, mods.length))}</span><h3>${esc(T(L, a, 'title'))}</h3><p>${esc(T(L, a, 'summary'))}</p></a>`;
  }).join('\n');
  write(join(L, 'index.html'), page(L, '', 'AssayHub Learn', esc(U.tagline), `
<div class="mast"><p class="eyebrow">${esc(U.eyebrow)}</p><h1>${esc(U.h1)}</h1>
<p class="deck">${esc(U.deck)}</p></div>
<div class="apps">${cards}</div>
<div class="box"><h4>${esc(U.bookH)}</h4><p>${U.bookP}</p></div>
`));
  for (const a of M.apps) {
    const mods = M.modules.filter((m) => m.app === a.id);
    const extra = a.id === 'md' ? `<div class="box"><h4>${esc(U.mdH)}</h4><p>${esc(U.mdP)}</p></div>` : '';
    write(join(L, a.path, 'index.html'), page(L, a.path, `${T(L, a, 'title')} · AssayHub Learn`, crumbs(L, a), `
<div class="mast"><p class="eyebrow">AssayHub Learn · ${esc(T(L, a, 'title'))}</p><h1>${esc(T(L, a, 'title'))}</h1><p class="deck">${esc(T(L, a, 'summary'))}</p></div>
${extra}
<h2><small>${esc(U.modsSmall)}</small>${esc(U.modsH)}</h2>
<ul class="mods">${mods.map((m) => modItem(L, m)).join('\n')}</ul>
`));
  }
  // dile özgü 404
  write(join(L, '404.html'), page(L, null, `${U.nfTitle} · AssayHub Learn`, esc(U.tagline), `
<div class="mast"><p class="eyebrow">404</p><h1>${esc(U.nfH)}</h1><p class="deck">${U.nfP}</p></div>`));
}
// dil öneksiz 404 (iki dilde) static/404.html dosyasındadır.

/* ---------- kısa adresler ve işlev yolları ---------- */
const lines = ['# modules.json dosyasından üretilir; elle düzenlemeyin.', '# 302 bilinçli seçim: hedef sayfa değişebilir, karekod değişmez.',
  '# Dil öneksiz adresler (/, /l/*, /docking/*, /md/*) functions/ tarafından ziyaretçinin diline yönlendirilir.'];
for (const L of LANGS) {
  for (const m of M.modules) {
    const target = m.path ? `/${L}/${m.path}` : `/${L}/${appOf(m.app).path}#${m.id}`;
    lines.push(`/${L}/l/${m.id} ${target} 302`);
    lines.push(`/${L}/l/${m.id.toLowerCase()} ${target} 302`);
  }
  for (const a of M.apps) lines.push(`/${L}/l/${a.id} /${L}/${a.path} 302`);
}
writeFileSync(join(DIST, '_redirects'), lines.join('\n') + '\n');
writeFileSync(join(DIST, '_routes.json'), JSON.stringify({ version: 1, include: ['/', '/l/*', '/docking', '/docking/*', '/md', '/md/*'], exclude: [] }, null, 2));

writeFileSync(join(DIST, 'modules.json'), JSON.stringify(M, null, 2));
writeFileSync(join(DIST, 'version.json'), JSON.stringify({ ...BUILD, languages: LANGS, translations: tableInfo }, null, 2));
console.log(`dist hazır: ${M.modules.filter((m) => m.source).length} modül x ${LANGS.length} dil (İngilizce çeviri: ${enModules}${enMissing.length ? `, eksik: ${enMissing.join(', ')}` : ''}), ${lines.length - 3} kısa adres, commit ${BUILD.commit}`);
