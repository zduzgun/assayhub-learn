# Sürüm notları

## 0.2.0 (25 Eylül 2026) · iki dil

- Bütün sayfalar Türkçe (`/tr/`) ve İngilizce (`/en/`). Dil öneksiz adresler (`/`, `/l/<KİMLİK>`, eski `/docking/...` ve `/md/...` bağlantıları) Cloudflare Pages Functions ile ziyaretçinin diline yönlendirilir: kendi seçimi > Türkiye > tarayıcı dili Türkçe > İngilizce.
- Karekod biçimi baskıya göre sabit: `/tr/l/<KİMLİK>` ve `/en/l/<KİMLİK>`.
- Her sayfada `TR | EN` düğmesi; seçim `assayhub_lang` çerezinde bir yıl saklanır (`.assayhub.app` alanında, diğer AssayHub araçlarıyla ortak).
- DK-T, DK-O, DK-U ve MD-T modüllerinin İngilizcesi, Türkçe kaynağa dokunulmadan çeviri tablolarından (`i18n/*.en.json`) yapım sırasında üretilir. Çeviriler makine çevirisidir ve insan incelemesi bekler (`reviewed: false`); İngilizce sayfaların alt bilgisinde bu yazar.
- İngilizce sayfalarda sayılar ondalık noktayla gösterilir; cevap kutuları hem `0.98` hem `0,98` biçimini, İngilizcede `250,000` gibi binlik ayırıcıyı da doğru okur.
- Yeni denetimler: eskimiş çeviri anahtarı, İngilizce sayfada kalan Türkçe metin, Türkçe yerel ayar, sayfa dili ile adres önekinin uyumu, her sayfanın diğer dildeki karşılığı, dil kuralı birim testleri.
- Site simgesi eklendi.

## Yayın kaydı

- 25 Eylül 2026: kalıcı alan adı `assayhub.app` alındı (Cloudflare Registrar); `learn.assayhub.app` Pages projesine bağlandı. Karekodlar için kalıcı biçim: `https://learn.assayhub.app/l/<KİMLİK>`.
- 25 Eylül 2026: ilk Cloudflare Pages dağıtımı (commit 597f240), https://assayhub-learn.pages.dev. Canlı denetim: 7 sayfa 200, 404 sayfası 404, 12 kısa adres (büyük ve küçük harf) doğru hedefe gidiyor, tüm yanıtlarda `X-Robots-Tag: noindex, nofollow`, DK-O ve DK-U konsolunda hata yok.

## 0.1.0 (25 Eylül 2026) · ilk önizleme

- Repo kuruldu: `modules.json` kayıt defteri, `tools/build.mjs`, `tools/check.mjs`, GitHub Actions denetimi, Cloudflare Pages yapılandırması (`_headers`, `robots.txt`, üretilen `_redirects`).
- Yayındaki modüller (pilot): DK-T, DK-O, DK-U, MD-T. Planlanan: MD-O, MD-U.
- Her modül sayfasına ince bir AssayHub Learn gezinti şeridi ve alt bilgi eklenir (kaynak HTML değiştirilmez; yapı sırasında eklenir).
- DK-U sayfasına ChEMBL CC BY-SA 3.0 lisans notu eklendi.
- **Düzeltme (DK-U):** Tarama verisi üretilirken çalışma alanındaki RDKit, `dimorphite_dl` paketinin bağımlılığı nedeniyle 2026.03.6'dan 2025.09.6'ya düşürülmüştü (24 Eylül 2026, 17:23 UTC; DK-O koşuları bundan önce, 17:03 UTC'de bitmişti). DK-U sayfasında ve tarama protokolünde yazan "RDKit 2026.03.6" ifadesi "2025.09.6" olarak düzeltildi. Sonuçlar değişmedi; yalnız kayıttaki sürüm bilgisi düzeltildi.
