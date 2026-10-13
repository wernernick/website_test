# Roadmap

Gepflegt vom Steuerungs-Thread. Hier steht, was als Nächstes gebaut wird und
welcher Thread es übernimmt. Abgenommene Änderungen landen im
[Versionsverlauf](CHANGELOG.md), der Ablauf der Abnahme steht in
[docs/ABNAHME.md](docs/ABNAHME.md).

Ziel: eine **Web-App** mit Benutzerkonten und eigener Datenbank.

## Technische Richtung

| Thema | Entscheidung | Warum |
|---|---|---|
| Framework | [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5, TypeScript strict) | Frontend und Server in einem Projekt, serverseitiges Rendern, Formulare funktionieren auch ohne JavaScript, wenig Code im Browser |
| Styling | Reines CSS mit Design-Tokens als CSS-Variablen (`src/lib/styles/tokens.css`) | Keine schwere Abhängigkeit, Design-Thread steuert alle Werte an einer Stelle |
| Datenbank | PostgreSQL mit [Drizzle ORM](https://orm.drizzle.team) und versionierten Migrationen | Verbreitet, typsicher, bei allen gängigen Anbietern verfügbar |
| Lokale Entwicklung | `docker compose` startet PostgreSQL, `.env.example` beschreibt alle Variablen | Jeder Thread und die CI haben dieselbe Umgebung |
| Anmeldung | Eigene Sitzungen per HTTP-only-Cookie, Passwörter mit Argon2id gehasht (Vorgehen nach [Lucia-Leitfaden](https://lucia-auth.com)) | Keine Abhängigkeit von Drittanbietern, volle Kontrolle über Daten |
| Tests | Vitest (Logik), Playwright (Ende-zu-Ende) | Standard in SvelteKit |
| CI | GitHub Actions: Lint, Typprüfung, Tests, Build bei jedem PR, mit PostgreSQL als Service | Feste Grundlage für die Abnahme |
| Hosting | Offen, wird vor v0.2.0 entschieden (Vorschlag: Vercel oder Fly.io plus verwaltetes PostgreSQL wie Neon) | Braucht ein Konto von Nick |
| Node | Version 22 LTS, Paketmanager npm | Standard, in Actions vorinstalliert |

Arbeitsweise: Jede Änderung als Pull Request gegen `main`, ein Thema pro PR,
Abnahme durch den Qualitäts-Thread vor dem Merge.

## Zuständigkeiten

| Thread | Bereich | Dateien (Schwerpunkt) |
|---|---|---|
| Design | Farben, Typografie, Abstände, Komponenten- und Seitenentwürfe | `src/lib/styles/`, `docs/DESIGN.md` |
| Frontend | Seiten-Oberflächen, Layouts, UI-Komponenten, Formular-Darstellung | `src/routes/**/+page.svelte`, `+layout.svelte`, `src/lib/components/` |
| Backend | Datenbank, Anmeldung, Serverlogik, API, CI/CD, Hosting | `src/lib/server/`, `+page.server.ts`, `+server.ts`, `src/hooks.server.ts`, `drizzle/`, `.github/workflows/`, `docker-compose.yml` |
| Qualität | Prüfung, Abnahme, Versionsverlauf, Releases, Ende-zu-Ende-Tests | `CHANGELOG.md`, `docs/ABNAHME.md`, `tests/` |
| Steuerung | Roadmap, Aufgabenverteilung, Fortschritt | `ROADMAP.md` |

## Meilensteine

### v0.1.0 – Fundament (aktuell)

Ziel: Ein lauffähiges SvelteKit-Projekt mit Landingpage, Datenbankanbindung und automatischer Prüfung.

- [ ] **Frontend:** SvelteKit-Projekt anlegen (`npx sv create`, TypeScript, Prettier, ESLint, Vitest, Playwright, adapter-node), Basis-Layout mit `lang="de"`, Kopfzeile mit Anmelden/Registrieren, Fußzeile, Landingpage mit Hero.
- [ ] **Design:** Designkonzept in `docs/DESIGN.md` (Leitidee, Farbpalette hell/dunkel mit geprüften Kontrasten, Schriften, Abstände, Breakpoints 375/768/1440, Formular- und Button-Zustände) und `src/lib/styles/tokens.css`.
- [ ] **Backend:** `docker-compose.yml` mit PostgreSQL, Drizzle eingerichtet (`src/lib/server/db/`), erste Migration (Tabellen `user`, `session`), `.env.example`, Health-Endpunkt `/api/health`. CI-Workflow für PRs (lint, check, test, build, mit PostgreSQL-Service).
- [ ] **Qualität:** Abnahme aller PRs, Playwright-Grundtest (Startseite lädt, keine Konsolenfehler) und Lighthouse-Prüfung in die CI, Release `v0.1.0`.

Reihenfolge: Frontend legt das Gerüst zuerst an. Design und Backend arbeiten parallel und
bauen darauf auf, sobald es gemergt ist.

### v0.2.0 – Benutzerkonten

- Registrierung, Anmeldung, Abmeldung (Backend: Logik und Sitzungen, Frontend: Formulare, Design: Entwurf der Seiten).
- Geschützter Bereich `/app` mit leerem Dashboard, Weiterleitung für nicht angemeldete Besucher.
- Schutz: Ratenbegrenzung bei Anmeldung, CSRF durch SvelteKit-Standard, serverseitige Validierung (z. B. mit Zod oder Valibot).
- Hosting entscheiden und Deploy-Workflow einrichten (Staging bei jedem Merge auf `main`).
- Impressum und Datenschutzerklärung.
- Konto löschen im geschützten Bereich (Recht auf Löschung, Art. 17 DSGVO), inkl. aller Sitzungen.

### v0.3.0 – Kernfunktion

- Die eigentliche Funktion der App. **Hängt von Nicks Antwort ab, was die App können soll.**

### Später (Ideen-Speicher)

- Passwort zurücksetzen per E-Mail, E-Mail-Bestätigung.
- Profilseite mit Datenexport (Art. 20 DSGVO).
- Hell/Dunkel-Umschalter.
- Fehler-Monitoring und datenschutzfreundliche Statistik.
- Mehrsprachigkeit (DE/EN), eigene Domain.

## Offene Fragen an Nick

- Was soll die Web-App können (Kernfunktion, Zielgruppe)?
- Hosting-Anbieter (vor v0.2.0).
