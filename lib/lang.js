// AssayHub dil kuralı (platform kuralı; bkz. docs/superpowers/specs/2026-09-25-iki-dil-design.md, 3. kısım).
// Saf işlev: ağ, zaman ya da rastgelelik kullanmaz; birim testleri tools/test-lang.mjs dosyasındadır.
export const LANGS = ['tr', 'en'];
export const COOKIE = 'assayhub_lang';

export function readCookie(header, name = COOKIE) {
  if (!header) return null;
  for (const part of String(header).split(';')) {
    const i = part.indexOf('=');
    if (i < 0) continue;
    if (part.slice(0, i).trim() === name) return part.slice(i + 1).trim().toLowerCase();
  }
  return null;
}

// Accept-Language başlığından en yüksek ağırlıklı dilin birincil alt etiketini döndürür ("tr-TR;q=0.9" -> "tr").
export function topLanguage(header) {
  if (!header) return null;
  let best = null, bestQ = -1;
  String(header).split(',').forEach((item, idx) => {
    const [tag, ...params] = item.trim().split(';');
    if (!tag || tag === '*') return;
    let q = 1;
    for (const p of params) { const m = p.trim().match(/^q=([0-9.]+)$/); if (m) q = Number(m[1]); }
    if (!(q >= 0 && q <= 1)) return;
    // eşit ağırlıkta ilk sıradaki kazanır
    if (q > bestQ || (q === bestQ && best === null)) { best = tag.toLowerCase().split('-')[0]; bestQ = q; }
    void idx;
  });
  return bestQ > 0 ? best : null;
}

// Sıra: çerez > ülke TR > tarayıcı dili tr > İngilizce.
export function decideLang({ cookie = null, country = null, acceptLanguage = null } = {}) {
  const c = readCookie(cookie);
  if (c && LANGS.includes(c)) return { lang: c, reason: 'cookie' };
  if (country && String(country).toUpperCase() === 'TR') return { lang: 'tr', reason: 'country' };
  if (topLanguage(acceptLanguage) === 'tr') return { lang: 'tr', reason: 'accept-language' };
  return { lang: 'en', reason: 'default' };
}

// Dil öneksiz bir yolu dil önekli yola çevirir. Öneksiz değilse null döndürür.
export function prefixedPath(pathname, lang) {
  if (pathname === '/' || pathname === '') return `/${lang}/`;
  if (/^\/(l|docking|md|book|glossary|kitap|sozluk)(\/|$)/i.test(pathname)) return `/${lang}${pathname}`;
  return null;
}
