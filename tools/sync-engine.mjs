// Ortak motoru (assets-src/mdmini.js) sayfalardaki işaretli bölgeye kopyalar:
//   <script>/* mdmini:begin */ ... /* mdmini:end */</script>
// Kullanım: node tools/sync-engine.mjs [--check]   (--check: yalnız denetler, farklıysa çıkış kodu 1)
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENGINE = readFileSync(join(ROOT, 'assets-src', 'mdmini.js'), 'utf8').trim();
const RE = /\/\* mdmini:begin \*\/[\s\S]*?\/\* mdmini:end \*\//;
export function engineRegion() { return `/* mdmini:begin */\n${ENGINE}\n/* mdmini:end */`; }
export function checkSources() {
  const bad = [], used = [];
  for (const f of readdirSync(join(ROOT, 'sources')).filter((f) => f.endsWith('.html'))) {
    const s = readFileSync(join(ROOT, 'sources', f), 'utf8');
    if (!RE.test(s)) continue;
    used.push(f);
    if (s.match(RE)[0] !== engineRegion()) bad.push(f);
  }
  return { bad, used };
}
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const check = process.argv.includes('--check');
  let changed = 0;
  for (const f of readdirSync(join(ROOT, 'sources')).filter((f) => f.endsWith('.html'))) {
    const p = join(ROOT, 'sources', f), s = readFileSync(p, 'utf8');
    if (!RE.test(s)) continue;
    const t = s.replace(RE, () => engineRegion());
    if (t !== s) { changed++; if (!check) writeFileSync(p, t); console.log((check ? 'farklı: ' : 'güncellendi: ') + f); }
  }
  if (check && changed) process.exit(1);
  console.log(check ? 'motor bölgeleri güncel' : `${changed} sayfa güncellendi`);
}
