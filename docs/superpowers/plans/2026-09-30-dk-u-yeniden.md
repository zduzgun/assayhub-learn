# DK-U yeniden yazımı, uygulama planı

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Amaç:** DK-U'yu "Skor neyi sıralar?" sorusuna inen, iki yeni dondurulmuş hesaba (DKUSEED, DKUDECOY) dayanan, iki dilli 0.2.0 sayfası olarak yayımlamak.

**Mimari:** Hesaplar bulutta (`/home/claude/dku/`) Python ile koşar, sonuçlar JSONL. Dondurulmuş `analyze.py` bütün istatistikleri `summary.json`'a yazar; `build_dku.py` sayfa verisini (`data_dku.js`) üretir. Sayfa DK-O kalıbında (markup, head.js, body.js, stats.js) prototiplenir, onaydan sonra siteye taşınır.

**Teknoloji:** Python 3, RDKit 2025.09.6, Meeko 0.8.0, Vina 1.2.7, numpy; tarayıcıda düz JS, Canvas; Playwright testleri; site aracı `tools/build.mjs`, `tools/check.mjs`, `tools/i18n.mjs`.

**Spec:** `docs/superpowers/specs/2026-09-26-temel-kesif-kalibi-design.md` bölüm 16.

## Global Constraints

- Bütün metin Türkçe; İngilizcesi yayında birlikte. Em-dash (U+2014) hiçbir dosyada yok.
- Hesaplanmayan hiçbir sonuç yazılmaz; hesaplanmayan seçimlerde "Bu senaryo hesaplanmadı".
- Protokoller koşulardan önce SHA-256 ile dondurulur; sapmalar RESULTS.md'de "Sapma" başlığıyla.
- Reseptör `rec_nowat.pdbqt`; merkez (−1,759, 14,461, 16,916); kutu 24 Å; gömme tohumu 20260924; MMFF; Meeko; Vina 1.2.7; exhaustiveness 8; 9 poz; tohumlar 20261001-20261005.
- Etkin pKi ≥ 7; S1: katyonik N ile Asp189 CG < 4,0 Å; bootstrap 2.000 örnek, tohum 20261006; ridge λ = 1; 5 kat.
- Tuzak: net yük birebir; ağır atom ±3, logP ±1, H verici ±1, H alıcı ±2, dönebilir bağ ±2; ECFP4 2048 Tanimoto < 0,35 bütün etkinlere; amidin/guanidin yok; 8-40 ağır atom; en çok 10 dönebilir bağ; etkin başına 4.
- ChEMBL verisi CC BY-SA 3.0; sayfada lisans notu (check.mjs kuralı).
- Kimlik öneki s1; kartlar s1c1-s1c5; sınav yedi soru; sürüm 0.2.0.
- Eski DK-U dosyaları ve kitaptaki eski prototipler değiştirilmez; kitaba yeni tarihli kopyalar yazılır.

## Review Focus

1. Docking'i başarısız olan bileşik (`error` alanlı kayıt): analizden ve sayfadan dışlanır, sayısı gösterilir; hiçbir grafik NaN çizmez.
2. Süzgeç sonrası 3'ten az nokta ya da tek etkin/tuzak: korelasyon ve AUC "hesaplanamaz" yazar, sayı uydurmaz.
3. Sansürlü pKi (`censored: true`): korelasyonlara girmez, grafikte ayrı işaretle görünür.
4. Eşit skorlar: AUC eşitlikte 0,5 katkı verir (Mann-Whitney), JS ve Python aynı sonucu verir.
5. 390 px genişlik ve azaltılmış hareket: taşma yok, köprü canlandırması durur.

---

### Task 1: 24 Eylül verisini buluta almak ve denetlemek

**Files:**
- Create: `/home/claude/dku/screen/` (cihazdan: library.json, analysis.json, analysis.py, curate.py, dock_library.py, protonate.py, rec_nowat.pdbqt, results.jsonl, chembl_ki_raw.json, chembl_d2_ki_raw.json)
- Create: `/home/claude/dku/inputs.sha256`

- [ ] Stage the ten files from `book/cases/trypsin_3ptb/screen/`; copy into `/home/claude/dku/screen/`.
- [ ] Verify: `library.json` 198 bileşik (144 tripsin, 54 d2_decoy); `results.jsonl` 198 satır; `rec_nowat.pdbqt` SHA-256'sı `/home/claude/dko` ve DKTGRID girdisiyle aynı. Expected: üç denetim geçer; `inputs.sha256` yazılır.
- [ ] `analysis.py`'den zayıf set tanımını oku ve not et (Task 4 protokolüne aynen girer). Expected: tanım 28 bileşik verir.

