# Kaynak prototipler

Bu klasördeki HTML dosyaları MD kitabı deposundaki prototiplerin kopyasıdır (gerçeğin kaynağı: `MD_KİTAP_YAZIMI/book/prototypes/`). Elle düzenlenmez; kitap tarafında güncellenip buraya yeniden kopyalanır. SHA-256 değerleri kopyalandıkları andaki dosyalara aittir.

| Dosya | Kaynak | SHA-256 |
|---|---|---|
| `DK-T.html` | `book/prototypes/DK-T_DOCKING_ETKILESIMLI_PILOT_2026-09-25_v2.html` | `f39ffe23017605b33ee3973c3139d6691218004508c0ecc2b6c1fe34111a5aa1` |
| `DK-O.html` | `book/prototypes/DK-O_DOCKING_3PTB_ETKILESIMLI_PILOT_2026-09-25_v2.html` | `d1571d582c700a667bee7a947d5a598b672dbde387283424c37bac3b8349d9f4` |
| `DK-U.html` | `book/prototypes/DK-U_UZMAN_TARAMA_ETKILESIMLI_PILOT_2026-09-25_v2.html` | `c62e54d81d748fda12efab337a9020aa4e87ffc8631fb149b77e4fa25a28361a` |
| `MD-T.html` | `book/prototypes/MD-T_ENERJI_KUVVET_KESIF_2026-09-26.html` | `1d619cb6836c6c49bbade589128e14c863719448b7359979fe44634de09e8c89` |
| `MD-O.html` | `book/prototypes/MD-O_UBIKITIN_HAZIRLIK_ETKILESIMLI_PILOT_2026-09-25_v2.html` | `d89304063249eab796349a150a197daf9d24bc52e6d75aa6115c6fb004fcf72e` |
| `MD-U.html` | `book/prototypes/MD-U_ALANIN_DIPEPTIT_ORNEKLEME_ETKILESIMLI_PILOT_2026-09-26_v2.html` | `d60fcbe7616aa200e9c7e4acd64632a3705f49b74952faf0737eea76e679f949` |
| `MD-PBC.html` | `book/prototypes/MD-PBC_KENARSIZ_KUTU_2026-09-27.html` | `c35dd8ba0650edd380e646f319bb557ae4fe5079d839619e1b58756d8849d66e` |

Sürüm geçmişi: 0.1.0 (24 Eylül 2026, `*_2026-09-24.html`); 0.1.1 (25 Eylül 2026, `*_2026-09-25_v2.html`): editör incelemesinde bulunan içerik ve bilim sorunlarının düzeltilmesi (bkz. `docs/i18n-review/2026-09-25_*.cozum.md`). Eski sürümler kitap klasöründe değiştirilmeden durur.

MD-O 0.1.0 (25 Eylül 2026): ilk sürüm (yayımlanan ilk kopya `..._2026-09-25.html`, bağımsız gözden geçirmeden sonra `_v2`: 4 fs kayma anlatımı doğrusal uyumla başlar, S2b'de mdrun çağrısının çıkış kodu doğru anlatılır, konum kısıtı ve bağ kısıtı Türkçede ayrı adlandırılır). Gömülü veri paketi `book/cases/ubiquitin_1ubq/learn/md-o_data.json` dosyasından (çıkarım `extract.py`, doğrulama `verify.py`); koşu dosyaları `book/cases/ubiquitin_1ubq/scenarios/` ve `gromacs_trial/`.

MD-U 0.1.0 (26 Eylül 2026): gömülü veri paketi `book/cases/alanine_dipeptide/learn/md-u_data.json` (çıkarım `extract.py`, doğrulama `verify.py`); koşular `book/cases/alanine_dipeptide/pilot/`. MD-PBC 0.1.0 (26 Eylül 2026): veri paketi yok; sayılar tarayıcıda ortak motorla (`assets-src/mdmini.js`, sayfaya `tools/sync-engine.mjs` ile kopyalanır) hesaplanır.

MD-T 0.2.0 (26 Eylül 2026): temel keşif kalıbıyla yeniden yazıldı (kitap tarafında `book/prototypes/MD-T_ENERJI_KUVVET_KESIF_2026-09-26.html`; önceki `CH02_ETKILESIMLI_PROTOTIP_2026-09-25_v2.html` değiştirilmedi). Laboratuvar 3'ün gömülü verisi `book/cases/alanine_dipeptide/learn/mdt_kayit.json`: pilot 1. koşu (GROMACS 2026.3, protokol SHA-256 `PROTOCOL.sha256`'da), φ ve ψ `gmx angle` çıktısından 1 ps aralıkla, 0,01° tamsayı; çıkarım `mdt_kayit.py`, bağımsız referans `mdt_ref.py`, test `test_mdt_kayit.py`. Başlangıç yapısı mdshare ALA2 (CC BY 4.0). Defterdeki beklenen Arrhenius eğimleri (H 2,86, C 2,93, CH₃ 2,87, kalıntı 2,90 kJ/mol) `tools/mdt_arrhenius.mjs 40` ile yeniden üretilir.

MD-PBC 0.2.0 (27 Eylül 2026): temel keşif kalıbıyla Laboratuvar 1 "Kenarsız kutu". Veri paketi yok; sayılar tarayıcıda sayfanın kendi iki boyutlu Lennard-Jones motoruyla hesaplanır (mdmini kullanılmaz). Proteine dönüş bölümündeki su ve atom sayıları bu projenin 1UBQ hazırlığıyla ayarlandı (`book/cases/.../gromacs_trial`: editconf -d 1.0 -bt dodecahedron, 5.902 su, 18.937 atom; dar kutu senaryosu S3: -d 0.5, 3.378 su). RTX 5080 hız tahmini Exxact'in AMBER 26 ölçümlerinden (JAC, FactorIX, Cellulose, STMV) ara değerlemedir; kaynak bağlantısı sayfada.
