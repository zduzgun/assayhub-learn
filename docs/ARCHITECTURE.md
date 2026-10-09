---
title: "AssayHub Learn: etkileşimli eğitim modülleri mimari ve konumlandırma belgesi"
belge_kimligi: AHL-ARCH-v0.1
tarih: 2026-09-25
statu: AUTHOR_DRAFT_PROPOSAL
kapsam: MD kitabının etkileşimli prototiplerini AssayHub içinde ayrı bir eğitim bölümüne (Learn) taşımak; önce Docking, sonra MD simülasyon uygulaması
karar_bekleyen: kalıcı adres altyapısı, Zenodo hesabı, depo konumu, MD veri seti seçimi
---

# AssayHub Learn: mimari ve konumlandırma

Bu belge, MD kitabı için üretilen etkileşimli prototipleri (DK-T, DK-O, DK-U) AssayHub içinde ayrı bir "Learn" bölümüne taşımanın planıdır. İki uygulama öngörülür: önce **Docking**, sonra **MD simülasyon**. Kitap en son yazıldığında bölümler karekodlarla bu uygulamalara gönderme yapar. Belge bir yazar taslağıdır; kod veya ürün kararı değildir.

## 1. Amaç ve konumlandırma

AssayHub yol haritasında dört kurucu araç analiz aracıdır (CytoMove, BlotForge, figür, biyoistatistik). Learn bunlardan ayrı, üçüncü bir kategoridir: **veri üretmeyen, hesap çalıştırmayan, tarayıcıda çalışan eğitim modülleri.** Bu ayrım önemlidir çünkü:

- Ürün kimliğini korur: analiz araçları "kendi verini işle", Learn "kavramı uygulayarak öğren" der. İkisi karışmaz.
- Yol haritasını az zorlar: Learn sunucu, iş kuyruğu, hesaplama maliyeti gerektirmez; CytoMove ve BlotForge takvimini kaydırmaz.
- Ürün anayasasına uyar: eğitim içeriği ücretsiz çekirdektir. İleride Hermes tabanlı bir "yapay zekâ öğretmen" katmanı kredili bir ek olabilir, ama modüllerin kendisi hep ücretsiz kalır.

Learn, AssayHub'ın akademik etki ve atıf amacına doğrudan hizmet eder: kitabın okuru uygulamayı kullanır, uygulama kitabı ve AssayHub'ı tanıtır.

## 2. İki uygulama, tek tasarım sistemi

**Docking (önce).** Üç düzeyi tek bir uygulamada birleştirir: temel (poz ve skor), orta (gerçek 3PTB yapısı ve hazırlık), uzman (skor ve afinite, tarama). Kaynak zaten hazır (DK-T, DK-O, DK-U prototipleri).

**MD simülasyon (sonra).** Tarayıcıda gerçek MD çalışmaz. Bunun yerine **rehberli yeniden oynatma** modeli kullanılır (bkz. 5. kısım): kullanıcı bir MD koşusunu adım adım başlatır, ilerleme metni gerçekçi biçimde akar, ve sonunda önceden hesaplanmış gerçek trajektori verisi (1UBQ, alanin dipeptit) etkileşimli olarak incelenir. Kullanıcı "kendisi çalıştırmış" gibi hisseder; sayfanın altındaki bir bilgilendirme bunun bir simülasyon olduğunu ve verinin kaynağını açıkça söyler.

Her iki uygulama da kitabın tasarım sistemini kullanır (Georgia serif, `--paper:#faf9f5`, `--ink:#243744`, `--accent:#934b3c`; açık tema). Maskot Ala her ikisinde de vardır. Böylece kitap, site ve uygulamalar tek bir görsel dil konuşur.

## 3. Modül kimlikleri (şimdi sabitlenmeli)

Kitap ile uygulama arasında sonradan uyumsuzluk çıkmaması için kimlikler şimdi dondurulur. Her modülün kısa, kalıcı bir kimliği vardır; kitap bu kimliğe karekodla gönderir.

