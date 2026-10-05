# Temel düzey keşif kalıbı ve MD-T yeniden tasarımı

Tarih: 2026-09-26. Durum: taslak, kullanıcı incelemesinde.

## 1. Amaç ve kapsam

Temel düzeydeki her laboratuvar, deneysel çalışan bir okura MD'nin tek bir özelliğini öğretir. Bunu metinle anlatarak değil, okurun kontrolleri kurcalaması ve kuralı kendi denemelerinden çıkarmasıyla yapar. His oyun değil keşiftir; puan, seviye ve süre yoktur.

Kullanıcı kararları (2026-09-26):

- Oyun hissi reddedildi, keşif hissi seçildi.
- Her lab bildik bir deneysel ölçümle ya da gerçek hayatla bağ kurar.
- Sonda çoktan seçmeli sorular vardır.
- "Deneysel" kısım statik olmamalı; okur kurcalayarak keşfetmeli (Atomun Saati v4 bu yüzden bağ atölyesine dönüştü).
- F = ma'nın MD'deki yeri ve Schrödinger denkleminin neden kullanılmadığı, MD-T'nin ilk laboratuvarı olarak anlatılır.
- Eski laboratuvarlar yenileriyle değiştirilir.
- İş modül modül ilerler: MD-T, MD-PBC, DK-T, sonra yeni MD-ENS ve MD-CON. Bu belge kalıbı ve yalnız MD-T'yi tanımlar; her modül için ayrı bir bölüm eklenir ve ayrı plan yazılır.

Onaylanmış prototipler (claude.ai artifact):

- "Neden F = ma" v1: https://claude.ai/artifact/6gP7xjadf5aaBc1wBxmFmm
- "Atomun Saati" v4: https://claude.ai/artifact/Na4kq7xR7A8FDvrKFyzNEG

## 2. Değişmez kurallar

- Asıl dil Türkçe; İngilizce sayfa, derleme sırasında `i18n/<ID>.en.json` tablosuyla üretilir. Betikle üretilen metinler dahil okura görünen her dize tabloda bulunur.
- Uydurma sonuç yoktur. Her sayı ya tarayıcıda o anda hesaplanır ya da bu projede ölçülmüş bir veriden gelir; kaynağı sayfada yazar. Tahminler "tahmin" diye adlandırılır.
- Em-dash karakteri (U+2014) kullanılmaz.
- Kitaptaki mevcut dosyalar değiştirilmez; kitaba yeni sürümlü prototip dosyası yazılır.
- Sayfa tek dosyadır: dış betik, stil ya da font yüklemez.
- Sayfa kabuğu sitenin mevcut görsel dilini korur (üst çizgi, başlık alanı, maskot Ala, hedef şeridi, `section.unit` ve serif düz yazı, `.lab` paneli, ilerleme noktaları, alttaki köprü ve modül geçiş şeridi). Prototiplerin kendi renk paleti taşınmaz; sitenin renk değişkenleri kullanılır.

## 3. Laboratuvar kalıbı

Her laboratuvar şu altı parçadan oluşur. Parçalar sırayla gelir; 4. parça yalnız kural birikmiş denemelerden çıkarılabiliyorsa bulunur.

1. **Deneysel köprü.** Okurun bildiği bir ölçümle başlayan bir paragraf (IR bandı, kristal yapı, filmdeki tekerlek). Soru bu ölçüme bağlanır.
2. **Atölye.** 2-4 kontrol (seçim düğmeleri, kaydırıcılar) ve anında değişen bir görsel.
   - "Ne değişti?" paneli son değişikliği öncekiyle sayılarla karşılaştırır. İki şey aynı anda değiştiyse bir seferde yalnız birinin değiştirilmesini önerir.
   - Üç keşif kartı: her kart açık bir soru sorar ve ilgili denemeyi tarif eder. Okur o denemeyi yaptığında kart "Keşfedildi" olur ve okurun kendi sayılarıyla yazılmış bir açıklama gösterir. Kart açıklaması hiçbir zaman hazır bir sonuç göstermez; yalnız okurun yaptığı denemeden türetilir.
3. **Tezgâh.** Aynı nesnenin MD'de nasıl hesaplandığı: integratör, motor ya da gerçek MD verisi. Okur bir adımı ya da bir ayarı değiştirir ve sonucu görür.
4. **Defter (gerektiğinde).** Denemeler birikir; kural okurun verisinden çıkar (eğim, sınır, oran). Defter yalnız tarayıcıda saklanır, silinebilir ve saklanamazsa sayfa yine çalışır.
5. **Proteine dönüş.** Gerçek bir sistemde bunun karşılığı; sayfanın formülleriyle o anda hesaplanmış değerler içeren bir tablo ve kısa düz yazı.
6. **Sınav.** Altı çoktan seçmeli soru. Doğru şıkların yeri sorudan soruya değişir; her soru açıklamasıyla açılır. Sayısal şıklar sayfanın formüllerinden hesaplanır.

İlerleme noktaları keşif kartlarını sayar (her lab üç kart). Sınav ilerlemeye katılmaz.

## 4. MD-T yeni yapısı

MD-T (CH02, "Enerji, kuvvetler ve sayısal hareket") üç laboratuvara iner. Sürüm 0.1.1'den 0.2.0'a çıkar.

| Yeni | Kapsadığı eski lab'lar | Durum |
|---|---|---|
| Lab 1 · Neden F = ma | Lab 1 "Kuvvet oku", Lab 2 "Adım adım hız-Verlet" | prototip v1 onaylı |
| Lab 2 · Atomun saati | Lab 3 "Zaman adımını değiştir", Lab 4 "En hızlı titreşim" | prototip v4 onaylı |
| Lab 3 · Kayıt aralığı | Lab 5 "Kayıt aralığı" | yeni tasarım, aşağıda |

### 4.1 Lab 1 · Neden F = ma

Prototip v1 olduğu gibi taşınır. Parçaları:

