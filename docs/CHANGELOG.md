# Sürüm notları

## Yayımlanmamış · Lisans (22 Ekim 2026)

Bu giriş bir sürüm değildir; sürüm numarası, etiket ya da GitHub sürümü verilmedi. Site davranışı, modül kodu ve veriler değişmedi.

- Proje sahibi lisansları seçti: kod Apache Lisansı 2.0 (`LICENSE`), özgün eğitim içeriği Creative Commons Atıf 4.0 Uluslararası (`LICENSES/CC-BY-4.0.txt`). Lisans metinleri değiştirilmeden eklendi: Apache-2.0 metni Debian'ın `common-licenses` kopyasından (SPDX metniyle sözcük sözcük aynı), CC BY 4.0 metni Creative Commons'un `cc-legal-tools-data` deposundaki `legalcode.txt` dosyasından.
- `LICENSING.md` eklendi: hangi dosyanın hangi lisansa girdiği, önerilen atıf biçimi, üçüncü taraf veriler (ChEMBL türevi veri CC BY-SA 3.0 kalır) ve lisans dışında kalanlar ("AssayHub" adları ve `static/assets/icon.svg`, Ala maskotu, kitabın kendisi).
- `README.md`, `README.tr.md`, `CONTRIBUTING.md`, `NOTICE.md`, `docs/DEPLOY.md`, `docs/ARCHITECTURE.md` ve `docs/CODEX_OSS_APPLICATION_DRAFT.md` buna göre güncellendi. Katkılar değiştirdikleri bölümün lisansıyla kabul edilir.
- Kaynak dosyalara lisans başlığı (SPDX satırı) eklenmedi; `sources/*.html` kitap prototiplerinin kopyası olduğundan değiştirilmedi.

## Yayımlanmamış · Belge düzenlemesi (21 Ekim 2026)

Bu giriş bir sürüm değildir; sürüm numarası, etiket ya da GitHub sürümü verilmedi. Site davranışı, modül kodu, veriler ve çeviri tabloları değişmedi; yalnız depo belgeleri güncellendi.

