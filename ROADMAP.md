# Roadmap

Gepflegt vom Steuerungs-Thread. Hier steht, was als Nächstes gebaut wird und
welcher Thread es übernimmt. Abgenommene Änderungen landen im
[Versionsverlauf](CHANGELOG.md), der Ablauf der Abnahme steht in
[docs/ABNAHME.md](docs/ABNAHME.md).

## Technische Richtung

| Thema | Entscheidung | Warum |
|---|---|---|
| Framework | [Astro](https://astro.build) (statische Seiten, TypeScript) | Schnell, wenig JavaScript im Browser, gute Lighthouse-Werte, Inhalte als Markdown möglich |
| Styling | Reines CSS mit Design-Tokens als CSS-Variablen (`src/styles/tokens.css`) | Keine schwere Abhängigkeit, Design-Thread steuert alle Werte an einer Stelle |
| Hosting | GitHub Pages, Veröffentlichung per GitHub Actions bei jedem Merge auf `main` | Kostenlos, kein eigener Server |
| CI | GitHub Actions: Build, Formatprüfung, Link-Check, Lighthouse bei jedem PR | Feste Grundlage für die Abnahme |
| Backend | Erst wenn nötig (Kontaktformular), dann als Serverless-Funktion oder Formulardienst | Kein Server betreiben, solange die Seite statisch reicht |
| Node | Version 22 LTS, Paketmanager npm | Standard, in Actions vorinstalliert |

Arbeitsweise: Jede Änderung als Pull Request gegen `main`, ein Thema pro PR,
Abnahme durch den Qualitäts-Thread vor dem Merge.

## Zuständigkeiten

| Thread | Bereich | Dateien (Schwerpunkt) |
|---|---|---|
| Design | Farben, Typografie, Abstände, Komponenten-Entwürfe | `src/styles/tokens.css`, `docs/DESIGN.md` |
| Frontend | Seiten, Layouts, Komponenten, Inhalte | `src/pages/`, `src/layouts/`, `src/components/` |
| Backend | Build, CI/CD, Hosting, später Formular-/Serverlogik | `.github/workflows/`, `astro.config.mjs`, `package.json` (Skripte) |
| Qualität | Prüfung, Abnahme, Versionsverlauf, Releases | `CHANGELOG.md`, `docs/ABNAHME.md` |
| Steuerung | Roadmap, Aufgabenverteilung, Fortschritt | `ROADMAP.md` |

## Meilensteine

### v0.1.0 – Fundament (aktuell)

Ziel: Eine erreichbare, saubere Startseite mit automatischer Prüfung und Veröffentlichung.

- [ ] **Frontend:** Astro-Projekt anlegen (`npm create astro`, TypeScript strict), Basis-Layout mit `lang="de"`, Kopfzeile mit Navigation, Fußzeile, Startseite mit Hero-Bereich. Nutzt die Tokens aus `tokens.css`.
- [ ] **Design:** Designkonzept in `docs/DESIGN.md` (Stimmung, Farbpalette mit geprüften Kontrasten, Schriften, Abstands-Skala, Breakpoints 375/768/1440) und `src/styles/tokens.css` mit allen Werten als CSS-Variablen, inkl. Dunkelmodus.
- [ ] **Backend:** GitHub-Actions-Workflow für PRs (Build, Prettier-Check, Link-Check) und Deploy-Workflow auf GitHub Pages bei Merge auf `main`. `site`/`base` in `astro.config.mjs` passend für `wernernick.github.io/website_test`.
- [ ] **Qualität:** Lighthouse-CI in die PR-Prüfung aufnehmen (Schwellen aus ABNAHME.md), alle PRs abnehmen, Release `v0.1.0` taggen.

Reihenfolge: Frontend legt das Gerüst zuerst an. Design und Backend arbeiten parallel und
bauen auf `main` auf, sobald das Gerüst gemergt ist.

### v0.2.0 – Inhalte

- Seiten „Über mich“, „Projekte“ und „Kontakt“ (Kontakt zunächst als Mail-Link).
- Projekte als Astro Content Collection (Markdown-Dateien), Projektkarten-Komponente.
- Impressum und Datenschutzerklärung.
- 404-Seite im Design der Website.
- SEO-Grundlagen: Meta-Tags, Open-Graph-Bild, `sitemap.xml`, `robots.txt`.

### v0.3.0 – Interaktion

- Kontaktformular mit serverseitiger Prüfung und Spam-Schutz (Backend).
- Umschalter Hell/Dunkel, Auswahl wird gespeichert.
- Optimierte Bilder (Astro Image), Lazy Loading.

### Später (Ideen-Speicher)

- Blog/Notizen mit RSS-Feed.
- Datenschutzfreundliche Besucherstatistik (z. B. Plausible oder GoatCounter).
- Mehrsprachigkeit (DE/EN).
- Eigene Domain.

## Offene Fragen an Nick

- Wofür ist die Seite gedacht? Annahme bis zur Antwort: **persönliche Seite mit Portfolio**.
