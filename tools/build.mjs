// AssayHub Learn statik yapı betiği (iki dilli). Bağımlılık yok (yalnız Node yerleşik modülleri).
// Kullanım: node tools/build.mjs   ->   dist/ klasörünü üretir.
// Tek doğruluk kaynağı modules.json'dur. Her sayfa iki dilde üretilir: /tr/... ve /en/...
// Türkçe modül sayfası kaynak HTML'dir; İngilizcesi i18n/<KİMLİK>.en.json tablosuyla yapım sırasında üretilir
// (bkz. docs/superpowers/specs/2026-09-25-iki-dil-design.md). Dil öneksiz adresleri functions/ yönlendirir.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadTable, checkTable, sha256 } from './i18n.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const M = JSON.parse(readFileSync(join(ROOT, 'modules.json'), 'utf8'));
const BOOK = JSON.parse(readFileSync(join(ROOT, 'book.json'), 'utf8'));
const GLOS = JSON.parse(readFileSync(join(ROOT, 'glossary.json'), 'utf8'));
// yazar onayları (i18n/onay.json): toplu onay modül alt notunu değiştirir; reviewed yalnız madde madde incelemede true olur
const ONAY = existsSync(join(ROOT, 'i18n', 'onay.json')) ? JSON.parse(readFileSync(join(ROOT, 'i18n', 'onay.json'), 'utf8')).onaylar : {};
const enDate = (t) => { const [y, mo, d] = t.split('-').map(Number); return `${d} ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mo - 1]} ${y}`; };
// yazar incelemesi (glossary.json 'inceleme'): sözlük sayfasındaki not buna göre değişir
const GLREV = GLOS.inceleme && GLOS.inceleme.kim === 'yazar' ? (() => { const [y, mo, d] = GLOS.inceleme.tarih.split('-').map(Number); const ay = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'], mon = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; return { tr: `${d} ${ay[mo - 1]} ${y}`, en: `${d} ${mon[mo - 1]} ${y}` }; })() : null;
// sonradan değişen tanımlar (glossary.json 'degisiklikler'): yazar incelemesinden sonra değişip henüz gözden geçirilmeyen maddeler sözlük notunda adlandırılır
const GLCHG = (GLOS.degisiklikler || []).map((c) => { const [y, mo, d] = c.tarih.split('-').map(Number); const nm = (L) => c.terimler.map((id) => { const e = GLOS.terms.find((t) => t.id === id); return L === 'tr' ? e.tr : e.en.term; }).join(', '); return { tr: ` ${d} ${['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'][mo - 1]} ${y} tarihinde şu tanımlar kitapla uyum için değiştirildi ve yazar tarafından henüz gözden geçirilmedi: ${nm('tr')}.`, en: ` On ${d} ${['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mo - 1]} ${y} these definitions were changed to match the book and have not yet been reviewed by the author: ${nm('en')}.` }; });
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
    eyebrow: 'AssayHub Learn', h1: 'Uygulayarak öğrenmek',
    deck: 'Moleküler docking ve moleküler dinamiği, gerçek verilerle ve adım adım kendiniz yaparak öğrenin. Her modül bir kitap bölümüne karşılık gelir.',
    bookH: 'Kitaptan mı geldiniz?',
    bookP: 'Kitaptaki her karekod kısa ve kalıcı bir adrese gider: <code>/tr/l/</code> ve ardından modül kimliği (örneğin <code>/tr/l/DK-T</code>). Bu adres modülün güncel sürümüne yönlenir; sayfa yenilense bile karekod değişmez.',
    ready: (r, n) => `${r} / ${n} modül yayında`, modsSmall: 'Modüller', modsH: 'Temelden ileriye',
    // 0.43.0: uygulama sayfası kartları; düzeyler kitaptaki adlarla (temel, orta, ileri)
    lvH: { temel: 'Temel düzey', orta: 'Orta düzey', uzman: 'İleri düzey' },
    lvD: { temel: 'Kavramı açıklar, basit gerçek veriyi okur.', orta: 'Bütün iş akışını, her adımın nedeniyle birlikte izlenebilir biçimde kurar.', uzman: 'Örnekleme, belirsizlik ve yöntem seçimini savunur.' },
    nMod: (n) => `${n} modül`, open: 'Modülü aç', chap: (n) => `Bölüm ${n}`, appHint: 'Modüller kitaptaki bölüm sırasıyla dizilidir. Kitapla birlikte okuyorsanız bölümünüzün kartını açın; ilk kez geliyorsanız temel düzeyden başlayın.', ver: 'sürüm',
    level: { temel: 'Temel', orta: 'Orta', uzman: 'İleri' }, status: { pilot: 'pilot', planned: 'planlandı' }, book: 'kitap',
    mdH: 'Hesaplar nasıl yapılır?',
    mdP: 'Laboratuvarlardaki küçük simülasyonlar (tek bir molekül, iki boyutlu bir sıvı, protein yüzeyindeki birkaç su molekülü) tarayıcınızda o anda, hareket denklemleri çözülerek hesaplanır. Bunlar öğretim amaçlıdır; çoğu iki boyutlu ve indirgenmiş birimlidir. Protein kutusu, koşu ayarları ve trajektori gibi proje verileri ise bu kitap için önceden koşturulmuş gerçek simülasyonlardan gelir; tarayıcıda bir proteinle gerçek MD çalıştırılmaz. Hesaplanmamış bir seçim için sonuç uydurulmaz; sayfa "bu senaryo hesaplanmadı" der. Her sayfanın altında sayıların nereden geldiği yazılıdır.',
    foot: (b) => `Modüller tarayıcıda çalışır; sunucuda hesap yapılmaz. MD laboratuvarlarındaki küçük öğretim simülasyonları tarayıcıda canlı hesaplanır; protein ve koşu verileri önceden koşturulmuş gerçek simülasyonlardan gelir ve her sayfada kaynağıyla belirtilir. Veri lisansları: PDB yapıları CC0 1.0; ChEMBL'den türetilen veri CC BY-SA 3.0; mdshare ALA2 CC BY 4.0. Yapı: ${b}.`,
    short: 'Kısa adres', version: 'sürüm', statusW: 'durum',
    all: 'Bütün modüller',
    mtH: 'Bu modüldeki terimler', mtP: 'Her terimin tanımı ve geçtiği öteki modüller sözlükte.', mtAll: 'Bütün sözlük', seqNav: 'Modüller arası geçiş', prev: 'Önceki modül', next: 'Sonraki modül', allOf: (t) => `Bütün ${t} modülleri`,
    mt: '', mtChecked: '', mtBulk: () => '',
    bkTitle: 'Kitap bölümleri', bkEyebrow: 'AssayHub Learn · kitap', bkH1: 'Kitap bölümleri ve modüller',
    bkDeck: 'MD kitabının 20 çalışma birimi ve her birine bağlı etkileşimli modüller. Kitaptaki karekodlar buradaki kısa adreslere gider.',
    bkLevel: { temel: 'Temel düzey', orta: 'Orta düzey', ileri: 'İleri düzey' }, bkRel: { ana: 'ana', ortak: 'ortak', ek: 'ek' },
    bkRelP: '<b>ana</b>: bölümün kendi modülü · <b>ortak</b>: iki bölüme birden bağlı · <b>ek</b>: bölümden sonra ek okuma',
    bkNote: '', bkLink: 'Bölümlere göre liste: <a href="/tr/book/">kitap bölümleri ve modüller</a>. Terimler: <a href="/tr/glossary/">sözlük</a>.',
    glTitle: 'Sözlük', glEyebrow: 'AssayHub Learn · sözlük', glH1: 'Terimler sözlüğü',
    glDeck: (n) => `Kitapta ve modüllerde geçen ${n} temel terim: İngilizce karşılığı, kısa tanımı ve terimin geçtiği modüller.`,
    glNote: (GLREV ? `Tanımlar Claude (yapay zekâ) tarafından yazıldı, bağımsız bir denetimden geçti ve yazar tarafından madde madde gözden geçirildi (${GLREV.tr}).` : 'Tanımlar Claude (yapay zekâ) tarafından yazıldı ve bağımsız bir denetimden geçti; bir kişi tarafından henüz gözden geçirilmedi.') + GLCHG.map((c) => c.tr).join('') + ' Bir terimin bağlandığı modüller, modüllerin görünür metninde terim aranarak bulunur (en çok beş); kenarı renkli olanlar terimin bağlı olduğu kitap bölümüne aittir. Her terimin kalıcı bir adresi vardır (örneğin <code>/tr/glossary/#kesme</code>).',
    glSearch: 'Sözlükte ara', glPh: 'Türkçe ya da İngilizce terim yazın', glCount: (k, n) => `${k} / ${n} terim`, glNone: 'Bu aramayla eşleşen terim yok.',
    glAlso: 'Ayrıca', glMods: 'Modüller', glCh: 'Kitap', glDk: 'Docking modülleri', glIdx: 'Harf dizini', glOtherL: 'İngilizcesi',
    nfTitle: 'Sayfa bulunamadı', nfH: 'Bu adreste bir modül yok',
    nfP: 'Kitaptaki karekoddan geldiyseniz kısa kodu kontrol edin (örneğin <code>/tr/l/DK-T</code>). Bütün modüller <a href="/tr/">ana sayfada</a> listelenir.',
    prepH: 'Bu modülün Türkçesi hazırlanıyor', prepP: (href) => `Şimdilik <a href="${href}">İngilizce sürümü</a> açabilirsiniz.`
  },
  en: {
    tagline: 'Interactive learning modules', learn: 'Learn', nav: 'AssayHub Learn navigation', langNav: 'Language',
    eyebrow: 'AssayHub Learn', h1: 'Learning by doing',
    deck: 'Learn molecular docking and molecular dynamics step by step with real data, by doing it yourself. Each module corresponds to a chapter of the book.',
    bookH: 'Coming from the book?',
    bookP: 'Every QR code in the book leads to a short, permanent address: <code>/en/l/</code> followed by the module ID (for example <code>/en/l/DK-T</code>). The address always points to the current version of the module, so the QR code never changes even when the page is updated.',
    ready: (r, n) => `${r} / ${n} modules published`, modsSmall: 'Modules', modsH: 'From basic to advanced',
    lvH: { temel: 'Basic level', orta: 'Intermediate level', uzman: 'Advanced level' },
    lvD: { temel: 'Explains the concept and reads simple real data.', orta: 'Builds the whole workflow traceably, with the reason for each step.', uzman: 'Defends sampling, uncertainty and the choice of method.' },
    nMod: (n) => `${n} module${n === 1 ? '' : 's'}`, open: 'Open module', chap: (n) => `Chapter ${n}`, appHint: 'Modules follow the chapter order of the book. If you are reading the book, open the card for your chapter; if you are new here, start at the basic level.', ver: 'version',
    level: { temel: 'Basic', orta: 'Intermediate', uzman: 'Advanced' }, status: { pilot: 'pilot', planned: 'planned' }, book: 'book',
    mdH: 'How are the calculations done?',
    mdP: 'The small simulations in the labs (a single molecule, a two-dimensional liquid, a few water molecules at a protein surface) are computed in your browser as you use them, by solving the equations of motion. They are for teaching; most are two-dimensional and use reduced units. Project data such as the protein box, the run settings and trajectories come from real simulations run in advance for this book; no real MD of a protein runs in the browser. No result is invented for a choice that was not computed; the page says "this scenario was not computed". The bottom of each page states where the numbers come from.',
    foot: (b) => `Modules run in your browser; nothing is computed on the server. The small teaching simulations in the MD labs are computed live in your browser; protein and run data come from real simulations run in advance, and each page states their source. Data licences: PDB structures CC0 1.0; data derived from ChEMBL CC BY-SA 3.0; mdshare ALA2 CC BY 4.0. Build: ${b}.`,
    short: 'Short address', version: 'version', statusW: 'status',
    all: 'All modules',
    mtH: 'Terms in this module', mtP: 'The definition of each term and the other modules where it appears are in the glossary.', mtAll: 'Whole glossary', seqNav: 'Move between modules', prev: 'Previous module', next: 'Next module', allOf: (t) => `All ${t} modules`,
    mt: 'The English text is a machine translation of the Turkish original and has not yet been reviewed by a person.',
    mtChecked: 'The English text is a machine translation of the Turkish original; Claude (AI) has checked it, but it has not yet been reviewed by a person.',
    mtBulk: (d) => `The English text is a machine translation of the Turkish original; Claude (AI) has checked it, and the author approved it as a whole on ${d} without reviewing it item by item.`,
    bkTitle: 'Book chapters', bkEyebrow: 'AssayHub Learn · book', bkH1: 'Book chapters and modules',
    bkDeck: 'The 20 working units of the MD book and the interactive modules linked to each. The QR codes in the book lead to the short addresses listed here.',
    bkLevel: { temel: 'Basic level', orta: 'Intermediate level', ileri: 'Advanced level' }, bkRel: { ana: 'main', ortak: 'shared', ek: 'extra' },
    bkRelP: '<b>main</b>: the chapter\'s own module · <b>shared</b>: linked to two chapters · <b>extra</b>: further reading after the chapter',
    bkNote: '',
    bkLink: 'List by chapter: <a href="/en/book/">book chapters and modules</a>. Terms: <a href="/en/glossary/">glossary</a>.',
    glTitle: 'Glossary', glEyebrow: 'AssayHub Learn · glossary', glH1: 'Glossary of terms',
    glDeck: (n) => `${n} key terms used in the book and the modules: the Turkish equivalent, a short definition and the modules where the term appears.`,
    glNote: (GLREV ? `The definitions were written by Claude (AI), went through an independent check and were reviewed item by item by the author on ${GLREV.en}.` : 'The definitions were written by Claude (AI) and went through an independent check; they have not yet been reviewed by a person.') + GLCHG.map((c) => c.en).join('') + ' The modules linked to a term are found by searching the visible text of the modules for the term (at most five); those with a colored border belong to the book chapter the term is linked to. Every term has a permanent address (for example <code>/en/glossary/#kesme</code>).',
    glSearch: 'Search the glossary', glPh: 'Type a term in English or Turkish', glCount: (k, n) => `${k} / ${n} terms`, glNone: 'No term matches this search.',
    glAlso: 'Also', glMods: 'Modules', glCh: 'Book', glDk: 'Docking modules', glIdx: 'Letter index', glOtherL: 'Turkish',
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
.ahl-seq{font-family:"Segoe UI",system-ui,-apple-system,Arial,sans-serif;max-width:1060px;margin:48px auto 0;display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:stretch}
.ahl-seq a{display:block;text-decoration:none;color:#23394a;border:1px solid #d6d6cd;border-radius:10px;padding:12px 14px;background:#fffefb;line-height:1.35}
.ahl-seq a:hover,.ahl-seq a:focus-visible{border-color:#23394a;box-shadow:0 1px 0 #23394a}
.ahl-seq .ahl-k{display:block;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:#934b3c;font-weight:600;margin-bottom:3px}
.ahl-seq .ahl-t{display:block;font-size:14.5px;font-weight:600}
.ahl-seq .ahl-next{text-align:right}
.ahl-seq .ahl-hub{align-self:center;font-size:13px;padding:10px 12px;border-style:dashed;text-align:center}
.ahl-seq .ahl-gap{visibility:hidden}
@media (max-width:640px){.ahl-seq{grid-template-columns:1fr;margin-top:36px}.ahl-seq .ahl-next{text-align:left}.ahl-seq .ahl-gap{display:none}.ahl-seq .ahl-hub{order:3}}
.ahl-foot{font-family:"Segoe UI",system-ui,-apple-system,Arial,sans-serif;max-width:1060px;margin:40px auto 0;border-top:1px solid #d6d6cd;padding-top:14px;font-size:12.5px;line-height:1.6;color:#5f6a73}
.ahl-terms{font-family:"Segoe UI",system-ui,-apple-system,Arial,sans-serif;max-width:1060px;margin:48px auto 0;border:1px solid #d6d6cd;border-radius:10px;background:#fffefb;padding:14px 16px;color:#23394a}
.ahl-terms h2{font:600 11px/1.3 "Segoe UI",system-ui,-apple-system,Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#934b3c;margin:0 0 4px}
.ahl-terms p{margin:0 0 10px;font-size:13px;color:#5f6a73;line-height:1.5}
.ahl-terms ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:6px}
.ahl-terms li a{display:inline-block;text-decoration:none;color:#23394a;border:1px solid #d6d6cd;border-radius:4px;padding:3px 9px;font-size:14px;background:#faf9f5}
.ahl-terms li a:hover,.ahl-terms li a:focus-visible{border-color:#23394a}
.ahl-terms li.own a{border-color:#934b3c}
.ahl-terms .ahl-tall{font-size:13px;color:#5f6a73;border-style:dashed}
.ahl-terms + .ahl-seq{margin-top:16px}
.ahl-notice{background:#f5ecd9;color:#6b4a12;border-left:3px solid #96661c;padding:10px 14px;border-radius:0 4px 4px 0;margin:0 0 10px}
</style>`;
let enModules = 0, enMissing = [];
const tableInfo = {};
const TERMS_MARK = '<!--ahl-terms-->';
const TXT = {};
const trLower = (x) => String(x).replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase();
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
    TXT[m.id] = { tr: trLower(table.pairs.map((p) => p[0].replace(/<[^>]+>/g, ' ')).join(' \n ')), en: table.pairs.map((p) => p[1].replace(/<[^>]+>/g, ' ')).join(' \n ').toLowerCase() };
    tableInfo[m.id] = { pairs: table.pairs.length, reviewed: !!table.reviewed, checked: table.checked || '', ...(ONAY[m.id] ? { approved: `${ONAY[m.id].kim}:${ONAY[m.id].tur}:${ONAY[m.id].tarih}` } : {}) };
  } else enMissing.push(m.id);

  for (const L of LANGS) {
    const U = UI[L];
    let html = L === 'tr' ? trHtml : enHtml;
    const seq = M.modules.filter((x) => x.app === m.app && x.path);
    const si = seq.findIndex((x) => x.id === m.id), sp = seq[si - 1], sn = seq[si + 1];
    const card = (x, cls, rel, k) => `<a class="${cls}" rel="${rel}" href="/${L}/${x.path}"><span class="ahl-k">${esc(k)}</span><span class="ahl-t">${esc(x.id)} · ${esc(T(L, x, 'title'))}</span></a>`;
    const seqNav = `<nav class="ahl-seq" aria-label="${esc(U.seqNav)}">${sp ? card(sp, 'ahl-prev', 'prev', '← ' + U.prev) : '<span class="ahl-gap"></span>'}<a class="ahl-hub" href="/${L}/${app.path}">${esc(U.allOf(T(L, app, 'title')))}</a>${sn ? card(sn, 'ahl-next', 'next', U.next + ' →') : '<span class="ahl-gap"></span>'}</nav>`;
    if (html === null) {
      // çevirisi olmayan modül: bilgilendirme sayfası
      write(join(L, m.path, 'index.html'), page(L, m.path, `${T(L, m, 'title')} · AssayHub Learn`, crumbs(L, app, m.id), `
<div class="mast"><p class="eyebrow">${esc(m.id)}</p><h1>${esc(T(L, m, 'title'))}</h1><p class="deck"><b>${esc(U.prepH)}.</b> ${U.prepP(`/${other(L)}/${m.path}`)}</p></div>
${BAR_CSS}
${seqNav}`));
      continue;
    }
    const bar = `<nav class="ahl-bar" aria-label="${esc(U.nav)}"><span><a href="/${L}/">AssayHub Learn</a> › <a href="/${L}/${app.path}">${esc(T(L, app, 'title'))}</a> › ${esc(m.id)}</span><span class="ahl-r"><span class="ahl-meta">${esc(U.short)}: /${L}/l/${esc(m.id)} · ${esc(U.version)} ${esc(m.version)}</span>${langSwitch(L, m.path, 'ahl-lang')}</span></nav>`;
    const notice = T(L, m, 'notice');
    const ap = ONAY[m.id] && ONAY[m.id].kim === 'yazar' && ONAY[m.id].tur === 'toplu' ? ONAY[m.id] : null;
    const reviewedNote = L === 'en' && tableInfo[m.id] && !tableInfo[m.id].reviewed ? ` ${esc(ap ? U.mtBulk(enDate(ap.tarih)) : tableInfo[m.id].checked === 'claude' ? U.mtChecked : U.mt)}` : '';
    const foot = `<footer class="ahl-foot">${notice ? `<p class="ahl-notice">${esc(notice)}</p>` : ''}<p>${esc(m.id)} · ${esc(T(L, m, 'title'))} · ${esc(U.version)} ${esc(m.version)} ${m.status && m.status !== 'pilot' ? ` · ${esc(U.statusW)}: ${esc(U.status[m.status] || m.status)}` : ''} · ${esc(U.book)}: ${esc(T(L, m, 'book'))}. ${reviewedNote.trim()}${reviewedNote ? ' ' : ''}<a href="/${L}/">${esc(U.all)}</a>.</p></footer>`;
    const bOpen = html.indexOf('<body>');
    const bClose = html.lastIndexOf('</body>');
    if (bOpen < 0 || bClose < 0) throw new Error(`${m.id}: <body> etiketi bulunamadı`);
    html = html.slice(0, bOpen + 6) + '\n' + bar + '\n' + html.slice(bOpen + 6, bClose) + TERMS_MARK + seqNav + '\n' + foot + '\n' + LANG_JS + '\n' + html.slice(bClose);
    if (!/<html[^>]*\slang="tr"/.test(html)) throw new Error(`${m.id}: kaynakta <html lang="tr"> bekleniyordu`);
    html = html.replace(/(<html[^>]*\s)lang="tr"/, `$1lang="${L}"`);
    html = html.replace('</head>', alternates(m.path) + '\n' + ICON + '\n' + BAR_CSS + '\n</head>');
    write(join(L, m.path, 'index.html'), html);
  }
}

/* ---------- ana sayfa ve uygulama sayfaları ---------- */
function bookRel(m) { const chs = (m.book || '').match(/CH\d\d/g) || []; return /sonrası/.test(m.book) ? 'ek' : (chs.length > 1 ? 'ortak' : 'ana'); }
function bookMods(ch) {
  const order = { ana: 0, ortak: 1, ek: 2 };
  return M.modules.filter((m) => m.path && ((m.book || '').match(/CH\d\d/g) || []).includes(ch))
    .map((m) => ({ m, rel: bookRel(m) })).sort((a, b) => order[a.rel] - order[b.rel]);
}
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

// sözlük terimlerinin modül bağlantıları: Türkçe görünür metinde (i18n tablolarının Türkçe tarafı) 'match' kalıpları aranır.
// Aday: en az 2 eşleşme (ya da terimin toplam eşleşmesi 4'ten azsa 1). Sıra: terimin bölümüne (docking terimlerinde docking modüllerine) ait olanlar önce, sonra eşleşme sayısı; en çok 5.
const GL = {};
{
  const B = '(?<![a-zçğıöşüâîû0-9])';
  for (const e of GLOS.terms) {
    const counts = {}, enFound = {};
    for (const [id, t] of Object.entries(TXT)) {
      let n = 0; for (const p of e.match) n += (t.tr.match(new RegExp(B + '(?:' + p + ')', 'gu')) || []).length;
      if (n) counts[id] = n;
      let k = 0; for (const p of e.match_en) k += (t.en.match(new RegExp('(?<![a-z0-9])(?:' + p + ')', 'gu')) || []).length;
      if (k) enFound[id] = k;
    }
    const tot = Object.values(counts).reduce((a, b) => a + b, 0);
    const own = (id) => { const m = M.modules.find((x) => x.id === id); return e.ch === 'DK' ? m.app === 'docking' : ((m.book || '').match(/CH\d\d/g) || []).includes(e.ch); };
    const ids = Object.keys(counts).filter((id) => counts[id] >= 2 || tot < 4)
      .sort((a, b) => (own(a) ? 0 : 1) - (own(b) ? 0 : 1) || counts[b] - counts[a] || (a < b ? -1 : 1)).slice(0, 5);
    GL[e.id] = { mods: ids.map((id) => ({ id, main: own(id) })), counts, enFound };
  }
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
<div class="box"><h4>${esc(U.bookH)}</h4><p>${U.bookP}</p><p>${U.bkLink}</p></div>
`));
  for (const a of M.apps) {
    // 0.43.0: modüller düzeye göre üç bölümde, her bölümde kitaptaki bölüm sırasıyla; her modül bir kart ve açık bir düğme
    const mods = M.modules.filter((m) => m.app === a.id);
    const chNum = (m) => { const c = ((m.book || '').match(/CH(\d\d)/) || [])[1]; return c ? +c : 99; };
    const chLabel = (m) => {
      const ids = (m.book || '').match(/CH\d\d/g) || [];
      const nums = ids.map((c) => +c.slice(2));
      if (!nums.length) return esc(T(L, m, 'book'));
      const after = /sonrası|after/.test(T(L, m, 'book'));
      const lab = nums.map((n) => U.chap(n)).join(L === 'tr' ? ' ve ' : ' and ') + (after ? (L === 'tr' ? ' sonrası' : ', after') : '');
      const one = ids.length === 1 ? BOOK.chapters.find((c) => c.id === ids[0]) : null;
      return `<b>${esc(lab)}</b>${one && !after ? ` · ${esc(T(L, one, 'title'))}` : ''}`;
    };
    // 0.43.0: kartın üstünde modüle özel çizim (static/assets/kart/<id>.svg; üreteci assets-src/kart/kart.py). Çizim yoksa koyu zemin ve modül kimliği.
    const art = (m) => {
      const f = `kart/${m.id.toLowerCase()}.svg`;
      const img = existsSync(join(ROOT, 'static', 'assets', f))
        ? `<img src="/assets/${f}" alt="" width="600" height="250" loading="lazy" decoding="async">`
        : `<span class="mc-art-id" aria-hidden="true">${esc(m.id)}</span>`;
      return `<span class="mc-art${img.startsWith('<img') ? '' : ' mc-art-0'}">${img}<span class="mc-lv">${esc(U.level[m.level])}</span></span>`;
    };
    const card = (m) => {
      const goals = (T(L, m, 'goals') || []).slice(0, 2).map((g) => `<li>${esc(g)}</li>`).join('');
      const foot = `<span class="mc-id">${esc(m.id)}${m.version ? ` · ${esc(U.ver)} ${esc(m.version)}` : ''}</span>`;
      if (!m.path) return `<li><div class="mc mc-lv-${esc(m.level)} planned" id="${esc(m.id)}">${art(m)}<div class="mc-b"><p class="mc-ch">${chLabel(m)}</p><h3 class="mc-t">${esc(T(L, m, 'title'))}</h3><ul class="mc-g">${goals}</ul><div class="mc-f">${foot}<span class="tag planned">${esc(U.status.planned)}</span></div></div></div></li>`;
      return `<li><a class="mc mc-lv-${esc(m.level)}" id="${esc(m.id)}" href="/${L}/${m.path}">${art(m)}<div class="mc-b"><p class="mc-ch">${chLabel(m)}</p><h3 class="mc-t">${esc(T(L, m, 'title'))}</h3><ul class="mc-g">${goals}</ul><div class="mc-f">${foot}<span class="mc-btn">${esc(U.open)} <span aria-hidden="true">→</span></span></div></div></a></li>`;
    };
    const levels = ['temel', 'orta', 'uzman'].filter((k) => mods.some((m) => m.level === k));
    const groups = levels.map((k) => {
      const g = mods.filter((m) => m.level === k).map((m, i) => [m, i]).sort((x, y) => chNum(x[0]) - chNum(y[0]) || x[1] - y[1]).map((x) => x[0]);
      return `<section class="lvs lvs-${k}" id="duzey-${k}"><h2><small>${esc(U.lvH[k])} · ${esc(U.nMod(g.length))}</small>${esc(U.lvD[k])}</h2><ul class="mgrid">${g.map(card).join('\n')}</ul></section>`;
    }).join('\n');
    const nav = levels.length > 1 ? `<nav class="lv-nav" aria-label="${esc(U.modsSmall)}">${levels.map((k) => `<a class="lvn lvn-${k}" href="#duzey-${k}"><b>${esc(U.lvH[k])}</b><span>${esc(U.nMod(mods.filter((m) => m.level === k).length))}</span></a>`).join('')}</nav>` : '';
    const extra = a.id === 'md' ? `<details class="box how"><summary>${esc(U.mdH)}</summary><p>${esc(U.mdP)}</p></details>` : '';
    write(join(L, a.path, 'index.html'), page(L, a.path, `${T(L, a, 'title')} · AssayHub Learn`, crumbs(L, a), `
<div class="mast"><p class="eyebrow">AssayHub Learn · ${esc(T(L, a, 'title'))}</p><h1>${esc(T(L, a, 'title'))}</h1><p class="deck">${esc(T(L, a, 'summary'))}</p></div>
${nav}
<p class="lv-hint">${esc(U.appHint)}</p>
${extra}
${groups}
`));
  }
  // kitap sayfası: bölüm -> modül haritası (book.json + modules.json 'book' alanı)
  const lv = ['temel', 'orta', 'ileri'];
  const secs = lv.map((k) => {
    const chs = BOOK.chapters.filter((c) => c.level === k);
    const items = chs.map((c) => {
      const mods = bookMods(c.id).map(({ m, rel }) => `<li><a href="/${L}/${m.path}"><span class="bk-id">${esc(m.id)}</span><span class="bk-t">${esc(T(L, m, 'title'))}</span></a><span class="bk-rel ${rel}">${esc(U.bkRel[rel])}</span><code>/${L}/l/${esc(m.id)}</code></li>`).join('');
      return `<li class="bk-ch" id="${esc(c.id)}"><div class="bk-h"><span class="bk-c">${esc(c.id)}</span><span class="bk-ct">${esc(T(L, c, 'title'))}</span></div><ul class="bk-m">${mods}</ul></li>`;
    }).join('\n');
    return `<h2><small>${esc(U.bkLevel[k])}</small>${esc(chs[0].id)} ${L === 'tr' ? 'ile' : 'to'} ${esc(chs[chs.length - 1].id)}</h2>\n<ul class="bk">${items}</ul>`;
  }).join('\n');
  write(join(L, 'book', 'index.html'), page(L, 'book/', `${U.bkTitle} · AssayHub Learn`, `<a href="/${L}/">${UI[L].learn}</a> › ${esc(U.bkTitle)}`, `
<div class="mast"><p class="eyebrow">${esc(U.bkEyebrow)}</p><h1>${esc(U.bkH1)}</h1><p class="deck">${esc(U.bkDeck)}</p></div>
<div class="box"><h4>${esc(U.bookH)}</h4><p>${U.bookP}</p><p>${U.bkRelP}</p>${U.bkNote ? `<p>${esc(U.bkNote)}</p>` : ''}<p>${U.bkLink.replace(/^.*?\. /, '')}</p></div>
${secs}
`));
  // sözlük sayfası: glossary.json + modül metinlerinde arama (glLinks)
  {
    const trm = (e) => (L === 'en' ? e.en.term : e.tr), alt = (e) => (L === 'en' ? e.en.alt : e.alt), def = (e) => (L === 'en' ? e.en.def : e.def), oth = (e) => (L === 'en' ? e.tr : e.en.term);
    const coll = new Intl.Collator(L, { sensitivity: 'base' });
    const terms = GLOS.terms.slice().sort((a, b) => coll.compare(trm(a), trm(b)));
    const letter = (e) => trm(e).trim().charAt(0).toLocaleUpperCase(L);
    const letters = []; for (const e of terms) { const c = letter(e); if (!letters.includes(c)) letters.push(c); }
    const modTitle = (id) => { const m = M.modules.find((x) => x.id === id); return m ? T(L, m, 'title') : id; };
    const chTitle = (id) => { const c = BOOK.chapters.find((x) => x.id === id); return c ? T(L, c, 'title') : id; };
    let cur = '';
    const items = terms.map((e) => {
      const c = letter(e); const head = c !== cur ? `<span class="gl-anc" id="gl-${esc(c)}"></span>` : ''; cur = c;
      const lk = GL[e.id];
      const mods = lk.mods.map((x) => `<a class="gl-mod${x.main ? ' main' : ''}" href="/${L}/${M.modules.find((m) => m.id === x.id).path}" title="${esc(modTitle(x.id))}">${esc(x.id)}</a>`).join('');
      const chl = e.ch === 'DK' ? `<span class="gl-ch">${esc(U.glDk)}</span>` : `<a class="gl-ch" href="/${L}/book/#${esc(e.ch)}">${esc(U.glCh)}: ${esc(e.ch)} · ${esc(chTitle(e.ch))}</a>`;
      const al = alt(e).length ? `<p class="gl-alt">${esc(U.glAlso)}: ${alt(e).map(esc).join(', ')}</p>` : '';
      const srch = [e.tr, e.en.term, ...e.alt, ...e.en.alt, e.id].join(' ');
      return `<li class="gl-e" id="${esc(e.id)}" data-s="${esc(srch)}">${head}<div class="gl-h"><h3 class="gl-t">${esc(trm(e))}</h3><span class="gl-o"><span class="gl-ol">${esc(U.glOtherL)}:</span> <span lang="${other(L)}">${esc(oth(e))}</span></span></div>${al}<p class="gl-d">${esc(def(e))}</p><p class="gl-m"><span class="gl-ml">${esc(U.glMods)}:</span> ${mods} ${chl}</p></li>`;
    }).join('\n');
    const idx = letters.map((c) => `<a href="#gl-${esc(c)}">${esc(c)}</a>`).join('');
    const js = `<script>(function(){var q=document.getElementById('glq'),n=document.getElementById('gln'),z=document.getElementById('glz'),E=[].slice.call(document.querySelectorAll('.gl-e')),N=E.length;var f=function(s){return s.replace(/İ/g,'i').replace(/I/g,'ı').toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').replace(/ı/g,'i');};var S=E.map(function(e){return f(e.getAttribute('data-s')+' '+e.querySelector('.gl-h').textContent);}),T=E.map(function(e){return f(e.textContent);});var run=function(){var v=f(q.value.trim()),k=0,A=S;if(v&&!S.some(function(s){return s.indexOf(v)>=0;}))A=T;E.forEach(function(e,i){var ok=!v||A[i].indexOf(v)>=0;e.hidden=!ok;if(ok)k++;});n.textContent=${JSON.stringify(U.glCount('§K', '§N'))}.replace('§K',k).replace('§N',N);z.hidden=k>0;};q.addEventListener('input',run);run();})();</script>`;
    write(join(L, 'glossary', 'index.html'), page(L, 'glossary/', `${U.glTitle} · AssayHub Learn`, `<a href="/${L}/">${UI[L].learn}</a> › ${esc(U.glTitle)}`, `
<div class="mast"><p class="eyebrow">${esc(U.glEyebrow)}</p><h1>${esc(U.glH1)}</h1><p class="deck">${esc(U.glDeck(GLOS.terms.length))}</p></div>
<div class="box"><p>${U.glNote}</p><p>${U.bkLink.replace(/ (Terimler|Terms):.*$/, '')}</p></div>
<div class="gl-bar"><label class="gl-q"><span>${esc(U.glSearch)}</span><input id="glq" type="search" placeholder="${esc(U.glPh)}" autocomplete="off"></label><span id="gln" class="gl-n" aria-live="polite">${esc(U.glCount(GLOS.terms.length, GLOS.terms.length))}</span></div>
<nav class="gl-idx" aria-label="${esc(U.glIdx)}">${idx}</nav>
<ul class="gl">${items}</ul>
<p id="glz" class="gl-z" hidden>${esc(U.glNone)}</p>
${js}
`));
  }
  // dile özgü 404
  write(join(L, '404.html'), page(L, null, `${U.nfTitle} · AssayHub Learn`, esc(U.tagline), `
<div class="mast"><p class="eyebrow">404</p><h1>${esc(U.nfH)}</h1><p class="deck">${U.nfP}</p><p class="deck">${U.bkLink}</p></div>`));
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
  lines.push(`/${L}/l/book /${L}/book/ 302`, `/${L}/l/glossary /${L}/glossary/ 302`);
}
lines.push('/tr/kitap /tr/book/ 302', '/tr/kitap/ /tr/book/ 302', '/tr/sozluk /tr/glossary/ 302', '/tr/sozluk/ /tr/glossary/ 302', '/tr/l/sozluk /tr/glossary/ 302');
writeFileSync(join(DIST, '_redirects'), lines.join('\n') + '\n');
writeFileSync(join(DIST, '_routes.json'), JSON.stringify({ version: 1, include: ['/', '/l/*', '/docking', '/docking/*', '/md', '/md/*'], exclude: [] }, null, 2));

// modül sayfalarına "bu modüldeki terimler" kutusu (sözlük bağlantılarının tersi): önce terimin bölümüne ait olanlar, sonra modüldeki eşleşme sayısı
for (const m of M.modules) {
  if (!m.path || !TXT[m.id]) continue;
  for (const L of LANGS) {
    const f = join(DIST, L, m.path, 'index.html'); let h = readFileSync(f, 'utf8');
    if (h.split(TERMS_MARK).length !== 2) throw new Error(`${m.id} ${L}: terim yeri bulunamadı`);
    const U = UI[L], coll = new Intl.Collator(L, { sensitivity: 'base' }), nm = (e) => (L === 'en' ? e.en.term : e.tr);
    const ts = GLOS.terms.map((e) => ({ e, x: GL[e.id].mods.find((y) => y.id === m.id) })).filter((o) => o.x)
      .sort((a, b) => (b.x.main - a.x.main) || (GL[b.e.id].counts[m.id] - GL[a.e.id].counts[m.id]) || coll.compare(nm(a.e), nm(b.e)));
    const box = ts.length ? `<section class="ahl-terms" aria-labelledby="ahl-terms-h"><h2 id="ahl-terms-h">${esc(U.mtH)}</h2><p>${esc(U.mtP)}</p><ul>${ts.map((o) => `<li${o.x.main ? ' class="own"' : ''}><a href="/${L}/glossary/#${esc(o.e.id)}">${esc(nm(o.e))}</a></li>`).join('')}<li><a class="ahl-tall" href="/${L}/glossary/">${esc(U.mtAll)}</a></li></ul></section>\n` : '';
    writeFileSync(f, h.replace(TERMS_MARK, box));
  }
}
writeFileSync(join(DIST, 'modules.json'), JSON.stringify(M, null, 2));
writeFileSync(join(DIST, 'glossary.json'), JSON.stringify({ schema: GLOS.schema, terms: GLOS.terms.map((e) => ({ id: e.id, ch: e.ch, tr: e.tr, en: e.en.term, mods: GL[e.id].mods, counts: GL[e.id].counts, en_found: GL[e.id].enFound })) }, null, 1));
// 0.45.0: site arama motorlarına açıldı; sitemap.xml dist'teki bütün sayfalardan (404 hariç) dil eşleriyle üretilir
{
  const SITE = 'https://learn.assayhub.app';
  const walk = (d) => readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(join(d, e.name)) : [join(d, e.name)]);
  const rels = new Set(LANGS.flatMap((L) => walk(join(DIST, L)).filter((f) => f.endsWith('index.html')).map((f) => f.slice(join(DIST, L).length + 1).replace(/index\.html$/, ''))));
  const urls = [...rels].sort().map((r) => {
    const alt = LANGS.filter((L) => existsSync(join(DIST, L, r, 'index.html'))).map((L) => `<xhtml:link rel="alternate" hreflang="${L}" href="${SITE}/${L}/${r}"/>`).join('');
    return LANGS.filter((L) => existsSync(join(DIST, L, r, 'index.html'))).map((L) => `<url><loc>${SITE}/${L}/${r}</loc>${alt}</url>`).join('\n');
  });
  writeFileSync(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`);
}
writeFileSync(join(DIST, 'version.json'), JSON.stringify({ ...BUILD, languages: LANGS, translations: tableInfo }, null, 2));
console.log(`dist hazır: ${M.modules.filter((m) => m.source).length} modül x ${LANGS.length} dil (İngilizce çeviri: ${enModules}${enMissing.length ? `, eksik: ${enMissing.join(', ')}` : ''}), ${lines.length - 3} kısa adres, commit ${BUILD.commit}`);
