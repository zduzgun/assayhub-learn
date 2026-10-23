// lib/lang.js birim testleri. check.mjs tarafından da çalıştırılır.
import { decideLang, topLanguage, readCookie, prefixedPath } from '../lib/lang.js';

const cases = [
  // [girdi, beklenen dil, beklenen neden]
  [{}, 'en', 'default'],
  [{ country: 'TR' }, 'tr', 'country'],
  [{ country: 'tr' }, 'tr', 'country'],
  [{ country: 'DE' }, 'en', 'default'],
  [{ country: 'DE', acceptLanguage: 'tr-TR,tr;q=0.9,en;q=0.8' }, 'tr', 'accept-language'],
  [{ country: 'US', acceptLanguage: 'en-US,en;q=0.9,tr;q=0.8' }, 'en', 'default'],
  [{ country: 'US', acceptLanguage: 'en;q=0.5, tr;q=0.9' }, 'tr', 'accept-language'],
  [{ country: 'TR', acceptLanguage: 'en-US' }, 'tr', 'country'],
  [{ country: 'TR', cookie: 'assayhub_lang=en' }, 'en', 'cookie'],
  [{ country: 'DE', cookie: 'x=1; assayhub_lang=tr; y=2' }, 'tr', 'cookie'],
  [{ country: 'DE', cookie: 'assayhub_lang=fr' }, 'en', 'default'],
  [{ country: 'TR', cookie: 'assayhub_lang=' }, 'tr', 'country'],
  [{ acceptLanguage: 'tr;q=0' }, 'en', 'default'],
  [{ acceptLanguage: '*' }, 'en', 'default'],
  [{ acceptLanguage: 'garbage;;q=abc' }, 'en', 'default'],
  [{ country: 'XX', acceptLanguage: 'TR' }, 'tr', 'accept-language'],
  [{ country: 'T1' }, 'en', 'default']
];

export function runLangTests() {
  const fails = [];
  for (const [inp, lang, reason] of cases) {
    const r = decideLang(inp);
    if (r.lang !== lang || r.reason !== reason) fails.push(`${JSON.stringify(inp)} -> ${JSON.stringify(r)}, beklenen ${lang}/${reason}`);
  }
  const extra = [
    [topLanguage('tr-TR,tr;q=0.9'), 'tr'], [topLanguage(''), null], [readCookie('a=1;assayhub_lang=EN'), 'en'],
    [prefixedPath('/', 'tr'), '/tr/'], [prefixedPath('/l/DK-T', 'en'), '/en/l/DK-T'], [prefixedPath('/docking/dk-o/', 'tr'), '/tr/docking/dk-o/'],
    [prefixedPath('/md', 'en'), '/en/md'], [prefixedPath('/book', 'tr'), '/tr/book'], [prefixedPath('/glossary/', 'en'), '/en/glossary/'],
    [prefixedPath('/kitap', 'tr'), '/tr/kitap'], [prefixedPath('/sozluk', 'tr'), '/tr/sozluk'],
    [prefixedPath('/tr/', 'en'), null], [prefixedPath('/assets/learn.css', 'en'), null], [prefixedPath('/lab', 'en'), null]
  ];
  extra.forEach(([got, want], i) => { if (got !== want) fails.push(`ek ${i}: ${JSON.stringify(got)} != ${JSON.stringify(want)}`); });
  return { total: cases.length + extra.length, fails };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { total, fails } = runLangTests();
  fails.forEach((f) => console.error('BAŞARISIZ:', f));
  console.log(`dil testleri: ${total - fails.length}/${total} geçti`);
  process.exit(fails.length ? 1 : 0);
}