- `README.md` İngilizce olarak yeniden yazıldı, Türkçe karşılığı `README.tr.md` eklendi; iki dosya birbirine bağlantı verir. Modül tabloları `modules.json`'dan üretildi (27 modül, hepsi `pilot`). Eski README 6 modül gösteriyordu. Hangi hesabın tarayıcıda yapıldığı, hangi sonuçların önceden hesaplanmış GROMACS ve AutoDock Vina koşularından geldiği ayrı ayrı yazıldı. Yerel çalıştırma komutları, sınırlılıklar, lisans durumu (henüz seçilmedi) ve bakım planı eklendi.
- `CONTRIBUTING.md` eklendi: `sources/` kopyalama kuralı, hata ve bilimsel sorun bildirimi, çeviri tablosu düzeltmeleri, testler. Katkıların lisans koşulunun henüz belirlenmediği yazıldı.
- `docs/DEPLOY.md`: 21 Ekim 2026 tarihli "Güncel durum" bölümü eklendi (depo herkese açık, etiket ve sürüm yok, etkin GitHub Actions yok). Özel depo kurulumunu anlatan 25 Eylül 2026 metni tarihli kayıt olarak korundu. `docs/ci/check.yml` dosyasının yalnız şablon olduğu ayrı bir bölümde yazıldı.
- `docs/ARCHITECTURE.md`: başa tarihli bir güncel durum notu eklendi (React taşıması uygulanmadı, site statik HTML, güncel modül listesi `modules.json`'da). 25 Eylül 2026 önerisinin metni değişmedi.
- `sources/SOURCES.md`: tablonun ilk 12 kopyayı gösterdiğini ve güncel SHA-256 değerlerinin `i18n/<KİMLİK>.en.json` içindeki `source_sha256` alanında olduğunu söyleyen bir not eklendi.
- `docs/CODEX_OSS_APPLICATION_DRAFT.md` eklendi: OpenAI Codex for Open Source başvurusu için taslak metinler. Başvuru gönderilmedi.
- `robots.txt`, `noindex` başlıkları, erişim kuralları ve dağıtım ayarları değişmedi.

## 0.45.0 (22 Ekim 2026) · Site yayında: arama motorlarına açıldı, önizleme notları kaldırıldı

Proje sahibinin kararıyla site önizlemeden çıkarıldı.

- `static/robots.txt` artık her şeye izin verir ve site haritasını gösterir. `static/_headers` içindeki `X-Robots-Tag: noindex, nofollow` ile sayfalardaki `<meta name="robots" content="noindex, nofollow">` kaldırıldı. 404 sayfası ve dil yönlendirmesi (302) `noindex` taşımaya devam eder.
- Yeni: `dist/sitemap.xml`, derlemede `dist`'teki bütün sayfalardan (404 hariç) Türkçe ve İngilizce eşleriyle (hreflang) üretilir (`tools/build.mjs`).
- Ana sayfa etiketi "AssayHub Learn · önizleme" ("· preview") yerine "AssayHub Learn"; ana sayfa alt bilgisindeki "Önizleme yayınıdır ve arama motorlarına kapalıdır." cümlesi kaldırıldı.
- Modül sayfalarının alt bilgisindeki "Önizleme yayınıdır; bilimsel ve hedef-okur incelemesi yapılmadı." ("Preview release; ...") notu proje sahibinin kararıyla kaldırıldı. İngilizce sayfalardaki çeviri notu (makine çevirisi, Claude denetimi ve yazarın toplu onayı) ile veri kaynağı ve lisans notları değişmedi.
- `README.md`, `README.tr.md` ve `docs/DEPLOY.md` buna göre güncellendi. Modül kodu, veriler ve çeviri tabloları değişmedi.

## 0.44.0 (22 Ekim 2026) · Modül incelemesi ve düzeltmeler

27 modül tek tek incelendi (çalışmayan işlev, hesap ve bilim, simülasyon ve animasyon, öğretim, erişilebilirlik ve mobil, İngilizce). Bulgular, kitabın doğrulanmış bölümleri (v13) esas alınarak düzeltildi; yeni sayılar yalnız sayfadaki gömülü veriden ya da kitaptan geldi, hesaplanamayanlar "hesaplanmadı" olarak kaldı. Yeni simülasyon yapılmadı. İnceleme ve düzeltmeler yapay zekâ ajanlarıyla yapıldı; insan bilimsel incelemesi yapılmadı, sayfalardaki önizleme notu bu yüzden korunur.

Düzeltmeler ayrı bir ajanla bağımsız olarak doğrulandı (kritik bulgular ve sınav soruları tek tek; 27 modülün TR ve EN sayfasında 1280 ve 375 px duman testi: konsol hatası, NaN ve yatay taşma yok). Doğrulamada bulunan son kusurlar modül başlıkları altında "Bağımsız doğrulamadan sonra" diye ayrıca yazılıdır. Altı modülün sınavında doğru seçenek hep aynı yerdeydi; yerleri dağıtıldı.

Ortak değişiklikler:

- `modules.json`: 27 modülün sürümü; MD-U ikinci hedefi "İki düzeyli RMSD, gezen açılar ve önceden yazılmış durumlar"; DK-U veri satırına ChEMBL 34; MD-LIG ve MD-ERR lisans notlarına türetilmiş ΔG değerlerinin de CC BY-SA 3.0 ile sunulduğu, MD-LIG notuna ChEMBL 34, lisans adresi ve ΔG = RT ln Ki dönüşümü.
- `NOTICE.md`: ChEMBL satırı aynı bilgilerle güncellendi.
- `sources/` dosyaları bu turda bu depoda düzenlendi; kitap projesindeki prototiplere yeni tarihli kopyalar olarak geri yazıldı (bkz. `sources/SOURCES.md`).

### DK-T 0.2.1 → 0.3.0

- Tezgâh: "exhaustiveness her koşunun uzunluğunu da büyütür" yanlışı düzeltildi; Vina 1.2.7'de exhaustiveness yalnız bağımsız arama koşularının sayısıdır (vina.cpp, global_search: num_tasks = exhaustiveness; adım sayısı ligandın büyüklüğünden). Tekrar sayısı artık 1, 2, 4, 8, 16 ("Vina'da exhaustiveness"), tabloda Vina'nın ilk pozunun karşılığı olan "en iyi skorlu poz" sütunu var; kart en az 4 tekrarlı denemelerle açılır.
- Tezgâh: arama "Durdur" düğmesiyle kesilebilir; boş durum metni dar ekranda satırlara bölünür.
- Defter: okuma notu amidin karbonuna göre düzeltildi (ters pozlarda 7,6-9,2 Å, doğru pozlarda 4,0 Å, kristalde 3,9 Å).
- Defter: RMSD eşiği kaydırıcısının yanında veriden üretilen not: ilk pozlar ya en çok 0,41 Å ya en az 3,30 Å; ilk poz ölçütünde 1-3 Å arası her eşik aynı sonucu verir, ilk 3/9 pozda 2 koşuyu değiştirir.
- Defter: Cα haritası için 1-2-4-8-16 düğmeleri (klavyeyle kullanılabilir); gömülü xyz artık kullanılıyor: her ilk pozda amidin ucunun yönü kısa çizgiyle gösteriliyor.
- Atölye: "Ters oturan benzamidin" kartı kaybın en büyük kalemini veriden yazar (ör. 150°'de "itme teriminde +9,49"; çakışma varsa yerel minimuma indirmeyi önerir).
- Atölye: "Yerel minimuma indir" sonucu, poz elle değişince başlangıç metnine döner.
- Atölye: "Doğru pozu elle bulabilir misiniz?" yalnız kristale 3 Å'dan uzak bir pozdan başlanınca açılır.
- Köprü: ChEMBL 34 kayıtları kitap CH09 ve ham kayıtla uyumlu: CHEMBL1135460'ın iki 18,4 µM kaydı, CHEMBL4725290 yalnız 32 µM (sayfadaki 2020/35 µM noktası kaldırıldı; aralık değişmedi). 31 nM notu: "600 ile 1.300 kat", 2000 kaydının olası kopya işareti, birim karışıklığı olasılığı (yalnız özgün yayın gösterir) ve "aykırı saymak da bir karardır".
- Proteine dönüş: çapraz docking satırı DK-O verisine göre (üç olgun tripsin 20/20, tripsinojen 0/20, ilk pozlar 2,49-2,65 Å); su/protonasyon satırı 198 hazırlık, 1.080 koşu; bağlantı adları modules.json başlıklarıyla.
- Sınav: doğru seçenekler 3, 1, 4, 2, 3, 1, 4. sıralarda; çeldiriciler doğru cevapla benzer uzunlukta.
- Masaüstünde okuma listelerinde dt sütunu kelime kelime kırılmıyor.

Uygulanmayan ya da kısmen uygulanan:

- Öneri "ChEMBL sürümü ve erişim tarihi": sürüm (ChEMBL 34, kitapla aynı) yazıldı; erişim tarihi kaynakta yok, uydurulmadı.
- "Birim hatası" cümlesi kesin iddia olarak değil, olasılık olarak yazıldı (kitapta yok).

### DK-O 0.3.1 → 0.4.0

- Atölye: "Kristal ligand: Unutuldu" seçilince okuma değerleri kartın içinde kalıyor (dd sarılıyor, ızgara minmax); metin "karşılaştırılmadı: derin çakışma". 1280 ve 900 px'te scrollWidth = genişlik.
- His57 kartı veriye bağlandı: seçili bağlamda ilk poz ortalaması farkı, tohum başına en büyük RMSD oynaması, HIE/HID/HIP başarı sayıları; fark < 0,01 ise "skor ve başarı aynı; yalnız son basamaklar oynadı". Bütün His57 çiftlerinin özeti canlı hesaplanıyor (144 çift; poz listeleri 0'ında birebir aynı, başarı 0'ında değişti, en büyük fark 0,149 kcal/mol). sg() artık −0,000 yerine 0,000 yazıyor. Günlük satırı ve sınav 6 buna göre yumuşatıldı.
- 1TGN yorumu "3PTB'deki poza göre" diye sınırlandı: kart, günlük ve sınav 8, ilk pozların eşiğin hemen üstünde olduğunu (2,49-2,65 Å), amidin N ile Asp189 O arasının 3,19-3,27 Å olduğunu (tuz köprüsü korunuyor) ve 3 Å eşikle 20/20 olacağını gömülü koordinatlardan yazıyor.
- Tezgâh: başarı eşiği seçimi 1,5 / 2 / 2,5 / 3 Å (okumalar, tablo, grafik çizgisi ve renkler eşiğe göre; defter 2 Å ile kalıyor).
- Devre dışı Asp189 ve Ile16 düğmeleri genişletilmiş modda hesapta kullanılan ASP ve NH'yi basılı gösteriyor; temel moda dönünce okurun seçimi geri geliyor.
- Ekler: "kötüleşti (−5,806 → −5,190)", "Doğru pozu bulan tohum: 0 / 5"; günlükte "0/180 (tam yan zincirli 36 hazırlık; kesikliler dahil 0/360)"; bağlantı adları güncel (DK-T ve DK-U).
- Sınav: doğru seçenekler 3, 1, 4, 2, 3, 1, 4, 2, 1, 3. sıralarda; çeldiriciler uzatıldı; sınav 4'te kristal skor "yaklaşık +207" (veride 206,987).

Uygulanmayan ya da kısmen uygulanan:

- Öneri "sayfa ağırlığını azaltın" (1,01 MB): gömülü koordinatları yuvarlamak ya da ayrı JSON'a almak doğrulanmış veriyi ve hesapları değiştirebilir; veri üreticisinde (kitap projesi build_dko.py) yapılmalı.

### DK-U 0.2.3 → 0.3.0

- Tezgâh (KRİTİK): sıfır model eğrileri okumalarla aynı kuralla çiziliyor (yüksek değer = etkin; köşegenin altı ters ilişki, lejantta yazılı); rocCurve eşit değerleri tek adımda işliyor. Çizilen alan ile okunan AUC 12 durumun hepsinde birebir aynı. Sıfır model AUC'leri artık gösterilen set için canlı hesaplanıyor.
- s1c4 kartı ve sınav 2 (KRİTİK) CH18'e göre: "docking kadar iyi" olan zayıf settir (ağır atom 0,745, yük 0,776, docking 0,719); D2'de ağır atom 0,747 ile docking'in (0,851) gerisinde ama yüksek AUC'nin önemli kısmı boyut farkı. Sınav 2 zayıf set üzerine kuruldu.
- "Yalnız S1 pozları" yalnız etkinlere uygulanıyor (planın tanımı; D2'de 0,873, eşleştirilmişte 0,816).
- Köprü: açılışta çiziliyor (etiket 316 nM, kaydırıcıyla uyumlu); IC50 ≈ Ki varsayımı ([S] ≪ Km) yazıldı; "% inhibisyon" etiketi kesilmiyor ve İngilizcede çevrildi; binlik ayraç.
- Atölye: iki bileşik kartı her seçimde güncelleniyor; "anlamlı sayılabilir" yerine "başka bir tohumla da büyük olasılıkla korunur; bağlanma farkı anlamına gelmez"; pKi sırasının skor sırasıyla aynı/ters olduğu, seçilen bileşiğin kendi üç tohum sd'si (örnekteyse), bileşik bilgisi (klavyeyle seçilen A/B için) ve CH18'in %34,9 sayımı.
- Atölye: okumada Pearson/kısmi Pearson ve Spearman/sıra tabanlı kısmi yan yana (−0,36 → −0,12; −0,38 → −0,23); s1c2 kartı, proteine dönüş ve sınav 3 aynı türden karşılaştırıyor; anlaşılmayan ligand verimi cümlesi çıkarıldı.
- Atölye: yayın notu veriden ("bu yayında n bileşik, seri içi Spearman ..."; 11 yayında −0,90 ile 0,59); n < 10'da kısmi korelasyonlar gösterilmiyor. Saçılım x ekseni −10,5'e genişledi.
- Proteine dönüş: tohum gürültüsü (0,09 kcal/mol) skor yayılımıyla (1,02 kcal/mol) karşılaştırılıyor; pKi yayılımı (1,36) 298 K'de 1,86 kcal/mol; bağlantılar gerçek bağlantı.
- Defter: tek kat ataması notu; "200 başka kat ataması dene" düğmesi analyze.py ile aynı ridge'i (λ 1, 5 kat) tarayıcıda koşuyor: rastgele ortanca 0,23 (0,18-0,26), gruplu 0,05 (−0,09-0,16), %24 eksi, 200/200 gruplu < rastgele (kitapla uyumlu); noktalar grafiğe biniyor. Kart "sıfıra yakın, bu atamada eksi".
- s1c3 kartı: "54 etkinden 12 tanesine dört eşleşmiş tuzak bulundu, 24 tanesine hiç bulunamadı" (veriden sayılıyor). Bildirimde ChEMBL 34 ve 84 eşleştirilmiş tuzağın kapsamı.
- Sınav: doğru seçenekler 2, 3, 1, 2, 3, 1, 2. sıralarda; çeldiriciler güçlendirildi; 6. soru "tuzak havuzu küçüktü" etkenini doğru cevabın parçası yapıyor; sınav init'ten sonra kuruluyor. İngilizcede kalmış "Cevaplanan" düzeltildi.

Uygulanmayan ya da kısmen uygulanan:

- Gürültüyü √2 × SD ile hesaplama: uygulanmadı; kitap CH18 eşiği 3 × 0,087 = 0,26 kcal/mol olarak kullanıyor, sayfa kitaba uyuyor.
- Tohum örneğinin noktalarını grafikte çizme ve tohum çifti Spearman/sıra değişimi: kartta bileşiğin kendi sd'si metin olarak var; ayrı çizim eklenmedi.
- Tuvallerin (saçılım, ROC, histogram) klavye erişimi: eklenmedi; A/B açılır listeleri ve karttaki bileşik bilgisi klavye yolu sağlıyor.
- Ortak dosya: NOTICE.md ve modules.json DK-U "data" alanına "84 eşleştirilmiş tuzak: ChEMBL 34" eklenmeli (bana ait değil).

Bağımsız doğrulamadan sonra:

- s1c4 kartı: zayıf tripsin setinde ağır atom (0,745) ve net yük (0,776) docking'in (0,719) "üstünde görünür"; docking'in %95 aralığı (0,598 ile 0,833) ikisini de içerir, aralıklar örtüşür (kitap CH18). Aralık gömülü veriden okunur.

### MD-Q 0.1.0 → 0.2.0

- Dar ekranda okuma tabloları (qread, qbread, qboxread) alt alta; değerler artık harf harf kırılmıyor.
- Haritadaki kırmızı nokta ve iz yalnız harita 1. koşunun verisini içerdiğinde (koşu 1 ya da üçü birlikte) ve pencere 200 ile 599 ps'yi kapsadığında çiziliyor; 3B notunda bu yazıyor.
- 3B penceresindeki geçiş sayısının tanımı yazıldı: αR ile β arasında yeni durum en az 5 kare (5 ps) sürünce bir geçiş; αL kareleri atlanır (MD-CON ile aynı). Okuma etiketi "(yeni durum ≥ 5 ps)".
- "Kendi dikdörtgeniniz" için dört sayı kutusu (φ alt/üst, ψ alt/üst); klavyeyle girilebiliyor, sürüklemeyle eşzamanlı, girince bölge "kendi dikdörtgeniniz"e geçiyor.
- Durum şeridinin yüksekliği koşu sayısına göre (tek koşuda boş alan kalmıyor); 420 px'ten dar tuvalde zaman etiketleri 0, 100, 200 ns.
- Defter örnekleri placeholder oldu.

### MD-T 0.2.0 → 0.3.0

- Dar ekranda tuvaller gerilmiyor: her tuvalin çizim boyutu CSS kutusunun en-boy oranına eşitleniyor (mantıksal genişlik 520 ile 960 arası, CSS genişliğinin 1,5 katı; pencere boyutu değişince yeniden çizim). Masaüstündeki tam genişlik tuvaller eskisiyle aynı (960 piksel); iki sütundaki tuvallerde yazılar büyüdü. l1-xt ve l2-tr dar ekranda daha yüksek. Dar tuvalde IR bölge etiketleri iki sıraya, tezgâh başlığı kısaltıldı; dalga boyu, basamak ve "0 geçiş" etiketleri çakışmıyor.
- Zaman adımı kuralı kitap CH02 §2.4 ile aynı: T/5 (grompp uyarısı), T/π aşılamaz sınır, T/10 daha temkinli pay ("Δt = T/5'te hata T/10'dakinin yaklaşık dört katı"). Bilgi kutusu "grompp sınırı Δt = T/5"; tabloya T/5 sütunu; d3 kartı ve sınav 5 açıklaması buna göre. "Yaklaşık 20 fs" cümlesine bu projenin topolojisindeki sayılar (en hızlı serbest bağ 22,21 fs, T/5 = 4,44 fs) ve tablo notuna O–H 8,99, N–H 10,11, C=O 23,83 fs (≈ 1.400 cm⁻¹) ile MD-DT köprüsü (kitap §2.3).
- Lab 3 tezgâhı varsayılan olarak durumları ayıran ψ açısını gösteriyor; αR bandı sınırları (−120° ve 50°) kesikli çizgi; "φ" düğmesiyle eski görünüm. Metin ve aria etiketi güncellendi.
- İngilizce sayfadaki ondalık virgüller giderildi (sınav 1 açıklamasında 3.0 × 10¹⁰, defter ekseninde 0.1).
- 1 ns Langevin hesabı 100.000 adımlık parçalarda, düğmede ilerleme yüzdesiyle (ana iş parçacığı en uzun 103 ms bloke; önce 382 ms).
- Enerji hatası grafiği tek yönlü hataya göre ölçekli (sıfır "0", boş üst yarı yok); hatanın neden tek yönlü olduğu notu.
- Arrhenius sınavı: doğru seçenek "yaklaşık 5 ile 8 kat arasında" (Boltzmann 7,4; tezgâh yüzeyi yaklaşık 6; açıklama ikisini de veriyor).
- Kaydırıcı dokunma hedefi 28 px.

### MD-DT 0.1.0 → 0.2.0

- Düzeltildi: `[hidden]{display:none!important}`; boş çöküş kutusu artık açılışta görünmüyor.
- DTGRID ızgarası tam genişlikte (denetimler altında, masaüstünde iki sütun); dar ekranda satır/sütun yer değiştiriyor (adımlar satırda), sabit tablo düzeniyle 375 px'e sığıyor; hücrelerde "ns/gün" yerine tablo altı notu.
- Sıcaklık dili kitap CH02 §2.5 ile uyumlu: "ısınma / termometre" kaldırıldı; kaydırıcı, okuma ve kart "ortalama sıcaklık farkı" diyor; okuma notlarına kitabın hesabı (1 K ≈ 160 kJ/mol, 612 kJ/mol en çok 3,8 K'yi açıklar, 10,2 K'lik fark doğrudan ısınma değil) ve "iki bedel aynı değil" cümlesi.
- Çöküş paneli koşuya özgü: en çok kayan üç atom türüyle (hidroksil, N-H, C-H); kısıtsız koşularda Δt'nin hangi X-H sınıfının T/π sınırını aştığı gömülü bağ periyotlarından hesaplanıyor (3 fs yalnız O-H'yi aşar, 4 ve 5 fs N-H ve C-H'yi de); LINCS koşularında ilk uyarı zamanı (0,315 / 0,345 ps) ile yazılan son kare (0,885 / 0,815 ps) ayrı yazılıyor.
- Periyot dağılımında "5 · Δt" etiketi çubukların üstündeki şeride, kalıntı grafiğinde başlık ile sayı çakışması giderildi.
- Atölyede "Aynı ayarda HMR ile / olmadan" kırmızı bağ sayısı (H bağları, 5 fs: 209 → 329, kitapla aynı); okuma notunda en yavaş bağ örneği yerine kitabın 497/608 ve 209 → 329 sayıları.
- Bağ saatleri atölyedeki kısıt düzenine bağlı: kısıtlı bağların kadranı ve şeridi duruyor, not serbest kalan bağın periyot başına örnek sayısını veriyor.
- Dar ekranda faz uzayı ve kararlılık haritası yan yana; faz uzayı etiketi dar tuvalde küçük.
- Kaydırıcı ve onay kutusu dokunma hedefleri büyütüldü.

Uygulanmayan ya da kısmen uygulanan:

- [ÖNEMLİ, kısmen] Sıcaklık bulgusundaki ek öneri (korunan enerji eğimini ikinci ölçüt olarak seçtirmek): ızgara renklendirmesi, saçılım ekseni ve d1c4 kartının mantığını değiştirir; dil düzeltmesi ve kitabın hesabı uygulandı, ikinci ölçüt eklenmedi (eğim her koşu için okumada zaten var).
- [ÖNERİ, kısmen] "HMR açıkken ağır bağlar neden kızardı?" keşif kartı eklenmedi: keşif sayısını (4) ve ilerleme göstergesini değiştirir; sayı karşılaştırması satır olarak eklendi.
- [ÖNERİ, kısmen] Δt kaydırıcısını yapışkan (sticky) yapmak: kaydırıcının üst kutusu kısa olduğu için CSS sticky işe yaramaz; yerine faz uzayı ve harita dar ekranda yan yana alındı.

Bağımsız doğrulamadan sonra:

- "Tüm bağlar" seçilince okuma panelindeki uzun değerler ("yok (bütün bağlar kısıtlı)", "bağlar sınırlamıyor; sınırı açılar ve diğer hareketler belirler") sarılıyor; sayfa 1280 ve 375 px'te TR ve EN'de yatay taşmıyor. Kısa sayılar tek satırda kalıyor.

### MD-ENS 0.2.1 → 0.2.2

- Sıcaklık kartı (e1c2): birleşik SD 8,00 K, kuramın 1,05 katı; "aynı büyüklükte ama yaklaşık %5 büyük" deniyor. Farkın gürültü olmadığı sayfada veriden hesaplanan iki sayıyla gösteriliyor (ardışık sıcaklık otokorelasyonu 0,005 ile 0,025; 50.000 karede SD'nin göreli hatası yaklaşık %0,3). Kaynağın ayrılmadığı ve MD-CON ızgarasının V-rescale ile 0,99 verdiği, iki kurulumun hangi bakımlardan farklı olduğu yazıldı (CH03 satır 111, CH05 satır 80). "Uyumlu" kapanışı kaldırıldı.
- Sınav 2: doğru seçenek "aynı büyüklükte (yaklaşık %5 fazla; kaynağı ayrılmadı)"; açıklamaya oran ve "kaynağı ayrılmadı" eklendi.
- Basınç kartı (e1c3): "ardışık kareler bağımsız değil" açıklaması kaldırıldı. Yerine: koşular arası saçılım naif hatanın yaklaşık 2,4 katı; yalnız beş koşu olduğu için koşular arası SD'nin %95 aralığı 7,9 ile 37,9 bar (ki-kare, 4 sd); gecikme-1 otokorelasyonu 0,07 ile 0,09, yani kare korelasyonu farkın küçük bir kısmını açıklayabilir; kaynak bu sayfada ayrılmadı. Bütün sayılar sayfada gömülü veriden hesaplanıyor.
- Tablo altına αL dipnotu: %0,1'in altındaki αL payları φ = ±180° sınırını aşan tek karelik β etiketleri (CH03 satır 172).
- "Proteine dönüş" bölümüne ubikitin paragrafı (CH03 3.5'ten; yeni iddia yok, "Bu senaryo hesaplanmadı" notuyla).
- Dar ekranda okuma tabloları alt alta.

### MD-PBC 0.6.1 → 0.7.0

- Düzeltildi (kritik): Yeh-Hummer keşif kartı artık küçük kutuların noktalarının Yeh-Hummer doğrusunun **üstünde** kaldığını söylüyor; en küçük kutudaki fark ve neden ((4π/3)(R/L)³ terimi, sığ eğim) sayfada hesaplanıyor. Grafiğe noktalı Yeh-Hummer doğrusu eklendi; açıklama legend'de. İngilizce de düzeltildi.
- Defter tablosuna "Yeh-Hummer ile düzeltilmiş D" sütunu ve küçük kutuda düzeltmenin aşırıya kaçtığı notu (TIP3P, L = 5 nm: 108 → 494 µm²/s, D∞ 442).
- Lab 1 su ve atom hesabı Lab 2 ile aynı kaynaktan: projenin d = 1,0 ve 0,5 nm hazırlıklarından iki noktalı ayar (33,07 nm⁻³, 14,93 nm³, DIAM 4,491). Panel artık d = 1,0 nm'de 5.902 su / 18.937 atom, d = 0,5 nm'de 3.378 / 11.365 veriyor.
- Klavye/ekran okuyucu: atölyede "Rastgele fırlat"; tezgâhta "Kenardaki bir molekülü seç", "Ortadaki bir molekülü seç", "Seçili moleküle itme ver" (sürükleme ile aynı kod yolu, lApply). Değişim kutuları aria-live. w1, w2, w3, b1, b2 keşifleri düğmeyle açılabiliyor.
- Kenar enerjisi tezgâhı: kT = 0,40 ε'de iki boyutlu modelin donmaya yakın olduğu, altıgen yamalar görülebileceği ve dersin yönünü değiştirmediği notu.
- Akış tezgâhı: 1 nm ölçek çubuğu, "noktaların hızı göreli, çok yavaşlatılmış" notu, proteinin içindeki izleyiciler soluk.
- Hız tahmini grafiği: GPU'nun dolmadığı (23.558 atom altı) bölüm kesikli, legend ve küçük notta açıklama.
- Kaydırıcı ve onay kutusu dokunma hedefleri büyütüldü (MD-CUT raporundaki öneri).

Bağımsız doğrulamadan sonra:

- 375 px'te "molecules" galerisi daralıyor (sütunlar minmax(0,1fr), küçük yazı); sütun başlıkları yalnız sayı, birim ilk sütunda "molekül sayısı" etiketiyle. Sayfa EN ve TR'de taşmıyor.
- Kart ızgaraları ve okuma panelleri dar ekranda `minmax(0,1fr)` ile sınırlandı; "Sonsuz sıvı" bölümündeki okuma değerleri 560 px altında sarılıyor.
- İki sınavda (12 soru) doğru seçenek yerleri dağıtıldı: D A C B A D ve B C A D C B (A 3, B 3, C 3, D 3).

### MD-CUT 0.1.2 → 0.1.3

- Kutu sınırı paragrafı GROMACS kılavuzunun kuralıyla yeniden yazıldı: kesme, en kısa kutu vektörünün yarısını aşamaz (R_c < ½ min(|a|,|b|,|c|)); kare tezgâh kutusunda bu kenarın yarısıdır; 1UBQ onikiyüzlüsünde üç vektör de 6,49 nm, sınır 3,25 nm. Üçgen olmayan kutularda ızgara araması için ek sınır R_c < min(a_x, b_y, c_z) bu kutuda 4,59 nm ile daha gevşek. Kaynak: GROMACS başvuru kılavuzu, "Periodic boundary conditions" (2022/2023 sürümleri, denklem metni doğrulandı). Not: inceleme raporundaki "yaklaşık 2,29 nm" tahmini yanlıştı (c_z'nin yarısı alınmıştı); kitap CH04'teki "en kısa kutu vektörünün yarısı, 3,25 nm" ifadesi kılavuzla uyumlu, sayfa artık kitapla aynı dili kullanıyor.
- Atölyede hız birimi σ/s yerine σ/τ; ekranda 1 s = 1 τ olduğu, hızın animasyon hızı olduğu notu.
- Kaydırılmış potansiyel kartı yumuşatıldı: "çok daha iyi korur ama tam değil"; kalan kaymanın kuvvetin r_c'deki sıçramasından geldiği, ölçümlerden kısa/uzun kesme oranı (ör. 1,5 σ'da 5 σ'dakinin 7,2 katı). Potansiyel grafiğine ikinci büyüteç: kuvvet F = −du/dr, r_c'deki sıçramanın değeri (2,5 σ'da 0,039 ε/σ).
- Komşu listesi notu: gerçekte iki atom da hareket eder, GROMACS tamponu göreli yola ve verlet-buffer-tolerance = 0,005'e göre seçer (kitap CH04 §4.3).
- Kaydırıcı yüksekliği 28 px, onay kutusu 20 px ve 32 px'lik etiket alanı.

Uygulanmayan ya da kısmen uygulanan:

- [ÖNERİ] Motoru ortak `mdmini.js` ile birleştirme: ortak motor ve `tests/` dosyalarına dokunmayı ve tezgâh/defter kodunu yeniden yazmayı gerektirir (ortak dosya, bu turun yetkisi dışında). Ortak dosya ihtiyacı: LJ2 için `tests/` altına test eklenmesi ya da sayfanın `assets-src/mdmini.js`'e taşınması ayrı bir iş olarak planlanmalı.

### MD-ELEC 0.1.1 → 0.2.0

- Defter göstergesi "hata payı 10⁻⁵" yerine "kesmede kalan pay ewald-rtol = 10⁻⁵"; açıklamaya payın toplamın bağıl hatası olmadığı, hataların aynı büyüklük düzeyinde olduğu notu.
- PME ızgarası kitap CH04 §4.4 ile aynı: NPT sonundaki 6,47 nm'lik kutu vektörü → en az 54 nokta; grompp 56 seçti (gerçek aralık 0,116 nm); S3 için 48 × 48 × 48 satırı eklendi; "mdrun" yerine kitaptaki gibi "grompp".
- Protein çözünürlüğü: ileti artık ölçülen paya bağlı (%80 üstü çözünüyor, %40 altı kümeleniyor ya da çöküyor, arası sınırda) ve payı yazıyor; ilk 10 örnek dengelenme sayılmıyor, ölçüm birikene kadar "dengeleniyor" ve "çözünen: ölçülüyor".
- DNA erime eğrisi canlı benzetimdeki aynı 28 baz çiftlik zincirin tam denge ortalaması (serbest uçlu Ising zinciri, aktarım matrisi); nokta artık eğrinin üstünde dalgalanıyor. Açıklama eklendi.
- İyon bulutunda nokta sayısı iyonik şiddetle logaritmik artıyor (150 mM'de 90, onluk başına 30; 10 ile 140 arası), temsili olduğu notu.
- Ewald tezgâhının 5. adımına "ızgara aralığı (PME gibi)" seçimi: bulutların toplamı 0,25 / 0,5 / 1 r₀ aralıklı noktalarda örneklenip doğrusal aradeğerleniyor, en büyük sapma yazılıyor; GROMACS'ın kübik aradeğerleme (pme-order = 4) kullandığı notu.
- Kaydırıcı ve onay kutusu dokunma hedefleri büyütüldü.

Uygulanmayan ya da kısmen uygulanan:

- [ÖNERİ, kısmen] DNA erime genişliği parametresini (w0 = 30) "gerçekçi birkaç °C"ye ayarlamak: kitapta ya da sayfa verisinde dayanağı olan bir genişlik yok; yeni sayı uydurmamak için değiştirilmedi (metin genişliğin temsili olduğunu zaten söylüyor). Eğri/nokta tutarsızlığı giderildi.

Bağımsız doğrulamadan sonra:

- Izgara notunda "aradeğerlendi" yerine "örneklendi ve doğrusal aradeğerleme yapıldı". EN ("sampled ... and linearly interpolated") doğru, değişmedi.

### MD-CON 0.1.1 → 0.1.2

- Dar ekranda bütün okuma tabloları (ktread, kpread, kdread, k3read, k3pread, kbread, kbread2) alt alta; ktread 375 px'te 3.314 px yerine yaklaşık 680 px. Çubuk grafiklerde sütun dar kalınca kısa ad (V-r, Ber, N-H, Lang, C-r); "V-rescale|0,1" üst üste binmesi bitti.
- Barostat okuması: "kuramdan sapıyor" hükmü kaldırıldı; satır "Ölçülen / kuram (mdp κ_T ile)" oldu, yanına "κ, dalgalanmadan (post hoc)" satırı (C-rescale τ_P 1 ps: 5,79 ×10⁻⁵ bar⁻¹). Not: 0,9 ile 1,1 bandı sıcaklık için seçilmişti, hacim oranına hüküm verilmez; yorumlanabilir olan barostatlar arası fark (CH05 satır 127, Şekil 5.3 alt notu).
- kc5 kartı: "dışında kalan koşu 6 / 6" kaldırıldı; yerine aynı τ_P'de Berendsen SD'sinin öbürlerinin ortalamasına oranı (τ_P 1 ps'de 0,47, 5 ps'de 0,23; veriden) ve bandın sıcaklık için olduğu cümlesi.
- Termostat notu: NVT ortalama basıncının (bu koşuda −315 bar) termostattan değil, NPT ortalamasından %1,9 büyük tek bir dengeleme karesinden alınan hacimden geldiği; κ_T ile beklenen fark −274 ile −324 bar (CH05 satır 137-143).
- Köprü (kc0): Berendsen ve V-rescale'de τ'nun kinetik enerjinin gevşeme süresi olduğu; sıçramada potansiyel enerjinin de ısınması gerektiği için zincirin hedefe τ'dan geç, bu oyuncakta yaklaşık 2τ'da vardığı yazıldı. Grafiğe noktalı "zaman sabiti 2τ" eğrisi, okumaya "2τ olsaydı %63 süresi" satırı.
- Köprü tuvali yüklemede boş değil: eksenler, hedef ve τ/2τ eğrileriyle durağan bir ilk kare ve "kopyalar grafik görünür olunca ya da Oynat ile hesaplanır" notu.
- 3B kutular: kendiliğinden dönme oynatma dışında 8 sn sonra duruyor; görünür olunca kendiliğinden başlayan oynatma bir tur sonra duruyor (kullanıcı Oynat'a basarsa döngü sürer). Ölçüm: sürekli yeniden çizim yerine 33 ile 44 sn sonra kare değişimi 0.
- Sınav 2: "(2,22 ten 4,70 e)" yerine "(2,22 değerinden 4,70 değerine)".

### MD-REP 0.1.2 → 0.1.3

- Sınav 4: dört hükmün dördü seçenek ("eşdeğer" artık her zaman var). Doğru cevap "kararsız" iken açıklama, neden "eşdeğer" denemeyeceğini söylüyor (%90 aralığı ±5 bandının dışına taşıyor; CH06 Soru 4).
- Plan formundaki örnek metinler placeholder oldu; boş bırakılan alan çıktıda "(boş: yazılmadı)".
- Oyuncakta ve blot okumasında çok küçük p değeri "p < 0,001" yazılıyor (önce "p = 0,000").
- 100 çalışmalık kümede "Kalan çalışma: 63 / 100 · yaklaşık 12 sn kaldı" biçiminde ilerleme ve tahmini süre.
- Hareket azaltma tercihinde 100 çalışma artık eşzamanlı döngüde değil, parça parça hesaplanıyor; sayfa donmuyor (önce n = 16, 2000 karede yaklaşık 20 sn kilitleniyordu) ve Durdur çalışıyor.
- Dar ekranda (≤ 560 px) okuma tabloları dt üstte, dd altta.

Uygulanmayan ya da kısmen uygulanan:

- "Uzun ayarlarda 25 çalışmalık partilere otomatik bölme" uygulanmadı: hesap zaten kare başına 14 ms'lik dilimlerle ilerliyor, Durdur her an çalışıyor; ilerleme ve kalan süre gösterildiği için ayrı bir parti mantığı öğretim yapısını değiştirirdi.

### MD-O 0.2.1 → 0.2.2

- Gizli pdb2gmx çıktı kutusu artık açılışta görünmüyor (.crash[hidden]{display:none}).
- C-ucu notu kitap CH07 ile aynı: C-ucu karboksili de ölçülmüştür ama hesapta model değerinde (3,67) bırakıldı.
- "Titrasyonu oynat (pH 1 → 13)" her zaman pH 1'den başlıyor; EN'de düğme metni "Stop".
- Grup çipleri ve açı düğmeleri seçimden sonra klavye odağını koruyor.
- Metin: "7,74'e" (sayıya göre ek üreten yardımcı), "pI'yi" (kitapla aynı), aralık "7,74 ile 7,75"; tam 3 birimde oran "1.000" (eşik > 3).
- Ölçüt haritası etiketleri sağ kenarda sola hizalanıyor; dar pencerede "kabul penceresi" etiketi pencerenin dışına yazılıyor; 3B ubikitin görünümü kırpılmıyor (projeksiyon yarıçapı 3,0 nm; en uzak atom, perspektif ve hale ile 2,96 nm gerekir).
- Net yük grafiğinde pdb2gmx'in 0 e ataması bütün pH'larda kesikli çizgi; okumaya "simülasyonun sabit yükü ile bu pH'daki ortalama yük farkı".
- Tezgâh tablosuna "proteinin toplam yükü" sütunu ve not: günlükteki H-bağı sayısı yalnız uzaklıkla değişir (gömülü 48 hücrede doğrulandı), HISH +1 e yapar ve MD-FAIL vaka 3'e bağlantı.

Uygulanmayan ya da kısmen uygulanan:

- His68'in ölçülmüş pKa'sı ve deneysel pI işareti: kaynaklı değer kitapta ve gömülü veride yok; uydurulamaz.

Bağımsız doğrulamadan sonra:

- Sınavda doğru seçenek yerleri dağıtıldı: C A D B D A (hepsi B idi).

### MD-PDB 0.1.0 → 0.2.0

- Yoğunluk 2. adım metni düzeltildi: değişmeyen üç boyutlu bulutun toplamı (elektron sayısı); çizilen eğri merkezden geçen kesit ve kesitin alanı B ile küçülür.
- PDB satırı: her alanın erişilebilir adı (ör. "alternatif konum: boş"), boş alan "·" ile ve en az 24 px; tıklamadan sonra odak korunuyor.
- Harita okuması: tepe yüksekliğinin "yalnız atomların kendi katkısı" olduğu yazıldı; yeni satır "komşularla birlikte atom yerindeki yoğunluk (kalıntı ortalaması)".
- MD karşılaştırması: 46-48 dönemeci MD'de en hareketli on kalıntı arasında (Gly47 MD 25,0, kristal 11,7 Å²), kristalde değil (gömülü veriden; (betik)).
- Su tablosundaki bir suya tıklayınca dağılım grafiğinde ve 3B görünümde işaretleniyor; HOH 112 için MD-O bağlantısı notu.

Uygulanmayan ya da kısmen uygulanan:

- "Kristal düzensizliği payı" kaydırıcısı: uzun pozlamada iki bileşen tasarım gereği aynı görüntüyü verir; farkı göstermek için tek molekülün zaman serisi gibi ikinci bir görünüm gerekir, köprünün yapısını değiştirir.

### MD-FF 0.1.0 → 0.1.1

- Ramachandran haritasında αR, αL, PPII ve β etiketleri açık zeminli hap kutularında.
- Köprü lejantı: "çubuk yüksekliği göreli sıklık, Hz değil".
- Tekrar grafiğinde durum paylarında nokta büyüklüğü tekrarın geçiş hızı (/ns); açıklama notu eklendi.
- M3 açıklamasına sessizce değişen bağsız ayarlar (rvdw 1,2 → 1,0 nm; force-switch → yok; DispCorr kapalı → EnerPres; kitap CH08).

Uygulanmayan ya da kısmen uygulanan:

- Yeh-Hummer sonlu kutu düzeltmesinin sayısal büyüklüğü: viskozite değerleri kitapta ve gömülü veride yok; kitap düzeltmenin uygulanmadığını yazıyor. Önce kitapta karar verilmeli.
- Deneysel ³J başvuru çizgisi: doğrulanmış kaynaklı değer yok (inceleme de doğrulamadı).

### MD-LIG 0.1.0 → 0.2.0

- Köprü metni kitap CH09 ile eşitlendi: ChEMBL 34'te sekiz Ki kaydı; beş yayından altı µM kaydı (18,4 ile 39 µM) kullanılır; iki 31 nM kaydı (CHEMBL1133610 olası kopya; CHEMBL1127404) plan dışı ve gerekçesi yazılmadı. "DK-T ile aynı kayıtlar" ifadesi kaldırıldı.
- Kayıt listesi ChEMBL 34'teki altı kayda göre düzeltildi (ChEMBL MCP ile doğrulandı): CHEMBL1135460'ın iki 18,4 µM kaydı (ikincisi "2. kayıt" olarak işaretli), CHEMBL4725290 için yalnız 32 µM. Planın listesindeki farkı (35 µM fazladan, 18,4 µM eksik) not ediyor; aralık değişmedi (−6,46 ile −6,01 kcal/mol). Okumada aktivite kimliği ve deney açıklamasındaki ölçüm sıcaklığı (25 °C, 30 °C ya da yazılı değil) var.
- Lisans: köprüde ve kaynaklar notunda ChEMBL 34, CC BY-SA 3.0 bağlantısı (creativecommons.org/licenses/by-sa/3.0/) ve "Ki değerleri ve bunlardan hesaplanan ΔG değerleri bu lisansla paylaşılır; değişiklik: ΔG = RT ln Ki" cümlesi.
- Atölye 4: "Ölçülmüş başvuru" anahtarı (altı µM kaydı / 31 nM dahil). 31 nM ΔG'si (−10,24 kcal/mol) noktalı çizgi; genişletilince L2b ve L5'in dört koşusu aralığa giriyor (kitap ile aynı). jc9 kartı sonucun dışlama kararına bağlı olduğunu söylüyor.
- Keşif sayacı ekranda görünen ilk kaydı sayıyor; köprü grafiğinin üst etiketi kırpılmıyor.
- Büyük-küçük harf iddiası kanıta bağlandı: "bu sayfanın koşularında iki küme -maxwarn olmadan grompp'tan geçti; başka sürümlerde denetlenmedi".
- Büküm grafiğine kopyalanan ca-ca-ce-nv teriminin enerjisi (frcmod satırından: PK 2,8, IDIVF 4, n 2, faz 180°; tek dihedral, 90°'de 1,4 kcal/mol) ve okumada terimin biçimi.
- Yük tablosuna N1 − N2 satırı (L1 ve P2'de −0,016 e; Gasteiger'de 0; nötr L3'te verilmez) ve kitap CH09'daki "ilk yazılan azot" notu.

Uygulanmayan ya da kısmen uygulanan:

- α, β ve γ kaydırıcıları: tek ligandla katsayı uydurmayı oynanır kılar; modül bunun tersini öğretiyor. Başvuru duyarlılığı yarısı anahtarla uygulandı.

Bağımsız doğrulamadan sonra:

- Sınavda doğru seçenek yerleri dağıtıldı: C A B A C B A C (hepsi B idi).

### MD-SOLV 0.1.1 → 0.1.2

- yc2 kartı, temas çifti okuması ve tezgâh gerekçesi kitap CH10 ile: eski AMBER iyon parametreleri (Na⁺ σ 0,3328 nm, Cl⁻ σ 0,4401 nm), düşük derişimde tuz kristalleşmesi bildirimi (Joung ve Cheatham 2008; Auffinger ve ark. 2007); sonuç "bu parametrelerle 2 ns'de böyle görüldü" diye raporlanır.
- Keşif sayaçları ekranda görüneni sayıyor: başlangıçta 3 derişim (yalnız verisi olan üç) ve 1 çift; konformasyon kartında "1 / 2".
- "8 M üre" başlık, düğme ve etiketlerde "8 M üre hedefi"; başlıkta gerçekleşen molarite gömülü veriden (9,15 ile 9,38 mol/L).
- Peptit çevresi okumasında üre/su oranı dört tekrar için ayrı (0,2818 / 0,2728 / 0,2790 / 0,2705).
- Üre çiziminde etiketler en boş yöne yerleşiyor; H11-H12 arası kesikli çizgi.

Uygulanmayan ya da kısmen uygulanan:

- Üre sayısını dengelenmiş hacme göre yeniden ayarlamak (yaklaşık 194 üre): yeni simülasyon gerektirir.

### MD-EQ 0.1.1 → 0.1.2

- Gizli kutu hatasının asıl nedeni bulundu: modül stilinin ortasında kapanmamış ikinci bir `<style>` etiketi vardı; ondan sonraki ilk kural geçersiz sayılıyordu. Etiket kaldırıldı ve `[hidden]{display:none!important}` eklendi. Boş "Program çıktısı" kutusu ve S1'e özgü kare etiketleri artık yalnız gerektiğinde görünüyor. (Önceden düşen #m1box kuralı artık geçerli; kutu boyutu ölçüldü, değişmedi: 588 × 588.)
- Ubikitin yeri: okuma etiketi "en çok itilen atomdaki kuvvet, önce → sonra" oldu; m1c5 kartı aynı atomu veriyor (Arg72 HG2: 93.697 → 125) ve yerdeki en büyük kuvvetin artık başka bir atomda olduğunu ayrıca yazıyor (294, CG).
- m1c3 kartı: NPT basınç serisinin ortalaması negatifse, barostatın negatif basınca kutuyu küçülterek yanıt verdiği ve bunun yoğunluk artışıyla aynı şeyi söylediği eklendi (CH11 satır 158).
- Dinamik ya da minimizasyon sürerken kurulum düğmeleri ve "Kutuyu yeniden kur" devre dışı (önce tıklama sessizce yok sayılıyordu).
- Sınav seçeneklerine A, B, C, D harfleri.
- Kullanılmayan nlist() kodu ve "Verlet komşu listesi ... 10 adımda bir" yorumu kaldırıldı; yerine neden kullanılmadığı yazıldı. Dinamikte kare başına iş 40 ms ile sınırlı, konum tamponu her adımda yeniden ayrılmıyor; kuvvet fonksiyonundaki kullanılmayan dizi ayırmaları silindi. Dinamik aynı sonucu veriyor (10 ps sonunda 298 K, en yüksek 365 K).

### MD-FAIL 0.1.0 → 0.1.1

- L2 vakası (kritik): doğru cevap artık "kutu proteinin kendisinden küçük; mesajdaki kesme kuralı yalnız belirti". Çeldirici "rlist küçültülürse sorun çözülür" oldu. Açıklama kitap CH12 ile aynı: en uzak iki atom 4,45 nm, kesmeyi küçültmek mesajı susturur ama sorunu çözmez; düzeltmede kutu vektörü 6,45 nm, hacim 189,9 nm³.
- "Mesajın ilk satırı" kartı "Mesajın söylediği, asıl neden" oldu; L1 (mesaj nedeni söyler) ile L2 (mesaj belirtiyi söyler) ayrımı yazıldı.
- S2: tablodaki "İlk 10 ps sıcaklık" satırı yerine "0. kare hariç ortalama" ve "0. kare → 2 ps" satırları (gömülü seriden canlı hesap). fc5 kartı: termostat 2 ps'de 30,8 K'ye indi; 32,7 K ortalamanın nedeni 0. karenin 297,0 K olması (kitap CH12).
- Atölye 2 S3 ile açılıyor; S2 keşfi okur S2'yi seçmeden kazanılmıyor (taze sayfada 0 / 8).
- L5: "NaN olan koordinat: 28" yerine "Koordinatı NaN olan atom: 3 (taşınan suyun üç atomu)"; gömülü değer 3 yapıldı ve kaynaklar notuna 28'in ayrıştırma hatası olduğu yazıldı (kitap CH12).
- S3 kartı: σ_T ≈ T·√(2/N) tahmini (N 3.061 → 7,7 K; N 38.473 → 2,2 K; kitap CH12).
- L5: en çok yer değiştiren altı atom ve ortanca için logaritmik çubuk grafiği.
- Western blot denetim düğmeleri aria-pressed alıyor ve sonucu ("sinyal var / yok") düğmede yazıyor; "Yeni vaka" sıfırlıyor.

Uygulanmayan ya da kısmen uygulanan:

- L5 için bütün atomların sıralı log-log eğrisi: gömülü veride yalnız ilk altı atom ve ortanca var; tam eğri yeni veri ister. Yerine altı atom + ortanca çizildi, tam eğri için kitap Şekil 12.1a anıldı.

### MD-TRJ 0.1.0 → 0.2.0

- Tezgâh zinciri 4 ve sınav 6: hatalı sıra ("önce hizala, sonra bütünle") ham dosyada bölünmüş 554 karenin hiçbirini birleştirmedi (kitap CH13, bağ uzunluğu denetimi); 15 Å eşiği bunların yalnız 444'ünü yakaladı, kalan 110 karede molekül bölünmüş ama eşiğin altında. 554 ve 444 gömülü seriden canlı sayılır.
- Kutunun üç gösterimi: en küçük görüntü kuralıyla su sayımı tarayıcıda yapılıyor (27 periyodik kopya); okuma panelinde düz koordinatla 27 / 32 / 22, en küçük görüntüyle üçünde de 48. Haritada lacivert halka (düz koordinatla yakın) ve sarı nokta (yalnız en küçük görüntüyle yakın). "Hesaplanmadı" cümlesi kaldırıldı; sınırlar bölümü güncellendi.
- Mikroskopi köprüsü kartı veriye bağlandı: kaymanın net yer değiştirmeyi bu izde büyüttüğü ya da küçülttüğü sayıyla yazılıyor; "sıra da önemli" yerine "yalnız kayma düzeltmesi açıkken N sıçrama kalıyor" (ölçülen). Kart başlığı "Hızı ve yolu bozan iki şey".
- Yeni ölçüt "en uzun bağ" (A0 ile A4, 3B karelerinden tarayıcıda; 3 Å eşik çizgisi). Grafikte uzanım için 15 Å, bağ için 3 Å eşik çizgisi.
- "En büyük uzanım" notuna dönmeye duyarlılık cümlesi (hizalanmış 8,0 / öbürleri 9,1 Å); ubikitin okumasında etiket "En büyük uzanım (dönmeye duyarlı)".
- Ubikitin RMSD grafiği: "çekirdekle hizala, bütün Cα ölç" lacivert, hizalamasız eğri kesikli, kuyruk eğrisi noktalı; gösterge çizgileri de kesikli.
- 3B tuvaller odaklanabilir, ok tuşlarıyla döndürülür.
- Kart tc3'teki geliştirme notu genel bir görüntüleme cümlesiyle değiştirildi; renk açıklaması okuma panelinden metne alındı.

Uygulanmayan ya da kısmen uygulanan:

- "Hatalı sırayı 3B'de gösterin" (A5 koordinatları): A5 koordinatları sayfada gömülü değil; ham koşu dosyaları (xtc) bu ortamda yok, eklemek yeni veri üretimi ister. Bağ ölçütü A0 ile A4 için eklendi; A5'teki bağ sayımı kitaptan (CH13) kaynağıyla anılıyor.

### MD-MET 0.1.1 → 0.2.0

- "Kristale göre aynı RMSD, birbirine en uzak çift" artık çözümleme penceresinden (200 ile 2000 ps) seçiliyor: 290 ve 1590 ps (1,99 ve 2,07 Å, birbirine 1,37 Å), kitap CH14 ile aynı. Kart, bütün koşudaki plan istatistiğini de veriyor (150 ve 1980 ps, 1,55 Å; 150 ps atılan başlangıçta).
- Sayımlar gösteriliyor: 3.605 çift (pencerede 3.395; pencerede 1 Å'dan uzak 314); çift RMSD'si ortalamayı aşan yalnız 1 çift (10 ve 40 ps, atılan başlangıçta). Dejenerelik "olasıdır ama her çiftte görülmez" diye anlatılıyor; başlık "Aynı RMSD, aynı yapı mı?".
- RMSD grafiğine atılan 200 ps bandı, matrise 200 ps kesikli sınırı; okuma panelinde ilk 20 kare ile geri kalan arası 1,57 Å, geri kalanlar arası 0,93 Å.
- Matris: y ekseni sayıları, eksen başlığı tik etiketlerinden ayrıldı; iki kare sayı girişiyle (ps) klavyeden seçilebiliyor.
- Rg göstergesi "ortalama 11,79 Å (kareler arası SD 0,06)"; mc3 kartında koşular arası fark (11,69 ile 11,85 Å; 0,15 Å) SD ile karşılaştırılıyor.
- İkincil yapı: kitap CH14.6 sonuçları (DSSP, %93,4 / %95,3 / %94,2; 38 ile 40 sarmal payı %28 / %78 / %70; kuyruk 5 Å giderken atama değişmez) Atölye 2 altında kaynağıyla; sınırlar bölümü düzeltildi.
- ALA2 okuma paneline taban doğruluk (%67,4) ve "eşik aynı karelerde seçildi, ayrı veride sınanmadı" uyarısı.
- "bu bulutta" ifadesi açık bir cümleyle değiştirildi.
- Sınav 1 ve tezgâh 5 metinleri pencere çiftine ve "neredeyse aynı RMSD"ye göre güncellendi.

Uygulanmayan ya da kısmen uygulanan:

- İkincil yapı atölyesi (DSSP haritası): gömülü veri yalnız Cα koordinatı içeriyor; DSSP omurga N, C, O ister. Kitaptaki değerler kaynağıyla anıldı.
- ALA2 eşiğini koşu 2 ya da 3'te sınama: bu koşuların RMSD/durum verisi sayfada yok.

### MD-INT 0.1.1 → 0.2.0

- Sınav 2: B seçeneği gerçekten yanlış bir yoruma çevrildi ("ortalama %64 olduğuna göre köprü korunan bir etkileşimdir; bu tek sayı yeter"); açıklama ortalamanın doğru ama yayılımı (%91 / %85 / %15) gizlediğini söylüyor.
- H-bağı ömrü (kitap CH15'e uygun): artışın iki kaynağı ayrıldı. Aynı 1 ps eğrisi 5 ps ızgarasında yamuk integraliyle 2,68 ps verir (ızgara etkisi); 2,68 → 3,74 ps kaçırılan kopmalardan; aralıklı ömürdeki artış (3,54 → 4,58) tümüyle ızgaradan (aynı ızgarada 4,60). Atölye metni, ic6 kartı ve sınav 4 (doğru seçenek ve açıklama) güncellendi.
- Ömür grafiği: 2 ve 5 ps okumada 1 ps eğrisi soluk, seçili ızgarada örneklenmiş hâli kesikli çiziliyor; okuma panelinde "aynı ızgarada 1 ps eğrisiyle ömür" satırları.
- NOE köprüsü: ⟨r⁻⁶⟩ ortalamasının iç hareket dönmeden yavaşken geçerli olduğu, hızlı iç harekette ⟨r⁻³⟩² kullanıldığı (kitap CH15) metinde; karşılaştırma için ⟨r⁻³⟩^(−1/3) etkin uzaklığı okuma panelinde; sınırlar metni güncellendi.
- Q grafiğinin alt sınırı veriden (0,05 adım); kırpma kaldırıldı.
- Tuz köprüsü: seçili çift için üç koşuda oluşma sıklığı eşiğe karşı (2,5 ile 8,0 Å) grafiği, seçili eşik kesikli çizgi.

Bağımsız doğrulamadan sonra:

- Sınav 2 açıklaması: "Üç koşu aynı hazırlıktan" yerine "R2 ve R3 aynı hazırlıktan, yalnız başlangıç hızlarıyla ayrılıyor; R1'in iki dengeleme adımı ise başka bir makinede yapılmıştı" (kitap CH14).

### MD-PCA 0.1.1 → 0.2.0

- Sınav 5 açıklaması ve pc6 kartı: zıt korelasyon ötelemeye bağlandı (ağırlık merkezi ve en küçük kareler kuyruğu izler; molekül ters yöne ötelenir, biraz döner); kitap CH16'daki yeniden merkezleme sınaması (−0,16 / −0,21 / −0,06) kaynağıyla anıldı.
- PC1 animasyonu: "Duraklat/Oynat" düğmesi ve izdüşüm kaydırıcısı (koşunun izdüşüm aralığı); duraklatınca yapı seçilen değerde durur. Hareket azaltma tercihinde animasyon durmuş başlar, kullanıcı başlatabilir.
- FRET köprüsü: bant kaydırıcısı tek eşik modunda devre dışı; alt sınır 0,05; kart görünmeyen 0,30 bantla sayım yazmıyor.
- Okuma paneline "Halka 7 ile 11'in PC1'deki payı" (gömülü genlikten; koşu 3'te %17,7, kitapla aynı).
- Varyans payı grafiği: koşu göstergesi (sütun ve noktalar), y ekseni başlığı tiklerden ayrıldı. Genlik grafiği: yuvarlak tikler, "halka" ve "kuyruk" etiketleri çubukların üstünde, dar ekranda seyrek x tikleri.
- DCCM haritası ve 3B görünüm odaklanabilir; ok tuşlarıyla hücre seçimi, seçili değer canlı bölgede okunur.

Uygulanmayan ya da kısmen uygulanan:

- DCCM'ye "yalnız yeniden merkezleme" haritası: bu harita kare başına koordinat ister, sayfada gömülü değil (yeni analiz verisi gerekir). Kitaptaki sonuç kart ve sınavda kaynağıyla verildi.

### MD-U 0.2.1 → 0.3.0

- Atölye 1 kitaba (CH17 v7) uyarlandı: başlık "İki düzeyli RMSD, gezen açılar"; metin RMSD'nin minimize başlangıç yapısından (β/PPII, φ = −88°, ψ = 129°) uzaklık olduğunu söylüyor. Yeni okuma satırı pencerede duruma göre RMSD ortancası (αR / β / αL), yeni grafik pencerede duruma göre renkli RMSD dağılımı. Kart u1c1 artık "RMSD iki düzeylidir, αR'ye geçişi görür ama αR ile αL'yi ayırmaz; küçük kalması örneklemeyi söylemez" diyor ve αL görülmeyen pencerede koşu 1'deki 2,9 ile 3,2 ns ziyaretine yönlendiriyor.
- Sınav 2: doğru seçenek ve açıklama kitapla aynı (ortanca αR 0,112, β/PPII 0,041, αL 0,113 nm; durum 126 ile 206 kez değişti). Sınav 4: "üç koşuda".
- Köprü: %95 çubuğu t(N − 1) ile (N = 5'te 2,776); "Her kare bağımsız / √g ile düzeltilmiş" anahtarı (bu OU modelinde g = (1 + ρ)/(1 − ρ), ρ = e^(−Δt/30 s)); sabit tohumlu 1.000 deneylik "uzun dönemde yakalama" satırı; not üç bölgeye ayrıldı (Δt < τ, Δt = τ, Δt > τ), "dürüst" ve "bilgi kare aralığına bağlı değil" iddiaları kaldırıldı. Mobilde taşan grafik başlığı kısaltıldı.
- Tezgâh: not plato bayrağına bağlı (plato yoksa "g ve hata bir alt sınırdır"); kart u1c2 en büyük blok boyunda (512 kare) açılıyor ve plato durumunu yazıyor; blok grafiği log-log ve g_B = B başvuru çizgisiyle (Şekil 17.2b dili).
- Defter: hiçbir koşuda görülmeyen durumda sıfır genişlikli aralık yerine "kurulamaz: bütün paylar 0" ve açıklama, "Deftere yaz" devre dışı; aralık 1'i aşınca not; ölçek dışı deneme üçgen ve gerçek ± değeriyle gösteriliyor.
- Sayı ve yazım: 46 ile 114 ps, 126 ile 206, 0,179 ile 0,329, "1 ile 72 arasındaki kalıntılar", ψ sınırlarında derece işareti, 3B etikette U+2212 eksi, pencere etiketi "X ile Y ns".
- Yatay taşma: `.read dd` artık kaydırmıyor, okuma ızgarası `minmax(10em,1fr) auto`.

### MD-ERR 0.1.0 → 0.1.1

- LIE model aralıkları: su koşusunun iki tekrarda ortak olduğu metne ve kart ec4'e eklendi (koşu içi aralık su payını yarıya indirir, tekrarlar arası aralık su hatasını hiç görmez). Okumada "Koşu içi, ortak su payıyla" satırı: L4 ve L5 için kitaptaki değerler (SE 0,144 ve 0,148; CH18, plan dışı), öteki modeller için "Bu senaryo hesaplanmadı".
- Holm: dörde dörtte en küçük p 2/70 = 0,029, ilk eşik 0,05/8 = 0,00625; "sıfır tasarımdan gelir" ızgara notunda, okuma satırında, kart ec5'te, iddia 6 geri bildiriminde ve sınav açıklamasında (CH18 satır 157, Çözüm 6).
- Köprü kartı ec0 ρ'ya bağlandı (ρ > 0: ortak değişkenlik farktan düşülmez; ρ = 0: fark yok, kapsamanın %95'in üstünde olması 2n − 2 serbestlik sadeleştirmesinden); kaynak notuna Welch-Satterthwaite cümlesi.
- ChEMBL notu (CH09): ChEMBL 34, bu çift için sekiz Ki kaydı, altısı beş yayından 18,4 ile 39 µM, iki 31 nM kaydı planda kullanılmadı ve gerekçe yazılmadı; türetilmiş ΔG aralığının CC BY-SA 3.0 koşulu.
- Atölye 1 metni: blok SE 8 serbestlikli, çubuk normal yaklaşımla 1,96 (t(8) = 2,306 ile %18 daha geniş olurdu); iki eşit %95 aralığın çakışmaması kabaca p ≈ 0,006.
- Kart ec4 cümlesi: "hiçbir modelde iki aralıktan hiçbiri onunla örtüşmüyor".

Uygulanmayan ya da kısmen uygulanan:

- Öneri "LIE bölümüne ortak su payıyla anahtarı": tam olarak uygulanmadı. Gömülü bileşenlerde kovaryans terimi kompleks ve su diye ayrılmıyor; gömülü veriden hesap L4'te 0,151, L5'te 0,152 veriyor, kitaptaki 0,144 ve 0,148 ile tutmuyor. Bu yüzden yalnız kitabın verdiği L4 ve L5 için satır eklendi, öteki modeller "hesaplanmadı".
- Öneri "blok çubuklarını t(8) ile çizmek": çizim değiştirilmedi, çünkü ec1 kartındaki çakışma sayıları (22/28, 0/28) gömülü veride 1,96 ile önceden hesaplı; çubuğu değiştirmek kartla çelişirdi. Reviewer'ın ikinci seçeneği (notta normal yaklaşım ve p ≈ 0,006) uygulandı.

Bağımsız doğrulamadan sonra:

- Sınavda doğru seçenek yerleri dağıtıldı: C A B A C B C A B (A 3, B 3, C 3; hepsi B idi).

### MD-FES 0.2.0 → 0.3.0

- Köprü: "koşu başına ortalama giriş" artık ikiye bölünmüyor (M.nev/2 hatası) ve beklenen değerin yanında; 1000 koşudan sonra "olay sayısı kuralı" satırı (göreli belirsizlik kabaca 1/√n, ΔG'de kT/√n; CH19).
- φ > 0 bölgesi her yerde "αL ve C7ax" (CH19 Çözüm 7): başlık sahnesi ve ipucu, atölye 2 metni, AWH grafiği etiketi, atölye 1 sorusu, iddia 3.
- Girişler φ ≈ 0 tarafı ve ±180° sınırı diye ayrıldı (kısa açısal yol kuralı, CH19): şerit kutusu "3 giriş; φ ≈ 0 tarafından 1, ±180° sınırından 2", kart vc2 "2 tanesi αL ziyareti değil", AWH kutusu ve kart vc3 "274 ve 282 (110 ve 108'i φ ≈ 0 tarafından)", izleme satırında 4 ile 12 ns için "ayrıştırılmadı".
- İkinci engel etiketi "φ ≈ 130° (120 ile 180° ve −180 ile −120° aralığı)".
- Şerit kutusundaki ΔG₊ ve φ > 0 kare sayısı ölçüt penceresinden (200 ile 2000 ps): sonda 10,4 kJ/mol, tabloyla aynı. AWH kutusu 4 ns'de kayıtlı sayımı gösteriyor (A2 282 giriş, 2.057 kare). İddia 3 "%3,6'sını".
- İddia 2 geri bildirimi ve sınav 8 açıklamasına 12 ns hükmü ("uyumlu", 8,81 ve 8,19 kJ/mol; 4 ns hükmü kayıtta kalır). ΔG₊ okumalarına kcal/mol.
- İngilizce: tek başına "undefined" yerine "no estimate" ve tablo hücresinde "n/a". Bin ayracı (1.801, 14.408, 2.057).
- Başlık sahnesi iki turdan sonra duruyor; Duraklat/Oynat düğmesi (reduced-motion'da başlamaz).

Uygulanmayan ya da kısmen uygulanan:

- Öneri "(φ, ψ) haritası": uygulanmadı. Sayfa yalnız φ dizilerini gömüyor; ψ verisi bu modülde yok, haritayı kurmak MD-REP'ten yeni veri gömmeyi gerektirir.
- A2'nin φ ≈ 0 tarafı sayısı: gömülü 0,01° duyarlıklı açı dizisinden 109 çıkıyor, kitap (gmx rama) 108 diyor; sayfa 4 ns'de kitaptaki kayıtlı sayıyı gösterir, ara zamanlarda gömülü diziden canlı sayar.

Bağımsız doğrulamadan sonra:

- Yöntem seçicinin geri bildirim kutusu (`#vmfb`) `hidden` iken artık görünmüyor.
- EN iddia 3: "about 3.6% of the time" (TR'de "%3,6'sını" aynen kaldı).
- "Örtük çözücü" kartı φ > 0 bölgesi (αL ve C7ax) diliyle yazıldı (TR ve EN), kitap CH19 ile uyumlu.
- EN düzyazıda "undefined" sözcüğü kaldırıldı ("not defined", "undetermined").
- Sınavda doğru seçenek yerleri dağıtıldı: C A B C A C B A (A 3, B 2, C 3).

### MD-REPRO 0.1.0 → 0.2.0

- Atölye 1, tuz ve αR vakası, "kurulabilir" seçenek: "±5 puanlık bir farkı %80 güçle görmek için grup başına yaklaşık 69, eşdeğerliği göstermek için yaklaşık 75 tekrar gerekirdi" (CH06 v5).
- Kart xc2: "fark son basamakta başlar" genellemesi kaldırıldı; R1 ile W2'de son basamaklarda, iş parçacığı sayısı değişince adım 0'da potansiyel enerji birler basamağında ayrılıyor (W2 −60.803,72, R3 −60.804,65 kJ/mol; gömülü ODO); toplama sırası ile paralel bölüşüm bu deneyde ayrılmıyor.
- Sınav 4: doğru seçenek "Paralelleşme toplama sırasını ve hesabın bölüşümünü değiştirir; adım 0'daki küçük fark kaotik dinamikte büyür"; açıklamaya adım 0 farkı (0,93 kJ/mol). Alt başlık "Toplama sırası sonucu değiştirir".
- İddia 5: gerekçe yeniden yazıldı; tek iş parçacıklı -reprod koşusu yok, R4 ile W2 iki değişkeni birden değiştiriyor; hüküm ("kurulamaz") GROMACS kılavuzunun aynı komut satırı koşuluna dayanıyor.
- Kayan nokta laboratuvarı: "Sırayı sabitle" anahtarı; açıkken karıştırma toplamı değiştirmez, 1000 sıralık dağılım tek sonuca iner, not -reprod benzetmesini ve iş parçacığı sayısı değişince sonucun yine değişebileceğini söyler.
- Başlık sahnesi iki turdan sonra duruyor; Duraklat/Oynat düğmesi.
- LIE vakası: "ChEMBL 34'teki altı µM Ki kaydı; sekiz kaydın 31 nM olan ikisi planda kullanılmadı (CH09)".

Uygulanmayan ya da kısmen uygulanan:

- Öneri "basamak sayacında beş terimin hepsi": uygulanmadı. Sayfa gmx energy çıktısından yalnız zaman, potansiyel enerji ve basıncı gömüyor (VDD.ODO); kinetik enerji, sıcaklık ve hacim için edr dosyalarından yeniden çıkarım gerekir, bu ortamda o dosyalar yok.

Bağımsız doğrulamadan sonra:

- Sınavda doğru seçenek yerleri dağıtıldı: A C B C A B A C (hepsi B idi).

## 0.43.1 (22 Ekim 2026) · Kitap adı ve modül alt bilgisi

- Kitabın adı belgelerde güncellendi: yazarın 22 Ekim 2026 kararıyla "Biyomoleküler Sistemlerde Moleküler Dinamik Simülasyon" (önceki ad "Biyomoleküllerin Moleküler Dinamik Simülasyonu"). Değişen dosyalar: `README.md`, `README.tr.md`, `LICENSING.md`. Site sayfaları kitabın adını taşımıyordu; bölüm adları (`book.json`) kitaptaki adlarla birebir aynı olduğu denetlendi.
- Modül sayfalarının alt bilgisinden "durum: pilot" (İngilizcede "status: pilot") kaldırıldı. 27 modülün hepsi aynı durumdaydı, bu yüzden etiket modüller arasında bilgi taşımıyordu. Aynı satırdaki "Önizleme yayınıdır; bilimsel ve hedef-okur incelemesi yapılmadı." notu korunur; `modules.json`'daki `status` alanı değişmedi ve "planlandı" durumu gösterilmeye devam eder.
- Modül metinlerindeki "pilot koşu" ifadeleri verinin kaynağını anlatır (alanin dipeptidinin 5 bağımsız koşu × 10 ns kısa koşuları); etiket olmadıkları için değiştirilmedi.
- `noindex` başlıkları, erişim kuralları, modül kodu ve veriler değişmedi.

## 0.43.0 (15 Ekim 2026) · Uygulama sayfaları: düzeylere ayrılmış, görselli modül kartları

- /tr/md/, /en/md/ ve docking sayfaları yeniden düzenlendi. Modüller üç düzeyde (Temel, Orta, İleri) toplandı; her düzeyin içinde kitaptaki bölüm sırasıyla dizildi. Sayfanın üstünde düzeylere götüren üç kart ve kısa bir yönlendirme satırı var; "Hesaplar nasıl yapılır?" kutusu kapalı açılır.
- Her modül bir kart oldu: üstte modüle özel çizim ve düzey etiketi, altında kitap bölümü, modül adı, ilk iki amaç, modül kimliği ve sürümü, sağ altta "Modülü aç" düğmesi. Kartın tamamı bağlantıdır; üzerine gelince kart hafifçe yükselir. Hareket azaltma tercihi olan tarayıcıda hareket yoktur.
- Düzey adları kitapla aynı: görünen ad "Uzman" yerine "İleri" (İngilizcede "Advanced"). modules.json'daki `uzman` değeri değişmedi.
- 27 kart çizimi `static/assets/kart/<kimlik>.svg` dosyalarında; üreteci `assets-src/kart/kart.py` (Python, numpy ve scikit-image). Renkler kitap kapağıyla aynıdır. Çizimler şemadır, veri grafiği değildir: eksen, sayı ya da ölçek taşımaz. Tek istisna MD-PDB'dir: ubikitin zinciri kristal 1UBQ Cα koordinatlarından, kitabın kanonik görüşüyle çizilir (kitabın `ca_ubq3.npz` ve `ubq_kanonik.json` dosyaları; yol üretece argüman olarak verilir). Çevresindeki su noktaları temsilîdir, kristal sularının konumu değildir. Çizimi olmayan bir modülün kartı koyu zemin ve modül kimliğiyle gösterilir.
- Modül sayfaları, veri ve çeviri tabloları değişmedi.

## 0.42.8 (11 Ekim 2026) · Kitapla uyum: üç sözlük tanımı ve MD-U sınama sorusu

- Sözlük: "etkin örnek sayısı", "RMSD" ve "RMSF" tanımları kitabın V4 sonrası revizyonuyla (CH17, CH13, CH14) uyumlu yazıldı. Etkin örnek sayısı N_etkin = N/g ile, g boyutsuz olarak tanımlandı; negatif otokorelasyonda kare sayısını aşabileceği ve seyrek durumlarda ayrıca denetim gerektiği eklendi. RMSD'de hizalama zorunlu tanım parçası olmaktan çıktı (docking pozunu reseptör çerçevesinde değerlendirirken ligandı ayrıca hizalamak hatayı siler). RMSF'de sabit referansa göre sapmanın ayrı bir nicelik olduğu yazıldı. İngilizce tanımlar aynı biçimde değişti.
- Yazar bu üç tanımı henüz gözden geçirmedi; sözlük sayfasının notu bunu adıyla söyler (glossary.json `degisiklikler`, önceki tanımlar kayıtlı). 9 Ekim 2026 yazar incelemesi öbür 87 tanım için geçerli kalır.
- MD-U 0.2.1: Sınama sorusundaki "g = 200 kare" ifadesi "g = 200 (g boyutsuzdur)" oldu; hesap ve doğru yanıt değişmedi. Etkin örnek sayısı N'den büyük çıktığında gösterilen "anlamsız" notu ve bir sınama açıklaması, kitabın CH17 ayrımına göre yazıldı: N'den büyük bir sayı kendi başına imkânsız değildir; sorun, iki ziyarete dayanan tahminin güvenilir olmamasıdır. İngilizce tabloda ilgili üç çift güncellendi.

## 0.42.7 (10 Ekim 2026) · Kitap revizyonunda bulunan iki modül tutarsızlığı

- DK-U 0.2.3: Sıralama atölyesinin açıklaması skorları "beş tohumun ortancası" diye anıyordu; ana tarama tek tohumla yapıldı, tohum gürültüsü 20 bileşikte ayrıca ölçüldü (sayfanın "Proteine dönüş" bölümündeki "tam 5 tohumlu set hesaplanmadı" notuyla da çelişiyordu). Açıklama düzeltildi; veri ve skorlar değişmedi.
- MD-PCA 0.1.1: Korelasyon kartı, bütün Cα hizalamasındaki zıt korelasyonu molekülün döndürülmesine bağlıyordu. Kitabın CH16 sınamasına göre etkinin büyük kısmı ötelemeden gelir: kuyruk hizalamaya girince molekül ters yöne ötelenir (ve biraz döner). Kart metni buna göre yazıldı; veri değişmedi.
- İki düzeltme de kitabın dış incelemesinde (GPT revizyon talimatı, R08) işaretlendi ve kitap metniyle karşılaştırılarak doğrulandı. İngilizce tablolarda ilgili iki çift güncellendi.

## 0.42.6 (10 Ekim 2026) · Türkçe metinde "çözgen" yerine "çözücü"

- MD-SOLV 0.1.1: Türkçe metindeki 21 "çözgen" "çözücü" oldu (başlık, bölüm başlıkları, açıklamalar, Defter kaydı, iddia kartları ve sınama sorusu; ek uyumuyla: çözücüye, çözücüsüz). Modül adı "Çözücü de modelin parçası: iyonlar ve yardımcı çözücü". Gerekçe: TDK Güncel Türkçe Sözlük "çözücü"yü kimya terimi olarak verir, "çözgen" için sonuç vermez; sitenin sözlüğü de "çözücü" kullanır. Sözlükteki "çözgen" eş anlamlısı aramada bulunmak için kaldı.
- Kitap sayfası: CH10'un başlığı "Çözücülü ve heterojen sistem kurmak" (book.json). Kitabın CH10 v4 sürümüyle aynı.
- Karar kitabın kararlar turunda verildi ve yazar onayladı (10 Ekim 2026). İngilizce çeviri tablosunda yalnız Türkçe taraf ve kaynak özeti (`source_sha256`) değişti; İngilizce metin değişmedi (19 çift).

## 0.42.5 (10 Ekim 2026) · Kitap denetiminde bulunan üç modül düzeltmesi

- MD-CUT 0.1.2: Proteine dönüş bölümünde komşu listesi yarıçapı 1,104 nm değil 1,106 nm (tampon 0,104 değil 0,106 nm). Değer, ubikitin kısıtsız deneme koşusunun günlüğünden ("Changing nstlist from 10 to 50, rlist from 1 to 1.106"); 1,104 nm daha dar S3 kutusunun değeriydi. Tablo, açıklama, kart metni ve canlı simülasyonun "Bu projenin ayarı" düğmesi düzeltildi.
- MD-ELEC 0.1.1: "Bu projede tuzlu bir koşu yapılmadı" yanlıştı. Senaryo protokolündeki S4 hazırlığında 0,15 M NaCl istendi: genion 17 Na⁺ ve 17 Cl⁻ ekledi (hesap 17,47) ve 10 ps'lik kısıtsız deneme koşusu tamamlandı. Metin buna göre yazıldı; tuzun ubikitin üzerindeki etkisi için "bu senaryo hesaplanmadı" kaldı. Veri listesine S4 eklendi.
- MD-REP 0.1.2: Tezgâhtaki hüküm satırının JavaScript'siz yer tutucusu "Bu senaryo henüz hesaplanmadı: koşular sürüyor" idi (koşular 4 Ekim'de bitti). Yerine ön kayıtlı hüküm yazıldı; veri yüklenemezse tuvallerde "Gömülü veri yüklenemedi" görünür.
- Üç düzeltme de kitap bölümlerinin (CH04, CH06) bağımsız denetiminde bulundu. İngilizce tablolar aynı biçimde güncellendi; çift sayıları değişmedi. Değişen İngilizce cümleler 9 Ekim toplu çeviri onayından sonra yazıldı.

## 0.42.4 (9 Ekim 2026) · Sözlüğe kitaptaki yazımlar eklendi

- Kitap taslaklarında sözlük terimleri tarandı (öneri listesi kitap klasöründe, `book/links_2026-10-09_sozluk/`). Yazarın kararıyla kitapta kullanılan iki yazım sözlüğe eş anlamlı olarak eklendi: "entegratör" (integratör) ve "enerji sürüklenmesi" (enerji kayması). Sözlük sayfasında "Ayrıca" satırında görünür ve aramada bulunur; eşleşme kalıplarına da eklendi (modül bağlantıları değişmedi: modüllerde bu yazımlar geçmiyor). Tanımlar değişmedi; `inceleme` alanına not düşüldü.

## 0.42.3 (9 Ekim 2026) · Modül çevirileri yazar tarafından toplu onaylandı

- Yazar 27 modülün İngilizce çevirisini 9 Ekim 2026'da bütün olarak onayladı; İnceleme masasındaki modül paketleri (4.542 metin parçası) madde madde incelenmedi. Yeni `i18n/onay.json` bu onayı modül başına kaydeder (kim: yazar, tür: toplu, tarih). Çeviri tablolarında `reviewed` false kalır.
- İngilizce modül sayfalarının alt notu "Claude (AI) has checked it, but it has not yet been reviewed by a person" yerine "Claude (AI) has checked it, and the author approved it as a whole on 9 October 2026 without reviewing it item by item" oldu. Metinler değişmedi. `version.json` çeviri bilgisinde `approved` alanı. `tools/check.mjs` 4d onay kayıtlarını ve notu denetler.

## 0.42.2 (9 Ekim 2026) · Sözlük yazar tarafından gözden geçirildi

- Yazar 90 sözlük terimini İnceleme masasında (claude.ai artifact) madde madde gözden geçirdi: 90 uygun, 0 düzeltme; paket 9 Ekim 2026'da onaylandı. Tanımlar değişmedi.
- `glossary.json`'a `inceleme` alanı eklendi (kim: yazar, tarih, uygun, düzelt, yöntem). Sözlük sayfasındaki not artık "bir kişi tarafından henüz gözden geçirilmedi" yerine "yazar tarafından madde madde gözden geçirildi (9 Ekim 2026)" diyor; `inceleme` alanı yoksa eski not görünür. Modül sayfalarının çeviri notları değişmedi (modül paketleri henüz incelenmedi).

## 0.42.1 (9 Ekim 2026) · Modül sayfalarında "Bu modüldeki terimler"

- Her modül sayfasının altına, modüller arası geçiş şeridinin üstüne "Bu modüldeki terimler" kutusu eklendi: sözlükte o modüle bağlanan terimler (sözlük bağlantılarının tersi; modül başına 4 ile 26), her biri sözlükteki çapasına gider (`/tr/glossary/#kesme`). Önce modülün kendi kitap bölümüne ait terimler (renkli kenar), sonra modüldeki geçme sayısı. Sonda "Bütün sözlük" bağlantısı.
- Modül kaynakları ve çeviri tabloları değişmedi; kutu yapım sırasında `tools/build.mjs` tarafından eklenir. `tools/check.mjs` 4c: kutudaki her terim sözlükte var ve kutunun terim kümesi sözlükteki bağlantıların tersiyle iki dilde aynı.

## 0.42.0 (9 Ekim 2026) · Terimler sözlüğü

- Yeni sayfalar `/tr/glossary/` ve `/en/glossary/` (ayrıca `/tr/sozluk`, `/tr/l/sozluk`, `/tr/l/glossary`, `/en/l/glossary`): kitapta ve modüllerde geçen 90 temel terim; her biri öteki dildeki karşılığı, eş anlamlıları, bir iki cümlelik tanımı (iki dilde), bağlı modülleri (en çok 5; terimin kitap bölümüne ait olanlar renkli kenarlı) ve kitap bölümüyle. Arama kutusu (iki dilde, önce terim adı), harf dizini, her terim için kalıcı çapa (`#kesme`).
- Yeni `glossary.json`. Tanımlar Claude tarafından yazıldı; bağımsız bir denetim 41 terimde 60 sorun buldu ve hepsi uygulandı (örneğin SASA'nın tanımı, pKa, güven aralığının yorumu, IC50'nin afinite ölçüsü olmaması, tohumun bit düzeyinde aynılığı garanti etmemesi). Terim adları modüllerdeki kullanımla eşleştirildi (otokorelasyon, konum kısıtı, parametrizasyon, kaba taneli, alkemik, en yakın kopya). Sayfada tanımların bir kişi tarafından henüz gözden geçirilmediği yazılı.
- Bağlı modüller yapım sırasında modüllerin Türkçe görünür metninde (i18n tablolarının Türkçe tarafı) aranarak bulunur; 295 bağlantı. Anlamı farklı eşleşmeler kalıplarla ayıklandı (örneğin "pozlama", "yeniden üretildi", minimizasyonun "yakınsadı"sı).
- Ana sayfadaki "Kitaptan mı geldiniz?" kutusuna ve kitap sayfasına sözlük bağlantısı eklendi. `tools/check.mjs` 4c: kimlikler tekil, bölümler `book.json`'da (ya da DK), her terim en az bir modüle bağlı, metinlerde uzun ya da orta tire yok, sayfa iki dilde bütün terimleri içeriyor; İngilizce karşılık bağlı modülün İngilizce metninde yoksa not.

## 0.41.0 (9 Ekim 2026) · MD-FES 0.2.0: daha uzun AWH izlemesi

- MD-FES'e "3b · İzleme: daha uzun AWH" bölümü eklendi. FESGRID'in iki AWH koşusu (A1, A2) 4 ns'deki denetim noktalarından 12 ns'ye sürdürüldü (FESGRID2); plan koşulardan önce donduruldu, ölçüt ve eşikler 4 ns ile aynı (profil farkı < 2, ΔG₊ farkı < 1 kJ/mol), birincil hüküm 12 ns'de.
- Sonuç: 12 ns'de ΔG₊ A1 8,81, A2 8,19 kJ/mol (fark 0,62), profillerde en büyük fark 0,93 kJ/mol; hüküm "uyumlu". 8 ns'de de uyumlu (0,69 ve 0,92). 4 ns hükmü "uyumsuz" kayıtta olduğu gibi kalır. 11 ile 12 ns arasında ΔG₊ değişimi A1 0,03, A2 0,08 kJ/mol. φ > 0'a giriş 4 ile 12 ns'de A1 602, A2 544. Bias'sız MD ile RMS farkı 0,67 kJ/mol (4 ns'de 0,80).
- Görseller: iki profilin ve aralarındaki farkın 4 ile 12 ns animasyonu (oynat, durdur, kaydırıcı); ΔG₊'nin 0,5 ile 12 ns arasındaki seyri ve iki koşunun farkı eşik çizgileriyle. Keşif kartı vc7; ilerleme 8 kart. Atölye 3'teki kart izleme bölümüne gönderme yapıyor.
- Bir sapma: koşular yaklaşık 4,23 ns'de bulut ortamı yeniden başlayınca kesildi ve yalnız denetim noktasından sürdürüldü. Bağımsız denetim 7/9: iki φ karşılaştırması (xtc ile pull çıktısı) önceden yazılmış 0,1 derece eşiğini geçmedi; fark xtc'nin 0,001 nm duyarlığından (ortalama −0,01, en çok 1,44 derece) ve sonuç "geçmedi" olarak sayfada yazılı.
- İngilizce tabloya izleme bölümünün çiftleri eklendi (226 çift).

## 0.40.1 (9 Ekim 2026) · İngilizce bölüm başlıkları onaylandı

- Yazar 20 İngilizce bölüm başlığını onayladı; üçü değişti: CH03 "Statistical mechanics for MD users", CH05 "Controlling a simulation without distorting the question", CH19 "Deciding when to go beyond standard MD". `/en/book/` sayfasındaki "çalışma çevirisi" notu kaldırıldı.

## 0.40.0 (9 Ekim 2026) · Kitap sayfası: bölüm -> modül haritası

- Yeni sayfalar `/tr/book/` ve `/en/book/` (ayrıca `/tr/kitap`, `/tr/l/book`, `/en/l/book` yönlendirmeleri): MD kitabının 20 çalışma birimi temel, orta ve ileri düzeyde; her bölümde bağlı modüller (ana, ortak, ek), modül başlığı ve kısa adres. 29 modül bağlantısı (DK-O ve DK-U iki bölümde).
- Yeni `book.json`: bölüm kimliği, düzey, Türkçe başlık (kitap haritası) ve İngilizce başlık (çalışma çevirisi; İngilizce sayfada yazar onayı beklediği yazılı). Modül-bölüm ilişkisi `modules.json` `book` alanından üretilir.
- Ana sayfadaki "Kitaptan mı geldiniz?" kutusuna ve 404 sayfalarına kitap sayfası bağlantısı eklendi. `tools/check.mjs`: her bölümün en az bir modülü var, modüllerin bölümleri `book.json`'da, kitap sayfası iki dilde ve 20 bölümü içeriyor.

## 0.39.0 (9 Ekim 2026) · İngilizcede tekil/çoğul uyumu

- İngilizce sayfalarda sayı 1 olduğunda "1 visits", "1 measurements", "1 times" gibi çıkan 27 yer düzeltildi (14 modül: DK-T, DK-O, MD-T, MD-PBC, MD-CUT, MD-ELEC, MD-ENS, MD-DT, MD-PDB, MD-INT, MD-PCA, MD-U, MD-REPRO, MD-FES). Çoğunda sayıya göre tekil ya da çoğul seçen kısa bir koşul kullanıldı; birkaçında cümle sayı başa gelmeyecek biçimde kuruldu ("So far: definitions 2, runs 3"; MD-FES'te "did so (entries in 2 ns): W1 0, W2 1"). Yalnız İngilizce çeviri çiftleri değişti; Türkçe kaynak, veri ve hesap aynı.
- Taranan 205 aday içinden sayının hiçbir zaman 1 olamadığı (sabit veri ya da koşulla en az 2) yerler değiştirilmedi.

## 0.38.0 (9 Ekim 2026) · Türkçe kaynak düzeltmeleri (İngilizce denetimden gelen notlar)

İngilizce denetimde Türkçe kaynakta bulunan notlar tek tek doğrulandı ve iki dilde düzeltildi. Veri, hesap ve sonuç değişmedi.
- DK-T 0.2.1: Lennard-Jones itmesi uzaklığın on ikinci kuvvetiyle "büyür" değil, onunla ters orantılıdır (1/r¹²).
- DK-O 0.3.1: sınavda cep Cα RMSD için "0,27 Å altındaki" yerine kartla aynı "0,27 Å ve altında olan".
- DK-U 0.2.2: atölye 1'de 144 tripsin bileşiğinden yalnız alt sınır olarak verilen 2 sansürlü Ki kaydının dışarıda kaldığı (n = 142) yazıldı.
- MD-ENS 0.2.1: "topluluğta" yazım hatası; "uzun saniyeler" yerine "koşunun sonundaki nanosaniyeler"; tek karenin sıcaklığı kinetik enerjiye eşit değil, ondan hesaplanır (orantılıdır).
- MD-REP 0.1.1: Welch aralıkları "altta" değil öteki gösterimde.
- MD-CON 0.1.1: C-rescale "hacim hızını" değil, hacmi (koordinatlarla birlikte) stokastik terimli birinci dereceden bir kuralla ölçekler.
- MD-PBC 0.6.1: indirgenmiş birimde sıcaklık k_BT = 0,40 ε.
- MD-CUT 0.1.1: uzak erim elektrostatiğin konusu "Laboratuvar 3" değil, MD-ELEC modülü.
- MD-EQ 0.1.1: LJ minimumu (yaklaşık 1,12 σ) yalnız bu terim olsaydı geçerli olurdu; gerçek suda hidrojen bağları en yakın O-O uzaklığını yaklaşık 0,28 nm'ye çeker. Ayrıca 375 px'te Türkçe sayfadaki yatay taşma giderildi (dar ekranda ızgara sütunu `1fr` yerine `minmax(0,1fr)`).
- MD-MET 0.1.1: Rg, atomların kütle merkezine uzaklıklarının kütle ağırlıklı karekök ortalamasıdır (üç yerde "ortalama uzaklık" düzeltildi); ölçüt "sorudan" değil "sonuçtan" önce yazılır.
- MD-INT 0.1.1: sınavda yaklaşık 4,4 Å etkin uzaklık için "güçlü NOE" yerine "gözlenebilir (zayıf sınıfta) NOE".

## 0.37.0 (9 Ekim 2026) · İngilizce denetim, 3. tur: uzman düzey; 27 modülün hepsi denetlendi

- Uzman düzeyin 5 modülünün İngilizce tablosu (DK-U, MD-U, MD-ERR, MD-REPRO, MD-FES) Türkçe kaynakla çift çift karşılaştırıldı. 64 düzeltme: 9 anlam ya da dil bilgisi hatası (DK-U'da iki ondalık virgül dahil), 16 tutarlılık (Amerikan yazımı; MD-U'da "repeats" yerine "replicas"; MD-REPRO'da "reproduction file" yerine "reproduction package"), 39 üslup.
- DK-U'da İngilizce sayfada Türkçe kalan altı parça için yeni çiftler: "Ham skor-pKi Spearman" (iki yerde), sınavda "Yorum?", "Neden fark var?" ve "54 etkinin", histogram göstergesinde "tuzak".
- Bu turla 27 modülün hepsinde `checked: "claude"`; üç turda toplam 417 düzeltme ve 13 yeni çift. İngilizce alt not her modülde "Claude (AI) has checked it, but it has not yet been reviewed by a person." `reviewed: true` bir kişinin gözden geçirmesini bekliyor.
- Türkçe kaynak notu: DK-U'da tarama 144 tripsin bileşiği derken veri ve grafik 142 diyor (büyük olasılıkla süzme; metinde belirtilmeli). MD-U, MD-ERR, MD-REPRO ve MD-FES'te sayıların tutarlılığı yeniden denetlendi, not yok. Kodda tekil/çoğul ayrımı olmadığı için sayı 1 olduğunda "1 visits" gibi biçimler görünebilir (MD-U, MD-FES); bu ayrı bir kod düzeltmesi gerektirir.

## 0.36.0 (9 Ekim 2026) · İngilizce denetim, 2. tur: orta düzey

- Orta düzeyin 13 modülünün İngilizce tablosu (DK-O, MD-EQ, MD-O, MD-PDB, MD-DT, MD-TRJ, MD-MET, MD-PCA, MD-INT, MD-FAIL, MD-FF, MD-SOLV, MD-LIG) Türkçe kaynakla çift çift karşılaştırıldı. 211 düzeltme: 12 anlam ya da dil bilgisi hatası, 136 tutarlılık (Amerikan yazımı; "cutoff" yerine "cut-off"; yüzde işaretinden önce boşluk yok; "ledger" yerine "notebook"; "template" yerine "draft"; MD-EQ, MD-O ve MD-PDB'de "Bridge to the bench" yerine öteki modüllerdeki gibi "Experimental bridge"), 63 üslup. Yalnız görünen metin değişti.
- İngilizce sayfada Türkçe kalan parçalar için yeni çiftler: DK-O'da kısa eksen etiketi "dikey: skor" (mevcut çift düzeltildi); MD-LIG'de zaman ekseni "zaman (ps)" ve tablodaki "β 0,5" ondalık virgülü.
- Bu modüllere `checked: "claude"` eklendi; alt not 1. turdaki gibi.
- Türkçe kaynakta bulunan ve değiştirilmeyen notlar: DK-O'da aynı üç yapı için "0,27 Å'un altında" ve "0,27 Å ya da daha düşük"; MD-EQ'de suyun "LJ minimumu çevresinde" (yaklaşık 0,35 nm) en rahat durduğu cümlesi (sıvı suda en yakın O-O yaklaşık 0,28 nm); MD-MET'te Rg için "ortalama uzaklık" (kütle ağırlıklı karekök ortalama olmalı) ve "sorudan önce yazılır"; MD-INT sınavında yaklaşık 4,4 Å etkin uzaklık için "güçlü NOE".

## 0.35.0 (9 Ekim 2026) · İngilizce denetim, 1. tur: temel düzey

- Temel düzeyin 9 modülünün İngilizce tablosu (DK-T, MD-T, MD-PBC, MD-CUT, MD-ELEC, MD-ENS, MD-CON, MD-REP, MD-Q) Türkçe kaynakla çift çift karşılaştırıldı. 142 düzeltme: 20 anlam ya da dil bilgisi hatası, 65 terim ve yazım tutarlılığı (Amerikan yazımı; "ledger" ve "log" yerine "notebook"; "cutoff" yerine "cut-off"), 57 üslup. Yalnız görünen metin değişti; kod, sayı ve veri değişmedi.
- İngilizce sayfada Türkçe kalan beş parça için yeni çiftler: MD-T'de "durum" etiketi, "fs'de" eki ve "ħω kT'nin" başlangıcı; MD-CUT'ta "kat"; MD-CON'da τ_T seçeneklerinde ondalık virgül (0,1 yerine 0.1).
- Yeni tablo alanı `checked: "claude"`: Claude denetledi, insan gözden geçirmesi bekliyor. `reviewed` false kalır. İngilizce alt not bu modüllerde "Claude (AI) has checked it, but it has not yet been reviewed by a person." olur (`tools/build.mjs`, `version.json` translations alanına da yazılır).
- Terim sözlüğü ve düzeltme listeleri `i18n/_work/review/` altında (gitignore). Not: `i18n/_work/<modül>/` yapım betikleri bu düzeltmeleri içermez; İngilizce yeniden üretilirse düzeltme listeleri yeniden uygulanmalıdır.
- Türkçe kaynakta bulunan ve değiştirilmeyen notlar (ayrı turda ele alınacak): DK-T'de Lennard-Jones itmesinin "uzaklığın on ikinci kuvvetiyle" büyüdüğü cümlesi (r⁻¹²); MD-ENS'te "topluluğta" yazım hatası ve "uzun saniyeler"; MD-REP'te Welch aralıklarının "altta" değil öteki görünümde olması; MD-CON'da C-rescale için "hacim hızını ölçekler"; MD-PBC'de indirgenmiş birimde T = 0,40 ε (k_BT olmalı); MD-CUT'ta "Laboratuvar 3" göndermesi (MD-ELEC olmalı). MD-T'de bağ adlarındaki orta çizgi (O–H) iki dilde de duruyor.

## 0.34.0 (9 Ekim 2026) · Yeni modül MD-FES: standart MD'nin ötesine karar vermek

- MD-FES 0.1.0 (uzman düzey, kitapta CH19): "Bu soru için standart MD yeter mi?" Yeni koşular (FESGRID): alanin dipeptidinde φ = C(ACE)-N-CA-C boyunca GROMACS 2023.3 AWH ile iki bağımsız 4 ns koşu (A1, A2; MD-REP'in W1 ve W2 dengelenmiş yapılarından, farklı tohumlarla). Plan koşulardan önce SHA-256 ile donduruldu (0b026ad8…, 8 Ekim 14:27 UTC); plandan sapma yok.
- Bias'sız (MD-REP W1 ile W8, 16 ns): φ > 0'a 3 giriş, ölçüt penceresindeki 220 φ > 0 karesinin 219'u W4'ün tek ziyaretinden; havuz ΔG₊ 10,39 kJ/mol, 8 koşunun 6'sında tanımsız.
- AWH (4 ns): ΔG₊ A1 8,99, A2 7,44 kJ/mol; φ > 0'a 274 ve 282 giriş; kapsama tam. Önceden yazılmış uyum ölçütü (ΔG₊ farkı < 1, profil farkı < 2 kJ/mol) geçilemedi: farklar 1,55 ve 2,05, hüküm "uyumsuz"; sayfa sonucu bu hükümle raporlar. Bias'sızın iyi örneklediği 15 bölmede iki profil arasında RMS 0,80 kJ/mol.
- Görseller: φ kadranı (bias'sız W1 ile AWH A1, bias halkası), iki durumlu köprü modeli (tarayıcıda; sekiz koşu şeridi ve 1000 koşunun ΔG dağılımı), altı soru × altı yöntem kartı, sekiz koşunun φ şeritleri, AWH profil ve bias animasyonu (41 kayıt), φ izi, son profiller ve ΔG₊ karşılaştırması, atomistik, kaba taneli (gösterim), örtük çözücü ve ML kartları. Animasyonlar görününce bir kez oynar, durdurulabilir.
- Bağımsız denetim 17/17. Tezgâh: sekiz iddia. Defter: yöntem kararı. Sekiz soru, yedi keşif kartı. Kaynaklar PubMed'den doğrulandı (Lindahl ve ark. 2014; Mobley ve Gilson 2017; Souza ve ark. 2021). İngilizce tablo 223 çift (`i18n/_work/mdfes/`), `reviewed: false`. Kısa adresler: `/tr/l/MD-FES`, `/en/l/MD-FES`.

## 0.33.0 (8 Ekim 2026) · Yeni modül MD-REPRO: yeniden üretim ve savunulabilir çalışma

- MD-REPRO 0.1.0 (uzman düzey, kitapta CH24): "Başkası aynı dosyalardan aynı cümleye varabilir mi?" Yeni koşular (REPROGRID): MD-REP'in W1 ve W2 md.tpr dosyaları değiştirilmeden GROMACS 2023.3 ile, özgün koşularla aynı bulut makine türünde yeniden koşuldu: R1 (W2, -nt 1), R2 (W1, -nt 1, kesintisiz), R3 (W2, -nt 2), R4 ve R5 (W2, -nt 2 -reprod, 200 ps). Koşu ve analiz planı koşulardan önce SHA-256 ile donduruldu (431c4091…, 09:43 UTC).
- Sonuç: aynı tpr ve aynı komut W2'yi yeniden üretmedi (enerjiler 0 ps'den, koordinatlar 1 ps'den farklı; peptitte 0,5 nm farka 8 ps'de ulaşıldı). Denetim noktasından sürdürülmüş W1 ile kesintisiz R2 bit düzeyinde aynı (xtc ve edr SHA-256 aynı); -reprod ile iki koşu aynı. αR payı W2 %38,8, R1 %51,7 (+12,9 puan), R3 %13,8 (−25,0 puan); W'nin tekrarları arası SD 11,3 puan. GROMACS kılavuzu FFTW'nin zaman ölçümüne dayalı algoritma seçimini neden olarak sayar; neden doğrudan sınanmadı (tek iş parçacıklı -reprod koşusu: hesaplanmadı).
- Görseller: başlık sahnesi ve kelebek sahnesi (gerçek koordinatlar, iki pano ve üst üste, Cα izi), imleçli ayrışma şeridi, gmx energy basamak sayacı, kayan nokta laboratuvarı (tarayıcıda gerçek tek duyarlık toplamı, 1000 sıra histogramı; sayılar simülasyon verisi değil), Ramachandran yarışı (tarayıcıdaki son αR payı planlı analizle aynı), MIQE paragraf vurgusu ve kapsama halkası, 256 bitlik SHA-256 ızgarası, haklar akışı. Animasyonlar görününce bir kez oynar, durdurulabilir; "hareketi azalt" ayarında kendiliğinden başlamaz.
- Plandan iki sapma (DEVIATIONS.md): en küçük görüntü farkının eklenmesi (ham fark PBC sarılması yüzünden 4 nm'yi aştı; hükümler ham farka dayanır) ve yalnız görselleştirme için R4 ve R5'in φ/ψ açılarının denetimden sonra hesaplanması. Bağımsız denetim 22/22. Tezgâh: sekiz iddia. Defter: savunulabilir çalışma dosyası. Sekiz soru, yedi keşif kartı. NOTICE: GROMACS 2023.3 (LGPL-2.1) yazılım tablosuna eklendi. `tools/check.mjs` kimlik biçimi beş harfli soneki de kabul ediyor (MD-REPRO). İngilizce tablo 324 çift (`i18n/_work/mdrepro/`), `reviewed: false`. Kısa adresler: `/tr/l/MD-REPRO`, `/en/l/MD-REPRO`.

## 0.32.0 (8 Ekim 2026) · Yeni modül MD-ERR: hata çubuğu ve dürüst karşılaştırma

- MD-ERR 0.1.0 (uzman düzey, kitapta CH18): "Hata çubuğu neyin belirsizliği?" Yeni koşu yok: MD-REP (16 tekrar), MD-FF (12 koşu) ve MD-LIG (18 koşu) yeniden analiz edildi. Analiz planı hesaplardan önce SHA-256 ile donduruldu; plandan sapma yok.
- Deneysel köprü: qPCR ΔΔCt öğretim modeli (Livak ve Schmittgen 2001). Aralık dansı: deneyler tek tek akar, üç hesap yan yana (doğru, teknik tekrarları n sayan, eşleştirmesiz), ıskalayan aralık kırmızı. Başlangıç ayarında 2.000 deneyde kapsama %95,2, %77,1, %99,4; bağımsız numpy benzetimi %95,1, %76,2, %99,3.
- Atölye 1: aynı koşulun tekrarlarında saf SE ile 28 çiftin 22'sinin aralığı çakışmıyor, blok SE ile hiçbiri; SD arası / SE blok W 1,07, S 0,94, kuvvet alanı grupları 0,58 ile 1,59. Blok gezgini: kare şeridi, bloklar ve blok ortalamaları; SE eğrisi birlikte hareket eder. LIE iki tekrar z 0,03 ile 2,27.
- Atölye 2: LIE ΔG bütçesi şelale grafiğiyle; varyans terimlerinin %76 ile %99'u elektrostatik, kovaryans 12 tekrarın 9'unda eksi. Koşu içi ve tekrarlar arası (t = 12,706) aralıkların hiçbiri ölçülmüş aralıkla örtüşmüyor; ikisi de yalnız örnekleme belirsizliğidir.
- Atölye 3: W'nin 35 dörde dört bölmesinde kare düzeyi testlerin 245'te 162'si p < 0,05 (35 bölmenin 35'inde en az biri), tekrar düzeyi permütasyonda 280'de 6, Holm ile 0. Izgara gezgini ve seçili bölmenin 70 ayrımlık permütasyon dağılımı tarayıcıda yeniden hesaplanır. 18 analiz birleşiminin spesifikasyon eğrisi: Δ −5,64 ile +1,69 puan, en küçük p 0,614; önceden yazılmış birincil birleşim MD-REP'in sonucunu verir.
- Bağımsız denetim 37/37. Tarayıcıda yeniden hesaplanan 364 blok SE ve 280 permütasyon p Python ile aynı (yalnız yuvarlama farkı). Tezgâh: dokuz iddia. Defter: belirsizlik kaydı. Dokuz soru, sekiz keşif kartı. Hareketli öğeler durdurulabilir; "hareketi azalt" ayarında kendiliğinden başlamaz. İngilizce tablo 255 çift (`i18n/_work/mderr/`), `reviewed: false`. Kısa adresler: `/tr/l/MD-ERR`, `/en/l/MD-ERR`.

## 0.31.1 (8 Ekim 2026) · DK-U düzeltmesi: bilgi balonları

- DK-U 0.2.1: saçılım, ROC, histogram ve ridge R2 grafiklerinin bilgi balonu öğesi sayfada yoktu; fare grafiğin üstünde her kıpırdadığında `TypeError` veriyor ve balon hiç görünmüyordu. Dört grafiğe balon öğesi eklendi; iki dilde de hata yok, balonlar açılıyor. İngilizce tabloya balon metinlerinin eksik dört parçası eklendi ("skor", "evet", "etkin", "tuzak"; 173 çift, `reviewed: false`). Veri, hesap ve metin değişmedi.

## 0.31.0 (7 Ekim 2026) · Yeni modül MD-LIG: ligand parametreleri ve kökeni

- MD-LIG 0.1.0 (orta düzey, kitapta CH09): "Ligandın parametresi bir karardır." Yeni GROMACS koşuları LIGGRID ve ek LIGGRID2 (tripsin-benzamidin, PDB 3PTB; amber99sb-ildn, GAFF2, TIP3P, 0,15 M NaCl, kristal Ca²⁺): altı ligand modeli (L1 AM1-BCC katyon, L2a acpype Gasteiger, L2b RDKit Gasteiger, L3 AM1-BCC nötr, L4 RESP HF/6-31G*, L5 EspalomaCharge), her biri aynı kristal pozdan ikişer 0,5 ns kompleks ve birer 1 ns su koşusu. İki plan da koşulardan önce SHA-256 ile donduruldu. Sapmalar: bulut ortamı bir kez yeniden başladı (iki koşu denetim noktasından sürdürüldü); planlı `gmx lie` denetimi geçmedi (aşağıda).
- Deneysel köprü: ChEMBL'deki altı benzamidin Ki değeri, ΔG −6,46 ile −6,01 kcal/mol; kristal tuz köprüsü uzaklıkları.
- Atölye 1: acpype çıktıları; eşdeğer amidin azotlarına AM1-BCC'nin farklı yükleri; parmchk2 ceza puanları (ca-ca-ce-nv 237). Sessiz hata: acpype `-c gas -n 1` "charge set to 1" yazdı, toplam 0 (L2a).
- Atölye 2: RESP (PySCF, MK 5778 nokta, a 0,0005, b 0,1; N −0,908) ve Espaloma (N −0,383 / −0,393); ESP RRMS L4 0,011, L1 0,027, L5 0,102. Espaloma paketinin varsayılan çağrısı toplam yükü 0 verdi (P4); çift bağ öbür azota yazılınca yükler yer değiştirdi (P5).
- Atölye 3: altı modelde cepte kalma, Asp189 tuz köprüsü (L2a %17,5 / %18,6, öbürleri %90 üstü), çift dişli köprü, halka-amidin bükümü (komplekste 14 ile 20°, suda 23 ile 47°).
- Atölye 4: LIE (α 0,181, β 0,5 ya da nötr için 0,43): L1 −10,3 / −10,7, L2a −3,1 / −2,8, L2b −9,8 / −9,6, L3 −3,2 / −3,2, L4 −11,6 / −11,7, L5 −9,1 / −9,0 kcal/mol; hiçbir tekrar ölçülmüş aralıkta değil, hüküm yazılmadı. Cα B-faktörü korelasyonu r 0,42 ile 0,67; ligand tek grup B taşıdığı için yalnız ligand / cep oranı karşılaştırıldı.
- Bağımsız denetim: LIGGRID 44/44; LIGGRID2 planlı 64/76 (geçmeyen 12 satırın hepsi `gmx lie`: GROMACS 2023.3 sistemin geri kalanının 1-4 enerjisini Coul-14:MOL-rest olarak etiketliyor ve `gmx lie` bunu topluyor; gerçek-uzay terimleri koordinatlardan doğrudan hesapla doğrulandı), plan dışı ek denetim 12/12. Tarayıcıdaki 90 sayı Python ile aynı. Tezgâh: sekiz iddia. Defter: ligand parametre kökeni kaydı. Sekiz soru, on bir keşif kartı. İngilizce tablo 245 çift (`i18n/_work/mdlig/`), `reviewed: false`. Kısa adresler: `/tr/l/MD-LIG`, `/en/l/MD-LIG`.

## 0.30.0 (6 Ekim 2026) · Yeni modül MD-SOLV: iyonlar ve yardımcı çözgen

- MD-SOLV 0.1.0 (orta düzey, kitapta CH10): "Çözgen de modelin parçası." Yeni GROMACS koşuları SOLVGRID (amber99sb-ildn, TIP3P): beş kutuda genion 0,15 M sayımı; tek üre molekülünde dağıtımdaki urea.itp ile açıları eklenmiş kopya; 4 nm kutuda 0,15, 0,5, 1,0 ve 2,0 M NaCl (birer 2 ns NPT); MD-REP kutusunda 8 M üre içinde alanin dipeptidi, dört 2 ns tekrar; başvuru MD-REP'in 8 su tekrarı. Plan koşulardan önce SHA-256 ile donduruldu; plandan sapma yok.
- Deneysel köprü: doğrusal ekstrapolasyon modeli tarayıcıda (Santoro ve Bolen 1988; Myers, Pace ve Scholtz 1995); ölçülebilir pencere ve 0 M uzatması.
- Atölye 1: "0,15 M" 3, 4, 6, 8 nm küplerde ve MD-REP kutusunda 2, 6, 20, 46, 4 çift. Gerçekleşen molarite 0,152, 0,483, 0,996 mol/L; temas iyon çifti %4,3, %33,7, %54,7. 2,0 M hedefi genion'da durdu ("No more replaceable solvent!", 77 Na⁺ ve 55 Cl⁻ yerleştirildikten sonra); plan gereği yeniden denenmedi.
- Atölye 2: dağıtımdaki urea.itp'de açı terimi yok, grompp uyarısız; tek ürede N-C-N 180°. 8 M hedefi NPT sonrası 9,15 ile 9,38 mol/L; peptit çevresinde R = 1,51 ± 0,61 (dört tekrarda da > 1). αR farkı −2,9 puan, permütasyon p 0,745: önceden yazılmış hüküm "kararsız". Tezgâh: altı iddia. Defter: çözgen ortamı kaydı. Altı soru, sekiz keşif kartı.
- Bağımsız denetim 20 karşılaştırmanın 20'sinde geçti. Tarayıcıdaki 42 sayı Python ile aynı. İngilizce tablo 198 çift (`i18n/_work/mdsolv/`), `reviewed: false`. Kısa adresler: `/tr/l/MD-SOLV`, `/en/l/MD-SOLV`.

## 0.29.0 (6 Ekim 2026) · Yeni modül MD-FF: kuvvet alanı ve model uyumu

- MD-FF 0.1.0 (orta düzey, kitapta CH08): "Kuvvet alanı bir modeldir." Yeni GROMACS koşuları FFGRID: su içinde alanin dipeptidi amber03 + TIP3P, charmm27 + CHARMM TIP3P (CHARMM önerili bağsız ayarlar) ve OPLS-AA + TIP4P ile dörder 2 ns tekrar; başvuru amber99sb-ildn için MD-REP'in 8 su tekrarı. Saf su kutuları (TIP3P, SPC/E, TIP4P) ve üç uyumsuz birleşim (yalnız grompp). Plan koşulardan önce SHA-256 ile donduruldu; sapmalar: gmx msd 0,5 ps karelerle çöktü (-dt 1 ile çalıştı), bulut ortamı bir kez yeniden başladı (iki koşu denetim noktasından sürdürüldü).
- Deneysel köprü: ³J(HN,Hα) ve üç Karplus parametre seti (Vuister ve Bax 1993, Hu ve Bax 1997, Vögeli ve ark. 2007); setler arası fark 0,45 ile 0,52 Hz, aynı setle kuvvet alanları arası 0,63 ile 0,72 Hz.
- Atölye 1: αR payı A99 32,8 ± 11,3, A03 42,8 ± 21,0, C27 44,2 ± 23,5, OPL 31,0 ± 5,7 %; ön kayıtlı hüküm üç karşılaştırmada da "kararsız" (Holm p 0,788). Geçiş/ns (keşif) 1,0 ile 10,4.
- Atölye 2: saf su yoğunluğu 0,986, 0,999, 0,995 g/cm³; öz difüzyon 5,44, 2,46, 3,58 × 10⁻⁵ cm²/s (deney 0,997 ve 2,30). Uyumsuzluk: M1 "Atomtype OT not found" (1), M2 atom sayısı (1), M3 uyarısız geçti (0). Tezgâh: altı iddia. Defter: kuvvet alanı seçim kaydı. Altı soru, sekiz keşif kartı.
- Bağımsız denetim 14 karşılaştırmanın 14'ünde geçti. Tarayıcıdaki 160 sayı Python ile aynı. İngilizce tablo 153 çift (`i18n/_work/mdff/`), `reviewed: false`. Kısa adresler: `/tr/l/MD-FF`, `/en/l/MD-FF`.

## 0.28.0 (5 Ekim 2026) · Yeni modül MD-FAIL: simülasyon başarısız olduğunda

- MD-FAIL 0.1.0 (orta düzey, kitapta CH12): "Koşu durdu mu, yoksa sessizce yanlış mı bitti?" Yeni GROMACS koşuları: MD-MET'in ikinci ubikitin hazırlığı (1UBQ) her seferinde tek bir yerinden bozuldu. Koşu ve analiz planı koşulardan önce SHA-256 ile donduruldu; hiçbir adımda -maxwarn kullanılmadı.
- Deneysel köprü: western blot, "bant yok" belirtisinin dört nedeni ve üç denetim (kurallı öğretim modeli, dört panelli blot çizimi).
- Atölye 1, gürültülü vakalar (gerçek mesajlar ve çıkış kodları): eksik su (grompp 1; 18.934 ile 18.937 atom), 2,0 nm kutu (grompp 1, kesme), His68 HIP net yükü (grompp 1, Ewald uyarısı), SEP65 (pdb2gmx 1), Lys48 NZ'ye 0,05 nm su (grompp 0, mdrun 0. adımda LINCS ve "can not be settled", çıkış 139; minimizasyondan sonra 5 ps, 0 LINCS). Her birinin düzeltmesi 0 ile bitti.
- Atölye 2, sessiz vakalar (200 ps): S1 define = -DPOSRES grompp tarafından durduruldu (basınç denetimi ile mutlak konum kısıtı uyarısı) ve plan gereği yeniden denenmedi; S2 ref_t = 30 uyarısız bitti (32,7 K, çekirdek RMSF 0,08 Å, H-bağı 52,5; doğru koşularda 299,8 ile 300,4 K, 0,39 ile 0,41 Å, 41,3 ile 42,3); S3 çözücüsüz uyarısız bitti, sıcaklık doğru (302,0 K) ama çekirdek RMSD 1,47 Å, Rg 11,38 Å. Tezgâh: altı gerçek günlük parçası. Defter: koşu sağlık kaydı. Altı soru, sekiz keşif kartı.
- Bağımsız denetim 13 karşılaştırmanın 12'sinde önceden yazılmış eşikle geçti; L5 çökme karelerinin MDAnalysis ile ikinci hesabı uygulanamadı (taşmış PDB koordinat alanları). Tarayıcıdaki 40 sayı Python ile aynı. İngilizce tablo 161 çift (`i18n/_work/mdfail/`), `reviewed: false`. Kısa adresler: `/tr/l/MD-FAIL`, `/en/l/MD-FAIL`.

## 0.27.0 (5 Ekim 2026) · Yeni modül MD-INT: temas, solvatasyon, etkileşim

- MD-INT 0.1.0 (orta düzey, kitapta CH15): "Etkileşim bir eşik tanımıdır." Yeni GROMACS koşuları UBQW: MD-MET'in üç ubikitin koşusu son durumlarından 200'er ps sürdürüldü, bütün atomlar 0,5 ps'de bir kaydedildi. Koşu ve analiz planı koşulardan önce SHA-256 ile donduruldu; tek sapma, planda SASA kare sayısının yanlış hesaplanması (91 yerine 181).
- Deneysel köprü: NMR NOE (öğretim modeli; ⟨r⁻⁶⟩ ile ortalama uzaklık).
- Atölye 1: ubikitinde dört H-bağı tanımı; kare başına ortalama koşu 1'de 29,5 ile 73,6. Tuz köprüleri ve tarayıcıda kaydırılan eşik; K27-D52 üç koşuda %100, %100, %95, K11-E34 %91, %85, %15 (4,0 Å).
- Atölye 2: iki temas tanımı ve yumuşak Q (0,90, 0,94, 0,97); kalıntı başına SASA, üç sonda; gömülü kalıntı sayısı eşikle 12 ile 20.
- Atölye 3: su içinde alanin dipeptidinde g(r) ve ilk kabuk (3,0 Å ile 1,61, 4,0 Å ile 4,35 su); su-karbonil H-bağının sürekli ömrü 1 ps okumayla 1,51 ps, 5 ps ile 3,74 ps. Ubikitinde ilk kabuk suyu ile SASA (r 0,86 ile 0,90), su köprüleri ve tuz köprülerinin su aracılı karşılığı. Tezgâh: altı iddia. Defter: etkileşim tanımı kaydı. Altı soru, sekiz keşif kartı.
- Bağımsız denetim 14 karşılaştırmanın 13'ünde önceden yazılmış eşikle geçti; geçmeyen g(r) ilk tepe yüksekliği (%4,9, eşik %3) kutu hizalamasından, hizalanınca 0,001. Tarayıcıdaki 156 sayı Python ile aynı. İngilizce tablo 172 çift (`i18n/_work/mdint/`), `reviewed: false`. Kısa adresler: `/tr/l/MD-INT`, `/en/l/MD-INT`.

## 0.26.0 (5 Ekim 2026) · Yeni modül MD-PCA: durumlar ve kolektif hareketler

- MD-PCA 0.1.0 (orta düzey, kitapta CH16): "Durum bir tanımdır, bileşen bir yöntem sonucudur." Yeni simülasyon yok; veri mdshare ALA2 (3 × 250 ns) ve MD-MET'in üç bağımsız ubikitin koşusu. Analiz planı hesaplardan önce SHA-256 ile donduruldu; sapma yok.
- Deneysel köprü: tek molekül FRET izi (öğretim modeli; iki durumlu Markov süreci, tek eşik ile bantlı iki eşik sayımı).
- Atölye 1: ALA2'de kutu tanımı ile çekirdek kümeleri (r 10° ile 60°). Koşu başına αR ↔ β/PPII geçişi kutu tanımıyla 4704, 4713, 4532; r = 10° çekirdeklerle 1002, 1086, 1061. Koşu 1'de αR payı %32,7 ile %32,8, αR yaşam süresi 35 ile 116 ps. k-ortalamalar k = 3'te β/PPII'yi ikiye bölüyor, αL ancak k = 4'te ayrı küme.
- Atölye 2 ve proteine dönüş: ubikitin Cα PCA (bütün Cα ve çekirdek), 3B PC1 hareketi, varyans payları, kalıntı payı, izdüşüm ve kosinüs içeriği, birleşik PCA, RMSIP. Bütün Cα PC1 payı %29,5, %51,7, %32,8 ve bunun %92,0, %98,9, %70,3'ü kuyruktan; PC1 kosinüs içeriği 0,00, 0,37, 0,53; birleşik PC1 varyansının %85,4'ü koşular arası fark.
- Atölye 3: DCCM iki hizalamayla; halka 7 ile 11 ve kuyruk arasında ortalama korelasyon çekirdek hizalamasında −0,05, −0,04, +0,02, bütün Cα hizalamasında −0,16, −0,24, −0,08. Tezgâh: altı iddia için denetleyici. Defter: durum ve bileşen kaydı. Altı soru, sekiz keşif kartı.
- Bağımsız denetim (gmx covar, gmx anaeig, gmx analyze -cc) 12 karşılaştırmanın 12'sinde aynı; durum atamaları ikinci bir uygulamayla 21'in 21'inde birebir aynı; tarayıcıdaki 25 sayı Python ile aynı. İngilizce tablo 184 çift (`i18n/_work/mdpca/`), `reviewed: false`. Kısa adresler: `/tr/l/MD-PCA`, `/en/l/MD-PCA`.

## 0.25.0 (4 Ekim 2026) · Yeni modül MD-MET: yapısal ölçüt neyi ölçer?

- MD-MET 0.1.0 (orta düzey, kitapta CH14): "Bir sayı, bir yapı değildir: RMSD, Rg ve RMSF neyi görür, neyi görmez?" Yeni GROMACS koşuları UBQ3: aynı hazırlıktan, yalnız başlangıç hız tohumu farklı iki 2 ns 1UBQ koşusu; MD-O RMSF2NS ile birlikte üç bağımsız koşu. Koşu ve analiz planı koşulardan önce SHA-256 ile donduruldu; sapma yok.
- Deneysel köprü: mikroskopide hücre şekli (öğretim modeli; aynı alanlı altı hücrede çevre, dairesellik, en uzun çap).
- Atölye 1: kristale göre RMSD eğrileri ve tıklanabilir kare çifti matrisi, iki kare 3B üst üste. Kristale göre 2,05 ve 2,10 Å olan iki kare birbirine 1,55 Å uzak; bütün Cα RMSD'si 1,90, çekirdek 0,73 Å.
- Atölye 2 ve proteine dönüş: üç koşuda Rg, Rg ile kuyruk RMSD'si, kalıntı başına RMSF (koşular, birleşik, pencere yarıları, hizalama grubu, kristale göre sapma). Kuyruk RMSF'si koşulara göre 1,59, 2,51, 1,51 Å; birleşik 3,51 Å.
- Atölye 3: mdshare ALA2'de iki referanslı RMSD ile φ/ψ durumları; tek eşik αR'yi %99,3 doğrulukla ayırıyor, αL karelerinin %49,2'si β/PPII aralığında. Tezgâh: altı soru için ölçüt seçici. Defter: ölçüt kaydı. Altı soru, sekiz keşif kartı.
- Bağımsız denetim (gmx gyrate, gmx rmsf, gmx rms) 12 karşılaştırmanın 12'sinde en çok 0,004 Å farkla aynı; tarayıcıdaki 37 sayı Python ile aynı. Denetimde ALA2 xtc dosyasının zaman damgasının her 1000 karede sıfırlandığı bulundu (kare seçimi sıraya göre yapıldı). İngilizce tablo 157 çift (`i18n/_work/mdmet/`), `reviewed: false`. Kısa adresler: `/tr/l/MD-MET`, `/en/l/MD-MET`.

## 0.24.0 (4 Ekim 2026) · Yeni modül MD-TRJ: trajektoriyi analize hazırlamak

- MD-TRJ 0.1.0 (orta düzey, kitapta CH13): "Ham dosya ölçüme hazır değildir: PBC, seçim, hizalama ve birim." Yeni simülasyon yok; iki var olan ham trajektori yeniden işlendi: MD-REP REPGRID W1 (su içinde alanin dipeptidi, 2001 kare) ve MD-O RMSF2NS (1UBQ ubikitini, 1001 protein karesi). Analiz planı hesaplardan önce SHA-256 ile donduruldu; sapma yok.
- Deneysel köprü: zaman atlamalı mikroskopide hücre izi (öğretim modeli); tabla kayması hizalamanın, kenar sıçraması nojump'ın karşılığı.
- Atölye 1: peptidin beş işlem zinciri 3B (ham, bütün, sıçramasız, ortalanmış, hizalanmış; kutu ya da moleküle yakın görünüm), dört ölçüt grafiği, kutunun üç -ur gösterimi. Ham dosyada peptit 2001 karenin 554'ünde bölünmüş; bütün zincirde kütle merkezi 66 kez sıçrıyor; sıçramasız zincirde 2 ns'de 45,7 Å yer değiştirme.
- Atölye 2 ve proteine dönüş: ubikitin Cα 3B, RMSD dört kipte (hizalama, grup, seçim, referans), dönme ve kütle merkezi. Hizalamasız 7,42 Å, bütün Cα ile 1,75 Å, çekirdek (1 ile 70) ile çekirdekte 0,75 Å, kuyrukta (71 ile 76) 6,21 Å; 2 ns'de 80,6°'ye kadar dönme.
- Tezgâh: altı gerçek gmx trjconv zinciri ve tahmin; hatalı sıra (hizala, sonra bütünle) peptitte 444 karede bölünmüş molekül bıraktı, ubikitinde GROMACS 896 karede durdu. Defter: işlem kaydı formu. Altı soru, sekiz keşif kartı.
- Bağımsız denetim (gmx distance, gmx rms, gmx traj) 11 karşılaştırmanın 11'inde en çok 0,005 Å farkla aynı; tarayıcıdaki 47 sayı Python ile aynı. İngilizce tablo 151 çift (`i18n/_work/mdtrj/`), `reviewed: false`. Kısa adresler: `/tr/l/MD-TRJ`, `/en/l/MD-TRJ`.

## 0.23.0 (4 Ekim 2026) · Yeni modül MD-Q: biyolojik sorudan ölçülebilir MD çalışmasına

- MD-Q 0.1.0 (temel düzey, kitapta CH01): "Bu veri hangi cümleyi taşır? Sorudan niceliğe, nicelikten iddiaya." Yeni simülasyon yok; gerçek veri mdshare ALA2 (Freie Universität Berlin, CC BY 4.0): alanin dipeptidinin 3 × 250 ns φ/ψ açıları ve 1. koşunun susuz 3B kareleri.
- Deneysel köprü: iddia merdiveni; Western blot öğretim modelinde (p-ERK / toplam ERK, modelde 1,8 kat) beş cümle için destekler, ek kanıt gerekir ya da kurulamaz kararı.
- Atölye: φ/ψ yoğunluk haritası; bölge tanımı (MD-U, dar ψ < 30, geniş ψ < 70, sürükleyerek okurun dikdörtgeni), koşu ve pencere seçimi, durum şeridi, adım, kare ve koşu sayımları, 1. koşudan 400 karelik hizalı 3B pencere (önceden yazılmış seçim kuralı). Örnek: 1. koşuda αR payı ψ sınırı 30, 50, 70 için %30,6, %32,7, %33,6; ilk 25 ns %40,4, son 100 ns %31,3.
- Tezgâh: altı halkalı kanıt zinciri (soru, model, üretim, analiz, belirsizlik, dış veri) ve bu veri kümesindeki durumları; altı cümle için "Denetle" ve "Daralt". Defter: soru, model, veri, nicelik, iddia tablosu. Proteine dönüş: ubikitin 7 ile 11 halkası. Altı soru, yedi keşif kartı.
- Paylar tarayıcıda 10 ps alt örnekten hesaplanır; Python ile tam 1 ps veride yeniden hesaplandı (fark 250 ns'de 0,1, 25 ns bloklarda 0,7, 1 ns pencerelerde 4,6 puana kadar; sayfada yazılı). İngilizce tablo 155 çift (`i18n/_work/mdq/`: `build_MD-Q_en.py`, `tr_*.py`, `body_en.html`), `reviewed: false`. Kısa adresler: `/tr/l/MD-Q`, `/en/l/MD-Q`.
- Denetim: kimlik kuralına tek harfli Q eklendi (`tools/check.mjs`, README).

## 0.22.0 (4 Ekim 2026) · Yeni modül MD-REP: karşılaştırma, tekrar ve kontrol tasarımı

- MD-REP 0.1.0 (temel düzey, kitapta CH06): "Fark gerçek mi? Karşılaştırmayı simülasyondan önce tasarlamak." Deneysel köprü: Western blotta teknik ve biyolojik tekrar (öğretim modeli, aynı koşulda 200 deney). Atölye: çift kuyulu oyuncakla 100'er sanal çalışma; kareyi tekrar saymak, A ile A yanlış pozitif oranı, ölçütü sonradan seçmek ve güç; defter tablosu ve güç grafiği.
- Tezgâh: yeni GROMACS ızgarası REPGRID (su ve 0,15 M NaCl, 8'er bağımsız tekrar × 2 ns; plan koşulardan önce SHA-256 ile donduruldu). Tekrar noktaları, permütasyon dağılımı, Welch aralıkları ve ±5 puan bandı, A ile A bölmeleri, ilk k tekrar, ikincil ölçütler, tuzlu kutu 3B, sağlık tablosu. Ön kayıtlı hüküm "kararsız" (fark +0,06 puan, %95 aralık −11,19 ile 11,30; ±5 puan için grup başına yaklaşık 69 tekrar tahmini).
- Defter: karşılaştırma planı formu ve tekrar sayısı tahmini. Proteine dönüş: ubikitin yabanıl tür ile mutant için plan tablosu. Altı soru, sekiz keşif kartı.
- Birincil sonuç bağımsız bir betikle yeniden üretildi; bir sapma (denetim noktasından sürdürme) künye notunda. İngilizce tablo 222 çift (`i18n/_work/build_MD-REP_en.py` ve `tr_*.py`), `reviewed: false`. Kısa adresler: `/tr/l/MD-REP`, `/en/l/MD-REP`.

## 0.21.0 (3 Ekim 2026) · Yeni modül MD-CON: soruyu bozmadan simülasyon kontrolü

- MD-CON 0.1.0 (temel düzey, kitapta CH05): "Termostat ve barostat neyi sabit tutar, neyi bozar, ve seçiminizi nasıl kaydedersiniz?" Yeni GROMACS ızgarası (8 termostat koşusu × 4 ns, 6 barostat koşusu × 2 ns, tek tohum; plan sonuçlardan önce SHA-256 ile donduruldu). Deneysel köprü: 160 kopyalı sıcaklık sıçraması canlı oynar, dört termostatın %63 yaklaşma süresi τ ile karşılaştırılır. Atölye 1: anlık sıcaklığın dağılımı ve SD / kuram oranı (V-rescale, Nosé-Hoover, Langevin 0,98 ile 1,00; Berendsen 0,71 ve 0,78), sıcaklık otokorelasyon eğrileri. Atölye 2: iki gerçek kutu yan yana 3B (su rengi 1 ps yer değiştirme), su difüzyonu, ψ geçiş hızı, αR payı, korunan enerji kayması, MSD eğrileri, termostat başına Ramachandran haritası (Langevin su difüzyonu 2,22 ve 4,70, öbürleri 5,34 ile 5,45 ×10⁻⁵ cm²/s). Atölye 3: hacim dağılımı, hacim otokorelasyonu, Berendsen ile Parrinello-Rahman kutularının büyütülmüş hacim değişimi (büyütme ekranda yazılı; grafik ve sayılar büyütmesiz).
- Ara durak "Neden üretim koşusunda Berendsen kullanılmaz?": mekanizma, sayfanın verisinden kanıt, dalgalanmadan sıkıştırılabilirlik tablosu (post hoc; Berendsen 4,4 ile 20 kat küçük), neyi bozmadığı, ne zaman kabul edilebilir, GROMACS 2023.3 uyarılarının çevirisi; kaynaklar Berendsen 1984, Bussi 2007, Bernetti ve Bussi 2020.
- Tezgâh: periyodik zincir canlı (halka görünümü, hız çarpanı λ, hız dağılımı ile Maxwell-Boltzmann), dengeli başlangıç, Deftere yazınca aynı ayarın beş tohumla saçılımı; kartlar tohum aralıklarına göre karar verir. Proteine dönüş: neden kaydı formu (ızgarada karşılığı olmayan ayarlar için "Bu senaryo hesaplanmadı"). Altı soru, on keşif kartı.
- Sonuçlar bağımsız bir betikle ham GROMACS çıktılarından yeniden hesaplandı (0 uyuşmazlık); yedi sapma kaydı künye notunda. Sayfa verisi `<script type="application/json">` içinde (çeviri aracının büyük dizelerde yavaşlamaması için). İngilizce tablo 274 çift (`i18n/_work/build_MD-CON_en.py` ve `tr_*.py`), `reviewed: false`. Kısa adresler: `/tr/l/MD-CON`, `/en/l/MD-CON`.

## 0.20.0 (1 Ekim 2026) · Yeni modül MD-ENS: topluluk, dağılım ve ortalama

- MD-ENS 0.2.0 (temel düzey, kitapta CH03): "Bir MD koşusu neyi temsil eder: tek yolu mu, yoksa topluluğu mu?" İlk yayın sürümüdür; 0.1.0 yalnız prototipti. Deneysel köprü: beş koşunun ψ açısı logaritmik zamanla kendiliğinden oynar; solda anlık beş molekül (topluluk), sağda koşu 1'in kümülatif zaman ortalaması. Atölye: oynatıcı (gerçek 3B kareler fareyle döner, φ-ψ düzleminde yer ve biriken yoğunluk, durum çubuğu, sıcaklık ve basınç, hız ve zaman kaydırıcısı) ve istatistik görünümü (ψ, φ, sıcaklık, basınç; kümülatif ortalama, dağılım, kuramsal çan eğrisi). Bulgular: ψ ortalaması 109,8° iki yığılmanın (αR ve β) arasına düşer; 10° kutusunda zamanın %0,75'i, en kalabalık kutuda %17,9'u; sıcaklık SD 8,00 K, kanonik beklenti 7,62 K; basınç ±560 bar dalgalanır, koşu ortalamaları −13,0 ile +19,9 bar; αL durumuna %0,5 üzerinde uğrayan koşu 5 koşunun 2'si.
- Tezgâh: çift kuyulu Langevin parçacığı canlı akar (θ kaydırıcısı koşu sürerken değiştirilebilir, hız 1× ile 10.000×, tek yol ya da tek yol artı 80 parçacıklı topluluk, tohum, başlangıç kuyusu, otomatik durma adımı 10⁴, 10⁵, 10⁶). Zaman ortalaması, topluluk ortalaması ve Boltzmann ortalaması aynı grafikte; histogram ve TV mesafesi canlı. Defter: koşular (en az 10³ adım) TV mesafesi ile adım sayısı grafiğine ve tabloya yazılır. Proteine dönüş: beş koşunun tablosu. Altı soru, sekiz keşif kartı.
- Yeni GROMACS koşusu yoktur: veri MD-U'nun pilotudur (5 × 10 ns). Tarayıcı sayıları Python ve Node ile yeniden hesaplanan değerlerle birebir sınandı (oynatıcı ve canlı benzetim). Hareket azaltma ayarında otomatik oynatma kapalıdır. İngilizce tablo 166 çift (`i18n/_work/build_MD-ENS_en.py`, `mdens_en_a.py` HTML, `mdens_en_b.py` betik). Kısa adresler: `/tr/l/MD-ENS`, `/en/l/MD-ENS`.
- Bilinen not: DK-U sayfasında bazı `.tip` kutuları eksik olduğu için fare üzerine gelince hata oluşabilir; sonraki DK-U sürümünde düzeltilecek.

## 0.19.0 (1 Ekim 2026) · DK-O 0.3.0: aynı anahtar, farklı kilit (çapraz docking)

- DK-O 0.3.0: iki yeni bölüm. Tezgâh: benzamidin sığır tripsininin beş kristalindeki cebe yerleştirildi (3PTB, 2PTN, 1TNH, 2PTC, 1TGN; 100 Vina koşusu, DKOCROSS); yapı seçilir, tohum ve poz sırası gezilir, yandan ve üstten kesit çizilir. Üç olgun yapıda ilk poz 20 tohumun hepsinde doğru; tripsinojen 1TGN'de hiçbirinde değil, doğru poz 2. ya da 3. sırada ve skor farkı çok küçük (sıralama sorunu). Defter: dört hizalama ve puanlama ölçüsü ve kullanıcının koyduğu eşik; hepsini doğru sınıflayan aralık geniştir, yani veri eşiği belirlemez.
- Üç yeni soru (on soru), üç yeni keşif kartı (sekiz keşif), hazırlık günlüğü satırı güncellendi. Sınırlar sayfada açık: bir ligand, bir cep, dört ek yapı; tohumlar bağımsız kanıt değil; 1TGN nedeni sınanmadı.
- İngilizce tablo 150 çift (`i18n/_work/build_DK-O_030.py`, `dko_en_a.py`, `dko_en_b.py`, `dko_en_c.txt`). NOTICE: 2PTN, 1TNH, 2PTC ve 1TGN eklendi.

## 0.18.0 (1 Ekim 2026) · DK-U yeniden yazımı: skor neyi sıralar?

- DK-U 0.2.0 yayında (uzman düzey, CH18 ve CH19); eski dört konulu 0.1.1 yerine tek soru: "Skor neyi sıralar: afinite mi, yoksa yalnız ayırma mı?" Deneysel köprü: tek doz ile doz-yanıt öğretim modeli (dört örnek bileşik, Ki 3-3000 nM). Atölye: 142 tripsin bileşiğinin docking skoru (beş tohumun ortancası) ile ölçülen pKi'si; ağır atom, S1 ve net yük renklendirmesi, yayın süzgeci, nokta üstü bilgi balonu; Pearson, Spearman ve ağır atoma göre kısmi korelasyon (bootstrap %95 aralık); kartlar s1c1 (skor farkı ile tohum gürültüsü) ve s1c2 (boyut karıştırıcısı). Tezgâh: zayıf tripsin, D2 ve eşleştirilmiş tuzaklara karşı ROC ve AUC; yalnız ağır atom, logP ve net yük sıfır modellerinin ROC eğrileri bindirilir; etkin ve tuzak ağır atom dağılımı; kartlar s1c3 (D2 ile eşleştirilmiş fark) ve s1c4 (skor boyut sıralamasını geçiyor mu). Defter: beş Vina terimi ve ağır atom sayısıyla ridge (lambda 1); rastgele ve yayına göre gruplu bölmenin çapraz doğrulama R2'si sıfır çizgili çubuk grafikte; kart s1c5 (sızıntı). Proteine dönüş: skor ayırmada iş görür (eşleştirilmiş AUC 0,79), afinite sıralamasında zayıf (Spearman -0,38; boyut sabitken -0,12); RBFE, FEP, MM-GBSA hesaplanmadı. Yedi soru, beş keşif kartı. Tarayıcı istatistikleri dondurulmuş Python analiziyle birebir.
- Veri: 24 Eylül taraması (198 bileşik), 84 eşleştirilmiş tuzak (1 tohum) ve 20 bileşiklik tohum örneği (3 tohum), Vina 1.2.7. Sayfa DK-T/DK-O ev stiline (site paleti, kart yapısı, ilerleme) taşındı. İngilizce tablo 169 çift (`i18n/DK-U.en.json`, makine çevirisi, insan incelemesi bekliyor). Eski 0.1.1 prototip dosyaları değiştirilmedi.

## 0.17.0 (30 Eylül 2026) · DK-O yeniden yazımı: sonuç kilidin hangi ayrıntısına bağlı?

- DK-O 0.2.0 yayında (orta düzey, CH07 ve CH09); eski dört laboratuvarlı 0.1.1 yerine tek laboratuvar. Deneysel köprü: matriks etkisi ve spike-recovery; redocking tampondaki standarttır. Atölye: 3PTB cebinin yatay yüzey kesiti; sekiz hazırlık kararı (sular, Asp189, His57, Gln192'nin doluluğu 0 olan atomları, Ile16 ucu; ligand protonasyonu, kristal ligandın dosyada unutulması, Asp189 yan zincirinin kesilmesi), her birleşimde gerçek Vina koşularından kristal poz skoru ve beş tohumlu redocking (198 hazırlık, 1.080 koşu; DKOPREP, DKOPREP2). Önceki pozdan yenisine geçiş, atom katkısı halkaları, karar etkisi grafiği, "Vina bu atomu nasıl görüyor?" tablosu. Bulgular: redocking 360/360 (olağan kararlar); sular skoru 0,43'e kadar kaydırır, pozu değil; Asp189, His57, Ile16 ve ligand yükü kristal skoru 0,000 değiştirir; Asp189 yan zinciri kesilince redocking yine 180/180; kristal ligand dosyada unutulunca 0/180. Proteine dönüş: hazırlık günlüğü; çapraz docking hesaplanmadı (DKOCROSS protokolü donduruldu). Yedi soru, beş keşif kartı.
- İngilizce tablo 92 çift (`i18n/_work/build_DK-O_en.py`, `dko_en_a.py` HTML, `dko_en_b.py` betik).

## 0.16.0 (30 Eylül 2026) · DK-T yeniden yazımı: bir pozu bulmak ve doğrulamak

- DK-T 0.2.0 yayında (temel düzey, CH02 sonrası); eski 2B oyuncak modelli 0.1.1 yerine gerçek tripsin cebiyle (3PTB) tek laboratuvar: "Doğru pozu nasıl buluruz, bulduğumuzu nasıl biliriz?" Deneysel köprü: pozitif kontrol olarak redocking; ChEMBL'deki altı K<sub>i</sub> (18,4-39 µM, ΔG −6,46 ile −6,02 kcal/mol; iki 31 nM kaydı ayrı işaretli; CC BY-SA 3.0 notu). Atölye: cebin yatay yüzey kesiti (yandan: iki duvar; üstten: halka yüzü), benzamidin sürüklenir, Q ve E ile döndürülür; Vina skoru tarayıcıda üç boyutta hesaplanır (Vina 1.2.7 ile 300 pozda karşılaştırıldı: kristal −5,809'a karşı −5,806), kesilmeyen skor ölçeği ve beş terim; 0,5 Å'dan derin çakışmalar kırmızı, hidrojen bağları mavi; "Yerel minimuma indir" (6 serbestlik derecesi); tek bir C-C çifti için Vina ve AMBER Lennard-Jones itmesi. Tezgâh: Monte Carlo ve yerel iyileştirme; arama haritası (arama kutusu, başlangıçlar, denenen pozlar, kabul edilen yol; sonuç doğru, cepte ama ters ya da başka yerde). Defter: bu projenin yeni 100 Vina koşusu (DKTGRID; bütün protein kutusu, exhaustiveness 1-16 × 20 tohum; ilk pozda 2 Å başarı 5, 8, 13, 20, 20 / 20), okurun başarı ölçütü ve en ucuz ayar; başarısızlıkların çoğu cepte ama ters. Proteine dönüş: redocking neyi kanıtlar, neyi kanıtlamaz (çapraz docking hesaplanmadı). Yedi soru, beş keşif kartı.
- İngilizce tablo 134 çift (`i18n/_work/build_DK-T_en.py`, `dkt_en_a.py` HTML, `dkt_en_b.py` betik). NOTICE: 3PTB ve ChEMBL satırlarına DK-T eklendi.

## 0.15.0 (29 Eylül 2026) · MD-U yeniden yazımı: örnekleme ve belirsizlik

- MD-U 0.2.0 yayında (uzman düzey, CH17); eski altı laboratuvarlı 0.1.0 yerine tek laboratuvar: "αR payı kaç, ne kadar eminiz?" Deneysel köprü: sözde tekrar (aynı lizattan üç kuyu, time-lapse kareleri; Lazic 2010) ve tarayıcıda bir hücre hızı modeli (Ornstein-Uhlenbeck, 20 deney): "her kare bağımsız" %95 çubuğunun gerçek ortalamayı kaç deneyde yakaladığı. Atölye: gerçek karelerden 3B alanin dipeptidi, RMSD, φ, ψ ve durum şeridi, Ramachandran haritası, αR/β sınırı kaydırıcısı (önceden yazılmış 30/50/70 işaretli). Tezgâh: gösterge barkodu, otokorelasyon ve blok ortalaması tarayıcıda, etkin örnek sayısı, saf ve düzeltilmiş hata; az ziyaret edilen αL için "hata çubuğu kurulamaz". Defter: beş koşu, pencere boyu ve koşu seçimi, t ile %95 aralık, deneme defteri; 5 × 2 ns ile tek 10 ns koşuların karşılaştırması. Proteine dönüş: bu projenin sonuçlarının dayandığı tekrar sayısı; üretim (5 × 200 ns) hesaplanmadı. Altı soru, dört keşif kartı.
- Tarayıcı istatistikleri projenin Python analiziyle birebir (297 denetim). İngilizce tablo 136 çift (`i18n/_work/build_MD-U_en.py`, `mdu_en_a.py`, `mdu_en_b.py`). Kısa adresler `/tr/l/MD-U`, `/en/l/MD-U` artık sayfaya gider.

## 0.14.0 (29 Eylül 2026) · Yeni modül MD-DT: proteinde zaman adımı

- MD-DT 0.1.0 (orta düzey, kitapta CH02): "Adım ne kadar uzun olabilir? Kısıtlar, kütle ve hız". Deneysel köprü: ubikitinin 1.237 bağının kuvvet alanından hesaplanan çubuk spektrumu, IR'daki amid A ve amid I bantlarıyla; "bağların saati": dört gerçek bağ (Ser20 O-H, Ile3 N-H, Ala46 C-H, Leu43 C=O) ağır çekimde, her birinde Δt aralıklı örnekleme şeridi (periyot başına 2'den az örnekte sahte, yavaş dalga) ve isteğe bağlı stroboskop. Atölye: 3B ubikitin, 5 · Δt sınırını aşan serbest bağlar kırmızı; kısıt düzeni (yok, H bağları, tüm bağlar) ve HMR; periyot dağılımı, vurgulama, en hızlı serbest bağa kamera uçuşu, kalıntı türüne göre grafik. Tezgâh: tek Ser O-H bağının hız-Verlet ile adım adım ilerletilmesi, faz uzayı, kararlılık haritası (T/10, T/5, T/π), tek Verlet adımının dört işi. Defter: bu projenin 24 gerçek NVE koşusu (DTGRID), okurun seçtiği ısınma sınırı, hız-ısınma saçılımı, enerji ve sıcaklık eğrileri, çöken koşuların son kareleri. Proteine dönüş: önceki C1, S2a, S2b koşuları ve S2b'nin gerçek grompp çıktısı. Altı soru, dört keşif kartı.
- İngilizce tablo 191 çift (`i18n/_work/build_MD-DT_en.py`, `mddt_en_a.py` HTML, `mddt_en_b.py` betik ve koşu adları; gömülü veri satırı tabloya bütün olarak değil, yalnız koşu adlarıyla girer). Kısa adresler: `/tr/l/MD-DT`, `/en/l/MD-DT`.

## 0.13.0 (29 Eylül 2026) · Yeni modül MD-PDB: yapı dosyası

- MD-PDB 0.1.0 (orta düzey, kitapta CH07): "Yapı dosyası neyi saklar? Doluluk, B faktörü ve kristal suları". Deneysel köprü: uzun pozlama canlandırması; ubikitin atomları 1UBQ'daki B değerleri kadar titreşir, doluluklar kadar sık görünür (bütün protein Cα ile, C ucu bütün ağır atomlarla). Atölye: 1UBQ'nun 602 ağır atomu ve 58 suyu, B ya da doluluğa göre renkli 3B görünüm; seçilen kalıntının gerçek Cα PDB satırı, alanlarına dokununca açıklama; gerçek ölçekte yayılma bulutu; kalıntı başına B grafiği, kristal temasları ve düşük doluluk işaretli. Tezgâh: tek karbonun yoğunluk profili dört adımda (hareketsiz atom, B, doluluk, kontur) ve 70-76 kalıntılarının model yoğunluk haritası (doluluk, B, kontur düzeyi; görünmeyen atomlar içi boş). Defter: 58 kristal suyu (B, polar protein komşusu, doluluk, kristal komşusu), kendi ölçütüyle tutulan sular 3B görünümde ve tabloda. Proteine dönüş: pdb2gmx'in doluluk uyarısı (28 ve 57 atom), simülasyona giren tam dolu kopyalar; kristal B ile bu projenin yeni 2 ns koşusundan hesaplanan B'nin kalıntı kalıntı karşılaştırması (r 0,87; 1-72'de 0,59; iki yarı 0,86). Altı soru, dört keşif kartı.
- İngilizce tablo 151 çift (`i18n/_work/build_MD-PDB_en.py`, `mdpdb_en_a.py` HTML, `mdpdb_en_b.py` betik). Kısa adresler: `/tr/l/MD-PDB`, `/en/l/MD-PDB`.
- MD-O 0.2.1: üst not ve sıradaki adımlar MD-PDB'yi gösterir; modül hedeflerinden "yapı dosyası (sonraki laboratuvar)" satırı kaldırıldı.

## 0.12.0 (28 Eylül 2026) · MD-O yeniden yazımı, laboratuvar 1: protonasyon ve yük

- MD-O 0.2.0 yayında (orta düzey, CH07); eski 0.1.0 taslağının yerini keşif kalıbıyla yazılan ilk laboratuvar alır. Deneysel köprü: tampon ve Henderson-Hasselbalch, yedi grubun protonlu kesri. Atölye: bu projenin `protein.gro`'sunda döndürülebilir 3B ubikitin, 26 iyonlaşabilen grup pH ile yanıp söner; titrasyon canlandırması ve net yük eğrisi; model pKa ile ubikitinde ölçülen pKa karşılaştırması (pI 7,27 ve 7,74-7,75). Tezgâh: pdb2gmx'in His68 kararı; kural dört adımda (iki azot, deneme hidrojenleri, uzaklık küresi ve açı konisi, kural), ardından ölçüt haritası (kabul penceresi), karar akış şeması ve 96 gerçek pdb2gmx çalıştırması. Proteine dönüş: bu projenin pdb2gmx günlüğü ve kararlar. Altı soru, dört keşif kartı.
- İngilizce tablo 130 çift (`i18n/_work/build_MD-O_02_en.py`, `mdo2_en_a.py`, `mdo2_en_b.py`). Sayfa adresi `md/md-o/`; `/tr/l/MD-O` ve `/en/l/MD-O` artık sayfaya gider. Yapı dosyası laboratuvarı sonraki sürümde.

## 0.11.0 (28 Eylül 2026) · Yeni modül MD-EQ: minimizasyon ve dengeleme

- MD-EQ 0.1.0 (orta düzey, kitapta CH11): "Çakışan atomlardan dengeye". Deneysel köprü: küvetin ısıl dengesi, ITC/DSC taban çizgisi; iki TIP3P oksijeni arasında LJ enerjisi ve kuvveti, bu projenin başlangıç F<sub>max</sub>'ı ve emtol işaretli. Atölye: üç boyutlu, döndürülebilir periyodik kutuda 125 katı TIP3P suyu; kutuya 2 ya da 4 su sıkıştırılır; minimizasyonsuz dinamik ilk adımda çöker ("can not be settled"), GROMACS en dik iniş kuralıyla minimize edilince 10 ps sorunsuz koşar; iz çizgileri ve ortalama uzaklaşma. Tezgâh: V-rescale, Berendsen ya da termostatsız, τ<sub>T</sub> ve başlangıç sıcaklığı; "Üretimde neden Berendsen kullanılmaz?" sınaması: iki termostat yan yana 10 ps, anlık sıcaklık dağılımı doğru kanonik dağılımla ve dalgalanmadan ısı sığası. Defter: bu projenin S0 NVT, NPT ve kısıtsız koşularının sıcaklık, basınç ve yoğunluk serileri. Proteine dönüş: gerçek ubikitin kutusunda beş çakışma yeri, minimizasyondan önce ve sonra (solvated.gro, em.gro) ve minimizasyonsuz S1'in çökme görüntüleri (step0b, step0c, step1c) ile LINCS tablosu; S0, S3, S4 minimizasyon eğrileri; .mdp ayarları. Altı soru, beş keşif kartı.
- İngilizce tablo 207 çifte çıktı (`i18n/_work/build_MD-EQ_en.py`, `mdeq_en_a.py` HTML, `mdeq_en_b.py` betik). Kısa adresler: `/tr/l/MD-EQ`, `/en/l/MD-EQ`. MD-O (CH07, yapı ve protonasyon) planlanan durumda kalır.

## 0.10.0 (28 Eylül 2026) · MD-PBC laboratuvar 2: kutu boyu

- MD-PBC 0.6.0: Laboratuvar 2 "Kutu ne kadar büyük olmalı?" aynı sayfaya eklendi; ilerleme iki laboratuvarı birlikte sayar (9 kart). Deneysel köprü: tek proteinli kutunun derişimi (g/L log cetvelinde NMR örneği, bu projenin iki kutusu ve E. coli sitoplazması), FRAP, DLS ve PFG-NMR ile ölçülen difüzyon. Atölye: `editconf -d` ve kutu biçimi; hacim, derişim, su ve atom tahmini, maliyet; dönen şematik ubikitin, kopyaları ve 1,0 nm kesme kuşağı. Tezgâh: periyodik kutuda Stokes akışı sayfada hesaplanır; suyun geri akışı ve proteinin hareketliliği, sonsuz sıvıyla karşılaştırma. Defter: küp kutuda 5-30 nm, TIP3P ya da gerçek su; difüzyon 1/L'ye karşı ve 1/L = 0'a uzatma. Proteine dönüş: bu projenin S0 ve S3 kutularında ölçülen en kısa kopya uzaklıkları; difüzyon bu koşularda ölçülmedi. Altı soru.
- İngilizce tablo 315 çifte çıktı (`i18n/_work/mdpbc_en_h.py` HTML, `mdpbc_en_i.py` betik). Yeni laboratuvarın çapası `#kutu`; eski `#lab2` ve `#lab3` çapaları MD-CUT ve MD-ELEC'e yönlenmeye devam eder.

## 0.9.0 (28 Eylül 2026) · MD-PBC üç modüle bölündü

- MD-PBC sayfası çok uzadığı için (üç laboratuvar, 12 kart, 30'dan çok tuval) üç modüle ayrıldı; hepsi temel düzey, kitapta CH04. MD-PBC 0.5.0: Laboratuvar 1 "Kenarsız kutu" (6 kart; kutu boyu laboratuvarı buraya eklenecek). Yeni MD-CUT 0.1.0: "En yakın kopya ve kesme" (eski Laboratuvar 2, 3 kart). Yeni MD-ELEC 0.1.0: "Tuz, perdeleme ve Ewald" (eski Laboratuvar 3, 3 kart). İçerik ve sayılar değişmedi.
- Kısa adresler: `/tr/l/MD-CUT`, `/tr/l/MD-ELEC` (ve `/en/l/...`); `/tr/l/MD-PBC` aynı kaldı. Üç sayfada ortak dizi gezinmesi ve sayfa sonunda sıradaki modül bağlantısı var. Eski çapalar `md-pbc/#lab2` ve `md-pbc/#lab3` yeni sayfalara yönlenir. Defterler tarayıcıda aynı anahtarlarla saklandığı için okurun eski ölçümleri kaybolmaz.
- İngilizce tablolar modül başına: `i18n/MD-PBC.en.json` (206 çift), `MD-CUT.en.json` (204), `MD-ELEC.en.json` (228); üretim `i18n/_work/build_split_en.py`.

## 0.8.0 (28 Eylül 2026) · MD-PBC laboratuvar 3

- MD-PBC 0.4.0: Laboratuvar 3 "Tuz ve Ewald" aynı sayfaya eklendi; ilerleme üç laboratuvarı birlikte sayar (12 kart). Deneysel köprü üç bölüm: iyon bulutu ve Debye uzunluğu (iyonik şiddet kaydırıcısı, çizim 25 °C için; sıcaklık karşılaştırması 4, 25 ve 37 °C'de aynı tuzun Debye uzunluğunu gösterir), DNA çift sarmalının tuzla kararlılığı (canlı açılıp kapanan baz çiftleri, T_m bağıntısı), proteinin tuzla çözünmesi ve fazla tuzla çökmesi (36 molekülün periyodik kutuda kümelenmesi; NaCl ve amonyum sülfat). Atölye: iki boyutlu iyon örgüsünde kabuk kabuk Coulomb toplamı (kare ve daire kabuk, Madelung sabitiyle karşılaştırma). Tezgâh: Ewald toplamının altı adımlı animasyonu ve β kaydırıcısı (yakın kısım, uzak kısım, öz etkileşim; toplam değişmez). Defter: kesme mesafesine karşı hata (Coulomb düz kesme, Ewald, r⁻⁶ düz kesme). Proteine dönüş: bu projenin PME ayarları ve enerji terimleri. Altı soru.
- İngilizce tablo 610 çifte çıktı (`i18n/_work/mdpbc_en_e.py` HTML, `mdpbc_en_f.py` betik); "Debye-Hückel" özel adı ve GROMACS terimleri keep listesinde.

## 0.7.1 (27 Eylül 2026) · MD tanıtım metni

- MD sayfasının özeti, "Hesaplar nasıl yapılır?" kutusu ve bütün sayfaların alt notu güncellendi (TR ve EN): eski metin tarayıcıda hiç hesap yapılmadığını ve verilerin yalnız yeniden oynatıldığını söylüyordu; MD-T ve MD-PBC keşif laboratuvarlarında küçük öğretim simülasyonları tarayıcıda canlı hesaplanır, proje verisi önceden koşturulmuş gerçek simülasyonlardan gelir.
- `docs/ARCHITECTURE.md` 5. kısma keşif laboratuvarları notu eklendi.

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
