# Üçüncü taraf verileri ve yazılımları

Bu sitedeki modüller aşağıdaki kaynaklardan türetilen veriler içerir. Lisanslar 25 Eylül 2026'da birincil kaynaklardan doğrulandı.

## Veriler

| Kaynak | Kullanıldığı modül | Lisans | Koşul |
|---|---|---|---|
| RCSB/wwPDB, PDB 3PTB ve 1UBQ | DK-O, DK-U, MD-O | CC0 1.0 Universal | Kamu malı. Özgün yazarlara atıf önerilir: 3PTB için Marquart M ve ark. *Acta Crystallogr B* 1983;39:480. |
| ChEMBL (EMBL-EBI), tripsin CHEMBL3769 ve dopamin D2 CHEMBL217 K<sub>i</sub> verisi | DK-U | CC BY-SA 3.0 Unported | Atıf ve aynı lisansla paylaşım. DK-U sayfasındaki türetilmiş bileşik verisi CC BY-SA 3.0 ile sunulur. Atıf: Zdrazil B ve ark. The ChEMBL Database in 2023. *Nucleic Acids Res* 2024;52(D1):D1180-D1192. |
| mdshare, alanin dipeptit (ALA2) | MD-U (planlandı) | CC BY 4.0 | Atıf. |

ChEMBL, ticari yazılımla hesaplanmış bazı bileşik özelliklerinin ayrıca çıkarılıp model eğitiminde kullanılmamasını ister. DK-U yalnız K<sub>i</sub> değerlerini ve yapıları kullanır; bileşik özellikleri RDKit ile yeniden hesaplanmıştır.

Kaynak sayfalar: [wwPDB kullanım politikası](https://www.wwpdb.org/about/usage-policies), [ChEMBL SSS](https://chembl.gitbook.io/chembl-interface-documentation/frequently-asked-questions/general-questions), [mdshare ALA2](https://markovmodel.github.io/mdshare/ALA2/).

## Verileri üretmek için kullanılan yazılımlar

Bu yazılımlar sitede çalışmaz; yalnız modüllerdeki verileri üretmek için kullanıldı.

| Yazılım | Sürüm | Lisans |
|---|---|---|
| AutoDock Vina | 1.2.7 | Apache-2.0 |
| Meeko | 0.8.0 | LGPL-2.1 |
| RDKit | 2026.03.6 (DK-O), 2025.09.6 (DK-U) | BSD-3-Clause |
| gemmi | 0.7.5 | MPL-2.0 |
| NumPy | 2.4.4 | BSD-3-Clause ve uyumlu |

Not: DK-U verisi üretilirken çalışma alanında RDKit, başka bir paketin bağımlılığı nedeniyle 2025.09.6 sürümüne düşürülmüştü; DK-U sayfası ve tarama protokolü buna göre düzeltildi (bkz. `docs/CHANGELOG.md`).
