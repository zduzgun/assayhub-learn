# MD-O: Bir proteini MD'ye hazırlamak (ubikitin, 1UBQ) · tasarım

Tarih: 25 Eylül 2026 · Durum: kurucu tarafından sohbette onaylandı (1. ve 2. kısım); yazılı belge incelemede · Modül kimliği: MD-O (kalıcı) · Kitap bölümü: CH07 (hazırlık), CH08-CH12 bağlantılı

## 1. Amaç

Okur, orta düzeyde, gerçek bir proteini (insan ubikitini, PDB 1UBQ) MD'ye hazırlarken verilen kararları kendisi verir ve her kararın gerçek sonucunu görür. Koşular tarayıcıda çalışmaz: okur koşuyu "başlattığında" gerçek bir koşunun kayıt satırları ve zaman serileri hızlandırılmış olarak akar; sonunda gösterilen her sayı önceden hesaplanmış gerçek bir koşudan gelir. Hesaplanmamış bir seçim için sonuç uydurulmaz; sayfa "bu senaryo hesaplanmadı" yazar.

Başarı ölçütleri:
- Sayfadaki her sayı bir kaynak dosyaya ve komuta kadar izlenebilir; veri denetimi her sayıyı kaynak dosyadan yeniden hesaplayarak doğrular.
- Okur altı adımı ve sınavı tamamlayabilir; her adımda karar-sonuç ilişkisini kendi eliyle görür.
- Sayfa, kısa teknik denemelerin denge, yakınsama ya da biyolojik çıkarım kanıtı olmadığını açıkça söyler.
- İki dil (tr, en), masaüstü ve mobil; konsol hatası yok; em-dash yok.

## 2. Veri

### 2.1 Ana yol (S0): mevcut gerçek deneme

`book/cases/ubiquitin_1ubq/gromacs_trial/` (24 Eylül 2026, WSL Ubuntu 24.04, GROMACS 2023.3, CPU, 4 iş parçacığı): pdb2gmx (amber99sb-ildn, TIP3P, HIS68 HISE, toplam yük 0), dodekahedral kutu 1,0 nm, 5.902 su, 18.937 atom, steepest descent minimizasyon (667 adım, Fmax 755,0 kJ mol⁻¹ nm⁻¹), konum kısıtlı NVT 10 ps, konum kısıtlı NPT 10 ps, kısıtsız 10 ps. Bu dosyalar değiştirilmez.

### 2.2 Ek senaryolar (bulut, aynı GROMACS 2023.3 sürümü)

Hepsi aynı girdi dosyalarından başlar, `-maxwarn` kullanılmaz, tohumlar sabittir, her koşu en çok 10 ps'dir ve "teknik deneme, bilimsel üretim değildir" etiketini taşır. Protokol koşulardan önce `scenarios/SCENARIO_PROTOCOL_2026-09-25.md` olarak yazılıp dondurulur.

