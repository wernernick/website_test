# Designkonzept

Version 0.2 · Stand 2026-10-13 · gepflegt vom Design-Thread

Vorschau aller Bausteine und Muster: `docs/design-preview.html` im Browser öffnen (funktioniert direkt aus dem Repository, ohne Build).

## Leitidee

**Klar gebaut, ruhig im Ton.** Eine Web-App, in der man arbeitet: Petrol führt durch die Bedienung (Primäraktion, aktive Navigation, Fokus), Bernstein markiert, alles andere bleibt zurückhaltend. Hierarchie entsteht über Schriftgröße und Gewicht, nicht über Rahmen und Schatten.

Zwei Dichten:
- **App-Bereich** (`/app`): feste, kompakte Größen (14–16px), dichte Tabellen, Seitenleiste.
- **Landingpage und Anmeldeseiten**: mehr Luft, fluide Überschriften in der Display-Schrift, große Felder.

## Dateien

| Datei | Zweck |
|---|---|
| `src/lib/styles/tokens.css` | Alle Design-Tokens als CSS-Variablen, helles und dunkles Theme. Einzige Quelle für Werte. |
| `src/lib/styles/base.css` | Reset, Typografie, App-Shell und Grundkomponenten als Klassen. Setzt `tokens.css` voraus. |
| `docs/design-preview.html`, `docs/design-preview.css` | Nur Vorschau, wird nicht in der App eingebunden. |

Einbinden im Root-Layout `src/routes/+layout.svelte`:

```svelte
<script lang="ts">
  import '@fontsource-variable/bricolage-grotesque';
  import '@fontsource-variable/instrument-sans';
  import '@fontsource-variable/jetbrains-mono';
  import '$lib/styles/tokens.css';
  import '$lib/styles/base.css';
  let { children } = $props();
</script>

{@render children()}
```

Svelte-Komponenten in `src/lib/components/` verwenden die Klassen aus `base.css` oder in ihrem `<style>`-Block ausschließlich Tokens.

## Regeln für alle Threads

1. **Keine festen Farbwerte** in Komponenten. Immer `var(--color-…)`. Neue Farben kommen zuerst in `tokens.css` (über den Design-Thread).
2. **Abstände nur aus dem 4px-Raster** (`--space-1` bis `--space-9`). Geschwisterelemente mit `gap` statt Einzel-Margins.
3. **Höhen von Bedienelementen** nur über `--control-h-sm/md/lg`. Auf Touch-Geräten wachsen sie automatisch auf mindestens 44px.
4. **Eine Primäraktion pro Ansicht** (`.btn--primary`). Daneben `--secondary` oder `--ghost`. Zerstörende Aktionen `--danger`, immer mit Bestätigung.
5. **Bernstein (`--color-highlight`) nie für Text**, nur für Markierungen und kleine Akzente.
6. **Status immer mit Text**, nie nur mit Farbe (Badge „Überfällig“, nicht nur ein roter Punkt).
7. **Fehler am Feld**: `aria-invalid="true"` am Eingabefeld, Meldung in `.field__error` per `aria-describedby` verknüpft. Bei mehreren Fehlern zusätzlich `.alert--danger` mit `role="alert"` über dem Formular. Meldungen sagen, was zu tun ist („Mindestens 12 Zeichen“), nicht nur was falsch ist.
8. **Ladezustand**: Button mit `aria-busy="true"` und `disabled` bis zur Antwort, Text beschreibt den Vorgang („Konto wird erstellt“). Listen laden mit `.skeleton`.
9. **Leere Zustände** erklären, was erscheinen wird, und bieten die erste Aktion an (`.empty`).
10. **Fokus immer sichtbar.** Nicht entfernen.
11. **Beide Themes prüfen.** Ohne `data-theme` folgt die App dem System; `data-theme="light"`/`"dark"` auf `<html>` erzwingt eines (für den späteren Umschalter).
12. **Bewegung** nur über `--duration-*` und `--ease-out`; bei `prefers-reduced-motion` stehen alle Dauern auf 0.