| Kimlik | Uygulama | Düzey | Kitap bağlantısı | Durum |
|---|---|---|---|---|
| DK-T | Docking | Temel | CH02 sonrası (bir pozu bulmak ve doğrulamak) | Yayında (0.2.0, 30 Eylül 2026) |
| DK-O | Docking | Orta | CH07–CH09 (sonuç kilidin hangi ayrıntısına bağlı?) | Yayında (0.2.0, 30 Eylül 2026; çapraz docking sonraki sürümde) |
| DK-U | Docking | Uzman | CH18–CH19 | Prototip hazır |
| MD-T | MD | Temel | CH02 (enerji, kuvvet, integrasyon) | Prototip var (CH02 etkileşimli) |
| MD-EQ | MD | Orta | CH11 (minimizasyon ve dengeleme) | Yayında (0.1.0, 28 Eylül 2026) |
| MD-O | MD | Orta | CH07 (1UBQ hazırlık) | Yayında (0.2.1, 29 Eylül 2026: protonasyon ve yük) |
| MD-PDB | MD | Orta | CH07 (yapı dosyası: doluluk, B faktörü, kristal suları) | Yayında (0.1.0, 29 Eylül 2026) |
| MD-DT | MD | Orta | CH02 (proteinde zaman adımı: kısıtlar, kütle, hız) | Yayında (0.1.0, 29 Eylül 2026) |
| MD-U | MD | Uzman | CH17 (örnekleme ve belirsizlik) | Yayında (0.2.0, 29 Eylül 2026) |
| MD-ENS | MD | Temel | CH03 (topluluk, dağılım ve ortalama) | Yayında (0.2.0, 1 Ekim 2026) |
| MD-CON | MD | Temel | CH05 (termostat ve barostat seçimi, neden kaydı) | Yayında (0.1.0, 3 Ekim 2026) |
| MD-REP | MD | Temel | CH06 (karşılaştırma, tekrar ve kontrol tasarımı) | Yayında (0.1.0, 4 Ekim 2026) |
| MD-Q | MD | Temel | CH01 (biyolojik sorudan ölçülebilir niceliğe ve iddiaya) | Yayında (0.1.0, 4 Ekim 2026) |
| MD-TRJ | MD | Orta | CH13 (trajektoriyi analize hazırlamak: PBC, seçim, hizalama, birim) | Yayında (0.1.0, 4 Ekim 2026) |
| MD-MET | MD | Orta | CH14 (yapısal ölçüt neyi ölçer: RMSD, Rg, RMSF ve yorum sınırı) | Yayında (0.1.0, 4 Ekim 2026) |
| MD-PCA | MD | Orta | CH16 (durumlar ve kolektif hareketler: durum tanımı, PCA, korelasyon) | Yayında (0.1.0, 5 Ekim 2026) |
| MD-INT | MD | Orta | CH15 (temas, solvatasyon, etkileşim: H-bağı, tuz köprüsü, temas, SASA, çözücü kabuğu) | Yayında (0.1.0, 5 Ekim 2026) |
| MD-FAIL | MD | Orta | CH12 (simülasyon başarısız olduğunda: grompp ve mdrun hata mesajları, sessiz kurulum hataları, koşu sağlık denetimi) | Yayında (0.1.0, 5 Ekim 2026) |
| MD-FF | MD | Orta | CH08 (kuvvet alanı ve model uyumu: dört kuvvet alanında konformasyon dağılımı, Karplus ile J, su modelleri, uyumsuz birleşimler) | Yayında (0.1.0, 6 Ekim 2026) |
| MD-SOLV | MD | Orta | CH10 (çözgen ortamı: genion sayımı ve derişim basamakları, hedef ile gerçekleşen derişim, NaCl g(r) ve temas iyon çifti, açısız urea.itp, 8 M ürede peptit çevresi ve konformasyon hükmü) | Yayında (0.1.0, 6 Ekim 2026) |
| MD-LIG | MD | Orta | CH09 (ligand parametreleri ve kökeni: atom türleri, yük yöntemi, net yük denetimi, parmchk2 ceza puanları, RESP ve EspalomaCharge, altı modelle kompleks MD, LIE ve B-faktörüyle deney karşılaştırması) | Yayında (0.1.0, 7 Ekim 2026) |
| MD-ERR | MD | Uzman | CH18 (hata çubuğu ve dürüst karşılaştırma: qPCR ΔΔCt köprüsü, koşu içi hata ile tekrarlar arası yayılım, blok gezgini, LIE ΔG belirsizlik bütçesi, aynıyla aynı karşılaştırma ve sözde tekrar, analiz seçeneklerinin spesifikasyon eğrisi) | Yayında (0.1.0, 8 Ekim 2026) |
| MD-REPRO | MD | Uzman | CH24 (yeniden üretim ve savunulabilir çalışma: MIQE köprüsü, iddiadan ölçüte, aynı md.tpr ile yeniden üretim deneyi, kelebek sahnesi, ilk basamak sayacı, kayan nokta laboratuvarı, Ramachandran yarışı, tarayıcıda SHA-256 ve özet ızgarası, haklar akışı) | Yayında (0.1.0, 8 Ekim 2026) |
| MD-FES | MD | Uzman | CH19 (standart MD'nin ötesine karar vermek: nüfus oranı köprüsü, sorudan yönteme kartları, seyrek olay şeritleri, φ boyunca AWH ile bias, profil animasyonu, kaba taneli ve ML karar kartları; 0.2.0'da 12 ns'lik AWH izlemesi) | Yayında (0.2.0, 9 Ekim 2026) |

Kimlikler değişmez; içerik sürümlenir (DK-T v1, v2 ...). Bir modülün adresi kimliğe bağlıdır, sürüme değil.

## 4. Kalıcı adres ve karekod şeması

Basılı kitap yıllarca yaşar; bağlantılar kolayca ölür. Bu yüzden karekodlar doğrudan bir sayfa adresine değil, **Zekeriya'nın denetlediği kalıcı bir yönlendirme katmanına** gider.

- **Kısa adres (karekodda basılı olan):** `assayhub.<alan>/l/DK-T` gibi. Bu adres bir yönlendirme tablosuna bakar ve o modülün güncel sürümüne gönderir. Sayfa taşınsa, yeniden yazılsa bile karekod değişmez; yalnız tablo güncellenir.
- **Sürümlü sayfa adresi:** `assayhub.<alan>/learn/docking?m=DK-T&v=2` gibi. Yönlendirme buraya çözülür.
- **Arşiv (atıf için):** Her modülün her yayımlanan sürümü Zenodo'ya yüklenir ve bir DOI alır. Kitap, karekodun yanında bu DOI'yi de basabilir. Böylece site bir gün kapansa bile modül arşivden erişilebilir ve atıf yapılabilir kalır.
- **Çevrimdışı yedek:** Her modül tek dosyalık, sunucusuz HTML olarak da dışa aktarılabilir (prototipler zaten böyle). Kitabın ek materyali olarak bir arşivde (Zenodo) tutulursa, internet olmadan da açılır.

- **Kitap sayfası (9 Ekim 2026):** `/tr/book/` ve `/en/book/` (ayrıca `/tr/kitap`, `/tr/l/book`, `/en/l/book`) 20 çalışma birimini düzey düzey ve her birine bağlı modülleri (ana, ortak, ek) kısa adresleriyle listeler. Bölüm listesi `book.json`'da, modül-bölüm ilişkisi `modules.json` `book` alanından üretilir; `tools/check.mjs` her bölümün en az bir modülü olduğunu ve modüllerin bölümlerinin `book.json`'da bulunduğunu denetler.
- **Sözlük (9 Ekim 2026):** `/tr/glossary/` ve `/en/glossary/` (ayrıca `/tr/sozluk`, `/tr/l/sozluk`, `/tr/l/glossary`, `/en/l/glossary`) `glossary.json`'daki terimleri sayfanın dilinin alfabesine göre, öteki dildeki karşılığı, eş anlamlıları, tanımı, bağlı modülleri ve kitap bölümüyle listeler; her terimin kalıcı çapası `#<kimlik>`. Bağlı modüller yapım sırasında bulunur: terimin `match` kalıpları i18n tablolarının Türkçe tarafında (görünür metin) aranır; en az 2 eşleşme (toplam 4'ten azsa 1), önce terimin bölümüne ait modüller, sonra eşleşme sayısı, en çok 5. Sonuç `dist/glossary.json`'a da yazılır. `match_en` yalnız tutarlılık içindir: bağlı bir modülün İngilizce metninde terim bulunmazsa `tools/check.mjs` not düşer. Arama istemci tarafında; önce terim adlarında, eşleşme yoksa tanımlarda arar; JS olmadan bütün liste ve harf dizini çalışır. Ters yön (0.42.1): her modül sayfasında "Bu modüldeki terimler" kutusu, aynı bağlantı hesabından (modül sayfaları önce `<!--ahl-terms-->` yer tutucusuyla yazılır, bağlantılar hesaplandıktan sonra doldurulur); `tools/check.mjs` iki yönün aynı olduğunu denetler.

