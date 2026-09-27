# Sürüm notları

## 0.7.0 (27 Eylül 2026) · MD-PBC laboratuvar 2

- MD-PBC 0.3.0: Laboratuvar 2 "En yakın kopya ve kesme" aynı sayfaya eklendi; ilerleme iki laboratuvarı birlikte sayar (9 kart). Deneysel köprü (FRET cetveli ve r⁻⁶), atölye (birbirini çeken iki molekül, en yakın kopya ile kutu içi kuralın karşılaştırılması, toplam enerji şeridi), tezgâh (64 moleküllük sıvıda kesme çemberi, giriş ve çıkış halkaları, aynı hareketten düz ve kaydırılmış iki enerji, kesmenin yakınını büyüten pencere), defter (kesme mesafesine karşı enerji oynaması ve çift sayısı), proteine dönüş (gerçek ölçekte kesme ve komşu listesi simülasyonu, bu projenin rlist ve nstlist ayarları), altı soru.
- İngilizce tablo 396 çifte çıktı (`i18n/_work/mdpbc_en_c.py` HTML, `mdpbc_en_d.py` betik); "Förster" özel adı keep listesinde.
- Lab 1 sınavındaki seçenek tıklaması yalnız kendi sınavını etkiler (`#quiz .opt`); önceki genel seçici Lab 2 sınavını da etkileyebilirdi.

## 0.6.1 (27 Eylül 2026) · MD-PBC İngilizce

- MD-PBC 0.2.0 İngilizce sayfası: `i18n/MD-PBC.en.json` (204 çift, makine çevirisi, `reviewed: false`); sayı biçimi İngilizceye göre (ondalık nokta, sayıdan sonra yüzde). Tablo, `i18n/_work/build_MD-PBC_en.py` ile Türkçe kaynağa sıralı değiştirmeler uygulanıp değişen satırlardan üretildi.
- Dar ekranda (560 px altı) tuval etiketleri kısa hâlleriyle çizilir; "uygulamadaki ayar" etiketi grafiğin altına iner (iki dilde).

## 0.6.0 (27 Eylül 2026) · MD-PBC keşif laboratuvarı 1

- MD-PBC (temel düzey, kitap CH04) 0.2.0 yeniden yayında: temel keşif kalıbıyla Laboratuvar 1 "Kenarsız kutu". Deneysel köprü (96 kuyucuklu plakanın kenar etkisi, kristalin birim hücresi); atölye: bir su molekülünü duvarlı kutuda, boşlukta ve periyodik kutuda fırlatma (çarpma, kaçış, sınırdan geçiş; kutu çerçevesini kaydırma); tezgâh: 100 moleküllük iki boyutlu Lennard-Jones sıvısı, moleküller potansiyel enerjilerine göre renkli (damla, duvar, periyodik; ısıtma ve itme, uzun zaman grafiği); defter: damla ve periyodik kutuda 25-400 molekülle molekül başına enerji, aynı ölçekte son hâl resimleri, 1/√N ekseninde sonsuz damlaya uzatma; proteine dönüş: ubikitin kutusu kesiti (editconf -d gibi, küp ya da onikiyüzlü), 1 nm su kabukları, RTX 5080 için süre tahmini; altı soru. Altı keşif kartı yalnız okurun kendi denemesiyle açılır.
- Eski MD-PBC 0.1.0 sayfası ve İngilizce tablosu kaldırıldı; İngilizce sayfa çeviri hazırlanana kadar bilgilendirme sayfasıdır.
- Kesme ve komşu listesi, uzun erimli elektrostatik ve kutu boyu laboratuvarları hazırlanıyor.

## 0.5.1 (27 Eylül 2026) · Eski MD modülleri yayından çekildi

- MD-PBC, MD-O ve MD-U yayından çekildi (`status: planned`, `path` ve `source` kaldırıldı). Sayfaları artık üretilmiyor (404); MD sayfasında soluk, kesik çizgili ve tıklanamayan "planlandı" kartı olarak kalıyorlar. Kalıcı kimlikler değişmedi: kitaptaki kısa adresler (`/tr/l/MD-PBC` gibi) MD sayfasındaki karta yönleniyor. Modüller temel keşif kalıbıyla sırayla yeniden yazılacak; ilk sıradaki MD-PBC.
- Kaynak dosyalar (`sources/MD-PBC.html`, `MD-O.html`, `MD-U.html`) ve çeviri tabloları başvuru için depoda duruyor; yayına girmiyorlar.
- Docking modülleri (DK-T, DK-O, DK-U) yenisi hazır olana kadar yayında.

## 0.5.0 (26 Eylül 2026) · MD-T keşif laboratuvarları

