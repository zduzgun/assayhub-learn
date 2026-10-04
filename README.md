# assayhub-learn

AssayHub Learn: moleküler docking ve moleküler dinamik için etkileşimli eğitim modülleri. Modüller tarayıcıda çalışır; sunucuda hesap yapılmaz. Her modül MD kitabının ("Hareketten Kanıta / From Motion to Evidence") bir bölümüne karşılık gelir ve kitaptaki karekodlar kalıcı kısa adreslerle buraya gönderir: Türkçe baskı `/tr/l/<KİMLİK>`, İngilizce baskı `/en/l/<KİMLİK>`.

**İki dil (0.2.0):** Bütün sayfalar Türkçe (`/tr/`) ve İngilizce (`/en/`). Dil öneksiz adresler (`/`, `/l/<KİMLİK>`) ziyaretçiyi diline yönlendirir: kendi seçimi > Türkiye'den geliyorsa Türkçe > tarayıcısı Türkçeyse Türkçe > İngilizce. Her sayfada `TR | EN` düğmesi vardır. Tasarım: [`docs/superpowers/specs/2026-09-25-iki-dil-design.md`](docs/superpowers/specs/2026-09-25-iki-dil-design.md).

**Durum:** önizleme (pilot). Arama motorlarına kapalıdır (`robots.txt`, `X-Robots-Tag`). Bilimsel ve hedef-okur incelemesi yapılmadı. Mimari ve kararlar: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Modüller

| Kimlik | Uygulama | Düzey | Durum |
|---|---|---|---|
| DK-T | Docking | Temel | pilot |
| DK-O | Docking | Orta | pilot |
| DK-U | Docking | Uzman | pilot |
| MD-T | MD | Temel | pilot |
| MD-O | MD | Orta | planlandı |
| MD-U | MD | Uzman | planlandı |

Tek doğruluk kaynağı [`modules.json`](modules.json)'dur. Ana sayfa, uygulama sayfaları ve kısa adres yönlendirmeleri bu dosyadan üretilir.

## Yapı

```
modules.json        modül kayıt defteri (kimlik, yol, sürüm, kitap bölümü, veri, lisans notu; `en` alanları İngilizce)
i18n/               İngilizce çeviri tabloları (<KİMLİK>.en.json) ve ortak sözlük (GLOSSARY.md)
lib/lang.js         dil kuralı (saf işlev; birim testleri tools/test-lang.mjs)
functions/          Cloudflare Pages Functions: dil öneksiz adresleri ziyaretçinin diline yönlendirir
sources/            modül HTML kaynakları (MD kitabı prototiplerinin kopyası; bkz. sources/SOURCES.md)
static/             elle yazılmış statik dosyalar (_headers, robots.txt, 404, CSS)
tools/build.mjs     dist/ üretir: modül sayfaları + gezinti şeridi + lisans notu, ana sayfa, _redirects
tools/i18n.mjs      çeviri aracı: aday metinleri çıkarır, tabloyu uygular ve denetler
tools/check.mjs     yayın öncesi denetim (dil testleri dahil); bir kural bozulursa yapı durur
docs/               mimari, dağıtım, sürüm notları; docs/ci/check.yml isteğe bağlı GitHub Actions şablonu
dist/               üretilen site (depoya girmez)
```

## Yerel çalıştırma

Node 20 veya üstü yeterli; paket kurulumu yok.

```
node tools/build.mjs
node tools/check.mjs
python -m http.server 8000 -d dist     # sonra http://localhost:8000
```

Yerel sunucu `_redirects` dosyasını ve `functions/` klasörünü uygulamaz. Yönlendirmeleri ve dil kuralını yerelde denemek için: `npx wrangler pages dev dist` (işlevler ve kısa adresler Cloudflare'dekiyle aynı çalışır).

Çeviri: `node tools/i18n.mjs extract <KİMLİK>` aday metinleri çıkarır; `node tools/i18n.mjs check <KİMLİK>` tabloyu denetler. Türkçe kaynak değişip tablodaki bir anahtar bulunamazsa ya da İngilizce sayfada Türkçe metin kalırsa yapım durur.

## Denetim kuralları (`tools/check.mjs`)

- Modül kimlikleri `DK|MD` ve `T|O|U|Q` ya da 2 ile 4 büyük harf biçiminde ve tekil.
- Yayındaki her modülün sayfası var; her kısa adres var olan bir sayfaya gider.
- Hiçbir HTML dosyasında em-dash (U+2014) yok; her sayfada `lang="tr"` ve `<title>` var.
- Yerel dosya yolu sızıntısı yok.
- ChEMBL verisi kullanan modülde CC BY-SA 3.0 notu var.
- Dosya boyutu 25 MiB altında (Cloudflare Pages sınırı).

## Kurallar

- Modül kimlikleri kalıcıdır; değişmez. İçerik sürümlenir (`version`).
- Hiçbir sonuç uydurulmaz. MD modüllerinde koşular gerçek zamanlı çalıştırılmaz; önceden hesaplanmış gerçek veriler rehberli olarak yeniden oynatılır ve bu sayfada açıkça yazılır. Hesaplanmamış bir senaryo için sonuç gösterilmez.
- `sources/` elle düzenlenmez; değişiklik MD kitabı tarafındaki prototipte yapılır ve buraya kopyalanır.

## Lisans

Kod lisansı henüz seçilmedi; seçilene kadar bütün hakları saklıdır. Üçüncü taraf veri lisansları: [`NOTICE.md`](NOTICE.md).

Dağıtım adımları: [`docs/DEPLOY.md`](docs/DEPLOY.md).
