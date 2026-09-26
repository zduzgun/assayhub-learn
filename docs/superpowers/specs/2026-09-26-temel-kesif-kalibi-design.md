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
