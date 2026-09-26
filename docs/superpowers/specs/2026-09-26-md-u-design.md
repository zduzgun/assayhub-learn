# MD-U tasarımı: yakınsama ve örnekleme (alanin dipeptidi)

Tarih: 26 Eylül 2026. Onay: proje sahibi, bölüm bölüm ("uygun", "uygun", "onaylıyorum; bundan sonrakileri de onaylıyorum; pilotu başlat bitir").

## Amaç

Uzman düzey (kitap CH17) iki dilli etkileşimli modül. Okur, sakin bir eğrinin ya da benzer görünen iki pencerenin denge kanıtı olmadığını, 10.000 karenin 10.000 bağımsız örnek olmadığını ve bir popülasyon iddiasının analiz kararlarının sonuca bakmadan sabitlenmesini gerektirdiğini kendi elleriyle görür. Her sayı bizim ürettiğimiz gerçek GROMACS koşularından gelir; hesaplanmayan seçimde sayfa "Bu senaryo hesaplanmadı" yazar ve sayı göstermez.

## Kararlar

- Veri kendimiz üretilir (mdshare koşu verisi kullanılmaz). Başlangıç koordinatları: mdshare `alanine-dipeptide-nowater.pdb` (22 atom, SHA-256 `20d4ff8f…bf9f5`, CC BY 4.0, atıfla).
- GROMACS 2026.3 (en güncel sürüm, 25 Haziran 2026). Kaynak GitHub'dan kullanıcı bilgisayarında indirilir (SHA-256 `487e4f37…099e1`), bulutta derlenir.
- AMBER99SB-ILDN + TIP3P, dodekahedron 1,0 nm, 300 K, PME, H içeren bağlar LINCS, 2 fs.
- İki aşama. Aşama 1 pilot: bulutta 5 bağımsız koşu × 10 ns. Aşama 2 üretim: aynı dondurulmuş protokolle daha uzun koşular (ör. 5 × 200 ns), TRUBA ya da kullanıcının GPU'su. Aşama 2 verisi gelene kadar üretim seçimleri "hesaplanmadı".
- Analiz planı koşulardan önce dondurulur (`PROTOCOL.sha256`): φ/ψ, üç durumlu tam bölüntü (αR, β/PPII, αL), 24×24 periyodik ızgara, eşit pencereler (1, 2, 5 ns) ve TVD, durum göstergesi otokorelasyonu, g (blok ortalaması ve Sokal pencereli bütünleşik otokorelasyon), N_eff, saf ve koşular arası hata. Sınırlar sonuca bakıp değiştirilmez; önceden yazılmış iki duyarlılık sınırı (ψ sınırı ±20°) ayrıca raporlanır.
- D10: proje sahibi 26 Eylül 2026'da yayına onay verdi; tarihli karar notu D10 kaydına eklenir.

## Sayfa

Altı laboratuvar ve sınav: (1) sakin RMSD, gezen açılar; (2) durumları önceden tanımlamak ve periyodik sınır; (3) eşit pencereler ve TVD; (4) otokorelasyon, blok ortalaması, g, N_eff; (5) beş bağımsız koşu ve iki tür hata çubuğu; (6) pilot ve üretim, söylenebilir/söylenemez. "Bu sayfa hakkında": derleme ve makine bilgisi, tohumlar, protokol hash'i, atıf, NOT_EXECUTED listesi. Görsel dil MD-O ile aynı.

## Dosyalar ve veri akışı

Kitap: `book/cases/alanine_dipeptide/` (`inputs/`, `PROTOCOL_2026-09-26.md`, `PROTOCOL.sha256`, `build/`, `pilot/run1..run5/`, `production/` iş betiği ve talimat, `learn/analysis.py`, `extract.py`, `verify.py`, testler, `md-u_data.json`). Veri paketi her sonucu `phase` alanıyla etiketler. Site: `sources/MD-U.html`, `i18n/MD-U.en.json`, modules.json, SOURCES.md, CHANGELOG; `/tr/l/MD-U`, `/en/l/MD-U`; kitap prototipi `book/prototypes/MD-U_…_2026-09-26.html`.

## Test

Analiz fonksiyonlarına yapay verili birim testler (g'si bilinen AR(1), periyodik sınır, TVD uçları); `verify.py` açıları `gmx angle` ve ayrı bir Python okuyucusuyla karşılaştırır, popülasyonları ham karelerden yeniden sayar; Playwright iki dil ve iki genişlik, hesaplanmayan seçimde rakam yok denetimi; build/check/e2e; canlı test; sonda bağımsız gözden geçirme.

## Yapılmayanlar

Kuvvet alanı karşılaştırması, deneysel veriyle kıyas, gelişmiş örnekleme, bilinen bir denge referansıyla karşılaştırma. Pilot 10 ns'lik koşular denge, yakınsama ya da popülasyon kanıtı değildir.