### Task 2: DKUSEED protokolü ve koşucu

**Files:**
- Create: `/home/claude/dku/DKUSEED/PROTOCOL.md`, `PROTOCOL.sha256`, `run_seed.py`, `test_run_seed.py`
- Output: `results.jsonl`, `run.log`

**Interfaces:**
- Produces: `run_seed.py --lib <library.json> --set-filter <all|decoy> --out <results.jsonl>`; kayıt şeması `{id, set, seed, exh, torsdof, scores[9], score, inter, terms{gauss1,gauss2,repulsion,hydrophobic,hbond}, cat_asp, s1, pose_xyz, pose_elem, pose_bonds, t_sec}` ya da `{id, set, seed, error}`. Yeniden başlatılabilir (`(id, seed)` çifti varsa atlar).

- [ ] Test yaz: `test_benzamidine_seed1` benzamidin kaydı için `score` −7 ile −5 arası, `s1 == True`, `cat_asp < 4.0`; `test_resume` aynı çıktıya ikinci koşu yeni satır eklemez.
- [ ] Testi koş, başarısız olduğunu gör (dosya yok).
- [ ] `run_seed.py`'yi 24 Eylül `dock_library.py` hazırlığıyla yaz (gömme, MMFF, Meeko, S1 SMARTS aynı; exhaustiveness 8; tohum döngüsü; terim ayrıştırması aynı yöntem).
- [ ] Testler geçer. PROTOCOL.md yaz (spec 16'dan parametreler, analiz planına bağlantı), SHA-256 dondur.
- [ ] Arka planda başlat: `nohup python3 run_seed.py --lib ../screen/library.json --set-filter all --out results.jsonl > run.log 2>&1 &`. Expected: 990 satır hedefi; ilk 10 satırın süresinden kalan süre tahmini.

### Task 3: DKUDECOY havuzu, seçimi ve koşusu

**Files:**
- Create: `/home/claude/dku/DKUDECOY/PROTOCOL.md`, `PROTOCOL.sha256`, `pool_raw/*.json`, `select_decoys.py`, `test_select.py`, `decoys.json`, `library_decoy.json`
- Output: `results.jsonl` (run_seed.py ile)

**Interfaces:**
- Consumes: `run_seed.py` (Task 2), `protonate.py` (24 Eylül).
- Produces: `select_decoys(actives: list[dict], pool: list[dict]) -> (decoys: list[dict], unmatched: list[str])`; tuzak kaydı `{id, smiles, smiles_ph74, charge, ha, logp, hbd, hba, rotb, maxsim, matched_to, source_target, set:'matched_decoy'}`.

- [ ] Hedef listesini protokole sabitle (tripsinle ilgisi bilinmeyen, farklı ailelerden; katyonik ligandlı aminerjik GPCR'lar dahil, D2 hariç) ve PROTOCOL.md'yi havuz alınmadan önce dondur.
- [ ] ChEMBL bağlayıcısıyla her hedef için pChEMBL ≥ 6 kayıtları al, `pool_raw/<hedef>.json` olarak sakla.
- [ ] Test yaz: `test_constraints` her seçilen tuzakta yük eşit, |Δha| ≤ 3, |ΔlogP| ≤ 1, |Δhbd| ≤ 1, |Δhba| ≤ 2, |Δrotb| ≤ 2, `maxsim < 0.35`, amidin/guanidin yok, tekrar yok; `test_unmatched_reported` uygun aday yoksa etkin `unmatched` listesine düşer.
- [ ] Testi koş, başarısız gör; `select_decoys.py`'yi yaz (ölçeklenmiş uzaklıkla en yakın, açgözlü, etkin sırası library sırası); testler geçer.
- [ ] Seç, `decoys.json` ve `library_decoy.json` yaz; eşleşmeyen etkin sayısını RESULTS'a not et. DKUSEED bittikten sonra ya da ona paralel (2 çekirdek) koş.

### Task 4: Dondurulmuş analiz

**Files:**
- Create: `/home/claude/dku/ANALYSIS/PLAN.md` (+sha), `analyze.py`, `test_analyze.py`, `summary.json`, `RESULTS.md` (+sha)

**Interfaces:**
- Consumes: DKUSEED ve DKUDECOY `results.jsonl`, `screen/library.json`, `decoys.json`.
- Produces: `summary.json` anahtarları: `seed_noise{per_cpd, median_sd, pair_flip}`, `corr{pearson, spearman, ci, partial_ha, n}`, `within_doc[{doc,n,spearman}]`, `auc{weak,d2,matched: {auc, ci, n_act, n_dec}}`, `null_auc{ha,charge,logp: {weak,d2,matched}}`, `s1_filter_auc`, `ridge{random, grouped, null}`, `vs_sept{diff_median, n}`; `n_error`.

- [ ] PLAN.md'yi spec 16 analiz planından yaz, koşular bitmeden dondur.
- [ ] Test yaz: `test_auc_ties` ([1,2,2],[2,3]) için 0,1667 ya da elle hesaplanan değer, eşitlik 0,5; `test_partial_corr` bilinen üç değişkenli örnek; `test_ridge_grouped_no_leak` bir grubun hem eğitim hem sınamada olmadığı.
- [ ] Testi koş, başarısız gör; `analyze.py`'yi yaz; testler geçer.
- [ ] Bütün koşular bitince çalıştır; RESULTS.md'ye sonuçları ve sapmaları yaz, SHA-256 dondur.

### Task 5: Sayfa verisi ve istatistik modülü

**Files:**
- Create: `/home/claude/dku/learn/build_dku.py`, `data_dku.js`, `stats.js`, `stats_test.mjs`

**Interfaces:**
- Produces: `var DU={cpd:[{id,set,pki,cens,doc,ha,charge,logp,score,sd,rng,s1n,terms,sept}], dec:[...], sum:<summary.json alt kümesi>}`; `stats.js`: `pearson(x,y)`, `spearman(x,y)`, `partial(x,y,z)`, `auc(act,dec)` (düşük skor iyi), `ridgeCV(X,y,groups,lam,k)`; 3'ten az noktada `null` döner.
- [ ] Test yaz (`stats_test.mjs`): tam sette JS değerleri `summary.json` ile 1e-6 içinde; 2 noktada `null`.
- [ ] Başarısız gör; yaz; geçer.

### Task 6: Prototip sayfa

**Files:**
- Create: scratchpad `dku/markup.html`, `head.js`, `body.js`, `build.sh`, `dku.html`, `t.mjs`

**Interfaces:**
- Consumes: `data_dku.js`, `stats.js`.

- [ ] Bölümler spec 16'daki sırayla: köprü (tek doz/doz-yanıt, etiketli öğretim modeli), atölye (skor-pKi, renk, yayın süzgeci, okumalar, s1c1, s1c2), tezgâh (tuzak seti, ROC, dağılımlar, sıfır modeller, S1 süzgeci, s1c3, s1c4), defter (ağırlıklar, rastgele/gruplu, s1c5), proteine dönüş, yedi soru, kaynaklar, CC BY-SA notu.
- [ ] `t.mjs`: 1280 ve 390 px; konsol hatası yok; taşma yok; Review Focus 1-5 için birer test (hata sayısı görünür; 2 noktalı süzgeçte "hesaplanamaz"; sansürlü nokta ayrı; azaltılmış harekette canlandırma yok); kartlar okurun sayılarıyla açılır; em-dash yok.
- [ ] Artifact olarak yayımla, proje sahibine göster. Onay gelene kadar Task 7 başlamaz.

### Task 7: Siteye taşıma, İngilizce, yayın, kitap

**Files:**
- Modify (bulut depo): `sources/DK-U.html`, `i18n/DK-U.en.json`, `modules.json`, `docs/CHANGELOG.md`, `docs/ARCHITECTURE.md`, `sources/SOURCES.md`, spec 16 yayın notu
- Create: `i18n/_work/dku_en_a.py`, `dku_en_b.py`, `build_DK-U_en.py`; `tools/dku2_test.mjs`

- [ ] DK-O kalıbıyla: markupSite + markupSite_en (aynı satır sayısı), çeviri betikleri, `node tools/i18n.mjs check DK-U` 0 hata.
- [ ] `node tools/build.mjs && node tools/check.mjs` geçer; `dku2_test.mjs` iki dilde geçer.
- [ ] Commit (trailer'larla), cihaz eşitleme (HEAD~1 özetleri), push, canlı doğrulama (version.json, dört sayfa SHA-256).
- [ ] Kitap kopyaları: `book/prototypes/DK-U_SKOR_NEYI_SIRALAR_<tarih>.html`; `book/cases/trypsin_3ptb/scenarios/DKUSEED/`, `DKUDECOY/`, `DKUANALYSIS/`; `book/cases/trypsin_3ptb/learn/dku/`. Proje belgesi `claude/DK-U_skor_neyi_siralar_<tarih>.md`.
