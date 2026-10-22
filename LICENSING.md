# Licensing

**English** | [Türkçe özet aşağıda](#türkçe-özet)

Copyright 2026 Zekeriya Düzgün.

AssayHub Learn uses two licences: one for code and one for educational content. Third-party data keep their own licences. This file says which part of the repository falls under which licence. It is a summary for convenience; the licence texts themselves are what apply.

| Part | Licence | Full text |
|---|---|---|
| Code | Apache License 2.0 (`Apache-2.0`) | [`LICENSE`](LICENSE) |
| Original educational content | Creative Commons Attribution 4.0 International (`CC-BY-4.0`) | [`LICENSES/CC-BY-4.0.txt`](LICENSES/CC-BY-4.0.txt) |
| Third-party data and material derived from them | Their own licences | [`NOTICE.md`](NOTICE.md) |

## Code: Apache-2.0

- Everything in `tools/`, `lib/`, `functions/`, `assets-src/` and `tests/`.
- `static/assets/learn.css`, `static/_headers` and the generated `dist/_redirects` and `dist/_routes.json`.
- The JavaScript and CSS inside the module pages (`<script>` and `<style>` blocks in `sources/*.html` and in the generated pages), except the parts listed under "Not licensed" below.

## Original educational content: CC BY 4.0

Everything that is not code and not third-party material, in particular:

- the text, explanations, exercises, quiz questions, tables and figures of the module pages (`sources/*.html` and the generated pages);
- the English translation tables (`i18n/*.en.json`) and the shared term list (`i18n/GLOSSARY.md`);
- `modules.json`, `book.json` and `glossary.json`;
- the module card drawings in `static/assets/kart/`;
- the documentation (`README.md`, `README.tr.md`, `CONTRIBUTING.md`, `LICENSING.md`, `docs/`, `sources/SOURCES.md`);
- data that the author computed for the modules (for example values reduced from the author's GROMACS and AutoDock Vina runs), as far as they are not covered by a third-party licence (next section).

Suggested attribution: "AssayHub Learn, Zekeriya Düzgün, https://github.com/zduzgun/assayhub-learn, CC BY 4.0", with the module ID (for example MD-PBC) when you reuse a single module, and a note if you changed the material.

## Third-party data

Data taken from or derived from third-party sources keep the licence of that source. [`NOTICE.md`](NOTICE.md) lists the sources, the modules that use them and their conditions. In short:

- PDB structures: CC0 1.0.
- Data derived from ChEMBL (used on the DK-T, DK-U, MD-LIG and MD-ERR pages): CC BY-SA 3.0. If you reuse these data, the share-alike condition applies to them, not CC BY 4.0.
- mdshare alanine dipeptide (ALA2) data: CC BY 4.0, with attribution to that source in addition to this project.

## Not licensed

- **Names and logos.** The names "AssayHub" and "AssayHub Learn" and the icon `static/assets/icon.svg` are not licensed. Apache-2.0 (section 6) and CC BY 4.0 (section 2(b)) do not grant trademark rights. You may say that your work is based on AssayHub Learn, but not present it as AssayHub Learn or as endorsed by its author.
- **The Ala mascot.** The name "Ala", the character design and the drawing code marked "Ala maskot çekirdeği" in `sources/MD-T.html` are not covered by either licence; all rights are reserved.
- **The companion book.** The book *Biyomoleküllerin Moleküler Dinamik Simülasyonu* is not part of this repository and is not covered by these licences.

## Contributions

Contributions are accepted under the licence of the part they change: code under Apache-2.0 (as described in its section 5), content under CC BY 4.0. See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Dates

The licences were chosen by the owner on 22 October 2026. Before that date the repository was publicly visible without a licence.

---

## Türkçe özet

Telif hakkı 2026 Zekeriya Düzgün.

- **Kod** Apache Lisansı 2.0 ile verilir (`LICENSE`): `tools/`, `lib/`, `functions/`, `assets-src/`, `tests/`, `static/assets/learn.css`, `static/_headers` ve modül sayfalarındaki JavaScript ve CSS.
- **Özgün eğitim içeriği** Creative Commons Atıf 4.0 Uluslararası (CC BY 4.0) ile verilir (`LICENSES/CC-BY-4.0.txt`): modül metinleri, alıştırmalar, sınama soruları, şekiller, İngilizce çeviri tabloları, `modules.json`, `book.json`, `glossary.json`, kart çizimleri, belgeler ve yazarın kendi hesapladığı veriler.
- **Üçüncü taraf veriler** kendi lisanslarına tabidir (`NOTICE.md`). ChEMBL'den türetilen veri CC BY-SA 3.0'dır; bu veriyi yeniden kullanan aynı lisansla paylaşır.
- **Lisans dışı kalanlar:** "AssayHub" ve "AssayHub Learn" adları ve `static/assets/icon.svg` simgesi (marka hakkı verilmez); Ala maskotu (ad, karakter tasarımı ve `sources/MD-T.html` içindeki "Ala maskot çekirdeği" çizim kodu; bütün hakları saklıdır); kitabın kendisi (bu depoda değildir).
- **Katkılar** değiştirdikleri bölümün lisansıyla kabul edilir: kod Apache-2.0, içerik CC BY 4.0.
- Bu özet kolaylık içindir; geçerli olan lisans metinleridir. Lisanslar proje sahibi tarafından 22 Ekim 2026'da seçildi.
