// AssayHub Learn çeviri aracı (yaklaşım C: Türkçe kaynak tek kaynaktır; İngilizce yapım anında üretilir).
// Bağımlılık yok. Kullanım:
//   node tools/i18n.mjs extract <KİMLİK>   aday metinleri i18n/_work/<KİMLİK>.candidates.json dosyasına yazar
//   node tools/i18n.mjs check <KİMLİK>     çeviri tablosunu uygular ve denetler; hata varsa çıkış kodu 1
//   node tools/i18n.mjs check              bütün tabloları denetler
// Tablo biçimi (i18n/<KİMLİK>.en.json):
//   { "module": "DK-T", "lang": "en", "source_sha256": "...", "reviewed": false,
//     "checked": "claude" (isteğe bağlı: Claude denetledi, insan gözden geçirmesi bekliyor; alt notu değiştirir),
//     "pairs": [["Türkçe ham metin", "English raw text"], ...], "keep": ["bilerek Türkçe kalan metin"] }
// Anahtarlar kaynaktaki HAM alt dizelerdir (HTML etiketleri ve varlıklar dahil). Uygulama tek geçişte yapılır:
// bütün anahtarlar en uzundan en kısaya sıralanır ve tek bir düzenli ifadeyle değiştirilir; böylece çevrilmiş
// metin yeniden çevrilmez.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const TR_LETTERS = /[çğıöşüÇĞİÖŞÜ]/;
const TR_WORDS = new Set(('ve bir bu şu ile için olarak veya ama fakat çünkü nasıl neden niçin burada şimdi tekrar dene seç seçin ' +
  'başla başlat sıfırla kontrol doğru yanlış görev adım sonraki önceki kutu skor poz cep sonuç tamam evet hayır göster gizle ' +
  'yeni eski iyi kötü daha gibi kadar sonra önce göre değil var yok her hangi olan ise ki mi mı mu mü çok az tüm bütün hepsi ' +
  'bak oku yaz tıkla sürükle kaydır bitti kaldı ile ya ne kez kere ilk son orta temel uzman düzey bölüm kitap kaynak veri koşu').split(/\s+/));
const INLINE = new Set(['b', 'i', 'em', 'strong', 'sub', 'sup', 'span', 'a', 'code', 'small', 'br', 'abbr', 'kbd', 'var', 'mark', 'u', 's', 'q', 'cite', 'wbr', 'bdi']);
const ATTRS = ['title', 'aria-label', 'placeholder', 'alt', 'content', 'data-tip', 'data-label', 'data-title', 'value'];

