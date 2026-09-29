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