Kitabın kendisi, site kapansa bile tek başına okunabilir kalmalıdır: karekodlar zenginleştirmedir, önkoşul değil. Her etkileşimli laboratuvarın kitapta metinsel bir karşılığı (şekil, örnek, çözüm) bulunmalıdır.

## 5. MD simülasyon: rehberli yeniden oynatma ve dürüstlük

Kullanıcı MD'yi "çalıştırıyormuş gibi" hissetmeli, ama yanıltılmamalıdır. İki koşul birlikte sağlanır:

**Sürükleyici deneyim.** Kullanıcı sistem, kuvvet alanı, sıcaklık gibi seçimleri yapar; "Koşuyu başlat" der; ilerleme çubuğu ve gerçekçi log satırları (adım sayısı, sıcaklık, enerji) akar; sonunda trajektori, RMSD, enerji grafikleri etkileşimli olarak açılır. Deneyim, gerçek bir MD arayüzünü taklit eder.

**Dürüstlük (pazarlık konusu değil).** Gösterilen her sayı önceden hesaplanmış **gerçek** bir koşudan gelir; uydurulmaz. Sayfanın altında görünür (gizli değil) bir bilgilendirme bulunur: bu bir öğretim simülasyonudur, hesap tarayıcıda yapılmamıştır, veri şu kaynaktan ve şu koşuyla üretilmiştir. Kullanıcının seçtiği parametreler önceden hazırlanmış senaryolarla eşleşir; eşleşmeyen bir parametre için "bu senaryo önceden hesaplanmadı" denir, uydurma sonuç verilmez. Bu, kitabın AGENTS.md kuralıyla (asla uydurma sonuç; çalıştırılmayana NOT_EXECUTED) tutarlıdır ve bir uçuş simülatörünün mantığıyla aynıdır: deneyim gerçekçi, veri gerçek, doğası açık.

