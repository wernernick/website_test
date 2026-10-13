# Website

Web-App auf Basis von [SvelteKit](https://svelte.dev/docs/kit) (Svelte 5, TypeScript strict) mit `adapter-node`.
Planung und Zuständigkeiten stehen in der [Roadmap](ROADMAP.md), der Ablauf der Abnahme in
[docs/ABNAHME.md](docs/ABNAHME.md), abgenommene Änderungen im [Versionsverlauf](CHANGELOG.md).

## Voraussetzungen

- Node.js 22 (siehe `.nvmrc`) und npm
- Docker (für die lokale PostgreSQL-Datenbank)

## Datenbank einrichten

```sh
cp .env.example .env   # lokale Verbindungsdaten
npm run db:start       # PostgreSQL 16 per Docker starten
npm run db:migrate     # Tabellen anlegen
```

`DATABASE_URL` muss auch für `npm run build` gesetzt sein. Ob Server und Datenbank laufen, zeigt
`GET /api/health`.

## Befehle

| Befehl                | Zweck                                                          |
| --------------------- | -------------------------------------------------------------- |
| `npm install`         | Abhängigkeiten installieren                                    |
| `npm run dev`         | Entwicklungsserver starten                                     |
| `npm run build`       | Produktions-Build nach `build/` erzeugen                       |
| `npm run preview`     | Produktions-Build lokal ansehen                                |
| `npm run check`       | Typprüfung mit `svelte-check`                                  |
| `npm run lint`        | Formatprüfung (Prettier) und ESLint                            |
| `npm run format`      | Code mit Prettier formatieren                                  |
| `npm test`            | Unit- und Komponententests (Vitest) und E2E-Tests (Playwright) |
| `npm run db:start`    | Lokale PostgreSQL-Datenbank per Docker starten                 |
| `npm run db:generate` | Migration aus `src/lib/server/db/schema.ts` erzeugen           |
| `npm run db:migrate`  | Ausstehende Migrationen anwenden                               |
| `npm run db:studio`   | Datenbank im Browser ansehen (Drizzle Studio)                  |

Den Produktions-Build startet `node build` (Port über `PORT`, Standard 3000).

## Aufbau

- `src/routes/` Seiten und Layouts
- `src/lib/components/` wiederverwendbare UI-Komponenten
- `src/lib/styles/tokens.css` Design-Tokens (Farben, Schrift, Abstände), gepflegt vom Design-Thread.
  Komponenten verwenden nur diese Variablen (`var(--…)`), keine festen Werte.
- `src/lib/server/`, `+page.server.ts`, `+server.ts` Serverlogik (Backend-Thread)
- `src/lib/server/db/schema.ts` Datenbankschema (Drizzle), Migrationen in `drizzle/`
