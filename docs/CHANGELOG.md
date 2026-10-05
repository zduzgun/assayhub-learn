# Sürüm notları

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