/* ---------------- JavaScript tarayıcı: dize, şablon, yorum ve kod parçaları ---------------- */
// Dönen parça türleri: 'str' (tırnaklı dize içeriği), 'tmpl' (şablon dizgesinin sabit kısmı), 'comment', 'code'.
export function scanJS(src, base = 0) {
  const out = [];
  let i = 0, codeStart = 0, lastSig = '';
  const n = src.length;
  const stack = []; // şablon içindeki ${ } derinliği için
  const pushCode = (end) => { if (end > codeStart) out.push({ type: 'code', start: base + codeStart, end: base + end }); };
  const regexAllowed = () => lastSig === '' || /[(,=:[!&|?{};+\-*%<>~^]$/.test(lastSig) || /\b(return|typeof|case|do|else|in|of|new|delete|void|throw|yield|await)$/.test(lastSig);
  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === '/' && d === '/') { pushCode(i); const j = src.indexOf('\n', i); const e = j < 0 ? n : j; out.push({ type: 'comment', start: base + i, end: base + e }); i = e; codeStart = i; continue; }
    if (c === '/' && d === '*') { pushCode(i); const j = src.indexOf('*/', i + 2); const e = j < 0 ? n : j + 2; out.push({ type: 'comment', start: base + i, end: base + e }); i = e; codeStart = i; continue; }
    if (c === '"' || c === "'") {
      pushCode(i); let j = i + 1;
      while (j < n && src[j] !== c && src[j] !== '\n') { if (src[j] === '\\') j++; j++; }
      out.push({ type: 'str', start: base + i + 1, end: base + j }); i = j + 1; codeStart = i; lastSig = 'x'; continue;
    }
    if (c === '`' || (c === '}' && stack.length && stack[stack.length - 1] === 0)) {
      // şablon başlangıcı ya da ${ } bitişi: bir sonraki ${ veya ` karakterine kadar sabit metin
      if (c === '}') stack.pop();
      pushCode(i); let j = i + 1, s = j;
      while (j < n) {
        if (src[j] === '\\') { j += 2; continue; }
        if (src[j] === '`') { out.push({ type: 'tmpl', start: base + s, end: base + j }); j++; break; }
        if (src[j] === '$' && src[j + 1] === '{') { out.push({ type: 'tmpl', start: base + s, end: base + j }); j += 2; stack.push(0); break; }
        j++;
      }
      i = j; codeStart = i; lastSig = '('; continue;
    }
    if (stack.length && (c === '{')) stack[stack.length - 1]++;
    if (stack.length && c === '}' && stack[stack.length - 1] > 0) stack[stack.length - 1]--;
    if (c === '/' && regexAllowed()) {
      // düzenli ifade değişmezi
      let j = i + 1, cls = false;
      while (j < n && src[j] !== '\n') { if (src[j] === '\\') { j += 2; continue; } if (src[j] === '[') cls = true; else if (src[j] === ']') cls = false; else if (src[j] === '/' && !cls) break; j++; }
      i = j + 1; while (i < n && /[a-z]/.test(src[i])) i++; lastSig = 'x'; continue;
    }
    if (!/\s/.test(c)) lastSig = (/[A-Za-z0-9_$]/.test(c) ? (lastSig.match(/[A-Za-z0-9_$]*$/)[0] + c) : c);
    i++;
  }
  pushCode(n);
  return out;
}

/* ---------------- HTML tarayıcı ---------------- */
// Dönen parçalar: {type: 'run'|'attr'|'str'|'tmpl'|'comment'|'css', start, end}
export function scanHTML(html) {
  const out = [];
  const re = /<script\b[^>]*>([\s\S]*?)<\/script>|<style\b[^>]*>([\s\S]*?)<\/style>|<!--[\s\S]*?-->|<![^>]*>|<\/?([a-zA-Z][\w-]*)([^>]*)>|[^<]+/g;
  let m, run = null;
  const closeRun = () => { if (run) { out.push({ type: 'run', start: run.start, end: run.end }); run = null; } };
  while ((m = re.exec(html))) {
    const tok = m[0], at = m.index;
    if (m[1] !== undefined) { // script
      closeRun();
      const inner = at + tok.indexOf('>') + 1;
      const isData = /type=["']application\/(json|ld\+json)["']/.test(tok.slice(0, tok.indexOf('>')));
      if (!isData) for (const p of scanJS(m[1], inner)) out.push(p);
      continue;
    }
    if (m[2] !== undefined) { closeRun(); out.push({ type: 'css', start: at, end: at + tok.length }); continue; }
    if (tok.startsWith('<!')) { closeRun(); out.push({ type: 'comment', start: at, end: at + tok.length }); continue; }
    if (m[3] !== undefined) {
      const tag = m[3].toLowerCase();
      // öznitelikler
      const attrRe = /([\w:-]+)\s*=\s*("([^"]*)"|'([^']*)')/g; let a;
      while ((a = attrRe.exec(m[4]))) {
        if (!ATTRS.includes(a[1].toLowerCase())) continue;
        const val = a[3] !== undefined ? a[3] : a[4];
        const vStart = at + 1 + m[3].length + a.index + a[0].indexOf(a[2]) + 1 + (tok[1] === '/' ? 1 : 0);
        if (/\p{L}/u.test(val)) out.push({ type: 'attr', start: vStart, end: vStart + val.length });
      }
      if (INLINE.has(tag)) { if (run) run.end = at + tok.length; else run = { start: at, end: at + tok.length }; continue; }
      closeRun(); continue;
    }
    // metin
    if (!run) run = { start: at, end: at + tok.length }; else run.end = at + tok.length;
  }
  closeRun();
  return out;
}

