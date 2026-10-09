# İki dilli AssayHub Learn: tasarım

Tarih: 25 Eylül 2026 · Durum: kurucu tarafından onaylandı (1. kısım sohbette onaylandı; 2. kısım ve uygulama "gerisini sen bilirsin" talimatıyla devredildi) · Sürüm: 0.2.0

## 1. Amaç ve kapsam

AssayHub'ın bütün arayüzleri Türkçe ve İngilizce olacak. Türkiye'den gelen ziyaretçi varsayılan olarak Türkçe, diğer ziyaretçiler İngilizce görür. Bu belge ilkeyi AssayHub Learn (`learn.assayhub.app`) üzerinde uygular; aynı dil kuralı, çerez ve adres düzeni BlotForge, CytoMove ve sonraki AssayHub araçları için de platform kuralıdır (5. kısım).

Kapsam (0.2.0): altyapı + dört yayındaki modülün (DK-T, DK-O, DK-U, MD-T) İngilizce sürümü. Kurucu kararı: "şimdiye kadar yaptıklarımızın İngilizce kısmını da yapalım" (pilotla sınırlı kalmadan dört modül birden).

Başarı ölçütleri:
- Türkiye'den `learn.assayhub.app` açan Türkçe, yurt dışından açan İngilizce görür.
- Her sayfada dil düğmesi çalışır ve seçim hatırlanır.
- Kitaptaki karekodlar baskının dilinde açılır ve hiçbir zaman bozulmaz.
- İngilizce sayfalarda Türkçe metin kalmaz; Türkçe kaynak değişip çeviri eskirse yapım durur.

## 2. Adres düzeni

| Adres | Davranış |
|---|---|
| `/tr/...`, `/en/...` | Dili sabit sayfa (ana sayfa, uygulama sayfaları, modüller). |
| `/tr/l/<KİMLİK>`, `/en/l/<KİMLİK>` | **Kitap karekodları.** Türkçe baskı `/tr/l/`, İngilizce baskı `/en/l/` basar. `_redirects` ile 302. |
| `/`, `/l/<KİMLİK>`, `/docking/...`, `/md/...` (dil öneksiz) | Dil kuralına göre `/tr/...` ya da `/en/...` adresine 302. Önceki yayında paylaşılmış bağlantılar bozulmaz. |

Kalıcı karekod biçimi: `https://learn.assayhub.app/tr/l/DK-T` ve `https://learn.assayhub.app/en/l/DK-T`. Kimlikler büyük ya da küçük harfle yazılabilir.

## 3. Dil kuralı (dil öneksiz adresler için)

Sıra (kurucu kararı: "ülke + tarayıcı dili"):
1. `assayhub_lang` çerezi `tr` ya da `en` ise o dil.
2. Cloudflare'in bildirdiği ülke `TR` ise Türkçe.
3. `Accept-Language` başlığındaki en yüksek öncelikli dil `tr` ise Türkçe.
4. Diğer bütün durumlarda İngilizce.

Uygulama: Cloudflare Pages Functions (`functions/`), yalnız dil öneksiz yollarda çalışır (`_routes.json` ile sınırlanır; statik dosyalar işlevden geçmez). Karar saf bir işlevde (`lib/lang.js`, `decideLang`) yapılır ve birim testleriyle sınanır. Yanıt `302`, `Cache-Control: no-store`, `Vary: Cookie, Accept-Language`; hangi kuralın uygulandığı `X-AHL-Lang-Reason` başlığında yazılır (cookie | country | accept-language | default).

## 4. Dil düğmesi, çerez, sayfa bilgisi

