# Ortak mini-MD motoru ve MD-PBC tasarımı

Tarih: 26 Eylül 2026. Onay: proje sahibi ("güzel onaylıyorum").

## Amaç

Temel düzeyde MD'nin her unsurunu okurun tarayıcıda kendi elleriyle koşturduğu oyuncak modellerle anlatan bir modül dizisi. İlk adım: ortak motor `mdmini.js` ve ilk modül MD-PBC (kitap CH04, "Simülasyon kutusu evren değildir"). Sonraki modüller: MD-ENS (topluluklar ve termostatlar, CH03+CH05), MD-CON (kısıtlama algoritmaları).

## İlke

Temel modüllerdeki sayılar tarayıcıda gerçekten hesaplanır (yeniden oynatma değildir). Her sayfa bunu "tarayıcıda hesaplanan iki boyutlu oyuncak model; atomistik protein değil" diye etiketler. Motorun davranışı analitik ya da kaba kuvvet sonuçlarıyla birim testlerinde sınanır. Tohumlu rastgele sayı üreteci: aynı tohum aynı sonucu verir; tohum sayfada gösterilir.

## Motor

`assets-src/mdmini.js` (sürüm 0.1.0; gözden geçirmeden sonra 0.1.1): 2B Lennard-Jones, indirgenmiş birimler (σ = ε = m = k_B = 1), kare kutu, N ≤ 400. İşlevler: periyodik sarma ve minimum görüntü, duvarlı kutu (yansıtıcı), kesme (düz ya da kaydırılmış potansiyel), kaba kuvvet ve Verlet komşu listesi (deri; liste O(N²) aramayla kurulur, hücre listesi sonraki sürüme bırakıldı), hız-Verlet, kinetik/potansiyel/toplam enerji, sıcaklık (2B eşbölüşüm), çift hesabı sayacı, kaçırılan etkileşim sayacı (liste ile kaba kuvvet farkı), Coulomb yardımcıları (1B iyon zinciri doğrudan toplamı, erfc/erf ayrışımı). Testler (`node --test`): NVE enerji korunumu, minimum görüntü = 9 görüntünün en kısası, liste çiftleri = kaba kuvvet çiftleri (deri yeterliyken), momentum korunumu, tohumla tekrar üretilebilirlik, 1B Madelung sabitinin 2 ln 2'ye yakınsaması.

Sayfalar tek dosya kalır: motor, sayfada `/* mdmini:begin */ … /* mdmini:end */` bölgesine `tools/sync-engine.mjs` ile kopyalanır; `tools/check.mjs` bu bölgenin motorun güncel sürümüyle aynı olduğunu denetler.

## MD-PBC sayfası

Altı laboratuvar: (1) duvarlı kutu ve periyodik kutu, yüzeydeki parçacık payı; (2) minimum görüntü; (3) kesme: düz ve kaydırılmış, NVE enerji kayması, r_c < L/2 kuralı; (4) komşu listesi: çift sayısı, süre, deri inceyken kaçırılan etkileşimler; (5) uzun erimli elektrostatik: 1B iyon zinciri toplamı ve Ewald ayrışımı fikri (tam PME simülasyonu değil); (6) sonlu kutu, MD-O'daki gerçek 0,5 nm kutu sonucuna bağlantı. Sınav, "Bu sayfa hakkında", iki dil, MD-O görsel dili.

## Test ve yayın

Motor birim testleri; Playwright (iki dil, 1280/390 px, görevler, konsol hatası yok, yatay taşma yok); build/check/e2e; canlı test; bağımsız gözden geçirme. Modül kimliği MD-PBC, adres `md/md-pbc/`, kısa adresler `/tr/l/MD-PBC`, `/en/l/MD-PBC`; kitap prototipi `book/prototypes/MD-PBC_…_2026-09-26.html`.
