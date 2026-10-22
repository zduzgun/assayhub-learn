# AssayHub Learn

**English** | [Türkçe](README.tr.md)

AssayHub Learn is a bilingual (English and Turkish) set of interactive teaching modules on molecular dynamics (MD) and molecular docking. The modules run as static web pages in the browser. They accompany a Turkish MD textbook by the repository owner, *Biyomoleküler Sistemlerde Moleküler Dinamik Simülasyon* (in preparation, not yet published): each module belongs to a book chapter, and the book's QR codes point to permanent short addresses on the site. AssayHub Learn is open source: the code is licensed under Apache-2.0 and the original educational content under CC BY 4.0 (see [Licence and terms of use](#licence-and-terms-of-use)).

**Status: pilot preview.** All 27 modules are pilot versions. No independent scientific or target-reader review has been done yet. The site is deliberately closed to search engines (`robots.txt` and an `X-Robots-Tag: noindex` header). There are no published releases yet; see [Versions and releases](#versions-and-releases).

- Live preview: https://learn.assayhub.app (English: `/en/`, Turkish: `/tr/`)
- Book chapter map: `/en/book/` and `/tr/book/`
- Glossary (90 terms): `/en/glossary/` and `/tr/glossary/`

## Who it is for

- Life-science students and researchers (for example molecular biology, biochemistry, pharmacology) who use or read about MD and docking results, but are not simulation specialists.
- Teachers who want worked, inspectable examples for a course on biomolecular simulation.
- Developers interested in small, dependency-free educational web tools for computational chemistry.

## What it is for

Simulation and docking output is easy to produce and easy to over-interpret. The modules teach how to read such results: what a number measures, which decision it depends on (box size, cut-off, thermostat, force field, protonation, analysis window, error estimate) and which claim the data can support. Many modules connect a simulation idea to a familiar wet-lab situation (Western blot, qPCR, ELISA, FRET, NMR NOE, microscopy) so that readers can reuse the judgement they already have.

## What you can explore

Modules are grouped by application and level and follow the book's chapter order. Topics include:

- Foundations: energy and forces, time step and integration, ensembles and distributions, periodic boundaries, cut-offs, electrostatics and Ewald sums, thermostats and barostats, replication and control design, turning a biological question into a measurable MD study.
- Building and running systems: preparing a protein (ubiquitin, PDB 1UBQ), the structure file, force fields, ligand parameters, solvent and ions, minimization and equilibration, diagnosing failed runs.
- Analysis and inference: trajectory preparation, structural metrics (RMSD, Rg, RMSF), states and principal components, interactions (hydrogen bonds, salt bridges, contacts, SASA), sampling and uncertainty, error bars and honest comparison, reproducibility, and when standard MD is not enough (enhanced sampling with AWH).
- Docking: redocking as a positive control, the parts of the Vina score, cross-docking on several trypsin structures, and what a docking score can and cannot rank.

### Modules

The table below is generated from [`modules.json`](modules.json), which is the single source of truth for module IDs, titles, versions and status. Module IDs are permanent; content is versioned.

**Molecular dynamics, basic level** (8)

| ID | Title | Book chapter | Version | Status |
|---|---|---|---|---|
| MD-Q | Which sentence can these data carry? From a biological question to a measurable MD study | CH01 | 0.1.0 | pilot |
| MD-T | Energy, forces and numerical motion | CH02 | 0.2.0 | pilot |
| MD-ENS | Ensemble, distribution and average: what does an MD run represent? | CH03 | 0.2.1 | pilot |
| MD-PBC | The box without edges: periodic boundaries | CH04 | 0.6.1 | pilot |
| MD-CUT | Nearest image and cut-off | CH04 | 0.1.2 | pilot |
| MD-ELEC | Salt, screening and Ewald | CH04 | 0.1.1 | pilot |
| MD-CON | Controlling the simulation without spoiling the question: what do thermostats and barostats hold constant, and what do they distort? | CH05 | 0.1.1 | pilot |
| MD-REP | Is the difference real? Comparison, replication and control design | CH06 | 0.1.2 | pilot |

**Molecular dynamics, intermediate level** (12)

| ID | Title | Book chapter | Version | Status |
|---|---|---|---|---|
| MD-DT | The time step in a protein: constraints, mass and speed (1UBQ) | CH02 | 0.1.0 | pilot |
| MD-O | Preparing a protein for MD: ubiquitin (1UBQ) | CH07 | 0.2.1 | pilot |
| MD-PDB | The structure file: occupancy, B-factor and crystal waters (1UBQ) | CH07 | 0.1.0 | pilot |
| MD-FF | A force field is a model: force field and model compatibility | CH08 | 0.1.0 | pilot |
| MD-LIG | A ligand's parameters are a decision: ligand parameters and their provenance | CH09 | 0.1.0 | pilot |
| MD-SOLV | The solvent is part of the model too: ions and co-solvent | CH10 | 0.1.1 | pilot |
| MD-EQ | Minimization and equilibration | CH11 | 0.1.1 | pilot |
| MD-FAIL | Did the run stop, or silently finish wrong: when a simulation fails | CH12 | 0.1.0 | pilot |
| MD-TRJ | A raw file is not ready to measure: preparing a trajectory for analysis | CH13 | 0.1.0 | pilot |
| MD-MET | A number is not a structure: what does a structural measure measure? | CH14 | 0.1.1 | pilot |
| MD-INT | An interaction is a threshold definition: contacts, solvation, interactions | CH15 | 0.1.1 | pilot |
| MD-PCA | A state is a definition, a component is the result of a method: states and collective motions | CH16 | 0.1.1 | pilot |

**Molecular dynamics, advanced level** (4)

| ID | Title | Book chapter | Version | Status |
|---|---|---|---|---|
| MD-U | Sampling and uncertainty: alanine dipeptide | CH17 | 0.2.1 | pilot |
| MD-ERR | An error bar is the uncertainty of what? Error bars and honest comparison | CH18 | 0.1.0 | pilot |
| MD-FES | Is standard MD enough for this question? Deciding beyond standard MD | CH19 | 0.2.0 | pilot |
| MD-REPRO | Can someone else reach the same sentence from the same files? Reproduction and defensible work | CH24 | 0.1.0 | pilot |

**Molecular docking, basic level** (1)

| ID | Title | Book chapter | Version | Status |
|---|---|---|---|---|
| DK-T | Docking: finding a pose and checking it | after CH02 | 0.2.1 | pilot |

**Molecular docking, intermediate level** (1)

| ID | Title | Book chapter | Version | Status |
|---|---|---|---|---|
| DK-O | The real lock: which detail of the lock does the result depend on? | CH07 and CH09 | 0.3.1 | pilot |

**Molecular docking, advanced level** (1)

| ID | Title | Book chapter | Version | Status |
|---|---|---|---|---|
| DK-U | What does the score rank? | CH18 and CH19 | 0.2.3 | pilot |
## What is computed where

The site has no compute back end. Three kinds of content appear on the pages, and each page says which one it is showing:

1. **Teaching models computed live in your browser.** Small, simplified simulations written in JavaScript, for example a two-dimensional Lennard-Jones liquid (MD-PBC, MD-CUT), a two-dimensional ion lattice with an Ewald sum (MD-ELEC), a box of 125 rigid TIP3P waters (MD-EQ), a double-well Langevin model (MD-ENS) and simple wet-lab teaching models (Western blot, qPCR). The shared engine is [`assets-src/mdmini.js`](assets-src/mdmini.js). These are teaching models, not production MD.
2. **Precomputed results explored interactively.** GROMACS (2023.3 and 2026.3) simulations and AutoDock Vina 1.2.7 docking runs were run in advance by the author. Their results (energies, angles, trajectories reduced to small data files, docking poses and scores) are embedded in the pages and replayed or plotted. **Your browser does not run GROMACS or Vina.** When a parameter combination was not computed, the page says so instead of showing a result.
3. **Other browser-side calculations.** Some pages compute simple quantities from the embedded data (for example Henderson-Hasselbalch group charges in MD-O, block standard errors in MD-U and MD-ERR, SHA-256 hashes of files in MD-REPRO).

Where the data come from is listed on each module page and in the `data` field of [`modules.json`](modules.json). Third-party sources: PDB structures 3PTB, 2PTN, 1TNH, 2PTC, 1TGN and 1UBQ; ChEMBL Ki data; the mdshare alanine dipeptide (ALA2) trajectories. Details and licences: [`NOTICE.md`](NOTICE.md).

## Running locally

Requirements: Node.js 20 or later (the build and checks were last run with Node 22.22.0). There are no npm dependencies and no `package.json`; nothing needs to be installed.

```
node tools/build.mjs     # writes the site to dist/ (27 modules x 2 languages)
node tools/check.mjs     # pre-publication checks, including the language-rule tests
node --test              # unit tests (tests/mdmini.test.mjs and the language tests)
python3 -m http.server 8000 -d dist   # then open http://localhost:8000/en/
```

A plain static server does not apply `dist/_redirects` or `functions/`, so language-less addresses such as `/` or `/l/MD-T` and the short QR addresses will not redirect locally. Open the language-prefixed pages directly (`/en/...`, `/tr/...`). To test redirects as on the live site, Cloudflare's `npx wrangler pages dev dist` can be used; this was not run as part of the current documentation check.

Translation tools: `node tools/i18n.mjs extract <ID>` lists candidate strings for a module and `node tools/i18n.mjs check <ID>` checks its English table.

## How the repository is organised

```
modules.json        module registry: ID, app, level, title, path, version, status, book chapter, goals, data, notices; "en" holds English fields
book.json           the 20 book chapter units; /tr/book/ and /en/book/ are generated from it
glossary.json       90 glossary terms in both languages; /tr/glossary/ and /en/glossary/
sources/            module HTML sources (Turkish); copies of prototypes kept in the author's book project, see sources/SOURCES.md
i18n/               English translation tables (<ID>.en.json), shared term list, approval record (onay.json)
assets-src/         shared browser engine (mdmini.js) and the generator of the module card drawings (kart/kart.py)
lib/lang.js         language rule (pure function)
functions/          Cloudflare Pages Function: sends language-less addresses to /tr/ or /en/
static/             hand-written static files (_headers, robots.txt, 404 page, CSS, card drawings)
tools/              build.mjs, check.mjs, test-lang.mjs, i18n.mjs, sync-engine.mjs, mdt_arrhenius.mjs
tests/              unit tests for the shared engine (node --test)
docs/               architecture, deployment, changelog, design specs and plans, review records
dist/               generated site (not committed)
LICENSE             Apache License 2.0 (code)
LICENSES/           CC BY 4.0 legal code (educational content)
LICENSING.md        which part is under which licence; attribution; what is not licensed
NOTICE.md           third-party data and software and their licences
```

`tools/check.mjs` stops the build when a rule is broken, for example: unique and well-formed module IDs, every published module has a page in both languages, every short address resolves, no U+2014 dash in generated HTML, no local file paths in the output, a ChEMBL licence notice on pages that use ChEMBL data, and every file under the Cloudflare Pages size limit.

## Limitations of the pilot

- No independent scientific review of the modules has been done. A module being listed or published does not mean it has been validated.
- The English pages are AI translations (Claude) of the Turkish sources. The author approved each module's translation as a whole on 9 October 2026, without a line-by-line human review (`i18n/onay.json`; `reviewed` is false in every table).
- The modules and the book were developed by the author with AI assistance (Claude). Numbers shown on the pages come from the runs and data listed above; the run plans and audits are recorded in the module pages and in `docs/` and `sources/SOURCES.md`.
- The browser teaching models are simplified (two-dimensional, reduced units or small systems) and are labelled as such.
- The MD examples cover a small set of systems (alanine dipeptide, ubiquitin, trypsin with benzamidine, salt and urea solutions).
- The companion book is not yet published, and its manuscript is not part of this repository.

## Contributing and reporting problems

Bug reports, corrections to scientific or teaching content, translation fixes and module ideas are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) first: module pages are generated from copies of the author's prototypes, so most content changes are reported as issues and applied upstream by the maintainer.

