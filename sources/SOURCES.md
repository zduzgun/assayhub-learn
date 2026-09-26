# Kaynak prototipler

Bu klasördeki HTML dosyaları MD kitabı deposundaki prototiplerin kopyasıdır (gerçeğin kaynağı: `MD_KİTAP_YAZIMI/book/prototypes/`). Elle düzenlenmez; kitap tarafında güncellenip buraya yeniden kopyalanır. SHA-256 değerleri kopyalandıkları andaki dosyalara aittir.

| Dosya | Kaynak | SHA-256 |
|---|---|---|
| `DK-T.html` | `book/prototypes/DK-T_DOCKING_ETKILESIMLI_PILOT_2026-09-25_v2.html` | `f39ffe23017605b33ee3973c3139d6691218004508c0ecc2b6c1fe34111a5aa1` |
| `DK-O.html` | `book/prototypes/DK-O_DOCKING_3PTB_ETKILESIMLI_PILOT_2026-09-25_v2.html` | `d1571d582c700a667bee7a947d5a598b672dbde387283424c37bac3b8349d9f4` |
| `DK-U.html` | `book/prototypes/DK-U_UZMAN_TARAMA_ETKILESIMLI_PILOT_2026-09-25_v2.html` | `c62e54d81d748fda12efab337a9020aa4e87ffc8631fb149b77e4fa25a28361a` |
| `MD-T.html` | `book/prototypes/CH02_ETKILESIMLI_PROTOTIP_2026-09-25_v2.html` | `bcd88e78ca176981cc5fd89011836b4479579fe8e771420aa5b2c567d94210ef` |
| `MD-O.html` | `book/prototypes/MD-O_UBIKITIN_HAZIRLIK_ETKILESIMLI_PILOT_2026-09-25_v2.html` | `d89304063249eab796349a150a197daf9d24bc52e6d75aa6115c6fb004fcf72e` |
| `MD-U.html` | `book/prototypes/MD-U_ALANIN_DIPEPTIT_ORNEKLEME_ETKILESIMLI_PILOT_2026-09-26_v2.html` | `d60fcbe7616aa200e9c7e4acd64632a3705f49b74952faf0737eea76e679f949` |
| `MD-PBC.html` | `book/prototypes/MD-PBC_PERIYODIK_SINIR_ETKILESIMLI_PILOT_2026-09-26.html` | `949d658292480b038aed73c6ce74c68200f771f921a68265465104f0b6a9afa0` |

Sürüm geçmişi: 0.1.0 (24 Eylül 2026, `*_2026-09-24.html`); 0.1.1 (25 Eylül 2026, `*_2026-09-25_v2.html`): editör incelemesinde bulunan içerik ve bilim sorunlarının düzeltilmesi (bkz. `docs/i18n-review/2026-09-25_*.cozum.md`). Eski sürümler kitap klasöründe değiştirilmeden durur.

MD-O 0.1.0 (25 Eylül 2026): ilk sürüm (yayımlanan ilk kopya `..._2026-09-25.html`, bağımsız gözden geçirmeden sonra `_v2`: 4 fs kayma anlatımı doğrusal uyumla başlar, S2b'de mdrun çağrısının çıkış kodu doğru anlatılır, konum kısıtı ve bağ kısıtı Türkçede ayrı adlandırılır). Gömülü veri paketi `book/cases/ubiquitin_1ubq/learn/md-o_data.json` dosyasından (çıkarım `extract.py`, doğrulama `verify.py`); koşu dosyaları `book/cases/ubiquitin_1ubq/scenarios/` ve `gromacs_trial/`.

MD-U 0.1.0 (26 Eylül 2026): gömülü veri paketi `book/cases/alanine_dipeptide/learn/md-u_data.json` (çıkarım `extract.py`, doğrulama `verify.py`); koşular `book/cases/alanine_dipeptide/pilot/`. MD-PBC 0.1.0 (26 Eylül 2026): veri paketi yok; sayılar tarayıcıda ortak motorla (`assets-src/mdmini.js`, sayfaya `tools/sync-engine.mjs` ile kopyalanır) hesaplanır.