- Her sayfanın üst şeridinde `TR | EN` düğmesi: aynı sayfanın diğer dildeki adresine gider ve `assayhub_lang` çerezini yazar (1 yıl, `Path=/`, `SameSite=Lax`, `Secure`; alan `assayhub.app` altındaysa `Domain=.assayhub.app`, böylece seçim diğer AssayHub araçlarına da taşınır).
- Her sayfa `<html lang="tr|en">` taşır ve diğer dildeki karşılığını `<link rel="alternate" hreflang>` ile gösterir. Arama motorları şimdilik kapalı (`noindex`).
- İngilizcesi olmayan bir modülün İngilizce adresinde "The English version of this module is in preparation" notu ve Türkçe sürüme bağlantı gösterilir (0.2.0'da dört modülün hepsinin İngilizcesi var).

## 5. AssayHub platform kuralı

Bütün AssayHub arayüzleri: iki dil (tr, en); aynı dil kuralı (3. kısım); aynı çerez (`assayhub_lang`, `Domain=.assayhub.app`); dil önekli adresler (`/tr/`, `/en/`); her sayfada dil düğmesi; kalıcı adreslerde dil sabit.

## 6. Çeviri yöntemi (yaklaşım C)

- Türkçe prototip (`sources/<KİMLİK>.html`, MD kitabı tarafındaki prototipin birebir kopyası) tek kaynaktır ve elle değiştirilmez.
- İngilizce sayfa yapım sırasında `i18n/<KİMLİK>.en.json` çeviri tablosundan üretilir. Tablo, kaynaktaki ham alt dizeleri İngilizce karşılıklarına eşler; bütün anahtarlar tek geçişte, en uzundan başlanarak değiştirilir. Kod düzeyindeki farklar da (örneğin `tr-TR` yerine `en-US` sayı biçimi, İngilizce binlik virgülünü doğru okuyan sayı ayrıştırıcı) aynı tabloda tutulur.
- Ortak terimler `i18n/GLOSSARY.md` sözlüğündedir.
- Tablolar `reviewed: false` ve "machine translation, needs human review" olarak işaretlidir; insan incelemesi yapılana kadar İngilizce sayfalarda bu bilgi alt bilgide yazar.
- Ara durum (9 Ekim 2026): Claude'un çift çift denetiminden geçen tablolara `checked: "claude"` eklenir; `reviewed` false kalır ve alt not "Claude (AI) has checked it, but it has not yet been reviewed by a person." olur. `reviewed: true` yalnız bir kişinin gözden geçirmesinden sonra verilir.

## 7. Denetimler (`tools/i18n.mjs`, `tools/check.mjs`)

Yapım şu durumlarda durur:
- Tablodaki bir anahtar kaynakta bulunamıyorsa (Türkçe metin değişmiş, çeviri eskimiş).
- İngilizce çıktıda yorumlar dışında Türkçe harf (ç ğ ı ö ş ü) kalmışsa.
- Kaynaktaki doğal dil metni İngilizce çıktıda değişmeden duruyorsa ve `keep` listesinde değilse.
- Kaynağın Türkçe sözcük dağarcığından bir sözcük İngilizce çıktıda kalmışsa.
- Türkçe yerel ayar (`tr-TR`) kalmışsa; kısa ve Türkçe harf içermeyen anahtar bağlamsız yazılmışsa; çeviride em-dash varsa.
- `check.mjs`: her sayfanın `lang` özniteliği adres önekiyle uyuşmalı; her sayfanın diğer dildeki karşılığı olmalı; bütün kısa adresler var olan sayfaya gitmeli.

## 8. Testler

- `tools/test-lang.mjs`: `decideLang` için birim testleri (çerez önceliği, TR ülkesi, `Accept-Language` ağırlıkları, bozuk başlıklar, varsayılan).
- Yerel tarayıcı testi (Playwright, Chromium): her dildeki her sayfa açılır, konsol hatası yok, İngilizce sayfaların görünür metninde Türkçe harf yok, dil düğmesi doğru adrese gider.
- Canlı test: kök adres ve `/l/` yönlendirmesi (Türkiye'den TR), çerezle İngilizceye geçiş, `/tr/l/` ve `/en/l/` adreslerinin 12 kimlik için doğru hedefe gitmesi.

## 9. Bilinen sınırlar

- Ülke bilgisi Cloudflare'in IP tabanlı tahminidir; VPN kullanan ziyaretçi yanlış varsayılan görebilir, düğmeyle düzeltir.
- Makine çevirisi insan incelemesinden geçmedi.
- Türkçe prototiplerde çeviri sırasında fark edilen içerik sorunları (örneğin MD-T Görev 1'in Lennard-Jones eğrisinin uzak ucunda da tamamlanabilmesi) kitap tarafında düzeltilmeli; çeviri bunları değiştirmez.
