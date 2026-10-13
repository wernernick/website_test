# Designkonzept

Version 0.1 · Stand 2026-10-13 · gepflegt vom Design-Thread

Vorschau aller Bausteine: `docs/design-preview.html` im Browser öffnen (funktioniert direkt aus dem Repository, ohne Build).

Ausgelegt auf die Annahme aus der Roadmap: **persönliche Seite mit Portfolio**. Ändert sich der Zweck, passen Farben und Schriften weiterhin; Logo und Bildsprache folgen dann.

## Leitidee

**Klar gebaut, ruhig im Ton.** Viel Weißraum, eine Leitfarbe (Petrol), ein einziger warmer Gegenpol (Bernstein) und eine Überschriftenschrift mit Charakter. Hierarchie entsteht über Größe und Gewicht der Schrift, nicht über Rahmen, Schatten oder Farbflächen.

## Dateien

| Datei | Zweck |
|---|---|
| `src/styles/tokens.css` | Alle Design-Tokens als CSS-Variablen, helles und dunkles Theme. Einzige Quelle für Werte. |
| `src/styles/base.css` | Reset, Typografie, Layout-Helfer und Grundkomponenten (Button, Karte, Badge, Formular). Setzt `tokens.css` voraus. |
| `docs/design-preview.html`, `docs/design-preview.css` | Nur Vorschau, wird nicht auf der Website eingebunden. |

Einbinden in dieser Reihenfolge: `tokens.css`, dann `base.css`, dann seitenspezifisches CSS. In Astro z. B. im Basis-Layout per `import '../styles/tokens.css'; import '../styles/base.css';`.

## Regeln für alle Threads

1. **Keine festen Farbwerte** in Komponenten. Immer `var(--color-…)`. Neue Farben kommen zuerst in `tokens.css` (über den Design-Thread).
2. **Abstände nur aus dem 4px-Raster** (`--space-1` bis `--space-9`, `--space-section` zwischen Sektionen). Geschwisterelemente mit `gap` statt Einzel-Margins.
3. **Schatten sparsam:** Standardkarte hat Rahmen, `card--raised` nur für das eine hervorgehobene Element einer Ansicht.
4. **Bernstein (`--color-highlight`) nie für Text**, nur für Markierungen, Punkte, kleine Akzente. Er erreicht auf Hell keinen Textkontrast.
5. **Fließtext max. 66 Zeichen** breit (`--measure`), Überschriften mit `text-wrap: balance`.
6. **Beide Themes prüfen.** Ohne `data-theme` folgt die Seite dem System; `data-theme="light"`/`"dark"` auf `<html>` erzwingt eines.
7. **Touch-Ziele mindestens 44px** hoch (Buttons und Eingabefelder sind so angelegt).
8. **Fokus immer sichtbar** (`:focus-visible`, 2px Petrol-Ring). Nicht entfernen.
9. **Bewegung** nur über `--duration-*` und `--ease-out`; bei `prefers-reduced-motion` stehen alle Dauern auf 0.

## Farben

| Token | Hell | Dunkel | Verwendung |
|---|---|---|---|
| `--color-bg` | `#F5F7F6` | `#0D1514` | Seitenhintergrund |
| `--color-surface` | `#FFFFFF` | `#142020` | Karten, Felder, Navigation |
| `--color-surface-2` | `#EBF0EF` | `#1B2A29` | abgesetzte Bänder, Code, Hover |
| `--color-text` | `#132120` | `#E6EEEC` | Text, Überschriften |
| `--color-text-muted` | `#4E5E5B` | `#9AAFAB` | Nebentext |
| `--color-border` | `#CFD9D7` | `#2A3B39` | dekorative Linien |
| `--color-border-strong` | `#748784` | `#5F7774` | Ränder von Bedienelementen |
| `--color-accent` | `#0B6A64` | `#4CC3B8` | Links, Primärbutton, Fokus |
| `--color-accent-strong` | `#08504C` | `#7DD8CF` | Hover/aktiv |
| `--color-accent-soft` | `#DCEEEB` | `#163A37` | Badges, ausgewählte Zustände |
| `--color-on-accent` | `#FFFFFF` | `#0D1514` | Text auf Akzentfläche |
| `--color-highlight` | `#E9A23B` | `#F0B95A` | Markierung, Dekor |
| `--color-success` | `#1D7A46` | `#5CC98A` | Erfolg |
| `--color-warning` | `#94590A` | `#E8B04F` | Warnung |
| `--color-danger` | `#B8352A` | `#F07D72` | Fehler |