## Farben

| Token | Hell | Dunkel | Verwendung |
|---|---|---|---|
| `--color-bg` | `#F5F7F6` | `#0D1514` | App-Hintergrund |
| `--color-surface` | `#FFFFFF` | `#142020` | Panels, Felder, Seitenleiste, Kopfzeile |
| `--color-surface-2` | `#EBF0EF` | `#1B2A29` | Tabellenkopf, Hover, deaktivierte Felder |
| `--color-surface-3` | `#FFFFFF` | `#22312F` | Menüs, Dialoge, Toasts |
| `--color-text` | `#132120` | `#E6EEEC` | Text |
| `--color-text-muted` | `#4E5E5B` | `#9AAFAB` | Nebentext, Platzhalter |
| `--color-border` | `#CFD9D7` | `#2A3B39` | Trenner, Kartenränder |
| `--color-border-strong` | `#748784` | `#5F7774` | Ränder von Bedienelementen |
| `--color-overlay` | Schwarzgrün 45 % | Schwarz 60 % | Abdunklung hinter Dialogen |
| `--color-accent` | `#0B6A64` | `#4CC3B8` | Primäraktion, Links, Fokus |
| `--color-accent-strong` | `#08504C` | `#7DD8CF` | Hover/aktiv |
| `--color-accent-soft` | `#DCEEEB` | `#163A37` | aktive Navigation, ausgewählte Zeile |
| `--color-on-accent` | `#FFFFFF` | `#0D1514` | Text auf Akzent- und Gefahrflächen |
| `--color-highlight` | `#E9A23B` | `#F0B95A` | Markierung, Dekor |
| `--color-success` / `-soft` | `#1D7A46` / `#E1F2E8` | `#5CC98A` / `#143222` | Erfolg |
| `--color-warning` / `-soft` | `#94590A` / `#FBEFD9` | `#E8B04F` / `#3A2C12` | Warnung |
| `--color-danger` / `-soft` | `#B8352A` / `#FBE5E2` | `#F07D72` / `#3E1E1B` | Fehler, Löschen |
| `--color-info` / `-soft` | `#2459B8` / `#E3ECFA` | `#7FA8F0` / `#1A2A45` | Hinweis |

### Kontrast (WCAG 2.2)

| Kombination | Hell | Dunkel |
|---|---|---|
| text auf bg / surface | 15.4 / 16.6 | 15.7 / 14.2 |
| text-muted auf bg / surface / surface-2 | 6.3 / 6.8 / 5.9 | 8.0 / 7.2 / 6.5 |
| accent auf bg / surface | 6.0 / 6.4 | 8.6 / 7.8 |
| on-accent auf accent | 6.4 | 8.6 |
| accent-strong auf accent-soft | 7.7 | 7.4 |
| success auf success-soft | 4.6 | 6.7 |
| warning auf warning-soft | 5.0 | 6.9 |
| danger auf danger-soft | 4.9 | 5.6 |
| info auf info-soft | 5.5 | 6.0 |
| border-strong auf bg / surface (Ziel 3:1) | 3.5 / 3.8 | 3.9 / 3.5 |

Alle Textkombinationen erfüllen AA (4.5:1).

## Typografie

| Rolle | Schrift | Einsatz |
|---|---|---|
| Display (`--font-display`) | Bricolage Grotesque | Hero, Seitentitel, Kennzahlen |
| Text (`--font-body`) | Instrument Sans | alles andere: Text, Tabellen, Formulare, Navigation |
| Mono (`--font-mono`) | JetBrains Mono | Codes, Kennungen, technische Werte |

Alle drei stehen unter der SIL Open Font License.

**Wichtig (DSGVO):** Schriften **selbst hosten**, nicht von Google Fonts laden. Das Einbinden über Google-Server überträgt die IP-Adresse der Besucher und wurde in Deutschland bereits abgemahnt (LG München I, 2022). Umsetzung über die Fontsource-Pakete `@fontsource-variable/bricolage-grotesque`, `@fontsource-variable/instrument-sans` und `@fontsource-variable/jetbrains-mono` (siehe Einbinden oben); die Font-Stacks in `tokens.css` enthalten deren Namen bereits. Die Vorschauseite nutzt Google Fonts nur der Einfachheit halber.