- MD-T (temel düzey, kitap CH02) 0.2.0: beş laboratuvar yerine temel keşif kalıbıyla üç laboratuvar (tasarım: `docs/superpowers/specs/2026-09-26-temel-kesif-kalibi-design.md`). Her laboratuvar deneysel bir köprüyle başlar; okur kontrolleri kurcalar, keşif kartları okurun kendi denemesiyle ve kendi sayılarıyla açılır; defter kuralı okurun verisinden çıkarır; laboratuvar proteine dönüş tablosu ve altı soruluk sınavla biter. İlerleme dokuz keşfi sayar.
- Laboratuvar 1 "Neden F = ma": ısıl de Broglie dalga boyu (elektron, H, ağır atomlar, sıcaklık), titreşimlerde ħω/kT (donmuş sert bağlar, klasik yavaş hareketler, 300 K'de yaklaşık 209 cm⁻¹ sınırı), çift kuyulu yüzeyde hız-Verlet ve 300 K ısı banyosu (Langevin), sürüklenebilir top ve adım dökümü, 1 ns'lik koşularla okurun kendi Arrhenius eğimi, Born-Oppenheimer ve maliyet ölçeklenmesi (kuvvet alanı hızı pilotta ölçülen değerden doğrusal tahmin olarak etiketli).
- Laboratuvar 2 "Atomun saati": bağ atölyesi (atomlar, yay sertliği, hazır bağlar, şematik IR bandı; izotop √μ, sertlik √k, HMR keşifleri), zaman adımı tezgâhı ve defteri (Δt² ölçeklenmesi, T/π çöküş sınırı, periyot başına hesap).
- Laboratuvar 3 "Kayıt aralığı" (yeni): stroboskop atölyesi (T/2 sınırı, duruyor gibi görünen ve sahte yavaş titreşim) ve bu projenin alanin dipeptit pilotunun 1. koşusuyla gerçek veri tezgâhı: 1 ile 1000 ps arası alt örneklemede αR payı, sayılan durum değişimi ve dosya boyutu (ölçülen md.xtc'den orantı). Veri `mdt_kayit.json` (φ/ψ, 0,01°), bağımsız referansla sınanır.
- Yüzde işareti dile göre (`MDT.pc`: Türkçe %21,9, İngilizce 21.9%). İngilizce tablo `i18n/MD-T.en.json` yeniden kuruldu (550 çift, makine çevirisi, `reviewed: false`).

## 0.4.0 (26 Eylül 2026) · MD-U, ortak motor ve MD-PBC

- Yeni modül MD-U (uzman düzey, kitap CH17): "Örnekleme ve kararlılık yanılsaması: alanin dipeptidi". Veri bu proje için GROMACS 2026.3 ile üretildi: AMBER99SB-ILDN + TIP3P, 5 bağımsız koşu × 10 ns (pilot; koşular arasındaki tek fark hız ve termostat tohumları). Koşu ve analiz planı koşulardan önce SHA-256 ile donduruldu. Altı laboratuvar: sakin RMSD ve gezen açılar, önceden tanımlanmış durumlar ve duyarlılık sınırları, eşit pencereler ve TVD, otokorelasyon/blok ortalaması/g/N_eff, koşular arası hata, pilot ve üretim. Üretim aşaması (TRUBA ya da GPU) gelene kadar üretim seçimleri "Bu senaryo hesaplanmadı" gösterir. Az ziyaret edilen durumlar (αL, koşu başına 1-4 ziyaret) için pay, g ve N_eff anlamsız diye işaretlenir.
- Ortak mini-MD motoru `assets-src/mdmini.js` 0.1.1 (2B Lennard-Jones, periyodik sınır, minimum görüntü, kesme, komşu listesi, hız-Verlet; 14 birim testi). Sayfalara `tools/sync-engine.mjs` ile kopyalanır; `tools/check.mjs` kopyanın güncel olduğunu denetler.
- Yeni temel modül MD-PBC (kitap CH04): "Simülasyon kutusu evren değildir". Sayılar tarayıcıda canlı hesaplanır (oyuncak model olarak etiketli): duvar ve periyodik kutu, minimum görüntü, kesme ve enerji tanımı (kaydırma yörüngeyi değiştirmez), komşu listesi ve kaçan etkileşimler, uzun erimli elektrostatik ve Ewald ayrışımı fikri, sonlu kutu.
- MD-U Laboratuvar 1 (aynı gün, proje sahibinin önerisiyle): 3B molekül görüntüleyici (gerçek karelerden, 40 ps aralık, minimize yapıdan uzaklığa göre beyazdan kırmızıya, φ/ψ bağları vurgulu, RMSD ve haritayla aynı zaman imleci) ve "Kısa bakış ve beş koşu" karşılaştırması (bir koşunun ilk 0,5/1 ns'si ile beş koşunun tamamı; öğretim gösterimi, analiz planının parçası değil).
- Modüller arası geçiş şeridi: her modül sayfasının altında aynı uygulamadaki önceki ve sonraki yayındaki modüle ve uygulama sayfasına bağlantı (iki dilde; `tools/build.mjs`); `tools/check.mjs` bağlantıların doğru hedefe gittiğini denetler.
- İngilizce tablolar `i18n/MD-U.en.json` ve `i18n/MD-PBC.en.json` (makine çevirisi, `reviewed: false`). İki modül de bağımsız gözden geçirmeden geçer (MD-PBC yayından önce, MD-U yayından sonra).

## 0.3.0 (25 Eylül 2026) · MD-O

- Yeni modül MD-O (orta düzey, kitap CH07): "Bir proteini MD'ye hazırlamak: ubikitin (1UBQ)". Altı laboratuvar (yapı dosyası ve kristal suları, topoloji ve protonasyon, kutu ve tuz, minimizasyon, dengeleme ve zaman adımı, trajektori) ve dört soruluk sınav. Adresler `/tr/md/md-o/`, `/en/md/md-o/`; karekod `/tr/l/MD-O`, `/en/l/MD-O`.
- Sayfadaki her sayı gerçek GROMACS 2023.3 koşularından gelir: 24 Eylül yerel deneme (S0) ve 25 Eylül'de önceden yazılıp dondurulmuş protokolle bulutta koşulan ek senaryolar (C0, C1, S1 minimizasyonsuz, S2a/S2b 4 fs, S3 0,5 nm kutu, S4 0,15 M NaCl). Başarısız koşular (S1 çöküşü, S2b grompp reddi) olduğu gibi gösterilir. Koşulmamış seçimlerde sayfa "Bu senaryo hesaplanmadı" yazar ve sayı göstermez. Hiçbir koşu denge, yakınsama ya da biyolojik çıkarım kanıtı değildir.
- Veri paketi `extract.py` ile çıkarılır, `verify.py` her sayıyı ikinci bir kaynaktan (md.log, .gro, topol.top, pdb2gmx kaydı, PDB başlığı) yeniden denetler.
- Bağımsız gözden geçirme düzeltmeleri (aynı gün): 4 fs sonucu önce doğrusal uyum eğimiyle verilir (68 / 60 kJ mol⁻¹ ps⁻¹; uç noktalar 101 / 39 ikinci sırada) ve sınav cevabı "10 ps karar için yetersiz" gerekçesine dayanır; S2b'de .tpr oluşmadığı için mdrun çağrısının dinamik koşmadan hata verdiği (çıkış kodu 1) yazılır; Türkçede "konum kısıtlı/kısıtsız" ve "bağ kısıtlı/bağ kısıtı yok" ayrı adlandırılır; S1 bağ sapması "2,8 milyar kat" olarak yazılır.
- İngilizce tablo `i18n/MD-O.en.json` (416 çift, makine çevirisi, `reviewed: false`); sözlüğe MD-O terimleri eklendi (konum kısıtı/bağ kısıtı ayrımı: restraint/constraint).

## 0.2.1 (25 Eylül 2026) · Türkçe asıllardaki sorunların düzeltilmesi

- Dört modülün Türkçe asılları yeni sürüm dosyalarıyla güncellendi (modül sürümü 0.1.1; kitap tarafında `*_2026-09-25_v2.html`, eski dosyalar değiştirilmedi). Her düzeltme internetten doğrulandı ya da modülün kendi gömülü verisinden hesaplandı; kaynaklar ve eski/yeni metinler `docs/i18n-review/2026-09-25_<KİMLİK>.cozum.md` dosyalarında.
- DK-T: benzamidinyum formülü (C₇H₉N₂⁺, pKa ≈ 11,6), ızgara aralığı (oyuncak 0,25 Å; AutoDock/Vina varsayılanı 0,375 Å), Vina'da elektrostatik terim olmadığı, manzara ve MD benzetmesi ifadeleri, görev dili, İngilizcede tekil/çoğul birimler.
- DK-O: hizalamalı RMSD'de 198/198 poz, Ile16 N-ucunun kimyasal olarak beklenen NH3⁺ hâli (Asp194 tuz köprüsü; koşu tek H ile yapıldı, NH3⁺ koşulmadı), koşulmayanlar listelerinin eşitlenmesi, ASH açıklaması, sınav açıklamasındaki mantık hatası.
- DK-U: D2 tuzaklarının kimyası (pozitif azot var, amidin/guanidin yok, Asp189'a ulaşamaz), en uygun doğru, doğrulanmış kaynakça, EF tavanı notu, ligand etkinliği açıklaması, işaret değişimi, çapraz doğrulama tanımları, 37/36 yayın farkının açıklanması, terimler (inhibisyon sabiti, AUC, kıyaslama veri seti).
- MD-T: Görev 1 artık yalnız Lennard-Jones minimumunda (2^(1/6) σ ± 0,02 σ) tamamlanır; logaritmik eksen metni (çizgi aralığı 100 kat), Lab 2 ipucu, hız-Verlet cümlesi, GROMACS kuralının doğru aktarımı, "H içeren bağlar", Türkçe binlik yazımı.

## 0.2.0 (25 Eylül 2026) · iki dil

- Bütün sayfalar Türkçe (`/tr/`) ve İngilizce (`/en/`). Dil öneksiz adresler (`/`, `/l/<KİMLİK>`, eski `/docking/...` ve `/md/...` bağlantıları) Cloudflare Pages Functions ile ziyaretçinin diline yönlendirilir: kendi seçimi > Türkiye > tarayıcı dili Türkçe > İngilizce.
- Karekod biçimi baskıya göre sabit: `/tr/l/<KİMLİK>` ve `/en/l/<KİMLİK>`.
- Her sayfada `TR | EN` düğmesi; seçim `assayhub_lang` çerezinde bir yıl saklanır (`.assayhub.app` alanında, diğer AssayHub araçlarıyla ortak).
- DK-T, DK-O, DK-U ve MD-T modüllerinin İngilizcesi, Türkçe kaynağa dokunulmadan çeviri tablolarından (`i18n/*.en.json`) yapım sırasında üretilir. Çeviriler makine çevirisidir ve insan incelemesi bekler (`reviewed: false`); İngilizce sayfaların alt bilgisinde bu yazar.
- İngilizce sayfalarda sayılar ondalık noktayla gösterilir; cevap kutuları hem `0.98` hem `0,98` biçimini, İngilizcede `250,000` gibi binlik ayırıcıyı da doğru okur.
- Yeni denetimler: eskimiş çeviri anahtarı, İngilizce sayfada kalan Türkçe metin, Türkçe yerel ayar, sayfa dili ile adres önekinin uyumu, her sayfanın diğer dildeki karşılığı, dil kuralı birim testleri.
- Site simgesi eklendi.
- İngilizce çevirilere bilimsel editör geçişi (Claude, 25 Eylül 2026): DK-T 51, DK-O 24, DK-U 53, MD-T 39 çift düzeltildi (anlam sadakati, terim, dil bilgisi). İnsan incelemesi yerine geçmez; `reviewed: false` kalır. Türkçe asıllarda bulunan içerik sorunları: `docs/i18n-review/2026-09-25_TURKCE_ASIL_SORUNLARI.md`.
- İngilizce sayı ayrıştırıcısı: `0,980` gibi Türkçe yazılmış ondalık artık 0,98 olarak okunur (yalnız `250,000` gibi baştaki rakamı sıfır olmayan kalıplar binlik sayılır).

## Yayın kaydı

- 25 Eylül 2026: kalıcı alan adı `assayhub.app` alındı (Cloudflare Registrar); `learn.assayhub.app` Pages projesine bağlandı. Karekodlar için kalıcı biçim: `https://learn.assayhub.app/l/<KİMLİK>`.
- 25 Eylül 2026: ilk Cloudflare Pages dağıtımı (commit 597f240), https://assayhub-learn.pages.dev. Canlı denetim: 7 sayfa 200, 404 sayfası 404, 12 kısa adres (büyük ve küçük harf) doğru hedefe gidiyor, tüm yanıtlarda `X-Robots-Tag: noindex, nofollow`, DK-O ve DK-U konsolunda hata yok.

## 0.1.0 (25 Eylül 2026) · ilk önizleme

- Repo kuruldu: `modules.json` kayıt defteri, `tools/build.mjs`, `tools/check.mjs`, GitHub Actions denetimi, Cloudflare Pages yapılandırması (`_headers`, `robots.txt`, üretilen `_redirects`).
- Yayındaki modüller (pilot): DK-T, DK-O, DK-U, MD-T. Planlanan: MD-O, MD-U.
- Her modül sayfasına ince bir AssayHub Learn gezinti şeridi ve alt bilgi eklenir (kaynak HTML değiştirilmez; yapı sırasında eklenir).
- DK-U sayfasına ChEMBL CC BY-SA 3.0 lisans notu eklendi.
- **Düzeltme (DK-U):** Tarama verisi üretilirken çalışma alanındaki RDKit, `dimorphite_dl` paketinin bağımlılığı nedeniyle 2026.03.6'dan 2025.09.6'ya düşürülmüştü (24 Eylül 2026, 17:23 UTC; DK-O koşuları bundan önce, 17:03 UTC'de bitmişti). DK-U sayfasında ve tarama protokolünde yazan "RDKit 2026.03.6" ifadesi "2025.09.6" olarak düzeltildi. Sonuçlar değişmedi; yalnız kayıttaki sürüm bilgisi düzeltildi.
