# Sürüm notları

## 0.3.0 (25 Eylül 2026) · MD-O

- Yeni modül MD-O (orta düzey, kitap CH07): "Bir proteini MD'ye hazırlamak: ubikitin (1UBQ)". Altı laboratuvar (yapı dosyası ve kristal suları, topoloji ve protonasyon, kutu ve tuz, minimizasyon, dengeleme ve zaman adımı, trajektori) ve dört soruluk sınav. Adresler `/tr/md/md-o/`, `/en/md/md-o/`; karekod `/tr/l/MD-O`, `/en/l/MD-O`.
- Sayfadaki her sayı gerçek GROMACS 2023.3 koşularından gelir: 24 Eylül yerel deneme (S0) ve 25 Eylül'de önceden yazılıp dondurulmuş protokolle bulutta koşulan ek senaryolar (C0, C1, S1 minimizasyonsuz, S2a/S2b 4 fs, S3 0,5 nm kutu, S4 0,15 M NaCl). Başarısız koşular (S1 çöküşü, S2b grompp reddi) olduğu gibi gösterilir. Koşulmamış seçimlerde sayfa "Bu senaryo hesaplanmadı" yazar ve sayı göstermez. Hiçbir koşu denge, yakınsama ya da biyolojik çıkarım kanıtı değildir.
- Veri paketi `extract.py` ile çıkarılır, `verify.py` her sayıyı ikinci bir kaynaktan (md.log, .gro, topol.top, pdb2gmx kaydı, PDB başlığı) yeniden denetler.
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
