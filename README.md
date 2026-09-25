# assayhub-learn

AssayHub Learn: moleküler docking ve moleküler dinamik için etkileşimli eğitim modülleri. Modüller tarayıcıda çalışır; sunucuda hesap yapılmaz. Her modül MD kitabının ("Hareketten Kanıta / From Motion to Evidence") bir bölümüne karşılık gelir ve kitaptaki karekodlar kalıcı kısa adreslerle (`/l/<KİMLİK>`) buraya gönderir.

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
modules.json        modül kayıt defteri (kimlik, yol, sürüm, kitap bölümü, veri, lisans notu)
sources/            modül HTML kaynakları (MD kitabı prototiplerinin kopyası; bkz. sources/SOURCES.md)
static/             elle yazılmış statik dosyalar (_headers, robots.txt, 404, CSS)
tools/build.mjs     dist/ üretir: modül sayfaları + gezinti şeridi + lisans notu, ana sayfa, _redirects
tools/check.mjs     yayın öncesi denetim; bir kural bozulursa yapı durur
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

Yerel sunucu `_redirects` dosyasını uygulamaz; kısa adresler yalnız Cloudflare Pages üzerinde çalışır.

## Denetim kuralları (`tools/check.mjs`)

- Modül kimlikleri `DK|MD` ve `T|O|U` biçiminde ve tekil.
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