### Kontrast (WCAG 2.1, gegen `bg` / `surface`)

| Farbe | Hell | Dunkel |
|---|---|---|
| text | 15.4 / 16.6 | 15.7 / 14.2 |
| text-muted | 6.3 / 6.8 | 8.0 / 7.2 |
| accent | 6.0 / 6.4 | 8.6 / 7.8 |
| success | 5.0 / 5.4 | 9.0 / 8.1 |
| warning | 5.3 / 5.7 | 9.5 / 8.6 |
| danger | 5.5 / 5.9 | 7.0 / 6.3 |
| border-strong (UI, Ziel 3:1) | 3.5 / 3.8 | 3.9 / 3.5 |
| on-accent auf accent | 6.4 | 8.6 |

Alle Textfarben erfüllen AA (4.5:1), Text und Nebentext auch AAA.

## Typografie

| Rolle | Schrift | Fallback |
|---|---|---|
| Display (`--font-display`) | Bricolage Grotesque, 500–800 | Avenir Next, Segoe UI, system-ui |
| Text (`--font-body`) | Instrument Sans, 400–700 | Helvetica Neue, Segoe UI, system-ui |
| Mono (`--font-mono`) | JetBrains Mono, 400–500 | ui-monospace, Menlo, Consolas |

Alle drei stehen unter der SIL Open Font License.

**Wichtig (DSGVO):** Auf der Live-Seite die Schriften **selbst hosten** (WOFF2 im Repository, `@font-face` mit `font-display: swap`), nicht von Google Fonts laden. Das Einbinden über Google-Server überträgt die IP-Adresse der Besucher und wurde in Deutschland bereits abgemahnt (LG München I, 2022). Die Vorschauseite nutzt Google Fonts nur der Einfachheit halber.

Empfehlung für Astro: die Fontsource-Pakete `@fontsource-variable/bricolage-grotesque`, `@fontsource-variable/instrument-sans` und `@fontsource-variable/jetbrains-mono` installieren und im Basis-Layout importieren. Dann liefert die eigene Seite die Schriften aus. Die Familiennamen in `--font-*` müssen zu den Paketen passen (bei Fontsource-Variable z. B. `"Bricolage Grotesque Variable"`); `tokens.css` enthält bereits beide Schreibweisen.

### Skala (fluide zwischen 360px und 1280px Viewport)

| Token | Größe | Einsatz |
|---|---|---|
| `--text-4xl` | 40–72px | H1, Hero |
| `--text-3xl` | 32–48px | H2 |
| `--text-2xl` | 26–36px | H3 |
| `--text-xl` | 22–28px | H4 |
| `--text-lg` | 19–22px | Einleitung (`.lead`) |
| `--text-base` | 17px | Fließtext |
| `--text-sm` | 15px | Nebentext, Buttons |
| `--text-xs` | 13px | Labels (`.eyebrow`, Versalien, +0.08em) |

Zeilenhöhe: 1.1 Überschriften, 1.3 Zwischentitel/Lead, 1.6 Fließtext.

## Layout

- Inhaltsbreite `--container-max` 72rem (1152px), Textseiten `--container-narrow` 44rem.
- Seitenrand `--gutter` fluide 16–40px.
- Breakpoints: sm 640px, md 768px, lg 1024px, xl 1440px. Mobile first. Prüfbreiten laut ABNAHME.md: 375, 768, 1440px.
- Sektionen: `.section` mit `--space-section` (48–112px) oben und unten; abwechselnde Bänder über `--color-surface-2`.

## Komponenten in `base.css`

- `.btn` mit `--primary`, `--secondary`, `--ghost`
- `.card`, `.card--raised`
- `.badge`
- `.field`, `.input`, `.field__hint`, `.field__error`
- `.eyebrow`, `.lead`, `.muted`, `mark`
- `.container`, `.container--narrow`, `.section`, `.stack`

## Offene Punkte

- Logo und Wortmarke, sobald Zweck und Name der Website feststehen
- Bildsprache und Icon-Set
- Navigation und Footer als Komponenten (mit Frontend abstimmen)