**Keşif laboratuvarları (26-28 Eylül 2026 güncellemesi).** MD-T 0.2.0, MD-PBC 0.2.0-0.6.0, MD-CUT 0.1.0 ve MD-ELEC 0.1.0 temel keşif kalıbıyla yazıldı (MD-CUT ve MD-ELEC, 28 Eylül'de MD-PBC'den ayrıldı; bir sayfada bir laboratuvar kuralı için bkz. tasarım belgesi 8. kısım): laboratuvarlardaki küçük öğretim simülasyonları (tek parçacık, iki boyutlu Lennard-Jones sıvısı, protein yüzeyinde Langevin suyu, iki boyutlu iyon örgüsü ve Ewald toplamı, periyodik kutuda Stokes akışı) tarayıcıda canlı hesaplanır ve bu, sayfanın model notunda açıkça yazar. Proje verisi (1UBQ kutusu, koşu ayarları, alanin dipeptit kaydı) yine önceden koşturulmuş gerçek simülasyonlardan gelir. Rehberli yeniden oynatma, gerçek bir protein koşusunu gösteren modüller için geçerli kalır. MD sayfasının tanıtım metni ve site alt notu buna göre güncellendi (site 0.7.1). MD-EQ 0.1.0 (28 Eylül, site 0.11.0) aynı kalıbı orta düzeye taşır: atölye ve tezgâhtaki üç boyutlu katı TIP3P su kutusu tarayıcıda hesaplanır; proteine dönüş bölümü bu projenin ubikitin dosyalarından gerçek koordinatları ve minimizasyonsuz koşunun çökme görüntülerini gösterir.

