# AssayHub Learn

[English](README.md) | **Türkçe**

AssayHub Learn, moleküler dinamik (MD) ve moleküler docking üzerine iki dilli (Türkçe ve İngilizce) etkileşimli eğitim modüllerinden oluşur. Modüller tarayıcıda açılan statik web sayfalarıdır. Depo sahibinin hazırladığı Türkçe MD kitabına, *Biyomoleküllerin Moleküler Dinamik Simülasyonu*'na (hazırlık aşamasında, henüz yayımlanmadı) eşlik ederler: her modül bir kitap bölümüne bağlıdır ve kitaptaki karekodlar sitedeki kalıcı kısa adreslere gider. AssayHub Learn açık kaynaktır: kod Apache-2.0, özgün eğitim içeriği CC BY 4.0 lisanslıdır (bkz. [Lisans ve kullanım koşulları](#lisans-ve-kullanım-koşulları)).

**Durum: pilot önizleme.** 27 modülün hepsi pilot sürümdür. Bağımsız bilimsel ya da hedef okur incelemesi henüz yapılmadı. Site bilerek arama motorlarına kapalıdır (`robots.txt` ve `X-Robots-Tag: noindex` başlığı). Yayımlanmış bir sürüm (release) henüz yok; bkz. [Sürümler](#sürümler).

- Canlı önizleme: https://learn.assayhub.app (Türkçe `/tr/`, İngilizce `/en/`)
- Kitap bölümleri haritası: `/tr/book/` ve `/en/book/`
- Sözlük (90 terim): `/tr/glossary/` ve `/en/glossary/`

## Kimler için

- MD ve docking sonuçlarını kullanan ya da okuyan, ama simülasyon uzmanı olmayan yaşam bilimi öğrencileri ve araştırmacılar (örneğin moleküler biyoloji, biyokimya, farmakoloji).
- Biyomoleküler simülasyon dersinde çözümlü ve incelenebilir örnek arayan öğretim üyeleri.
- Hesaplamalı kimya için küçük ve bağımlılıksız eğitim araçlarıyla ilgilenen geliştiriciler.

## Ne için

Simülasyon ve docking çıktısı kolay üretilir, kolay da aşırı yorumlanır. Modüller bu sonuçların nasıl okunacağını öğretir: bir sayı neyi ölçer, hangi karara bağlıdır (kutu boyu, kesme mesafesi, termostat, kuvvet alanı, protonasyon, analiz penceresi, hata tahmini) ve veri hangi iddiayı taşıyabilir? Birçok modül bir simülasyon fikrini tanıdık bir laboratuvar durumuna bağlar (Western blot, qPCR, ELISA, FRET, NMR NOE, mikroskopi); okur, zaten sahip olduğu yargıyı burada da kullanabilir.

## Neler incelenebilir

Modüller uygulamaya ve düzeye göre gruplanır ve kitabın bölüm sırasını izler. Konular:

- Temeller: enerji ve kuvvet, zaman adımı ve integrasyon, topluluk ve dağılım, periyodik sınır, kesme mesafesi, elektrostatik ve Ewald toplamı, termostat ve barostat, tekrar ve kontrol tasarımı, biyolojik sorudan ölçülebilir bir MD çalışmasına geçiş.
- Sistem kurmak ve koşturmak: bir proteini hazırlamak (ubikitin, PDB 1UBQ), yapı dosyası, kuvvet alanı, ligand parametreleri, çözücü ve iyonlar, minimizasyon ve dengeleme, başarısız koşuları teşhis etmek.
- Analiz ve çıkarım: trajektoriyi hazırlamak, yapısal ölçütler (RMSD, Rg, RMSF), durumlar ve temel bileşenler, etkileşimler (hidrojen bağı, tuz köprüsü, temas, SASA), örnekleme ve belirsizlik, hata çubuğu ve dürüst karşılaştırma, yeniden üretilebilirlik ve standart MD'nin yetmediği durumlar (AWH ile geliştirilmiş örnekleme).
- Docking: pozitif kontrol olarak redocking, Vina skorunun terimleri, birkaç tripsin yapısında çapraz docking ve bir docking skorunun neyi sıralayıp neyi sıralayamadığı.

### Modüller

Aşağıdaki tablo [`modules.json`](modules.json) dosyasından üretildi. Modül kimlikleri, başlıkları, sürümleri ve durumları için tek doğruluk kaynağı bu dosyadır. Kimlikler kalıcıdır; içerik sürümlenir.

**Moleküler dinamik, temel düzey** (8)

| Kimlik | Başlık | Kitap bölümü | Sürüm | Durum |
|---|---|---|---|---|
| MD-Q | Bu veri hangi cümleyi taşır? Biyolojik sorudan ölçülebilir MD çalışmasına | CH01 | 0.1.0 | pilot |
| MD-T | Enerji, kuvvetler ve sayısal hareket | CH02 | 0.2.0 | pilot |
| MD-ENS | Topluluk, dağılım ve ortalama: bir MD koşusu neyi temsil eder? | CH03 | 0.2.1 | pilot |
| MD-PBC | Kenarsız kutu: periyodik sınır | CH04 | 0.6.1 | pilot |
| MD-CUT | En yakın kopya ve kesme | CH04 | 0.1.2 | pilot |
| MD-ELEC | Tuz, perdeleme ve Ewald | CH04 | 0.1.1 | pilot |
| MD-CON | Soruyu bozmadan simülasyon kontrolü: termostat ve barostat neyi sabit tutar, neyi bozar? | CH05 | 0.1.1 | pilot |
| MD-REP | Fark gerçek mi? Karşılaştırma, tekrar ve kontrol tasarımı | CH06 | 0.1.2 | pilot |

**Moleküler dinamik, orta düzey** (12)

| Kimlik | Başlık | Kitap bölümü | Sürüm | Durum |
|---|---|---|---|---|
| MD-DT | Proteinde zaman adımı: kısıtlar, kütle ve hız (1UBQ) | CH02 | 0.1.0 | pilot |
| MD-O | Bir proteini MD'ye hazırlamak: ubikitin (1UBQ) | CH07 | 0.2.1 | pilot |
| MD-PDB | Yapı dosyası: doluluk, B faktörü ve kristal suları (1UBQ) | CH07 | 0.1.0 | pilot |
| MD-FF | Kuvvet alanı bir modeldir: kuvvet alanı ve model uyumu | CH08 | 0.1.0 | pilot |
| MD-LIG | Ligandın parametresi bir karardır: ligand parametreleri ve kökeni | CH09 | 0.1.0 | pilot |
| MD-SOLV | Çözücü de modelin parçası: iyonlar ve yardımcı çözücü | CH10 | 0.1.1 | pilot |
| MD-EQ | Minimizasyon ve dengeleme | CH11 | 0.1.1 | pilot |
| MD-FAIL | Koşu durdu mu, sessizce yanlış mı bitti: simülasyon başarısız olduğunda | CH12 | 0.1.0 | pilot |
| MD-TRJ | Ham dosya ölçüme hazır değildir: trajektoriyi analize hazırlamak | CH13 | 0.1.0 | pilot |
| MD-MET | Bir sayı, bir yapı değildir: yapısal ölçüt neyi ölçer? | CH14 | 0.1.1 | pilot |
| MD-INT | Etkileşim bir eşik tanımıdır: temas, solvatasyon, etkileşim | CH15 | 0.1.1 | pilot |
| MD-PCA | Durum bir tanımdır, bileşen bir yöntem sonucudur: durumlar ve kolektif hareketler | CH16 | 0.1.1 | pilot |

**Moleküler dinamik, i̇leri düzey** (4)

| Kimlik | Başlık | Kitap bölümü | Sürüm | Durum |
|---|---|---|---|---|
| MD-U | Örnekleme ve belirsizlik: alanin dipeptidi | CH17 | 0.2.1 | pilot |
| MD-ERR | Hata çubuğu neyin belirsizliği? Hata çubuğu ve dürüst karşılaştırma | CH18 | 0.1.0 | pilot |
| MD-FES | Bu soru için standart MD yeter mi? Standart MD'nin ötesine karar vermek | CH19 | 0.2.0 | pilot |
| MD-REPRO | Başkası aynı dosyalardan aynı cümleye varabilir mi? Yeniden üretim ve savunulabilir çalışma | CH24 | 0.1.0 | pilot |

**Moleküler docking, temel düzey** (1)

| Kimlik | Başlık | Kitap bölümü | Sürüm | Durum |
|---|---|---|---|---|
| DK-T | Docking: bir pozu bulmak ve doğrulamak | CH02 sonrası | 0.2.1 | pilot |

**Moleküler docking, orta düzey** (1)

| Kimlik | Başlık | Kitap bölümü | Sürüm | Durum |
|---|---|---|---|---|
| DK-O | Gerçek kilit: sonuç kilidin hangi ayrıntısına bağlı? | CH07 ve CH09 | 0.3.1 | pilot |

**Moleküler docking, i̇leri düzey** (1)

| Kimlik | Başlık | Kitap bölümü | Sürüm | Durum |
|---|---|---|---|---|
| DK-U | Skor neyi sıralar? | CH18 ve CH19 | 0.2.3 | pilot |
## Ne nerede hesaplanır

Sitenin bir hesaplama sunucusu yoktur. Sayfalarda üç tür içerik bulunur ve her sayfa hangisini gösterdiğini yazar:

1. **Tarayıcıda canlı hesaplanan öğretim modelleri.** JavaScript ile yazılmış küçük ve sadeleştirilmiş simülasyonlar: iki boyutlu Lennard-Jones sıvısı (MD-PBC, MD-CUT), iki boyutlu iyon örgüsü ve Ewald toplamı (MD-ELEC), 125 katı TIP3P sudan oluşan bir kutu (MD-EQ), çift kuyulu Langevin modeli (MD-ENS) ve basit laboratuvar öğretim modelleri (Western blot, qPCR) gibi. Ortak motor [`assets-src/mdmini.js`](assets-src/mdmini.js) dosyasındadır. Bunlar öğretim modelidir, üretim MD'si değildir.
2. **Önceden hesaplanmış sonuçların etkileşimli incelenmesi.** GROMACS (2023.3 ve 2026.3) simülasyonlarını ve AutoDock Vina 1.2.7 docking koşularını yazar önceden koşturdu. Sonuçlar (enerjiler, açılar, küçük veri dosyalarına indirgenmiş trajektoriler, docking pozları ve skorları) sayfalara gömülüdür ve yeniden oynatılır ya da çizilir. **Tarayıcınız GROMACS ya da Vina çalıştırmaz.** Hesaplanmamış bir parametre birleşimi seçildiğinde sayfa sonuç göstermez, bunu açıkça söyler.
3. **Tarayıcıdaki öbür hesaplar.** Bazı sayfalar gömülü veriden basit nicelikler hesaplar (örneğin MD-O'da Henderson-Hasselbalch ile grup yükleri, MD-U ve MD-ERR'de blok standart hatası, MD-REPRO'da dosyaların SHA-256 özeti).

Verilerin kaynağı her modül sayfasında ve [`modules.json`](modules.json) içindeki `data` alanında yazılıdır. Üçüncü taraf kaynaklar: PDB yapıları 3PTB, 2PTN, 1TNH, 2PTC, 1TGN ve 1UBQ; ChEMBL Ki verisi; mdshare alanin dipeptit (ALA2) trajektorileri. Ayrıntılar ve lisanslar: [`NOTICE.md`](NOTICE.md).

## Yerelde çalıştırmak

Gereken: Node.js 20 ya da üstü (yapı ve denetimler en son Node 22.22.0 ile çalıştırıldı). npm bağımlılığı ve `package.json` yoktur; bir şey kurmak gerekmez.

```
node tools/build.mjs     # siteyi dist/ altına yazar (27 modül x 2 dil)
node tools/check.mjs     # yayın öncesi denetimler, dil kuralı testleri dahil
node --test              # birim testleri (tests/mdmini.test.mjs ve dil testleri)
python3 -m http.server 8000 -d dist   # sonra http://localhost:8000/tr/
```

Basit bir statik sunucu `dist/_redirects` dosyasını ve `functions/` klasörünü uygulamaz. Bu yüzden `/` ya da `/l/MD-T` gibi dil öneksiz adresler ve karekod kısa adresleri yerelde yönlenmez; dil önekli sayfaları doğrudan açın (`/tr/...`, `/en/...`). Yönlendirmeleri canlı sitedeki gibi denemek için Cloudflare'in `npx wrangler pages dev dist` komutu kullanılabilir; bu komut bu belge denetiminde çalıştırılmadı.

Çeviri araçları: `node tools/i18n.mjs extract <KİMLİK>` bir modülün aday metinlerini çıkarır, `node tools/i18n.mjs check <KİMLİK>` İngilizce tablosunu denetler.

## Depo düzeni

```
modules.json        modül kayıt defteri: kimlik, uygulama, düzey, başlık, yol, sürüm, durum, kitap bölümü, amaçlar, veri, notlar; "en" İngilizce alanlar
book.json           kitabın 20 bölüm birimi; /tr/book/ ve /en/book/ buradan üretilir
glossary.json       iki dilde 90 sözlük terimi; /tr/glossary/ ve /en/glossary/
sources/            modül HTML kaynakları (Türkçe); yazarın kitap projesindeki prototiplerin kopyası, bkz. sources/SOURCES.md
i18n/               İngilizce çeviri tabloları (<KİMLİK>.en.json), ortak terim listesi, onay kaydı (onay.json)
assets-src/         ortak tarayıcı motoru (mdmini.js) ve modül kartı çizimlerinin üreteci (kart/kart.py)
lib/lang.js         dil kuralı (saf işlev)
functions/          Cloudflare Pages Function: dil öneksiz adresleri /tr/ ya da /en/ altına gönderir
static/             elle yazılmış statik dosyalar (_headers, robots.txt, 404 sayfası, CSS, kart çizimleri)
tools/              build.mjs, check.mjs, test-lang.mjs, i18n.mjs, sync-engine.mjs, mdt_arrhenius.mjs
tests/              ortak motorun birim testleri (node --test)
docs/               mimari, dağıtım, sürüm notları, tasarım belgeleri ve planlar, inceleme kayıtları
dist/               üretilen site (depoya girmez)
LICENSE             Apache Lisansı 2.0 (kod)
LICENSES/           CC BY 4.0 hukuki metni (eğitim içeriği)
LICENSING.md        hangi bölümün hangi lisansa girdiği; atıf; lisans dışında kalanlar
NOTICE.md           üçüncü taraf veriler ve yazılımlar, lisanslarıyla
```

`tools/check.mjs` bir kural bozulduğunda yapıyı durdurur. Örnekler: modül kimlikleri tekil ve biçimli; yayındaki her modülün iki dilde sayfası var; her kısa adres var olan bir sayfaya gidiyor; üretilen HTML'de U+2014 çizgisi yok; çıktıda yerel dosya yolu yok; ChEMBL verisi kullanan sayfalarda lisans notu var; her dosya Cloudflare Pages boyut sınırının altında.

## Pilot sürümün sınırları

- Modüllerin bağımsız bilimsel incelemesi yapılmadı. Bir modülün listede olması ya da yayında bulunması doğrulandığı anlamına gelmez.
- İngilizce sayfalar Türkçe kaynakların yapay zeka (Claude) çevirisidir. Yazar 9 Ekim 2026'da her modülün çevirisini bütün olarak onayladı; satır satır insan incelemesi yapılmadı (`i18n/onay.json`; bütün tablolarda `reviewed` false).
- Modüller ve kitap yazar tarafından yapay zeka (Claude) desteğiyle geliştirildi. Sayfalardaki sayılar yukarıda sayılan koşulardan ve verilerden gelir; koşu planları ve denetimler modül sayfalarında, `docs/` ve `sources/SOURCES.md` içinde kayıtlıdır.
- Tarayıcıdaki öğretim modelleri sadeleştirilmiştir (iki boyutlu, indirgenmiş birimli ya da küçük sistemler) ve sayfalarda böyle etiketlenir.
- MD örnekleri az sayıda sisteme dayanır (alanin dipeptit, ubikitin, tripsin ve benzamidin, tuz ve üre çözeltileri).
- Eşlik eden kitap henüz yayımlanmadı ve kitap metni bu depoda yer almaz.

## Katkı ve sorun bildirme

Hata bildirimleri, bilimsel ya da eğitsel içerik düzeltmeleri, çeviri düzeltmeleri ve modül önerileri memnuniyetle karşılanır. Önce [CONTRIBUTING.md](CONTRIBUTING.md) dosyasını okuyun: modül sayfaları yazarın prototiplerinin kopyasından üretildiği için içerik değişikliklerinin çoğu sorun kaydı (issue) olarak bildirilir ve proje sahibi tarafından asıl kaynağa uygulanır.

## Lisans ve kullanım koşulları

- **Kod:** Apache Lisansı 2.0, bkz. [`LICENSE`](LICENSE).
- **Özgün eğitim içeriği** (modül metinleri, alıştırmalar, şekiller, çeviriler, sözlük, kart çizimleri, belgeler ve yazarın hesapladığı veriler): Creative Commons Atıf 4.0 Uluslararası (CC BY 4.0), bkz. [`LICENSES/CC-BY-4.0.txt`](LICENSES/CC-BY-4.0.txt).
- Hangi dosyanın hangi lisansa girdiği, nasıl atıf yapılacağı ve lisans dışında kalanlar (AssayHub adları ve simgesi, Ala maskotu, kitap) [`LICENSING.md`](LICENSING.md) dosyasında yazılıdır. Lisanslar 22 Ekim 2026'da seçildi.
- **Üçüncü taraf veriler** kendi lisanslarına tabidir ve [`NOTICE.md`](NOTICE.md) dosyasında listelenir: PDB yapıları CC0 1.0; ChEMBL'den türetilen veri CC BY-SA 3.0 (DK-T, DK-U, MD-LIG ve MD-ERR sayfalarında kullanılır); mdshare ALA2 CC BY 4.0.
- Verileri üretmek için kullanılan yazılımlar (GROMACS, AutoDock Vina, RDKit ve öbürleri) sitede çalışmaz; sürümleri ve lisansları `NOTICE.md` dosyasındadır.

## Sürümler

- Her modülün `modules.json` içinde kendi içerik sürümü vardır (örneğin MD-PBC 0.6.1).
- Sitenin bütünü [`docs/CHANGELOG.md`](docs/CHANGELOG.md) dosyasındaki sürüm notlarıyla izlenir; numaralı son kayıt 0.43.0'dır (15 Ekim 2026). "Yayımlanmamış" başlıklı kayıtlar belge değişikliklerini anlatır ve sürüm numarası taşımaz.
- Depoda henüz git etiketi (tag) ve GitHub release yoktur. Yayımlanan sürümlerin arşivlenmesi (örneğin Zenodo'da DOI ile) planlandı, ama yapılmadı.

## Bakım ve sonraki adımlar

Bunlar hedeftir, tarihli taahhüt değildir:

- Her modülün bilimsel ve eğitsel incelemesi; önce temel düzey modüller.
- İngilizce çevirilerin insan incelemesi ve iki dilin aynı şeyi söylediğinin sürekli denetimi.
- Yapı denetimlerinin ve birim testlerinin geçer kalması; gömülü veri için regresyon denetimleri eklenmesi.
- Öğretim üyeleri için kısa kullanım örnekleri ve daha açık bir katkı akışı.
- Pilot sürümü deneyen okur ve öğretim elemanlarından gelen geri bildirimlerin toplanması ve kaydedilmesi.

Arka plan: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) (25 Eylül 2026 tarihli ilk tasarım önerisi; sonradan değişenler başındaki tarihli notta), [`docs/DEPLOY.md`](docs/DEPLOY.md) (Cloudflare Pages üzerinde barındırma).

## Proje sahibi

Doç. Dr. Zekeriya Düzgün, Tıbbi Biyoloji, Giresun Üniversitesi. Depo: https://github.com/zduzgun/assayhub-learn