| Kimlik | Soru | Başlangıç | Değişen | Ölçülen |
|---|---|---|---|---|
| C0 | Aynı girdiler başka makinede ne verir? (kontrol) | `em.gro` | yok (S0 NVT'nin bulutta tekrarı) | T, E, performans; S0 ile karşılaştırma |
| S1 | Minimizasyon atlanırsa ne olur? | `solvated.gro` | minimizasyon yok, doğrudan kısıtlı NVT | ilk kuvvetler, T, E, LINCS uyarıları, çöküş varsa adımı |
| S2a | 4 fs, H içeren bağlar kısıtlı | `npt_smoke.gro/.cpt` | dt 0,004, 2.500 adım | T, korunan enerji, LINCS uyarıları, çöküş |
| S2b | 4 fs, kısıt yok | `npt_smoke.gro/.cpt` | dt 0,004, constraints none | aynı |
| S3 | Dar kutu (0,5 nm) | `protein.gro` | editconf -d 0,5; yeni çözücü; EM, NVT, NPT, kısıtsız 10 ps | atom sayısı, periyodik görüntüler arası en kısa mesafe (mindist -pi) zamana karşı, kesme mesafesi 1,0 nm ile karşılaştırma |
| S4 | 0,15 M NaCl | `solvated.gro` | genion -conc 0,15 -neutral; EM, NVT, NPT, kısıtsız 10 ps | iyon sayıları, atom sayısı, protein yakınındaki iyon sayısı |

Başarısız koşular da veridir: çöken bir koşu olduğu gibi kaydedilir ve sayfada "koşu şu adımda durdu" diye gösterilir. Kombinasyonlar (ör. dar kutu + 4 fs) hesaplanmaz ve sayfada "hesaplanmadı" yazar.

### 2.3 Veri paketi

`extract.py`, `.edr`, `.log`, `.xtc`, `.gro` dosyalarından sayfanın ihtiyacı olan her şeyi `learn/md-o_data.json` dosyasına çıkarır: minimizasyon eğrisi (adım, potansiyel, Fmax), zaman serileri (sıcaklık, basınç, yoğunluk, potansiyel, korunan enerji), RMSD (omurga, `em.gro` referansına göre), periyodik görüntü mesafesi, her kare için 76 Cα koordinatı (ilk kareye hizalanmış), kayıt satırı alıntıları, atom ve molekül sayıları, performans (ns/gün, makine bilgisiyle). Her değer kaynağını (`file`, `command`) taşır. `verify.py` her sayıyı kaynak dosyadan yeniden hesaplayıp JSON ile karşılaştırır. Sayfa yalnız bu JSON'u (gömülü olarak) okur.

## 3. Sayfanın akışı

DK modülleriyle aynı tasarım dili (kağıt #faf9f5, mürekkep #243744, vurgu #934b3c; Georgia ve Segoe UI), Ala maskotu, görev ve ilerleme sistemi, "bu bir yeniden oynatmadır" kutusu.

1. **Yapıyı okumak (Görev 1):** yapı denetiminin gerçek sonuçları (76 kalıntı, 58 kristal suyu, 73-76 düşük doluluk, 602 ağır atom). Okur kristal suları ve düşük doluluklu C-ucu için karar verir; hesaplanan yol "sular çıkarıldı, C-ucu korundu" olarak gösterilir, diğer seçimler "hesaplanmadı".
2. **Topoloji ve protonasyon (Görev 2):** kuvvet alanı ve su modeli (hesaplanan: amber99sb-ildn + TIP3P), HIS68 HISE, NMET (+1) ve CGLY (-1) uçlar, toplam yük 0. Okur toplam yükü ve iyon gereksinimini yorumlar.
3. **Kutu, çözücü, tuz (Görev 3):** 1,0 ya da 0,5 nm; tuz yok ya da 0,15 M NaCl. Atom sayısı ve maliyet; dar kutuda periyodik görüntü mesafesi eğrisi ve kesme mesafesi çizgisi.
4. **Minimizasyon (Görev 4):** yap ya da atla. Yapılırsa gerçek 667 adımın potansiyel ve Fmax eğrileri akar; atlanırsa S1'in gerçek sonucu.
5. **Dengeleme (Görev 5):** dt 2 ya da 4 fs, H içeren bağlar kısıtlı ya da değil. Sıcaklık, basınç, yoğunluk; terminal oynatıcısı gerçek kayıt satırlarını akıtır.
6. **Kısa kısıtsız koşu (Görev 6):** 3B görüntüleyicide (DK-O görüntüleyicisinin uyarlaması) 11 kare; RMSD eğrisi. Ana mesaj: 10 ps denge değildir; bu koşudan söylenebilecek ve söylenemeyecek olanlar.
7. **Sınav** ve "bu sayfa hakkında": hangi sayının hangi koşudan, hangi makineden geldiği; `NOT_EXECUTED` listesi (deneme raporundakiyle aynı).

## 4. Dosyalar

- Kitap: `book/cases/ubiquitin_1ubq/scenarios/` (protokol, betik, koşu dosyaları, kayıtlar, SHA-256), `book/cases/ubiquitin_1ubq/learn/` (extract.py, verify.py, md-o_data.json), `book/prototypes/MD-O_UBIKITIN_HAZIRLIK_ETKILESIMLI_PILOT_2026-09-25.html`.
- Site: `sources/MD-O.html`, `i18n/MD-O.en.json`, `modules.json` (MD-O: status pilot, path md/md-o/, version 0.1.0), SOURCES.md, CHANGELOG.

## 5. Denetim ve test

- `verify.py`: JSON'daki her sayı kaynak dosyadan yeniden hesaplanır; fark varsa hata.
- `tools/i18n.mjs check MD-O` ve `tools/check.mjs`.
- Tarayıcı (Playwright, Chromium): iki dil, masaüstü ve mobil; bütün görevler ve sınav tamamlanabilir; konsol hatası yok; "hesaplanmadı" kombinasyonlarında hiçbir sayı gösterilmez.
- Canlı: `/tr/l/MD-O` ve `/en/l/MD-O` modül sayfasına gider.

## 6. Sınırlar

- Bütün koşular 10 ps'lik teknik denemelerdir; denge, yakınsama, yoğunluk kabulü ya da biyolojik çıkarım kanıtı değildir.
- S0 ile ek senaryolar farklı makinelerde koştu; performans değerleri makineler arası karşılaştırılamaz (yalnız aynı makinedeki senaryolar karşılaştırılır; bunun için C0 vardır).
- Uzun üretim koşuları kapsam dışıdır; ileride kurucunun GPU'sunda (CUDA destekli GROMACS) koşulabilir.