### Skala

| Token | Größe | Einsatz |
|---|---|---|
| `--text-4xl` | 40–72px fluide | Hero der Landingpage (`.display-1`) |
| `--text-3xl` | 32–48px fluide | Abschnittstitel Landingpage (`.display-2`) |
| `--text-2xl` | 26–36px fluide | Titel der Anmeldeseiten, Kennzahlen (`.stat__value`) |
| `--text-xl` | 22px | Seitentitel in der App (`h1`, `.page-title`) |
| `--text-lg` | 18px | Abschnitte in Panels (`h2`, `.section-title`), Lead |
| `--text-base` | 16px | Fließtext, Eingabefelder (16px verhindert Zoom auf iOS) |
| `--text-sm` | 14px | Tabellen, Buttons, Navigation, Labels |
| `--text-xs` | 12px | Tabellenkopf, Versal-Labels, Badges, Feldhinweise |

Zahlen in Tabellen und Kennzahlen mit `font-variant-numeric: tabular-nums` (`.num`).

## Layout

- **App-Shell** (`.app-shell`): Kopfzeile 56px (`.app-topbar`), Seitenleiste 240px (`.app-sidebar`) ab 1024px; darunter ist die Navigation über den Menü-Button (`.app-menu-btn`) als Schublade erreichbar (Umsetzung Frontend).
- Inhalt (`.app-main__inner`) max. 1280px, Seitenkopf mit Titel links und Aktionen rechts (`.page-header`).
- Anmeldeseiten: zentrierte Karte, max. 448px (`.auth-page`, `.auth-card`).
- Landingpage: `.container` max. 1152px, Sektionen mit `--space-section`.
- Seitenrand `--gutter` fluide 16–32px.
- Breakpoints: sm 640px, md 768px, lg 1024px (Seitenleiste fest), xl 1440px. Mobile first. Prüfbreiten laut ABNAHME.md: 375, 768, 1440px.
- Ebenen über `--z-*`: sticky 10, Seitenleiste 20, Menüs 30, Overlay 40, Dialog 50, Toast 60.

## Komponenten in `base.css`

| Baustein | Klassen | Zustände |
|---|---|---|
| Button | `.btn` + `--primary`, `--secondary`, `--ghost`, `--danger`; Größen `--sm`, `--lg`; `--block` | hover, `:focus-visible`, `disabled`, `aria-busy="true"` |
| Eingabe | `.field`, `.field__label`, `.input`, `.select`, `.textarea`, `.field__hint`, `.field__error`, `.check` | hover, focus, `aria-invalid`, `disabled`, `readonly` |
| Hinweis | `.alert` + `--info`, `--success`, `--warning`, `--danger` | |
| Badge | `.badge` + `--accent`, `--success`, `--warning`, `--danger`, `--info` | |
| Panel | `.card`, `.card--raised`, `.card__header` | |
| Kennzahl | `.stat`, `.stat__value`, `.stat__delta--up/--down` | |
| Tabelle | `.table-wrap`, `.table`, `.num` | Zeilen-Hover, `aria-selected="true"` |
| Navigation | `.nav-item` | hover, `aria-current="page"` |
| Leer / Laden | `.empty`, `.skeleton` | |
| Sonstiges | `.avatar`, `.divider`, `.visually-hidden`, `.stack`, `.cluster` | |

## Offene Punkte

- Logo und Name der App, sobald die Kernfunktion feststeht
- Icon-Set (Vorschlag: Lucide, als Svelte-Paket, Strichstärke passend zur Vorschau)
- Dialog, Menü/Dropdown, Toast und mobile Navigationsschublade als Svelte-Komponenten (mit Frontend)
- Seitenentwürfe für Registrierung, Anmeldung und leeres Dashboard (v0.2.0)
