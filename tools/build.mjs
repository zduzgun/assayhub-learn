// AssayHub Learn statik yapı betiği. Bağımlılık yok (yalnız Node yerleşik modülleri).
// Kullanım: node tools/build.mjs   ->   dist/ klasörünü üretir.
// Tek doğruluk kaynağı modules.json'dur: modül sayfaları, ana sayfa, uygulama sayfaları ve
// kısa adres (/l/<KİMLİK>) yönlendirmeleri buradan üretilir.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const M = JSON.parse(readFileSync(join(ROOT, 'modules.json'), 'utf8'));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const LEVEL = { temel: 'Temel', orta: 'Orta', uzman: 'Uzman' };
const BUILD = {
  built_at: new Date().toISOString(),
  commit: process.env.CF_PAGES_COMMIT_SHA || process.env.GITHUB_SHA || 'yerel',
  branch: process.env.CF_PAGES_BRANCH || process.env.GITHUB_REF_NAME || 'yerel'
};

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(join(ROOT, 'static'), DIST, { recursive: true });

const appOf = (id) => M.apps.find((a) => a.id === id);
function write(rel, html) {
  const out = join(DIST, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

/* ---------- modül sayfaları: kaynak HTML + ince gezinti şeridi + alt bilgi ---------- */
const BAR_CSS = `<style id="ahl-bar-css">
.ahl-bar{font-family:"Segoe UI",system-ui,-apple-system,Arial,sans-serif;font-size:13px;background:#243744;color:#faf9f5;margin:0 -20px;padding:9px 20px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
.ahl-bar a{color:#faf9f5;text-decoration:none}.ahl-bar a:hover{text-decoration:underline}
.ahl-bar .ahl-r{opacity:.8}
.ahl-foot{font-family:"Segoe UI",system-ui,-apple-system,Arial,sans-serif;max-width:1060px;margin:40px auto 0;border-top:1px solid #d6d6cd;padding-top:14px;font-size:12.5px;line-height:1.6;color:#5f6a73}
.ahl-notice{background:#f5ecd9;color:#6b4a12;border-left:3px solid #96661c;padding:10px 14px;border-radius:0 4px 4px 0;margin:0 0 10px}
</style>`;
for (const m of M.modules) {
  if (!m.source) continue;
  const src = join(ROOT, m.source);
  if (!existsSync(src)) throw new Error(`Kaynak bulunamadı: ${m.source}`);
  let html = readFileSync(src, 'utf8');
  const app = appOf(m.app);
  const bar = `<nav class="ahl-bar" aria-label="AssayHub Learn gezinti"><span><a href="/">AssayHub Learn</a> › <a href="/${app.path}">${esc(app.title)}</a> › ${esc(m.id)}</span><span class="ahl-r">Kısa adres: /l/${esc(m.id)} · sürüm ${esc(m.version)}</span></nav>`;
  const foot = `<footer class="ahl-foot">${m.notice ? `<p class="ahl-notice">${esc(m.notice)}</p>` : ''}<p>${esc(m.id)} · ${esc(m.title)} · sürüm ${esc(m.version)} · durum: ${esc(m.status)} · kitap: ${esc(m.book)}. Önizleme yayınıdır; bilimsel ve hedef-okur incelemesi yapılmadı. <a href="/">Bütün modüller</a>.</p></footer>`;
  const bOpen = html.indexOf('<body>');
  const bClose = html.lastIndexOf('</body>');
  if (bOpen < 0 || bClose < 0) throw new Error(`${m.id}: <body> etiketi bulunamadı`);
  html = html.slice(0, bOpen + 6) + '\n' + bar + '\n' + html.slice(bOpen + 6, bClose) + foot + '\n' + html.slice(bClose);
  html = html.replace('</head>', BAR_CSS + '\n</head>');
  write(join(m.path, 'index.html'), html);
}

/* ---------- ana sayfa ve uygulama sayfaları ---------- */
function page(title, crumbs, body) {
  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)}</title>
<link rel="stylesheet" href="/assets/learn.css">
</head>
<body>
<div class="wrap">
<header class="topline"><a class="brand" href="/"><b>AssayHub</b><span>Learn</span></a><span class="crumbs">${crumbs}</span></header>
${body}
<p class="foot">Önizleme yayınıdır ve arama motorlarına kapalıdır. Modüller tarayıcıda çalışır; sunucuda hesap yapılmaz. MD modüllerinde koşular gerçek zamanlı çalıştırılmaz; önceden hesaplanmış gerçek veriler rehberli olarak yeniden oynatılır ve bu, ilgili sayfada açıkça belirtilir. Veri lisansları: PDB yapıları CC0 1.0; ChEMBL'den türetilen veri CC BY-SA 3.0; mdshare ALA2 CC BY 4.0. Yapı: ${esc(BUILD.commit.slice(0, 8))} · ${esc(BUILD.built_at.slice(0, 10))}.</p>
</div>
</body>
</html>
`;
}
function modItem(m) {
  const goals = (m.goals || []).join(' · ');
  const inner = `<span class="id">${esc(m.id)}</span><span><span class="lvl">${esc(LEVEL[m.level] || m.level)} · kitap: ${esc(m.book)}</span><br><span class="t">${esc(m.title)}</span><div class="g">${esc(goals)}</div></span><span class="tag ${m.status === 'planned' ? 'planned' : 'pilot'}">${m.status === 'planned' ? 'planlandı' : 'pilot'}</span>`;
  return m.path ? `<li><a class="mod" id="${esc(m.id)}" href="/${m.path}">${inner}</a></li>` : `<li><div class="mod" id="${esc(m.id)}">${inner}</div></li>`;
}

const cards = M.apps.map((a) => {
  const mods = M.modules.filter((m) => m.app === a.id);
  const ready = mods.filter((m) => m.status !== 'planned').length;
  return `<a class="card" href="/${a.path}"><span class="lvl">${ready} / ${mods.length} modül yayında</span><h3>${esc(a.title)}</h3><p>${esc(a.summary)}</p></a>`;
}).join('\n');

write('index.html', page('AssayHub Learn', 'Etkileşimli eğitim modülleri', `
<div class="mast"><p class="eyebrow">AssayHub Learn · önizleme</p><h1>Uygulayarak öğrenmek</h1>
<p class="deck">Moleküler docking ve moleküler dinamiği, gerçek verilerle ve adım adım kendiniz yaparak öğrenin. Her modül bir kitap bölümüne karşılık gelir.</p></div>
<div class="apps">${cards}</div>
<div class="box"><h4>Kitaptan mı geldiniz?</h4><p>Kitaptaki her karekod kısa ve kalıcı bir adrese gider: <code>/l/</code> ve ardından modül kimliği (örneğin <code>/l/DK-T</code>). Bu adres modülün güncel sürümüne yönlenir; sayfa yenilense bile karekod değişmez.</p></div>
`));

for (const a of M.apps) {
  const mods = M.modules.filter((m) => m.app === a.id);
  const extra = a.id === 'md'
    ? `<div class="box"><h4>Koşular nasıl çalışır?</h4><p>Tarayıcıda gerçek MD çalıştırılmaz. Seçimlerinizi yapıp koşuyu başlattığınızda ilerleme ve kayıt satırları gerçek bir koşudakine benzer biçimde akar; sonunda gösterilen bütün sayılar önceden hesaplanmış gerçek bir koşudan gelir. Önceden hesaplanmamış bir seçim için sonuç uydurulmaz; "bu senaryo hesaplanmadı" yazar. Her sayfanın altında verinin kaynağı açıkça belirtilir.</p></div>`
    : '';
  write(join(a.path, 'index.html'), page(`${a.title} · AssayHub Learn`, `<a href="/">Learn</a> › ${esc(a.title)}`, `
<div class="mast"><p class="eyebrow">AssayHub Learn · ${esc(a.title)}</p><h1>${esc(a.title)}</h1><p class="deck">${esc(a.summary)}</p></div>
${extra}
<h2><small>Modüller</small>Temelden uzmana</h2>
<ul class="mods">${mods.map(modItem).join('\n')}</ul>
`));
}

/* ---------- kısa adresler ---------- */
const lines = ['# modules.json dosyasından üretilir; elle düzenlemeyin.', '# 302 bilinçli seçim: hedef sayfa değişebilir, karekod değişmez.'];
for (const m of M.modules) {
  const target = m.path ? `/${m.path}` : `/${appOf(m.app).path}#${m.id}`;
  lines.push(`/l/${m.id} ${target} 302`);
  lines.push(`/l/${m.id.toLowerCase()} ${target} 302`);
}
for (const a of M.apps) lines.push(`/l/${a.id} /${a.path} 302`);
writeFileSync(join(DIST, '_redirects'), lines.join('\n') + '\n');

writeFileSync(join(DIST, 'modules.json'), JSON.stringify(M, null, 2));
writeFileSync(join(DIST, 'version.json'), JSON.stringify(BUILD, null, 2));
console.log(`dist hazır: ${M.modules.filter((m) => m.source).length} modül sayfası, ${lines.length - 2} kısa adres, commit ${BUILD.commit}`);
