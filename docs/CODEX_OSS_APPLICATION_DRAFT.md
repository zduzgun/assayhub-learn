# OpenAI Codex for Open Source: başvuru taslağı

**Durum: taslak. Başvuru gönderilmedi.** Bu dosya proje sahibinin karar vermesi ve metinleri gözden geçirmesi için hazırlandı (21 Ekim 2026). Hiçbir alan sahibinin onayı olmadan forma girilmeyecek.

- Program sayfası: https://developers.openai.com/community/codex-for-oss
- Başvuru formu: https://openai.com/form/codex-for-oss/
- Depo: https://github.com/zduzgun/assayhub-learn

## Program hakkında doğrulananlar

Program sayfası ve bağlı koşullar metni 21 Ekim 2026'da okundu. Buna göre program altı aylık ChatGPT Pro (Codex ile), koşula bağlı Codex Security erişimi ve Codex Open Source Fund'dan pull request incelemesi, bakım otomasyonu ve sürüm iş akışları için API kredisi sunar. Hedef kitle, yaygın kullanılan herkese açık projelerin çekirdek bakımcılarıdır; bu tanıma tam uymayan ama önemli olduğunu düşünen projeler de başvurup gerekçesini açıklayabilir. Değerlendirmede deponun kullanımı, ekosistemdeki önemi ve etkin bakım kanıtı dikkate alınır. Okunan metinde açık bir lisans şartı görülmedi; ancak program açık kaynak projeler içindir.

**Doğrulanamayan:** Başvuru formu bu oturumda açılamadı. Formdaki alanlar, alan sınırları ve zorunlu sorular görülmedi. Aşağıdaki iki soru başlığı ve 500 karakter sınırı proje sahibinin verdiği bilgiye dayanır; göndermeden önce formda denetlenmelidir.

## Güçlü yanlar (depoda doğrulanabilir)

- Depo herkese açık (21 Ekim 2026'da kimlik doğrulamasız klonlandı); canlı önizleme: https://learn.assayhub.app
- 27 modül, her biri Türkçe ve İngilizce sayfayla; 20 kitap bölümü haritası ve 90 terimlik iki dilli sözlük.
- Bağımlılıksız statik yapı: `node tools/build.mjs`; `package.json` ve npm paketi yok.
- Yayın öncesi denetimler (`tools/check.mjs`) ve birim testleri (`node --test`) depoda ve çalışır durumda.
- Hesaplama dürüstlüğü: tarayıcıda çalışan öğretim modelleri ile önceden hesaplanmış GROMACS ve AutoDock Vina sonuçları sayfalarda ve README'de ayrı ayrı belirtilir; hesaplanmamış senaryo "hesaplanmadı" diye gösterilir.
- Üçüncü taraf veri lisansları `NOTICE.md` dosyasında (PDB CC0 1.0, ChEMBL türevi veri CC BY-SA 3.0, mdshare ALA2 CC BY 4.0).
- Bakım kaydı: 25 Eylül ile 15 Ekim 2026 arasında 63 commit (17 ayrı gün); `docs/CHANGELOG.md` içinde 57 numaralı sürüm notu. Commit'lerin 36'sı "Claude" yazar adıyla, 27'si Zekeriya Düzgün adıyla kaydedildi (`git shortlog -sn`).

## Eksikler ve riskler (başvurudan önce bilinmeli)

1. **Lisans yok.** Kod ve özgün eğitim içeriği için lisans seçilmedi; README bütün hakların saklı olduğunu söyler. Lisanssız bir depo, herkese açık olsa da lisans anlamında açık kaynak değildir. Bu, açık kaynak programı için en önemli eksiktir. Karar proje sahibinindir (aşağıya bakın).
2. **Yaygın kullanım kanıtı yok.** Site bilerek arama motorlarına kapalıdır; kullanıcı, indirme, yıldız veya atıf sayısı toplanmadı ve bu belgede verilmedi.
3. **Genç depo, tek bakımcı.** İlk commit 25 Eylül 2026.
4. **Sürüm yok.** Git etiketi ve GitHub sürümü yok; Zenodo arşivi ve DOI yok.
5. **Etkin CI yok.** `.github/workflows` yok; `docs/ci/check.yml` yalnız şablondur.
6. **Bağımsız inceleme yok.** Modüllerin bilimsel ve hedef okur incelemesi yapılmadı.
7. **Çeviriler.** İngilizce sayfalar yapay zeka (Claude) çevirisidir; yazar 9 Ekim 2026'da toplu onay verdi, satır satır insan incelemesi yapılmadı (`reviewed` bütün tablolarda false).
8. **Kitap yayımlanmadı** ve el yazması bu depoda değil.

## Taslak yanıtlar (İngilizce)

### Why does this repository qualify?

```text
AssayHub Learn is a public, bilingual (English and Turkish) set of 27 interactive teaching modules on molecular dynamics and docking, built as dependency-free static pages. It teaches life-science students how to read simulation results: what a number measures and which setup choice it depends on. Precomputed GROMACS and AutoDock Vina results are labelled as precomputed. It is an early pilot with one maintainer, and Codex would help with review, tests and keeping both languages consistent.
```

Karakter sayısı: **494** (sınır 500; Python `len()` ile, boşluklar dahil).

### Anything else we should know?

```text
Status, stated plainly: pilot preview, closed to search engines, no releases or tags, no usage metrics. Development started on 25 September 2026 (63 commits up to 15 October 2026) with substantial AI assistance (Claude). The English pages are AI translations approved by the author but not reviewed line by line. No licence has been chosen yet; I will not describe the project as open source until code and content licences are in place.
```

Karakter sayısı: **437** (sınır 500; Python `len()` ile, boşluklar dahil).

### API kredisi kullanım planı (yalnız plan)

Depoda bugün API kullanan bir otomasyon yoktur. Form API kredisi kullanımını sorarsa aşağıdaki metin **plan** olarak verilebilir; yürürlükteymiş gibi sunulmamalıdır.

```text
Planned, not yet in place: a GitHub Actions workflow that runs the build, the publication checks and the unit tests on every pull request (a template exists in docs/ci/check.yml), plus Codex-assisted review of pull requests and of English and Turkish text consistency. No API-based automation exists in the repository today.
```

Karakter sayısı: **324** (sınır 500; Python `len()` ile, boşluklar dahil).

## Göndermeden önce proje sahibinin kararları

- Kod lisansı ve eğitim içeriği lisansı (ayrı ayrı seçilebilir); katkıların hangi koşulla kabul edileceği.
- Lisans seçildikten sonra README'deki lisans bölümünün ve yukarıdaki "Anything else" taslağının güncellenmesi.
- Başvurunun bugünkü haliyle mi, yoksa lisans, ilk etiketli sürüm ve etkin CI tamamlandıktan sonra mı yapılacağı.
- Formdaki alanların ve karakter sınırlarının formun kendisinde denetlenmesi.

Bu belgede kullanıcı sayısı, kurum, indirme, atıf, yıldız, yayın, DOI veya eğitim başarısı hakkında hiçbir sayı verilmedi; böyle bir veri yoktur.