function trim(html, p) {
  let s = p.start, e = p.end;
  while (s < e && /\s/.test(html[s])) s++;
  while (e > s && /\s/.test(html[e - 1])) e--;
  // baştaki ve sondaki bağımsız satır içi etiketleri koru (anahtar ham olmalı)
  return { ...p, start: s, end: e, text: html.slice(s, e) };
}
export const looksTurkish = (t) => {
  if (TR_LETTERS.test(t)) return true;
  const words = t.replace(/<[^>]*>/g, ' ').toLowerCase().match(/\p{L}+/gu) || [];
  return words.some((w) => TR_WORDS.has(w));
};
const plain = (t) => t.replace(/<[^>]*>/g, ' ').replace(/^[^<>]*>/, ' ').replace(/<[a-zA-Z/][^>]*$/, ' ')
  .replace(/[\w:-]+="[^"]*"?/g, ' ').replace(/&[a-z]+;|&#\d+;/g, ' ');
const isNatural = (t) => /\p{L}{2,}/u.test(plain(t));
// Doğal dil sözcükleri: harf içeren, rakam içermeyen, tamamı büyük harf olmayan, en az 3 harfli belirteçler.
const natWords = (t) => (plain(t).match(/[\p{L}\d]+/gu) || []).filter((w) => !/\d/.test(w) && w.length >= 3 && w !== w.toUpperCase());
// JS dizelerinde kod benzeri değerleri ayıkla (olay adları, sınıf adları, CSS değerleri, yollar).
function jsNatural(t) {
  if (TR_LETTERS.test(t)) return true;
  const p = plain(t).trim();
  if (!p || /:\/\//.test(p) || /^use strict$/.test(p) || /^[#.[(@]/.test(p) || /\d+px\b/.test(p) || /^[\w-]+(,[\w-]+)+$/.test(p)) return false;
  if (/^[\w$.#:%-]+$/.test(p) && !/^[A-ZÇĞİÖŞÜ][a-zçğıöşü]{2,}$/.test(p)) return false; // tek belirteç (ör. 'click', 'aria-pressed')
  if (/^(M|L|C|Q|A|Z|H|V)[\s\d.,MLCQAZHV-]+$/i.test(p)) return false; // SVG yolu
  if (/^(translate|rotate|scale|matrix|rgba?|hsla?|url|calc)\(/.test(p)) return false;
  if (/^[\d\s.px%em,;:#a-f-]*$/i.test(p)) return false;
  if (/[{};]/.test(p) && !/<[a-z]/i.test(p)) return false; // CSS ya da kod parçası
  if (/^[\w-]+(\s+[\w-]+)*$/.test(p) && /-/.test(p) && !/\s\p{Ll}{3,}\s/u.test(' ' + p + ' ')) return false; // sınıf listesi
  return natWords(t).length >= 1 && (natWords(t).length >= 2 || /^[A-ZÇĞİÖŞÜ]/.test(p) || /<[a-z]/i.test(t));
}
// Teknik: çevrilecek doğal sözcük içermeyen metin (ör. "RMSD", "Ser195", "0 ns", "Å").
const technical = (t) => natWords(t).length === 0 && !looksTurkish(t);

export function candidates(html) {
  const seen = new Map();
  for (const p0 of scanHTML(html)) {
    if (p0.type === 'code' || p0.type === 'comment' || p0.type === 'css') continue;
    const p = trim(html, p0);
    if (!p.text || !isNatural(p.text)) continue;
    if ((p.type === 'str' || p.type === 'tmpl') && !jsNatural(p.text)) continue;
    if (p.type === 'attr' && /=/.test(p.text) && !/\s\p{L}{3,}\s/u.test(p.text)) continue;
    if (technical(p.text)) continue;
    const key = p.text;
    const cur = seen.get(key) || { text: key, type: p.type, count: 0, turkish: looksTurkish(key) };
    cur.count++;
    seen.set(key, cur);
  }
  return [...seen.values()];
}

/* ---------------- tablo uygulama ---------------- */
export function loadTable(id, lang = 'en') {
  const f = join(ROOT, 'i18n', `${id}.${lang}.json`);
  if (!existsSync(f)) return null;
  return JSON.parse(readFileSync(f, 'utf8'));
}
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export function applyTable(html, table) {
  const pairs = table.pairs.filter((p) => p[0] !== p[1]);
  const map = new Map(pairs);
  const counts = new Map(pairs.map((p) => [p[0], 0]));
  const keys = [...map.keys()].sort((a, b) => b.length - a.length);
  if (!keys.length) return { html, counts };
  const re = new RegExp(keys.map(reEsc).join('|'), 'g');
  const out = html.replace(re, (k) => { counts.set(k, counts.get(k) + 1); return map.get(k); });
  return { html: out, counts };
}

/* ---------------- denetim ---------------- */
export function checkTable(id, srcHtml, table) {
  const errors = [], warnings = [];
  const seenKeys = new Set();
  for (const [k, v] of table.pairs) {
    if (seenKeys.has(k)) errors.push(`yinelenen anahtar: ${JSON.stringify(k.slice(0, 80))}`);
    seenKeys.add(k);
    if (typeof v !== 'string') errors.push(`çeviri dize değil: ${JSON.stringify(k.slice(0, 80))}`);
    if (!TR_LETTERS.test(k) && k.length < 12 && !/[<>'"`(){}=:]/.test(k)) errors.push(`kısa ve Türkçe harf içermeyen anahtar bağlam içermeli (<, >, tırnak vb.): ${JSON.stringify(k)}`);
    if (v && v.includes('\u2014')) errors.push(`çeviride em-dash var: ${JSON.stringify(v.slice(0, 80))}`);
  }
  const { html, counts } = applyTable(srcHtml, table);
  for (const [k, c] of counts) if (c === 0) errors.push(`eskimiş anahtar (kaynakta yok ya da daha uzun bir anahtarın içinde kalıyor): ${JSON.stringify(k.slice(0, 100))}`);
  const keep = table.keep || [];
  const keepHit = (t) => keep.some((k) => t === k || t.includes(k) && k.length >= 12);
  // Türkçe sözcük dağarcığı: kaynaktaki Türkçe görünümlü metinlerin sözcükleri, İngilizce çevirilerde geçenler hariç.
  const srcCands = candidates(srcHtml);
  const enWords = new Set(table.pairs.flatMap(([, v]) => (plain(v).toLowerCase().match(/\p{L}+/gu) || [])));
  keep.forEach((k) => (plain(k).toLowerCase().match(/\p{L}+/gu) || []).forEach((w) => enWords.add(w)));
  const trVocab = new Set();
  for (const c of srcCands) if (c.turkish) for (const w of natWords(c.text)) { const l = w.toLowerCase(); if (!enWords.has(l)) trVocab.add(l); }
  const srcTexts = new Set(srcCands.map((c) => c.text));
  // 1) çıktıda yorumlar dışında Türkçe harf, değişmeden kalmış kaynak metni ya da Türkçe sözcük kalmamalı
  for (const p of scanHTML(html)) {
    if (p.type === 'comment') continue;
    const t = html.slice(p.start, p.end);
    if (p.type === 'code' || p.type === 'css') {
      const m = t.match(new RegExp('.{0,40}' + TR_LETTERS.source + '.{0,40}'));
      if (m && !keepHit(m[0])) errors.push(`kodda Türkçe harf: ${JSON.stringify(m[0])}`);
      continue;
    }
    const q = trim(html, p);
    if (!q.text || !isNatural(q.text) || keepHit(q.text)) continue;
    if ((p.type === 'str' || p.type === 'tmpl') && !jsNatural(q.text)) continue;
    if (TR_LETTERS.test(q.text)) { errors.push(`Türkçe harf kalmış (${p.type}): ${JSON.stringify(q.text.slice(0, 140))}`); continue; }
    if (!technical(q.text) && srcTexts.has(q.text)) { errors.push(`çevrilmemiş (kaynaktakiyle aynı; çeviri gerekmiyorsa keep listesine ekleyin) (${p.type}): ${JSON.stringify(q.text.slice(0, 140))}`); continue; }
    const hits = natWords(q.text).map((w) => w.toLowerCase()).filter((w) => trVocab.has(w));
    if (hits.length) errors.push(`Türkçe sözcük kalmış [${hits.slice(0, 4).join(', ')}] (${p.type}): ${JSON.stringify(q.text.slice(0, 140))}`);
    if (p.type === 'run' && /\d,\d{1,3}(?!\d)/.test(q.text.replace(/\d{1,3}(,\d{3})+(?!\d)/g, ''))) warnings.push(`ondalık virgül olabilir: ${JSON.stringify(q.text.slice(0, 120))}`);
  }
  // 2) Türkçe yerel ayar kalmamalı
  const loc = html.match(/.{0,30}(toLocale\w*\(\s*['"]tr(-TR)?['"]|NumberFormat\(\s*['"]tr(-TR)?['"]|DateTimeFormat\(\s*['"]tr(-TR)?['"]).{0,20}/g);
  if (loc) for (const l of loc) errors.push(`Türkçe yerel ayar: ${JSON.stringify(l)}`);
  if (/<html[^>]*lang="tr"/.test(html)) { /* lang özniteliği yapı sırasında değiştirilir */ }
  return { errors, warnings, html };
}

export const sha256 = (s) => createHash('sha256').update(s).digest('hex');

/* ---------------- komut satırı ---------------- */
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const [cmd, idArg] = process.argv.slice(2);
  const M = JSON.parse(readFileSync(join(ROOT, 'modules.json'), 'utf8'));
  const mods = M.modules.filter((m) => m.source && (!idArg || m.id === idArg));
  if (!mods.length) { console.error('modül bulunamadı'); process.exit(1); }
  let bad = 0;
  for (const m of mods) {
    const src = readFileSync(join(ROOT, m.source), 'utf8');
    if (cmd === 'extract') {
      const c = candidates(src);
      mkdirSync(join(ROOT, 'i18n', '_work'), { recursive: true });
      const f = join(ROOT, 'i18n', '_work', `${m.id}.candidates.json`);
      writeFileSync(f, JSON.stringify({ module: m.id, source_sha256: sha256(src), total: c.length, turkish: c.filter((x) => x.turkish).length, candidates: c }, null, 1));
      console.log(`${m.id}: ${c.length} aday, ${c.filter((x) => x.turkish).length} Türkçe görünümlü -> ${f}`);
    } else if (cmd === 'check') {
      const t = loadTable(m.id);
      if (!t) { console.log(`${m.id}: tablo yok (İngilizce sayfa "hazırlanıyor" olarak üretilir)`); continue; }
      const r = checkTable(m.id, src, t);
      if (t.source_sha256 && t.source_sha256 !== sha256(src)) r.warnings.unshift('tablo farklı bir kaynak sürümü için hazırlanmış (source_sha256 farklı)');
      r.warnings.forEach((w) => console.log(`${m.id} uyarı: ${w}`));
      r.errors.forEach((e) => console.log(`${m.id} HATA: ${e}`));
      console.log(`${m.id}: ${t.pairs.length} çift, ${r.errors.length} hata, ${r.warnings.length} uyarı`);
      if (r.errors.length) bad++;
      if (process.env.I18N_OUT) { mkdirSync(join(ROOT, 'i18n', '_work'), { recursive: true }); writeFileSync(join(ROOT, 'i18n', '_work', `${m.id}.en.html`), r.html.replace(/<html([^>]*)lang="tr"/, '<html$1lang="en"')); }
    } else { console.error('komut: extract | check'); process.exit(1); }
  }
  process.exit(bad ? 1 : 0);
}
