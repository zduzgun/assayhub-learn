# Dağıtım: özel GitHub reposu + Cloudflare Pages

Karar (25 Eylül 2026): repo **özel**, yayın **Cloudflare Pages** üzerinden. Kod ve prototipler kitap yayımlanana kadar gizli kalır; site arama motorlarına kapalıdır. Aşağıdaki adımları bir kez kurucu yapar; Claude'un GitHub veya Cloudflare hesabına erişimi yoktur ve parola ya da token girmez.

Arayüz adları zamanla değişebilir; adımlar 25 Eylül 2026 itibarıyla genel akışı anlatır.

## 1. GitHub'da boş özel repo

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

**İsteğe bağlı GitHub denetimi:** `docs/ci/check.yml` hazır bir GitHub Actions iş akışıdır. Kullanmak isterseniz bu dosyayı kendiniz `.github/workflows/check.yml` konumuna kopyalayıp commit edin; o zaman her push'ta yapı ve denetim GitHub'da da çalışır. (Claude'un uzak araçları iş akışı klasörüne yazamaz; bu bir güvenlik önlemidir.) Cloudflare'in yapı komutu denetimi zaten çalıştırdığı için bu adım zorunlu değildir.

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

Karekodlar `pages.dev` adresine değil, sizin denetlediğiniz kalıcı bir alan adına gitmelidir (örneğin `learn.<alan-adınız>`). Pages projesinde **Custom domains** bölümünden eklenir. Kısa adresler (`/l/DK-T` vb.) `modules.json`'dan otomatik üretilir ve bu alan adında çalışır. Alan adı seçilene kadar kitaba karekod basılmamalıdır.

## 7. Yeni sürüm yayımlamak

1. Prototipi MD kitabı tarafında (`book/prototypes/`) güncelleyin.
2. Dosyayı `sources/` altına kopyalayıp `sources/SOURCES.md`'deki SHA-256 değerini güncelleyin.
3. `modules.json`'da ilgili modülün `version` alanını artırın; `docs/CHANGELOG.md`'ye not düşün.
4. `node tools/build.mjs && node tools/check.mjs` yerelde geçsin; commit ve push. Cloudflare yeni sürümü yayına alır.
5. Kitapta atıf yapılacak sürümler için ayrıca Zenodo'ya arşiv (DOI) yükleyin.