Veri kaynakları: alanin dipeptit için mdshare ALA2 (CC BY 4.0), ubikitin için 1UBQ tabanlı yerel deneme (bkz. `book/cases/ubiquitin_1ubq`). Trajektoriler önceden işlenip küçük JSON/ikili dosyalara indirgenerek tarayıcıya taşınır.

## 6. Lisans matrisi (birincil kaynaklardan doğrulandı, 25 Eylül 2026)

| Kaynak | Kullanım | Lisans | Sonuç |
|---|---|---|---|
| PDB yapıları (3PTB, 1UBQ) | koordinat, şekil | CC0 1.0 (kamu malı) | Serbest; yazarlara atıf nezaketen |
| ChEMBL bileşik/Ki verisi (DK-U) | tarama kütüphanesi | CC BY-SA 3.0 | **Dikkat: aynı lisansla paylaş.** Türetilmiş veri yayımlanırsa CC BY-SA 3.0 ile ve atıfla verilmeli |
| mdshare ALA2 | MD trajektori (MD app) | CC BY 4.0 | Atıfla serbest |
| AutoDock Vina 1.2.7 | docking motoru (arka planda) | Apache-2.0 | Serbest |
| RDKit | kimya işlemleri | BSD-3-Clause | Serbest |
| Meeko | PDBQT hazırlık | LGPL-2.1 | Serbest (kütüphane olarak) |
| gemmi | yapı okuma | MPL-2.0 | Serbest |
| NumPy | hesap | BSD ve uyumlu | Serbest |

**Kritik nokta (ChEMBL CC BY-SA 3.0):** DK-U'daki bileşik verisi "aynı lisansla paylaş" koşuluna tabidir. Uygulama içine gömülü türetilmiş veri (kütüphane, skorlar) yayımlanacaksa, o veri bölümü CC BY-SA 3.0 ile ve ChEMBL atfıyla (Zdrazil ve ark. 2024, *Nucleic Acids Res* 52:D1180) sunulmalıdır. Ayrıca ChEMBL'in ticari yazılımdan türetilen bazı özellik hesaplarını "izole edip modelleme için çıkarmama" koşulu vardır; DK-U yalnız Ki değerlerini ve SMILES'ı kullandığından bu risk düşüktür, ama yayına almadan önce hukuki metin bir kez daha okunmalıdır. Bir seçenek: DK-U'nun bileşik verisini uygulamaya gömmek yerine "yeniden üret" betikleriyle ChEMBL'den çekilebilir tutup, yalnız türetilmiş sayıları CC BY-SA notuyla göstermektir.

## 7. Teknik mimari

- **Sunucusuz eğitim çekirdeği.** Learn modülleri statik dosyalardır; arka uç, veritabanı, hesaplama gerektirmez. Bu, maliyeti sıfıra yakın tutar ve çevrimdışı yedeği mümkün kılar.
- **Modül çıkarımı.** Prototiplerdeki yeniden kullanılabilir parçalar ayrı modüllere ayrılır: oyuncak docking motoru (`model.js`), 3B görüntüleyici, grafik yardımcıları (`makeChart`), Ala çekirdeği. Bunlar React bileşenlerine sarılır; her laboratuvar bir bileşen olur.
- **React ürününe taşıma.** AssayHub React tabanlı olduğundan, laboratuvarlar React bileşeni olarak paketlenir. Hesap mantığı (saf JavaScript) olduğu gibi taşınır; yalnız DOM/SVG çizimi React'e uyarlanır.
- **İlerleme ve durum.** Kullanıcının hangi görevleri tamamladığı tarayıcıda (localStorage) tutulur; hesap gerektirmez. İleride giriş yapan kullanıcı için sunucuya taşınabilir, ama zorunlu değil.
- **Hermes katmanı (ileride).** "Bu grafikte ne görüyorum?" gibi soruları yanıtlayan bir yapay zekâ öğretmeni, ürün anayasasına göre kredili bir ek olarak eklenebilir. Modüller onsuz da tam çalışır.

## 8. Çalışma alanı ve çakışma önlemi

