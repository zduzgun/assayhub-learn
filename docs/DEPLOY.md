# Dağıtım: GitHub deposu + Cloudflare Pages

## Güncel durum (21 Ekim 2026)

- **Depo:** `zduzgun/assayhub-learn`, herkese açık (public). Varsayılan dal `main`. Bu durum 21 Ekim 2026'da depo kimlik doğrulaması olmadan klonlanarak doğrulandı. Depoda git etiketi (tag) ve GitHub release yoktur.
- **Yayın:** Cloudflare Pages projesi `assayhub-learn`, `main` dalından her push'ta yeniden yapılır. Kalıcı adres **https://learn.assayhub.app** (alan adı `assayhub.app`, Cloudflare Registrar); önizleme adresi https://assayhub-learn.pages.dev de çalışır.
- **Arama motorları:** site bilerek kapalıdır (`static/robots.txt` her şeyi yasaklar, `static/_headers` her sayfaya `X-Robots-Tag: noindex, nofollow` ekler). Deponun herkese açık olması bu ayarları ve sitenin pilot durumunu değiştirmez.
- **Lisans:** 22 Ekim 2026'dan beri kod Apache-2.0 (`LICENSE`), özgün eğitim içeriği CC BY 4.0 (`LICENSES/CC-BY-4.0.txt`); kapsam `LICENSING.md` dosyasındadır. Bu tarihten önce depo lisanssız olarak herkese açıktı.
- **GitHub Actions:** etkin bir iş akışı yoktur (depoda `.github/workflows/` klasörü yok). `docs/ci/check.yml` yalnız bir şablondur; bkz. aşağıdaki "GitHub Actions şablonu" kısmı. Yayın öncesi denetimi Cloudflare'in yapı komutu çalıştırır.

## Geçmiş karar ve kurulum kaydı (25 Eylül 2026)

Aşağıdaki 1. ve 2. adımlar ilk kurulumun kaydıdır ve o günkü kararı anlatır; tarihsel olarak korunur.

Karar (25 Eylül 2026): repo **özel**, yayın **Cloudflare Pages** üzerinden. Kod ve prototipler kitap yayımlanana kadar gizli kalacaktı; site arama motorlarına kapalıydı. Adımları kurucu yaptı; Claude'un GitHub veya Cloudflare hesabına erişimi yoktu ve parola ya da token girmedi. Depo daha sonra herkese açık hale getirildi; bunun tarihi bu depoda kayıtlı değildir. Sitenin arama motorlarına kapalı olması değişmedi.

Durum (25 Eylül 2026): kurulum tamamlandı. Repo `zduzgun/assayhub-learn` (o tarihte özel), Cloudflare Pages projesi `assayhub-learn`, kalıcı yayın adresi https://learn.assayhub.app (alan adı `assayhub.app`, 25 Eylül 2026'da alındı, otomatik yenileme açık). Cloudflare Pages GitHub uygulamasının erişimi seçili repolarla sınırlıydı.

Arayüz adları zamanla değişebilir; adımlar 25 Eylül 2026 itibarıyla genel akışı anlatır.

## 1. GitHub'da boş repo (kayıt: özel olarak açıldı)

1. GitHub'da **New repository** → ad `assayhub-learn` → **Private**.
2. README, .gitignore veya lisans **eklemeyin** (yerel repoda zaten var; ekleseniz ilk itmede çakışır).

## 2. Yerel repoyu GitHub'a göndermek

Yerel repo: `C:\Users\Zekeriya\PROJE\ASSAYSHUB\_CLAUDE\assayhub-learn` (ilk commit hazır, `main` dalı).

**GitHub Desktop ile (en kolay):** File → Add local repository → bu klasörü seçin → **Publish repository** (Keep this code private işaretli kalsın). GitHub'da 1. adımda repo açtıysanız, Repository settings → Remote bölümünden o reponun adresini girip **Push origin** deyin.

**Komut satırıyla:**

```
cd C:\Users\Zekeriya\PROJE\ASSAYSHUB\_CLAUDE\assayhub-learn
git remote add origin https://github.com/<kullanıcı-adınız>/assayhub-learn.git
git push -u origin main
```

## GitHub Actions şablonu