- Parçacık atölyesi: ısıl de Broglie dalga boyu λ = h/√(2π·m·k·T). Kartlar: elektron, H ile ağır atom karşılaştırması, sıcaklık etkisi.
- Titreşim atölyesi: ħω/kT; taban düzey olasılığı, ortalama enerji, ısı kapasitesi payı. Kartlar: sert bağ donmuş, yavaş hareket klasik, sınır (300 K'de yaklaşık 209 cm⁻¹).
- Tezgâh: çift kuyulu yüzey, hız-Verlet (Δt 0,5 fs), ısı banyosu (Langevin BAOAB, 10 ps⁻¹, 300 K), "Bir adım" düğmesiyle sayısal adım dökümü. Kartlar: kütle ve periyot, enerji korunumu ve bariyer, ısıl geçiş.
- Tek ek: duraklatılmışken top fareyle ya da dokunarak sürüklenebilir ve kuvvet oku anında güncellenir. Eski "Kuvvet oku" lab'ının işlevi böylece korunur.
- Defter: 1 ns'lik Langevin koşuları, bariyere karşı geçiş sayısı, Arrhenius eğimi. Uzun koşularla doğrulanan beklenti bu yüzeyde yaklaşık 2,8 kJ/mol'dür (kT'den biraz büyük, çünkü bariyer yükselince kuyular da dikleşir).
- Neden Schrödinger değil: Born-Oppenheimer, MD adımının zinciri, maliyet ölçeklenmesi. Kuvvet alanı hızı pilotta ölçülen değerden (1.546 atom, 2 iş parçacığı, günde 245-265 ns) doğrusal bir tahmindir ve öyle yazar.
- Proteine dönüş tablosu ve altı soru, prototipteki gibi.

### 4.2 Lab 2 · Atomun saati

Prototip v4 olduğu gibi taşınır:

- Bağ atölyesi: atomlar, k, hazır bağlar, IR şeridi, önceki bandın izi.
- Kartlar: izotop √μ, sertlik √k, HMR.
- Tezgâh: Δt kaydırıcısı, hız-Verlet, enerji hatası.
- Defter: Δt'ye karşı hata. Kurallar: Δt² ölçeklenmesi, çöküş sınırı T/π, periyot başına hesap.
- Proteine dönüş tablosu ve altı soru.

Eski Lab 4'teki "2 fs nereden geliyor" anlatımı proteine dönüş bölümünde zaten vardır.

### 4.3 Lab 3 · Kayıt aralığı (yeni)

Öğrettiği özellik: program her adımı hesaplar ama yalnız bazılarını dosyaya yazar. Kayıt aralığı neyi görebileceğinizi belirler; hesabın doğruluğunu belirlemez.

1. **Deneysel köprü:** Filmlerde dönen tekerleğin yavaşlamış, durmuş ya da geriye dönüyormuş gibi görünmesi (kameranın kare hızı). Aynı şey kaydedilmiş bir trajektoride de olur.
2. **Atölye, stroboskop:**
   - Okur bir bağ seçer (O–H 9,2 fs, C=O 20,2 fs, C–C 29,6 fs; periyotlar Lab 2'nin formülüyle) ve kayıt aralığını 0,5 ile 40 fs arasında kaydırır.
   - Gerçek titreşim ince bir çizgiyle, kaydedilen kareler noktalarla ve karelerden görünen hareket kalın bir çizgiyle gösterilir. Görünen periyot, örnekleme kuramından (katlanma) hesaplanır ve yazılır.
   - Kartlar:
     - Kayıt aralığı periyodun yarısından kısa olmalı (T/2 sınırı).
     - Kayıt aralığı periyoda eşitse titreşim duruyor görünür.
     - Periyottan biraz uzun bir aralık, yavaş ve sahte bir titreşim üretir.
3. **Tezgâh, gerçek veri:**
   - Bu projenin alanin dipeptit pilotunun 1. koşusu kullanılır. Ayarlar: 2 fs adım, 1 ps kayıt (`nstxout-compressed = 500`), yalnız dipeptit kaydı, 10 ns; φ ve ψ `gmx angle` çıktısından.
   - Okur kayıt aralığını 1, 2, 5, 10, 20, 50, 100, 200, 500 ve 1000 ps arasından seçer.
   - Sayfa, seçilen aralıkla alt örneklenmiş seriden şunları hesaplar: φ(t) grafiği, αR popülasyonu, sayılan αR/β durum değişimleri, kare sayısı, dosya boyutu. Dosya boyutu ölçülen 1.738.508 bayttan orantıyla hesaplanır ve kaynağıyla yazılır.
   - Durum tanımları MD-U'nun dondurulmuş planıyla aynıdır.
4. **Defter:**
   - Denemeler iki grafikte birikir: kayıt aralığına karşı sayılan geçiş ve kayıt aralığına karşı αR popülasyonu. İkisi de 1 ps değerine göre oranlanır.
   - Kurallar okurun verisinden çıkar:
     - Popülasyon (bir denge ortalaması) seyrek kayıtla neredeyse değişmez.
     - Geçiş sayısı (bir kinetik nicelik) kayıt aralığı durumda kalma süresine yaklaşınca hızla düşer.
     - Disk maliyeti kayıt aralığıyla ters orantılıdır.
   - Keşif kartları bu üç kuralı, okurun en az üç farklı aralıkta deneme yapmasından sonra açar.
5. **Proteine dönüş:**
   - Hangi analizin hangi kayıt aralığını istediğini gösteren bir tablo: denge popülasyonu ve RMSD dağılımı, geçiş hızları ve yaşam süreleri, titreşim spektrumu.
   - `nstxout-compressed`, `nstenergy` ve `compressed-x-grps` ayarları ve bunların pilottaki değerleri.
   - Tablodaki yargılar niteldir; sayısal sınırlar yalnız sayfada hesaplananlardır.
6. **Sınav:** Altı soru. En az biri stroboskop, biri gerçek veri, biri disk maliyeti hakkındadır.

Veri: `mdu/case/learn/_work/pilot/run1/phi.xvg` ve `psi.xvg` (10.000 kare, t > 0). Sayfaya 0,01° çözünürlükle tamsayı olarak gömülür (yaklaşık 2 × 10.000 sayı). Bir çıkarma betiği JSON üretir; bağımsız bir doğrulama betiği aynı sayıları xvg'den ayrı bir kodla yeniden hesaplar.

## 5. Siteye taşıma

- `sources/MD-T.html` yeni içerikle yeniden yazılır; eski sürüm git geçmişinde kalır.
- Üç laboratuvarın kodu ayrı betik blokları olarak durur, ortak yardımcılar (sayı biçimi, sınav, keşif kartı, defter saklama) tek blokta toplanır.
- Tarayıcı saklama anahtarları sürümlüdür: `ahl-mdt-v2-*`. Okuma ve yazma try/catch içindedir.
- `modules.json`: MD-T 0.2.0. `docs/CHANGELOG.md`, `sources/SOURCES.md` (pilot verisi ve lisans) ve `i18n/GLOSSARY.md` güncellenir.
- İngilizce tablo `i18n/MD-T.en.json` yeni metinlerle yeniden kurulur (`i18n/_work/build_mdt_en.py`).
- Kitaba yazılacak dosyalar:
  - `book/prototypes/MD-T_ENERJI_KUVVET_KESIF_2026-09-26.html`
  - bu belgenin bir kopyası.

## 6. Test ve doğrulama

`tools/mdt_test.mjs` (Playwright, 1280 ve 390 piksel):

- **Statik denetimler:** em-dash yok, doctype, dış kaynak yok, `lang="tr"`.
- **Her keşif kartı** betikli etkileşimle tetiklenir ve "Keşfedildi" olur; açıklamasındaki sayılar beklenen değerlerle karşılaştırılır.
- **Hesaplanan sayılar** Python'da bağımsız olarak yeniden hesaplanır ve karşılaştırılır:
  - λ, ħω/kT, periyotlar ve 2 fs hatası;
  - görünen stroboskop periyodu;
  - Lab 3'te her aralık için popülasyon ve geçiş sayısı (xvg'den);
  - dosya boyutu.
- **Genel:** konsol hatası yok, 390 pikselde yatay taşma yok, her sorunun tam bir doğru şıkkı var, saklama engellendiğinde sayfa çalışıyor.
- **Mevcut denetimler:** `tools/check.mjs` kuralları, `tools/test-lang.mjs` (İngilizce sayfada Türkçe kalıntı yok), `e2e.mjs`.

Yayından önce bağımsız bir inceleme yapılır, ardından yayın ve canlıda son kontrol.

## 7. Kapsam dışı

- MD-PBC, DK-T, MD-ENS ve MD-CON bu belgede tanımlanmaz; her biri sırası gelince buraya bir bölüm olarak eklenir.
- Karanlık tema: site şu an yalnız açık tema kullanıyor; bu iş onu değiştirmez.
- İngilizce metnin insan tarafından gözden geçirilmesi ayrı bir iştir.

## 8. MD-PBC (27 Eylül 2026)

MD-PBC (CH04) dört laboratuvardan oluşur. Proje sahibinin yönlendirmesi: uygulayıcı deneyselcidir; periyodik sınır fiziksel ve laboratuvardan bilinen örneklerle anlatılır; görsel simülasyon panelleri yüksek kalitededir (yüksek çözünürlüklü tuval, gölgeli küreler, akıcı hareket); okur bir topa yön ve hız verir; periyodik sınırın enerji açısından neden kritik olduğu okurun kendi ölçümünden çıkar; her modül İngilizce çevirisiyle birlikte yayınlanır (ayrıca sorulmaz).

Karar (27 Eylül): MD-PBC sayfası, sitenin maskotlu kabuğu yerine onaylanan prototipin görsel dilini taşır (açık tema, site şeridi ve geçiş şeridi build tarafından eklenir). Gerekçe: proje sahibi prototipin panellerini onayladı; bedeli, MD-T ile görsel farktır.

Ortak kurallar: sayılar tarayıcıda hesaplanır ya da bu projenin gerçek koşularından gelir; hesaplanmamış durum gösterilmez. Her lab üç keşif kartı taşır (atölye ve tezgâh ya da defter); kart yalnız okurun kendi denemesiyle ve kendi sayılarıyla açılır. İlerleme sayacı yayındaki kartları sayar (Lab 1 ile 6; bütün lablar yayında 4 × 3'ten fazla olabilir, sayfadaki kartların toplamı). Dar ekranda (560 px altı) tuval etiketleri kısa hâlleriyle çizilir.

Karar (28 Eylül, proje sahibi): MD-PBC tek sayfada fazla şiştiği için üç modüle bölündü; hepsi CH04, temel düzey. MD-PBC: Lab 1 (kenarsız kutu) ve ileride Lab 4 (kutu boyu). MD-CUT: Lab 2 (en yakın kopya ve kesme). MD-ELEC: Lab 3 (tuz ve Ewald). Kalıcı kimlikler proje sahibi tarafından seçildi (MD-CUT, MD-ELEC). Üç sayfa ortak bir dizi gezinmesi taşır; ilerleme her modülde kendi kartlarını sayar (6, 3, 3). Aşağıdaki "Lab n" adları tasarım sırasını gösterir.

### 8.1 Lab 1 · Kenarsız kutu (yayında, 0.2.0)

Deneysel köprü: 96 kuyucuklu plakanın kenar etkisi ve kristalin birim hücresi. Atölye: bir su molekülünü duvarlı kutuda, boşlukta ve periyodik kutuda fırlatma; kutu çerçevesi kaydırılabilir. Tezgâh: 100 moleküllük 2B Lennard-Jones sıvısı (T = 0,40 ε, ρ = 0,82), enerjiye göre renk, ısıtma ve itme. Defter: damla ve periyodik kutuda 25-400 molekül; 1/√N ekseninde sonsuz damlaya uzatma. Proteine dönüş: ubikitin kutusu (editconf -d; küp ya da onikiyüzlü; 1UBQ hazırlığıyla ayarlı), RTX 5080 süre tahmini (Exxact AMBER 26 ölçümlerinden ara değerleme).

### 8.2 Lab 2 · En yakın komşu ve kesme (yayında, 0.3.0)

- Deneysel köprü: FRET verimi uzaklığın altıncı kuvvetiyle düşer (E = 1/(1 + (r/R₀)⁶)); van der Waals çekimi de r⁻⁶ ile azalır: iki kat uzakta 64 kat zayıf. Okur bildiği bir ölçümden kuvvetin ne kadar kısa erimli olduğunu çıkarır.
- Atölye A (minimum görüntü): periyodik kutuda iki molekül sürüklenir; doğrudan uzaklık ve en yakın kopyaya uzaklık çizgileriyle gösterilir. Kart: okurun denemesinde ölçülen uzaklık hiçbir zaman L/2'yi (köşegende L/√2) aşmaz.
- Atölye B (kesme): LJ eğrisi ve kesme kaydırıcısı; kesmenin dışında kalan çekim payı (kuyruk) sayı olarak; düz ve kaydırılmış potansiyel. Canlı NVE sıvısında toplam enerjinin zaman grafiği. Kartlar: düz kesmede enerji kayar, kaydırılmışta kaymaz (okurun kayma sayılarıyla); kesme L/2'yi aşınca aynı komşu iki kopyasıyla birden sayılır (sayfa bunu çizer).
- Defter: kesme mesafesine karşı enerji kayması (düz ve kaydırılmış) ve molekül başına hesaplanan çift sayısı (maliyet, yaklaşık r_c²). Kural okurun verisinden: doğruluk ile maliyet arasındaki denge.
- Proteine dönüş: bu projenin koşu ayarları (mdout: rvdw = rcoulomb = 1,0 nm, nstlist = 10, verlet-buffer-tolerance = 0,005, dt = 0,002); σ ölçeğinde 1,0 nm'nin karşılığı; komşu listesi ve Verlet tamponu kısa not olarak (ayrı lab yok).

- Uygulamada değişenler (proje sahibinin geri bildirimleriyle, 27 Eylül): Atölye A gerçek hareket hesabına geçti. İki molekül kısa menzilli çekimle etkileşir (U = (1,6/r)⁸ − 3(1 − (r/3,9)²)², menzil 3,9 σ < L/2 = 4 σ); okur "en yakın kopya (MD)" ile "kutunun içinden (hatalı)" kuralını karşılaştırır, grafikte toplam enerji şeridi vardır. Kart k2c1: en yakın kopya kuralında en az iki sınır geçişi; kutu içi uzaklığın sıçraması, en yakın kopya uzaklığının ve enerjinin sürekliliği okurun sayılarıyla. Atölye B tezgâha dönüştü: seçili molekülden hesaba katılan komşulara çizgiler, çembere giriş ve çıkış halkaları, aynı hareketten iki enerji (düz ve kaydırılmış) birlikte çizilir. Proteine dönüş kısa not yerine gerçek ölçekte simülasyon oldu: ubikitin yüzeyindeki atom, su (Langevin, D ≈ 0,0023 nm²/ps), kesme ve liste çemberi, tampon, nstlist, kaçan etkileşim sayacı; hazır ayar bu projenin koşusu (1,0 nm, 0,104 nm, 50 adım).

### 8.3 Lab 3 · Tuz ve Ewald (yayında, 0.4.0)

- Deneysel köprü: NaCl'nin Born-Haber döngüsüyle ölçülen örgü enerjisi (yaklaşık 787 kJ/mol; kaynakla doğrulanacak) ve tamponda iyonik şiddetle gelen perdeleme (1:1 tuz, 25 °C: Debye uzunluğu ≈ 0,304/√I nm; 150 mM'de ≈ 0,79 nm).
- Atölye: 2B iyon örgüsünde kabuk kabuk Coulomb toplamı; okur kabuk ekler, toplamın salındığını ve toplama biçimine (kare kabuk, daire kabuk) bağlı olduğunu görür; Madelung sabiti (NaCl 3B: 1,7476) ile karşılaştırma yalnız 3B hesap sayfada yapılabiliyorsa gösterilir.
- Tezgâh: 1/r⁶ ile 1/r'nin kesmede kaybettiği pay (okurun seçtiği kesmeyle); Ewald ayrışımı: nokta yük = perdelenmiş yakın kısım (erfc, kesilir) + düzgün uzak kısım (ızgarada, PME). Kaydırıcı α ile iki kısmın payı değişir, toplam değişmez (sayfada hesaplanır).
- Proteine dönüş: coulombtype = PME, fourierspacing = 0,12 (bu projenin ayarı); net yük ve karşı iyon (genion) gereği; Ewald'da net yük düzgün arka planla dengelenir.

- Uygulamada değişenler (proje sahibinin geri bildirimleriyle, 28 Eylül): Deneysel köprüye DNA ve protein eklendi. B: DNA çift sarmalında baz çiftleri sıcaklığa göre işbirlikli açılır; T_m = 81,5 + 0,41 · %GC + 16,6 · log₁₀[Na⁺] (Schildkraut-Lifson; kısa oligolarda doğrusallıktan sapma Owczarzy ve ark. 2004 ile not edilir). C: 36 protein molekülü periyodik kutuda; az tuzda zıt yüklü yüzeyler kümelenir (tuzla çözme), çok tuzda yağsı yüzeyler yapışır (tuzla çöktürme); NaCl ve amonyum sülfat karşılaştırılır; model temsilîdir. A'daki sıcaklık seçeneği kaldırılıp karşılaştırmaya dönüştü: aynı tuzda 4, 25 ve 37 °C'de Debye uzunluğu neredeyse aynıdır, çünkü ε_r ile T'nin çarpımı az değişir (çizim 25 °C içindir). Örgü enerjisi 786 kJ/mol ile doğrulandı. Atölye iki boyutlu kare örgüde yapıldı (Madelung 1,6155); 3B NaCl değeri köprüde sayı olarak verilir. Tezgâh altı adımlı animasyona dönüştü (nokta yük, perdeleyici bulut, yakın kısım, düzgün uzak kısım, ızgara, toplam); β kaydırıcısı ile iki kısmın payı değişir, toplam değişmez. Proteine dönüş: 1/β = 0,32 nm, ızgara 56³, 10 ps ortalamasında Coul. recip. +1725,79 kJ/mol; ubikitin topolojisinin yükü 0,000 e olduğu için karşı iyon gerekmedi.

### 8.4 Lab 4 · Kutu ne kadar büyük olmalı? (yayında, MD-PBC 0.6.0'da Laboratuvar 2)

- Deneysel köprü: "Kutunuzdaki proteinin derişimi kaç?" 1UBQ onikiyüzlü kutusu (193,42 nm³) tek proteinle yaklaşık 8,6 mM demektir (1/(N_A · V)); NMR örneklerinden bile derişik.
- Atölye: d ya da kutu hacmi kaydırıcısı → derişim (mM), kopyalar arası uzaklık, su sayısı; deneysel derişimlerle (µM ile mM) karşılaştırma.
- Gerçek veri: bu projenin kısa koşularında kopyalar arası en kısa uzaklık (gmx mindist -pi, 10 ps, 11 kare): d = 1,0 nm (S0) en az 2,253 nm; d = 0,5 nm (S3) en az 1,263 nm (5. ps), yani 1,0 nm kesmenin hemen üstünde. Koşuların 10 ps olduğu açıkça yazılır.
- Defter ya da tezgâh: periyodik kutuda difüzyonun kutu boyuna bağlılığı (Yeh-Hummer düzeltmesi: D_PBC = D_∞ − k_BTξ/(6πηL), kübik kutuda ξ = 2,837297; formül ve viskozite değerleri kaynakla doğrulanacak). Deneysel köprü: FRAP ve DLS ile ölçülen difüzyon katsayıları.

- Uygulamada değişenler (28 Eylül): Bölünmeden sonra bu laboratuvar MD-PBC sayfasında Laboratuvar 2 oldu (çapa `#kutu`). Doğrulanan değerler: Yeh-Hummer düzeltmesi D₀ = D_PBC + 2,837297 kT/(6πηL) (Yeh ve Hummer 2004); viskozite TIP3P 0,321, gerçek su 0,896 mPa·s, 298 K (González ve Abascal 2010). Yeh-Hummer tezgâhı formülün kendisi yerine sayfada hesaplanan bir periyodik Stokes akışıdır (Gauss yumuşatılmış kuvvet, ters uzay kafes toplamı; R/L küçükken Hasimoto serisini verir); okur suyun geri akışını görür. Ubikitin için R_h = 1,539 nm (Ramanujam ve ark. 2020, PFG-NMR); 298 K'de gerçek suda D∞ ≈ 158, TIP3P'de ≈ 442 µm²/s; bu projenin onikiyüzlü kutularında hareketlilik oranı S0 0,303, S3 0,209 (model tahmini; birinci derece formül bu kutularda yetersiz). Proteinin difüzyonu bu projenin 10 ps'lik koşularında ölçülmedi; sayfa bunu açıkça yazar. Derişim köprüsü: 0,5 mM NMR örneği, S0 73,5 g/L, S3 121,5 g/L, E. coli sitoplazması 300-400 g/L (Zimmerman ve Trach 1991); difüzyon köprüsü: GFP suda 87, E. coli'de 7,7 µm²/s (Elowitz ve ark. 1999).

### 8.5 Yayın ve test

Her lab önce claude.ai prototipi olarak onaylanır, sonra sayfaya eklenir ve aynı yayında İngilizce tablo güncellenir (i18n/_work/build_MD-PBC_en.py; değişen satırlardan tablo). tools/mdpbc2_test.mjs her lab için kart açılışlarını (okurun denemesiyle), İngilizce sayfayı, 390 px taşmayı, saklama kapalı ve azaltılmış hareket durumlarını sınar. Kitap kopyası her yayında yeni sürümlü bir dosyadır.

## 9. MD-EQ (28 Eylül 2026)

Karar (28 Eylül, proje sahibi): minimizasyon ve dengeleme laboratuvarı MD-O içine değil, yeni bir modül olarak yayımlanır: MD-EQ, orta düzey, kitapta CH11. MD-O (CH07) yapı dosyası ve protonasyon laboratuvarlarıyla sonra yeniden yazılır. Tek sayfa, tek laboratuvar, beş keşif kartı (atölye, tezgâh, üretim sınaması, defter, proteine dönüş).

Proje sahibinin geri bildirimleriyle şekillenen kararlar: çakışan atomlarla dinamik çalışamaz (iki boyutlu LJ yerine gerçek birimlerde katı TIP3P ve kısıt çökmesi); su gerçekçi hareket etmeli (tek katman yerine üç boyutlu 125 molekül, 10 ps, iz çizgileri); Berendsen'in üretimde neden kullanılmadığı uygulamalı gösterilir (sıcaklık dağılımı ve dalgalanmadan ısı sığası; uçan buz küpü katı suda gösterilemediği için yalnız kaynakla anlatılır); proteine dönüş gerçek dosyalarla etkileşimli (çakışma yerleri ve S1'in çökme kareleri). Minimizasyonun ara kareleri kaydedilmediği için canlandırma düz geçiştir ve sayfada öyle yazar.

## 10. MD-O yeniden yazımı (28 Eylül 2026)

Karar (proje sahibi): MD-O (CH07) keşif kalıbıyla yeniden yazılır; ilk laboratuvar "Protonasyon ve yük". Eski 0.1.0 taslağının yerini alır; yapı dosyası laboratuvarı (kristal suları, doluluk, B faktörü) sonra eklenir. Tezgâh, proje sahibinin geri bildirimiyle iki parçalıdır: kuralın dört adımlı anlatımı ve ölçüt haritası ile karar akış şeması (değişkenlerin etkisi doğrudan görünsün diye). Bütün pdb2gmx sonuçları gerçek çalıştırmalardır; sayfanın kural hesabı bunlarla birebir denetlenir.

## 11. MD-PDB (29 Eylül 2026)

Karar (29 Eylül, proje sahibi): MD-O'nun 2. laboratuvarı olarak tasarlanan yapı dosyası laboratuvarı ayrı modül olarak yayımlanır: MD-PDB, orta düzey, kitapta CH07 (bir sayfada bir laboratuvar kuralı, bkz. 8. kısım). Kalıcı kimlik proje sahibinin seçimi. Kimlik öneki o2, dört keşif kartı (o2c1 atölye, o2c2 ve o2c3 tezgâh, o2c4 defter).

B ile MD dalgalanmasının karşılaştırması için proje sahibi yeni bir gerçek koşu istedi (seçenekler 2 ns ve 10 ns'ydi; proje sahibi 2 ns'yi seçti). Koşunun protokolü ve analizi koşudan önce yazılıp SHA-256 ile donduruldu; ilk deneme konteyner sonlanınca 40 ps'de durdu, aynı girdiyle baştan koşuldu ve bu sapma protokole yazıldı. Sayfadaki yoğunluk haritası ve uzun pozlama öğretim modelidir ve sayfada öyle etiketlenir; 1UBQ'nun ölçülmüş haritası kullanılmadı. Tezgâhta atom görünürlüğü önce izdüşürülmüş (toplam) yoğunlukla denendi; üst üste binen atomlar haritayı gerçek dışı doldurduğu için üç boyutlu yoğunluğa (düzleme dik en büyük değer, görünürlük atom merkezinde) geçildi.

## 12. MD-DT (29 Eylül 2026)

Karar (29 Eylül, proje sahibi): proteinde zaman adımı laboratuvarı yeni modül olarak yayımlanır: MD-DT, orta düzey, kitapta CH02 (CH02 taslağındaki "protein için zaman adımı kabulü" boşluğunu doldurur). Kimlik öneki d1, dört keşif kartı (d1c1 atölye, d1c2 ve d1c3 tezgâh, d1c4 defter). Veri için proje sahibi ızgara koşusunu seçti: 6 zaman adımı × 4 kısıt düzeni, NVE, 20 ps; protokol koşulardan önce SHA-256 ile donduruldu; konteyner yeniden başlayınca yarım kalan iki koşu baştan koşuldu ve sapma protokole yazıldı. grompp'un reddettiği ayarlar -maxwarn ile "zorla" koşuldu ve sayfada öyle etiketlenir.

Proje sahibinin geri bildirimiyle ilk dört bölüm görsel olarak zenginleştirildi (2. sürüm). "Bağların saati"nde Δt sürgüsü stroboskop kapalıyken görüntüyü değiştirmiyordu; 3. sürümde her bağa Δt aralıklı örnekleme şeridi eklendi. Isınma sınırı okurun seçimidir; sayfa tek bir "doğru" adım önermez. Bu kısa, tek tohumlu ızgarada HMR kaymayı azaltmadı; sayfa bunu yöntem hakkında bir hüküm olarak değil, bu deneyin sonucu olarak verir.

## 13. MD-U yeniden yazımı (29 Eylül 2026)

Karar (29 Eylül, proje sahibi): MD-U tek sayfada tek bir soruya indirilir: "αR payı kaç, ne kadar eminiz?" (eski 0.1.0'ın altı laboratuvarı yerine; bir sayfada bir laboratuvar kuralı). Uzman düzey, kitapta CH17, sürüm 0.2.0. Kimlik öneki u1, dört keşif kartı. Veri yalnız bu projenin dondurulmuş pilotudur (`book/cases/alanine_dipeptide/PROTOCOL_2026-09-26.md`; GROMACS 2026.3, 5 bağımsız koşu × 10 ns, 1 ps kayıt). Protokoldeki üretim (5 × 200 ns) koşulmadı; sayfa üretim seçimlerinde "Bu senaryo hesaplanmadı" yazar. Eski prototip dosyaları kitapta değiştirilmeden durur.

Tanımlar protokolün analiz planından alınır ve değiştirilmez: üç durum (αL: 0 ≤ φ < 180; αR: φ < 0 ve −120 ≤ ψ < 50; β/PPII: geri kalanı), duyarlılık sınırları ψ = 30 ve 70; g blok ortalamasıyla (B = 2^k, en az 16 blok) ve Sokal otokorelasyonuyla (M ≥ 5 τ_int); N_eff = N / g; üç hata (saf, otokorelasyon düzeltmeli, koşular arası t ile, 4 serbestlik derecesi, 2,776). Sayfadaki tarayıcı hesabı, `learn/analysis.py`'nin dondurulmuş sonuçlarıyla testte birebir karşılaştırılır.

1. **Deneysel köprü, "n kaç?"** Aynı lizattan üç kuyu biyolojik tekrar değildir; saniyede bir kare çekilen bir hücre göçü videosunun 3.600 karesi 3.600 bağımsız ölçüm değildir. Sözde tekrar: gözlemler zamanda ya da uzayda ilişkili olduğu hâlde bağımsızmış gibi işlenir (Lazic 2010, BMC Neurosci 11:5, doi 10.1186/1471-2202-11-5). Etkileşimli öğretim modeli (tarayıcıda, etiketli): yavaş değişen bir sinyal okurun seçtiği kare aralığıyla örneklenir, aynı deney 20 kez yinelenir; "her kare bağımsız" hata çubuğu ile 20 deneyin gerçek saçılımı yan yana çizilir.
2. **Atölye, sakin eğri ve gezen açılar.** Gerçek karelerden 3B dipeptit; RMSD (ağır atomlar, minimize yapıya) ile φ ve ψ aynı zaman ekseninde; Ramachandran haritası üç durum bölgesiyle. Okur αR/β sınırını kaydırır (önceden yazılmış üç değer işaretli), popülasyon canlı değişir. Kart u1c1: okurun seçtiği pencerede RMSD sakin kalırken durum defalarca değişir (okurun sayılarıyla).
3. **Tezgâh, ardışık kareler bağımsız değil.** Okur koşu ve durum seçer; gömülü 1 ps'lik durum dizilerinden (koşu başına 10.000 kare) otokorelasyon ρ(k), blok ortalaması g_B ve N_eff tarayıcıda hesaplanır; saf ve düzeltilmiş hata çubukları yan yana. Kart u1c2: okurun bulduğu g ve N_eff. Kart u1c3: αL, koşu başına 1-4 ziyaret; g ve N_eff anlamsızdır (örneğin 2. koşuda N_eff, N'den büyük çıkar), sayfa "hata çubuğu kurulamaz" diye işaretler.
4. **Defter, beş koşu.** Okur pencere boyunu (1, 2, 5, 10 ns; üretimin başından) ve koşu sayısını (2-5) seçer; koşular arası ortalama ve %95 aralık (t), her koşunun düzeltilmiş hatası ve toplam süreye karşı aralık genişliği. Kart u1c4: aynı toplam 10 ns, tek bir 10 ns'lik koşu ile beş koşunun ilk 2 ns'si karşılaştırılır; kısa pencerelerin başlangıca yakın olduğu yazılır. αL'nin %95 aralığı sıfırı içerir ve öyle gösterilir.
5. **Proteine dönüş.** Bu projede hangi sonucun tek koşuya ya da tek tohuma dayandığını gösteren tablo: RMSF2NS (2 ns, iki yarı r 0,86; 1-72'de 0,59), DTGRID (tek tohum, 20 ps). Üretim planı 5 × 200 ns: "Bu senaryo hesaplanmadı". Yöntem kaynağı: Grossfield ve ark. 2018 (Living J Comput Mol Sci 1:5067, doi 10.33011/livecoms.1.1.5067).
6. **Sınav:** altı soru.

Yayında MD-U `planned` durumundan `pilot` olur (`md/md-u/`), İngilizcesiyle. Testler iki dilde; g ve N_eff denetimi `analysis.py` değerleriyle.

## 14. DK-T yeniden yazımı (30 Eylül 2026)

Karar (29-30 Eylül, proje sahibi): DK-T, eski 2B oyuncak modelin yerine gerçek tripsin cebiyle tek bir soruya indirilir: "Doğru pozu nasıl buluruz, bulduğumuzu nasıl biliriz?" Temel düzey, sürüm 0.2.0. Kimlik öneki t1, dört keşif kartı. Vaka 3PTB (sığır beta-tripsini ve benzamidin; hazırlık bu projenin 24 Eylül denemesiyle aynı: `rec_nowat.pdbqt`, Meeko, bütün kristal suları ve Ca²⁺ çıkarılmış). Üç RMSD tanımı ve su/protonasyon kararları DK-O'da kalır.

Skor: AutoDock Vina skor fonksiyonu tarayıcıda yeniden hesaplanır (beş terim: gauss1, gauss2, itme, hidrofobik, hidrojen bağı; ağırlıklar −0,035579, −0,005156, 0,840245, −0,035069, −0,587439; XS yarıçapları ve türleri; 8 Å kesme; son skor = etkileşim / (1 + 0,05846 · N_rot), benzamidinde N_rot = 1). Python eşdeğeri kristal pozda −6,148'e karşı Vina −6,145 verdi; sayfanın JavaScript hesabı Vina'nın kendisiyle testte karşılaştırılır.

1. **Deneysel köprü, pozitif kontrol.** Bir tahlilde bilinmeyenlerden önce cevabı bilinen standart koşulur; redocking docking'in pozitif kontrolüdür. Ölçülen afinite: ChEMBL'de benzamidin (CHEMBL20936) ile sığır tripsini (CHEMBL3769) için altı bağımsız Ki 18,4-39 µM (belgeler CHEMBL1135884, CHEMBL1150979, CHEMBL1135460, CHEMBL1131451, CHEMBL4725290); iki belgede (CHEMBL1127404, CHEMBL1133610) 31 nM yazılıdır, diğerlerinden üç kertelik farklıdır ve sayfada ayrıca belirtilir.
2. **Atölye, pozu elle yerleştirmek.** 3B cep (Asp189, Ser190, Gly219, Ser195, His57 işaretli); okur benzamidini kaydırır, döndürür ve amidin bağı etrafında çevirir; canlı Vina skoru, beş terimin dökümü ve kristale RMSD (simetri düzeltmeli, ağır atomlar). Kart t1c1: kristale 2 Å içinde ve skoru kristal pozunkine yakın bir poz. Kart t1c2: ters (amidin dışarı) bir pozun kötüleşmesini terimlerden okumak.
3. **Tezgâh, arama.** Aynı skorla tarayıcıda Monte Carlo araması (rastgele başlangıç, adım sayısı, sıcaklık, tekrar); skor izi ve bulunan pozlar. Kart t1c3: okurun kendi koşularında kısa aramanın yanlış yere takılması, uzun ya da çok başlangıçlı aramanın cebi bulması. Arama bir öğretim modelidir ve Vina'nın algoritmasının aynısı değildir; sayfada öyle etiketlenir.
4. **Defter, gerçek Vina koşuları.** Yeni ızgara (DKTGRID, protokol koşulardan önce SHA-256 ile dondurulur): bütün protein kutusu, exhaustiveness 1, 2, 4, 8, 16 × 20 tohum; başarı ölçütü okurun seçimi (ilk poz < 2 Å, ya da ilk n pozdan biri < 2 Å). 24 Eylül denemesinin kutu kaydırma sonuçları yanında. Kart t1c4: okurun ölçütüyle maliyet ve başarı takası.
5. **Proteine dönüş.** Redocking neyi kanıtlamaz: çapraz docking yapılmadı; skor afinite değildir (kristal pozun skoru ile ölçülen Ki'den hesaplanan ΔG yan yana, uyarıyla). DK-O ve DK-U'ya bağlantı.
6. **Sınav:** altı soru.

Yayında (30 Eylül, proje sahibinin dört geri bildirim turundan sonra; sürüm 2.3 prototipi): atölyedeki 3B cep yerine cebin yatay yüzey kesiti (yandan: iki duvar; üstten: halka yüzü; protein kesit düzleminde Gauss yoğunluk yüzeyi), skor yine üç boyutta. Skor ölçeği kesilmez (0'ın solu doğrusal, sağı logaritmik); 0,5 Å'dan derin çakışmalar kırmızı, hidrojen bağları mavi (kristal pozda bile H bağı olmayan çiftler 0,46 Å'a kadar iç içe). Tek bir C-C çifti için Vina ile AMBER Lennard-Jones itmesi yan yana ve yeni kart t1c5 "Duvara itince skor ne yapar?" (beş kart). Q ve E ile döndürme; "Yerel minimuma indir" (koordinat iniş, 6 serbestlik derecesi, tam Vina skoru; 30 rastgele başlangıcın 12'si doğru çukura). Tezgâhta arama haritası (arama kutusu, başlangıç, denenen pozlar, kabul edilen yol; sonuç doğru, cepte ama ters ya da başka yerde; iki kesit). Sınav yedi soru (yedinci: Vina itmesinin yumuşaklığı). Kart t1c2'nin elle çevrilmiş pozu iyileştirilmemiştir (skor −2,61); Vina'nın ters pozları yerel iyileştirmeden sonra −4,5 ile −5,0.

## 15. DK-O yeniden yazımı (30 Eylül 2026)

Karar (30 Eylül, proje sahibi): DK-O tek bir soruya indirilir: "Sonuç kilidin hangi ayrıntısına bağlı?" Orta düzey, sürüm 0.2.0, kitapta CH07 ve CH09. Kutu, exhaustiveness ve simetri düzeltmeli RMSD DK-T'ye geçtiği için DK-O'dan çıkar. Veri yalnız bu projenin hesapları: 3PTB üzerinde hazırlık kararlarının tam etkileşimli ızgarası (DKOPREP) ve beş tripsin yapısında çapraz docking (DKOCROSS; 2PTN, 1TNH, 2PTC, 1TGN dosyalarını proje sahibi indirir). Protokoller koşulardan önce SHA-256 ile dondurulur.

1. **Deneysel köprü, matriks etkisi.** Bir tahlil standart tamponda geçer, gerçek numunede sapabilir (spike-recovery). Redocking standartta geçmektir; çapraz docking başka bir "numunede" denemektir. Beş yapının cep kalıntıları üst üste, kalıntı başına sapma ve B faktörü.
2. **Atölye, dosyadan docking girdisine.** 3PTB cebinin yatay yüzey kesiti (DK-T'deki kod); doluluğu 0 olan Gln192 atomları ve cebe yakın sular işaretli. Beş karar: sular (hiçbiri, HOH416, hepsi), Asp189 (ASP, ASH), His57 (HIE, HID, HIP), Gln192 OE1/NE2 (tut, sil), Ile16 ucu (NH, NH₃⁺). Her birleşimin kristal poz skoru ve 5 tohumlu redocking sonucu gerçek koşulardan. Vina'nın göremediği kararlar (elektrostatik terim yok; H sayısı yalnız verici türünü belirler) okura gösterilir.
3. **Tezgâh, çapraz docking.** Aynı benzamidin beş yapıda; her yapı cep Cα'larıyla 3PTB'ye hizalanır, kutu 3PTB ligandının yerinde; 20 tohum. Okur yapı seçer: cep kesiti, bulunan pozlar, kristale uzaklık.
4. **Defter, kilidin hangi ayrıntısı önemli?** Yapı başına başarı, en iyi skor ve cep sapması; cep benzerliği ile docking başarısı; seçilmiş hazırlık kararlarının yapılar arasında etkisi. "Ligandsız bir yapıyla çalışsaydınız hangisini seçerdiniz?"
5. **Proteine dönüş.** Karar günlüğü; hesaplanmayanlar: MD topluluğuyla docking, başka skor fonksiyonları. DK-T, DK-U, MD-EQ bağlantıları.
6. **Sınav:** yedi soru. Beş keşif kartı.

Yayında (30 Eylül, 0.2.0): proje sahibinin "atölyede ayarlarla çok bir şey değişmedi" geri bildirimiyle atölyeye sonucu değiştirebilecek üç karar eklendi (ligand protonasyonu, kristal ligandın dosyada unutulması, Asp189 yan zincirinin kesilmesi; DKOPREP2) ve görsel güçlendirildi (poz geçişi, önceki poz, atom katkısı halkaları, otomatik uzaklaşma). Çapraz docking yapı dosyaları gelmediği için bu sürümde yok; tezgâh ve defter sonraki sürümde. Yayındaki sayfa: köprü, atölye (beş kart), proteine dönüş, yedi soru.

## 16. DK-U yeniden yazımı (30 Eylül 2026)

Karar (30 Eylül, proje sahibi): DK-U tek bir soruya indirilir: "Skor neyi sıralar? Bir bileşiğin ne kadar sıkı bağlandığını mı söyler, yoksa yalnız bağlananı bağlanmayandan mı ayırır?" Uzman düzey, sürüm 0.2.0, kitapta CH18 ve CH19. Kimlik öneki s1, beş keşif kartı. Eski 0.1.1'in dört ayrı konusu (skor ve pKi, boyut karıştırıcısı, zenginleştirme ve tuzak yanlılığı, ağırlık uydurma) bu tek sorunun atölye, tezgâh ve defteri olur. Eski prototip dosyaları kitapta değiştirilmeden durur.

Veri: 24 Eylül taraması (`book/cases/trypsin_3ptb/screen/`: `library.json` 198 bileşik, 144 tripsin ChEMBL Ki ve 54 D2 tuzağı; `curate.py`, `dock_library.py`; tek tohum, exhaustiveness 4) ve iki yeni hesap. Tanımlar 24 Eylül'den alınır: pKi, eşitlikli kayıtların ortancası (sansürlü kayıtlar işaretli, n = 142 sansürsüz); etkin pKi ≥ 7 (54); zayıf set 24 Eylül `analysis.py` tanımıyla 28 bileşik (tanım protokole aynen yazılır); S1 bayrağı, en iyi pozda katyonik N ile Asp189 CG arası < 4,0 Å. Lisans: ChEMBL CC BY-SA 3.0, atıf Zdrazil ve ark. 2024.

Yeni hesaplar (protokoller koşulardan önce SHA-256 ile dondurulur; reseptör `rec_nowat.pdbqt`, merkez (−1,759, 14,461, 16,916), kutu 24 Å, ligand hazırlığı 24 Eylül ile aynı: RDKit gömme tohumu 20260924, MMFF, Meeko; Vina 1.2.7):

- **DKUSEED:** 198 bileşik × 5 tohum (20261001-20261005), exhaustiveness 8, 9 poz. Her koşu: skor listesi, etkileşim, beş terimin ağırlıklı katkısı, en iyi poz koordinatları, katyon-Asp189 CG uzaklığı. Denetim: 24 Eylül skorlarıyla karşılaştırma (aynı hazırlık, farklı tohum ve exhaustiveness; birebir eşitlik beklenmez, fark raporlanır).
- **DKUDECOY:** 54 etkinin her biri için 4 eşleştirilmiş tuzak (en çok 216). Havuz: tripsinle ilgisi bilinmeyen ChEMBL hedeflerinin pChEMBL ≥ 6 bileşikleri, ChEMBL bağlayıcısıyla alınır (hedef listesi protokolde sabitlenir; D2 hariç, çünkü ayrı bir set). Dışlama: amidin ya da guanidin taşıyan, tripsin setinde bulunan, 8-40 ağır atom ve en çok 10 dönebilir bağ dışında kalan bileşikler; ECFP4 (2048 bit) Tanimoto benzerliği herhangi bir etkine ≥ 0,35 olanlar. Eşleştirme: net yük (pH 7,4, 24 Eylül `protonate.py`) birebir; ağır atom ±3, logP ±1, H verici ±1, H alıcı ±2, dönebilir bağ ±2; ölçeklenmiş uzaklığa göre en yakın, tekrar kullanmadan. Eşleşmeyen etkin sayısı raporlanır. Tuzaklar DKUSEED ayarlarıyla koşulur (5 tohum).

Analiz planı (dondurulur): bileşik skoru, 5 tohumun ilk poz skorlarının ortancası; tohum gürültüsü, bileşik başına standart sapma ve aralık; tohum çiftleri arasında Spearman ve sırası değişen bileşik çifti oranı; S1 tutarlılığı, 5 tohumdan kaçında S1; skor ile pKi arasında Pearson ve Spearman (bootstrap %95 aralık, 2.000 örnek, tohum 20261006), ağır atoma göre kısmi korelasyon; yayın içi Spearman (en az 5 bileşikli yayınlar); ayırmada AUC (bootstrap %95 aralık) üç tuzak setiyle (zayıf tripsin, D2, eşleştirilmiş); sıfır modeller: yalnız ağır atom, yalnız net yük, yalnız logP ile sıralamanın AUC'si; ağırlık uydurma, beş terim ve dönebilir bağ sayısı, ridge (λ = 1), 5 katlı rastgele ve yayına göre gruplu bölme.

1. **Deneysel köprü, tek doz ile doz-yanıt.** Birincil taramada tek derişimdeki % inhibisyon etkinleri etkin olmayanlardan ayırmak içindir; etkinlik sıralaması doz-yanıt eğrisinden (IC50, Ki) gelir. Etiketli öğretim modeli: okur tek bir derişim seçer; farklı Ki'li bileşiklerin o derişimdeki % inhibisyonu ile tam eğrileri yan yana. Docking skoru birincil tarama sinyaline benzetilir.
2. **Atölye, skor ve pKi.** 142 tripsin bileşiğinde skor (ortanca, tohum aralığı hata çubuğu) ile pKi. Renklendirme: ağır atom, S1 bayrağı, yayın. Yayın süzgeci (tek kimyasal seri). Okumalar: Pearson, Spearman, kısmi korelasyon, seri içi Spearman. Kart s1c1: iki bileşiğin skor farkı ile tohum gürültüsü. Kart s1c2: boyut hesaba katılınca ilişki.
3. **Tezgâh, ayırma.** Tuzak seti seçimi (zayıf tripsin, D2, eşleştirilmiş); ROC ve AUC; etkin ve tuzakların ağır atom, yük ve logP dağılımları; sıfır modellerin AUC'si yanında; "yalnız S1 pozları" süzgeci. Kart s1c3: D2 ile eşleştirilmiş tuzaklar arasında AUC farkı. Kart s1c4: skorun boyut sıralamasını geçip geçmediği.
4. **Defter, kendi skorunu uydurmak.** Okur ağırlıkları uydurur; rastgele ve gruplu bölmenin sınama başarısı (R², Spearman) sıfır modelle birlikte. Kart s1c5: rastgele bölmedeki kazancın gruplu bölmede kaybolması.
5. **Proteine dönüş.** Skorun neyi sıraladığının özeti; hesaplanmayanlar: RBFE, FEP, MM-GBSA ve başka skor fonksiyonları ("Bu senaryo hesaplanmadı"). DK-T, DK-O ve MD-U bağlantıları; kaynaklar (Wang ve ark. 2015; Cournia ve ark. 2017; Hopkins ve ark. 2004; Truchon ve Bayly 2007; Mysinger ve ark. 2012, DUD-E).
6. **Sınav:** yedi soru.

Sayfanın tarayıcıda hesapladığı nokta değerleri (korelasyon, kısmi korelasyon, AUC, ridge ve bölmeler) testte Python analizinin dondurulmuş sonuçlarıyla karşılaştırılır; bootstrap aralıkları Python'dan gömülür ve süzgeç değişince "aralık yalnız tam set için hesaplandı" yazılır. Yayında DK-U 0.2.0, İngilizcesiyle; testler iki dilde ve üç genişlikte.

## 17. MD-ENS (1 Ekim 2026)

Karar (1 Ekim, proje sahibi): topluluk, dağılım ve ortalama ayrımı yeni modül olarak yayımlanır: MD-ENS, temel düzey, kitapta CH03; yeni GROMACS koşusu yoktur, veri MD-U'nun pilotudur ve oyuncak model çift kuyulu Langevin'dir. Kimlik öneki e1, sekiz keşif kartı (c1 ile c4 atölye, c5, c6 ve c8 tezgâh, c7 defter). İlk prototip (0.1.0) durağandı; proje sahibi "daha interaktif, hareketli ve kaliteli simülasyonlu" olmasını istedi ve dört yönü birlikte seçti: canlı çift kuyu topluluğu, alanin Ramachandran oynatıcısı, alanin 3B molekül görünümü ve köprüde canlı topluluk ile zaman. Tasarım sohbette onaylandı (0.2.0). Tek animasyon döngüsü, görünürlük gözlemcisi, ilk görünürlükte bir kez otomatik oynatma (hareket azaltma ayarında kapalı), sabit tohumlu rastgele sayı üreteci; 3B kare en yakın gerçek kare olarak gösterilir (ara değerleme yok). Keşif kartlarında koşulların yanlışlıkla karşılanmaması için kullanıcı eylemi sayılır ve durma adımı (Dur) kesin adımda durdurur. Sınırlar sayfada açık: pilot denge kanıtı değildir; beş koşu nadir αL durumu için yetmez; oyuncak model proteinin yerine geçmez.

## 18. MD-CON (3 Ekim 2026)

Karar (1 Ekim, proje sahibi): CH05 için yeni modül MD-CON, temel düzey; "termostat, barostat ve zaman adımı seçimi neden kaydedilmeli" sorusu MD-EQ, MD-DT ve MD-ENS ile örtüşmeyecek dar kapsamda. Seçimler: yeni GROMACS ızgarası; dört bölümün hepsi (termostat ve sıcaklık dağılımı, bağlanma süresi ve dinamik, barostat, neden kaydı formu); ızgara seçeneği A (8 termostat koşusu × 4 ns, 6 barostat koşusu × 2 ns, tek tohum). Koşu planı ve analiz notu sonuçlardan önce SHA-256 ile donduruldu; ön kayıtlı eşik SD / kuram 0,9 ile 1,1. Kimlik öneki k, on keşif kartı (c0 köprü, c1 ile c6 atölye, c7 ile c9 tezgâh). Proje sahibi ilk prototipten sonra görsellerin ve simülasyonların güçlendirilmesini istedi ve dört yönü seçti: gerçek kutu 3B (koşuların kendi kareleri; hız kaydı olmadığı için su rengi 1 ps yer değiştirme; barostatta büyütme ekranda yazılı), eğri grafikleri (MSD, T ve V otokorelasyonu, termostat başına Ramachandran; artı imleç ve gizle/göster), canlı oyuncak zincir (halka, hız çarpanı λ, hız dağılımı) ve animasyonlu köprü. Proje sahibinin "tezgâh hatalı gibi" uyarısıyla yapılan denetimde bulunan ve düzeltilenler: dengesiz başlangıç (her koşu artık Langevin altında dengelenmiş durumdan başlar), tek koşudan hüküm (Deftere yazınca beş tohum; kartlar tohum aralıklarıyla karar verir), 3B su renginin merkezlenmiş karelerden hesaplanması (artık sıçramasız, merkezlenmemiş karelerden), "otokorelasyon dibi" yerine ön kayıtlı kuraldaki ilk dip, iki metin hatası. Proje sahibinin sorusu üzerine "Neden üretim koşusunda Berendsen kullanılmaz?" ara durağı eklendi (mekanizma, veriden kanıt, dalgalanmadan sıkıştırılabilirlik, neyi bozmadığı, ne zaman kabul edilebilir, GROMACS uyarısı, kaynaklar). Sınırlar sayfada açık: tek tohum; mdp κ_T gerçek TIP3P değeri değildir; serbest enerji, zaman adımı ve kısıt etkisi, tohumlar arası saçılım, NVE, zar ve protein sistemi hesaplanmadı. Sayfa verisi JSON betik etiketlerinde durur. Yayında MD-CON 0.1.0, İngilizcesiyle.

## 19. MD-REP (4 Ekim 2026)

Karar (3 Ekim, proje sahibi): CH06 için yeni modül MD-REP, temel düzey; karşılaştırma su ile 0,15 M NaCl, koşul başına 8 tekrar × 2 ns, büyük kutu (1520 su; eski kutuda 0,15 M yalnız 1 iyon çiftine denk geliyordu). MD-U (CH17) ile örtüşmemesi için otokorelasyon ve N_eff anlatılmaz; konu tekrar birimi, negatif kontrol, önceden seçilen ölçüt ve eşik, güç. Koşu planı ve analiz planı koşulardan önce SHA-256 ile donduruldu; dört hüküm cümlesi önceden yazıldı (fark var; fark var ama önemli eşiğin altında; eşdeğer; kararsız). Kimlik öneki r, sekiz keşif kartı (c0 köprü, c1 ile c4 atölye, c5 ile c7 tezgâh). Köprü Western blot sözde tekrar modelidir; atölye çift kuyulu oyuncakla 100'er sanal çalışma yapar ve kartlar okurun kendi oranlarından (Wilson aralığıyla) yazılır. Tezgâhtaki bütün test sayıları tarayıcıda her tekrarın değerinden yeniden hesaplanır ve testte Python analiziyle karşılaştırılır. Ön kayıtlı hüküm "kararsız" çıktı; sayfa bunu 8 tekrarın ±5 puanlık etkiyi ayırt edecek güçte olmadığı biçiminde açıkça yazar. Koşular yalnız oturum etkinken ilerlediği için tek kesintisiz çalışma turunda bitirildi; bir sapma kaydı var. Yayında MD-REP 0.1.0, İngilizcesiyle.

## 20. MD-Q (4 Ekim 2026)

Karar (4 Ekim, proje sahibi): CH01 için yeni modül MD-Q, temel düzey; veri mdshare ALA2 3 × 250 ns (26 Eylül D10 kararı yalnız MD-U içindi; MD-Q için mdshare verisi açıkça seçildi). Yeni GROMACS koşusu yok. Konu: biyolojik soru, nicelik, model, veri ve iddia arasındaki zincir; MD-U (örnekleme ve belirsizlik) ile örtüşmemesi için belirsizlik yalnız bir halka olarak adlandırılır, hesaplanmaz. Kimlik öneki q, yedi keşif kartı (qc0 köprü, qc1 ile qc4 atölye, qc5 ve qc6 tezgâh). Köprü iddia merdivenidir (Western blot öğretim modeli, beş cümle, üç karar). Atölyede pay tanımı ve pencere okurun elindedir; bütün paylar tarayıcıda 10 ps alt örnekten hesaplanır ve testte Python analiziyle karşılaştırılır; alt örnek farkı sayfada yazılıdır. 3B pencere önceden yazılmış bir kuralla seçildi. Kaynak beyanı ile yerel denetim sayfada ayrı yazılır. Kimlik kuralına tek harfli Q eklendi. Yayında MD-Q 0.1.0, İngilizcesiyle.

## 21. MD-TRJ (4 Ekim 2026)

Karar (4 Ekim, proje sahibi): CH13 için yeni modül MD-TRJ, orta düzey. Ubikitin için 2 ns protein verisi istendi; MD-O'nun RMSF2NS koşusu (28 Eylül, donmuş protokol) bu ihtiyacı karşıladığı için yeni koşu yapılmadı ve durum proje sahibine bildirildi. Konu: ham dosyadan ölçüme dört karar (PBC, seçim, hizalama, birim) ve işlem sırası. MD-PBC (kutu kurmak) ve MD-U (belirsizlik) ile örtüşmemesi için kutu kurulumu ve örnekleme anlatılmaz. Analiz planı hesaplardan önce donduruldu; işlem zincirleri gerçekten çalıştırıldı, hatalı sıralar dahil; GROMACS'ın bir zincirde durması sonuç olarak gösterilir. Kimlik öneki t, sekiz keşif kartı (tc0 köprü, tc1 ile tc3 peptit, tc4 ile tc6 ubikitin, tc7 tezgâh). Türkçe sayı ekleri için nLoc yardımcısı eklendi; İngilizce sayfada ek gerekmez. Yayında MD-TRJ 0.1.0, İngilizcesiyle.

## 22. MD-MET (4 Ekim 2026)

Karar (4 Ekim, proje sahibi): CH14 için yeni modül MD-MET, orta düzey; veri seçeneği B (iki yeni ubikitin koşusu, RMSF2NS ile birlikte üç bağımsız koşu). Konu: RMSD, Rg ve RMSF'nin neye duyarlı olduğu, dejenerelik, tanım seçimleri (pencere, hizalama, referans) ve koşudan koşuya değişkenlik; ölçütün sorudan seçilmesi. MD-TRJ (hizalama ve PBC), MD-PDB (RMSF ile B faktörü), MD-EQ ve MD-U (denge, örnekleme) ile örtüşmemesi için bu konular yalnız bağlantıyla anılır. Koşu ve analiz planı koşulardan önce donduruldu. Kimlik öneki m, sekiz keşif kartı (mc0 köprü, mc1 ve mc2 RMSD, mc3 ile mc5 Rg ve RMSF, mc6 ALA2, mc7 tezgâh). Eşiğe yakın sayımların tarayıcıda Python ile aynı çıkması için RMSD dizileri 0,0001 Å duyarlıkla saklandı. Türkçe iyelik eki için nPoss yardımcısı eklendi. Yayında MD-MET 0.1.0, İngilizcesiyle.

## 23. MD-PCA (5 Ekim 2026)

Karar (5 Ekim, proje sahibi): CH16 için yeni modül MD-PCA, orta düzey; yeni koşu yok, veri mdshare ALA2 ve MD-MET'in üç ubikitin koşusu. Konu: durum tanımının kinetik ölçütleri belirlemesi (kutu ile çekirdek kümeleri, k-ortalamalar), PCA'da atom kümesi, kosinüs içeriği ve koşular arası örtüşme, korelasyon haritasının hizalama çerçevesine bağlılığı; bileşen ve korelasyonun mekanizma diye adlandırılmaması. MD-U (durum payları ve belirsizlik), MD-MET (ölçüt seçimi) ve MD-TRJ (hizalama) ile örtüşmemesi için bu konular yalnız bağlantıyla anılır; Markov durum modeli ve TICA hesaplanmadı. Analiz planı hesaplardan önce donduruldu. Kimlik öneki p, sekiz keşif kartı (pc0 köprü, pc1 ile pc3 durumlar, pc4 ve pc5 PCA, pc6 DCCM, pc7 tezgâh). Yayında MD-PCA 0.1.0, İngilizcesiyle.

## 24. MD-INT (5 Ekim 2026)

Karar (5 Ekim, proje sahibi): CH15 için yeni modül MD-INT, orta düzey; veri seçeneği B (MD-MET'in üç ubikitin koşusunun su kaydeden 200 ps devamları), ayrıca MD-MET'in protein koşuları ve MD-REP'in su tekrarları. Konu: H-bağı, tuz köprüsü, temas, gömülülük ve çözücü kabuğunun eşik tanımları; tanım ve kayıt aralığının oluşma sıklığına, sayılara ve ömre etkisi; sıklığın kararlılık ya da işlev diye adlandırılmaması. MD-MET (ölçüt seçimi), MD-PCA (korelasyon) ve MD-PBC (kutu) yalnız bağlantıyla anılır; etkileşim enerjisi hesaplanmadı. Plan koşulardan önce donduruldu. Kimlik öneki i, sekiz keşif kartı (ic0 NOE köprüsü, ic1 ve ic2 H-bağı ve tuz köprüsü, ic3 ve ic4 temas ve SASA, ic5 ve ic6 çözücü kabuğu ve ömür, ic7 tezgâh). Eşiğe yakın tuz köprüsü sayımlarının tarayıcıda Python ile aynı çıkması için uzaklıklar float32 saklandı. Yayında MD-INT 0.1.0, İngilizcesiyle.