BlotForge tasarımında olduğu gibi, bu iş **AssayHub kökünden ayrı bir klasörde** yürütülmelidir; çünkü AssayHub kökünde eşzamanlı GPT/Codex çalışması olabilir. Öneri: `C:\Users\Zekeriya\PROJE\ASSAYSHUB\_CLAUDE\learn` gibi ayrı bir alan. Bu belge ve prototipler şu an MD kitabı projesinin (`MD_KİTAP_YAZIMI/book`) altındadır; taşıma turu başladığında Learn kaynak kodu ayrı alana kopyalanır, MD kitabı deposundaki prototipler "gerçeğin kaynağı" olarak korunur.

Bu oturum MD kitabı Claude projesine bağlıdır; AssayHub strateji belgeleri ayrı bir projede (ASSAYSHUB_PROJECT) durur. Learn mimarisi her iki projeyi ilgilendirdiğinden, bu belge MD kitabı tarafında `book/proposals/assayhub_learn/` altında tutulur ve özeti AssayHub projesine elle taşınabilir.

## 9. Riskler ve açık kararlar

- **R-L1 (lisans):** ChEMBL CC BY-SA yayılımı. Karar: DK-U veri sunumu için lisans/atıf notu ve gerekirse "gömme yerine yeniden üret" yaklaşımı.
- **R-L2 (bağlantı ölümü):** Basılı karekod kalıcı olmalı. Karar: yönlendirme katmanı + Zenodo DOI.
- **R-L3 (yol haritası çakışması):** Learn, CytoMove/BlotForge sırasını bozmamalı. Karar: ayrı kategori, ayrı klasör, düşük öncelikli paralel iş.
- **R-L4 (dürüstlük):** MD simülasyonu yanıltıcı olmamalı. Karar: görünür bilgilendirme + gerçek veri + eşleşmeyen senaryoya "hesaplanmadı".
- **Karar 1 (25 Eylül 2026, kapandı):** Kalıcı alan adı `assayhub.app`; eğitim modülleri `learn.assayhub.app` alt alanında. Yönlendirme altyapısı Cloudflare Pages `_redirects` dosyası (ayrı sunucu ya da kısaltma servisi yok). Karekod biçimi (0.2.0'da güncellendi, iki dil): Türkçe baskı `https://learn.assayhub.app/tr/l/<KİMLİK>`, İngilizce baskı `https://learn.assayhub.app/en/l/<KİMLİK>`.
- **Karar 2 (25 Eylül 2026, kapandı):** Bütün AssayHub arayüzleri iki dilli (tr, en). Dil kuralı: kendi seçimi (`assayhub_lang` çerezi, `.assayhub.app` alanında) > Türkiye > tarayıcı dili Türkçe > İngilizce. Ayrıntı: `docs/superpowers/specs/2026-09-25-iki-dil-design.md`.
- **Açık karar 2:** Zenodo hesabı ve sürüm arşivleme akışı.
- **Açık karar 3:** MD uygulaması için hangi sistemler (yalnız ALA2 ve 1UBQ mi, başka örnek mi).
- **Açık karar 4:** Learn'in AssayHub menüsünde nasıl görüneceği ve giriş gerektirip gerektirmeyeceği.

## 10. Sıradaki adımlar

1. Bu belgenin onayı ve açık kararların netleşmesi.
2. Docking uygulamasının React iskeleti: üç düzeyi tek uygulamada birleştiren kabuk, ortak motor modülleri, yönlendirme.
3. DK-T'nin React'e taşınması (pilot); tasarım ve etkileşim doğrulaması.
4. DK-O ve DK-U'nun taşınması; ChEMBL lisans notunun yerleştirilmesi.
5. MD uygulaması: rehberli yeniden oynatma iskeleti ve MD-T (CH02) taşınması.
6. Karekod/yönlendirme tablosu ve ilk Zenodo sürümü.
7. Kitap tarafında karekod yerleşimi (her ilgili bölümün sonunda).

---

*Bu belge bir yazar taslağı önerisidir. Lisanslar 25 Eylül 2026'da birincil kaynaklardan doğrulandı; yayına almadan önce ChEMBL hukuki metni bir kez daha okunmalıdır. Bilimsel ve hedef-okur incelemesi yapılmadı.*