`docs/ci/check.yml` hazır bir GitHub Actions iş akışı şablonudur ve şu anda **etkin değildir**: GitHub yalnız `.github/workflows/` altındaki dosyaları çalıştırır ve depoda bu klasör yoktur. Etkinleştirmek isteyen proje sahibi dosyayı `.github/workflows/check.yml` konumuna kopyalayıp commit eder; o zaman her push ve pull request'te `node tools/build.mjs` ve `node tools/check.mjs` GitHub'da da çalışır. (Claude'un uzak araçları iş akışı klasörüne yazmaz; bu bir güvenlik önlemidir.) Cloudflare'in yapı komutu denetimi zaten çalıştırdığı için bu adım yayın için zorunlu değildir, ama dışarıdan gelen pull request'leri birleştirmeden önce denetlemeyi kolaylaştırır.

## 3. Cloudflare Pages'i bağlamak

1. Cloudflare panelinde **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → GitHub hesabını yetkilendirin; yalnız `assayhub-learn` reposuna erişim vermeniz yeterli.
2. Proje ayarları:

| Alan | Değer |
|---|---|
| Production branch | `main` |
| Framework preset | None |
| Build command | `node tools/build.mjs && node tools/check.mjs` |
| Build output directory | `dist` |
| Ortam değişkeni (isteğe bağlı) | `NODE_VERSION = 20` |

3. **Save and Deploy.** İlk yayın birkaç dakikada `https://assayhub-learn.pages.dev` gibi bir adreste açılır.

Denetim (`check.mjs`) başarısız olursa yapı durur ve eski sürüm yayında kalır; bozuk bir sürüm yayına çıkmaz.

## 4. Önizleme adresleri

`main` dışındaki her dal ve her commit için Cloudflare ayrı bir önizleme adresi üretir (örneğin `<dal>.assayhub-learn.pages.dev`). Denemeleri ayrı bir dalda yapıp önizlemede kontrol ettikten sonra `main`'e birleştirmek önerilir.

## 5. Erişimi kısıtlamak (önerilir)

Site şimdilik arama motorlarına kapalıdır, ama adresi bilen herkes açabilir. Kitap yayımlanana kadar yalnız sizin ve seçtiğiniz meslektaşların görmesi için Cloudflare **Zero Trust → Access** ile bir uygulama tanımlayıp e-posta tabanlı bir izin kuralı eklenebilir. Pages proje ayarlarında önizleme dağıtımları için de erişim kuralı açılabilir.

## 6. Kalıcı alan adı ve karekodlar

Karekodlar `pages.dev` adresine değil, denetlediğiniz kalıcı alan adına gitmelidir. **Seçilen biçim (0.2.0, baskıya göre sabit dil):** Türkçe baskı `https://learn.assayhub.app/tr/l/<KİMLİK>`, İngilizce baskı `https://learn.assayhub.app/en/l/<KİMLİK>` (örneğin `/tr/l/DK-T`). Dil öneksiz `/l/<KİMLİK>` de çalışır ve ziyaretçinin diline yönlenir, ama kitaba dilli biçim basılır. Kitaba ayrı, kitaba ait bir kısa alan adı eklenirse o adres de bu kısa adreslere yönlendirilir. Pages projesinde **Custom domains** bölümünden eklenir. Kısa adresler (`/tr/l/DK-T`, `/en/l/DK-T` vb.) `modules.json`'dan otomatik üretilir ve bu alan adında çalışır. Karekodlar kitabın son dizgisinde üretilmeli; bu dosyadaki adres kalıcı kabul edilir ve değiştirilmez.

## 7. Yeni sürüm yayımlamak

1. Prototipi MD kitabı tarafında (`book/prototypes/`) güncelleyin.
2. Dosyayı `sources/` altına kopyalayıp `sources/SOURCES.md`'deki SHA-256 değerini güncelleyin.
3. `modules.json`'da ilgili modülün `version` alanını artırın; `docs/CHANGELOG.md`'ye not düşün.
4. `node tools/build.mjs && node tools/check.mjs` yerelde geçsin; commit ve push. Cloudflare yeni sürümü yayına alır.
5. Kitapta atıf yapılacak sürümler için ayrıca Zenodo'ya arşiv (DOI) yükleyin. (Planlandı; 21 Ekim 2026 itibarıyla hiçbir sürüm arşivlenmedi ve git etiketi ya da GitHub release oluşturulmadı.)