## Licence and terms of use

- **Code:** Apache License 2.0, see [`LICENSE`](LICENSE).
- **Original educational content** (module text, exercises, figures, translations, glossary, card drawings, documentation and the data the author computed): Creative Commons Attribution 4.0 International (CC BY 4.0), see [`LICENSES/CC-BY-4.0.txt`](LICENSES/CC-BY-4.0.txt).
- Which file falls under which licence, how to attribute, and what is not licensed (the AssayHub names and icon, the Ala mascot, the companion book) is described in [`LICENSING.md`](LICENSING.md). The licences were chosen on 22 October 2026.
- **Third-party data** keep their own licences, listed in [`NOTICE.md`](NOTICE.md): PDB structures CC0 1.0; data derived from ChEMBL CC BY-SA 3.0 (used on the DK-T, DK-U, MD-LIG and MD-ERR pages); mdshare ALA2 CC BY 4.0.
- Software used to produce the data (GROMACS, AutoDock Vina, RDKit and others) does not run on the site; versions and licences are in `NOTICE.md`.

## Versions and releases

- Each module has its own content version in `modules.json` (for example MD-PBC 0.6.1).
- The site as a whole is described by the release notes in [`docs/CHANGELOG.md`](docs/CHANGELOG.md); the most recent numbered entry is 0.43.1 (22 October 2026). Entries headed "Yayımlanmamış" (unreleased) record documentation changes and carry no version number.
- The repository has no git tags and no GitHub releases yet. Archiving released versions (for example on Zenodo with a DOI) is planned but not done.

## Maintenance and next steps

These are intended goals, not commitments with dates:

- Scientific and educational review of each module, starting with the basic-level modules.
- Human review of the English translations and continued checks that both languages say the same thing.
- Keeping the build checks and unit tests green, and adding regression checks for embedded data.
- Short usage examples for teachers and a clearer contribution workflow.
- Collecting and recording feedback from readers and teachers who try the pilot.

More background: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) (the original design proposal of 25 September 2026, with a dated note on what changed since), [`docs/DEPLOY.md`](docs/DEPLOY.md) (hosting on Cloudflare Pages).

## Maintainer

Zekeriya Düzgün, Associate Professor of Medical Biology, Giresun University, Türkiye. Repository: https://github.com/zduzgun/assayhub-learn
