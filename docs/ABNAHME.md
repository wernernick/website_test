# Abnahme und Qualitätssicherung

Jede Änderung kommt als Pull Request gegen `main`. Der Qualitäts-Thread prüft
sie nach dieser Liste, gibt ein Review ab und trägt sie nach der Abnahme in den
[Versionsverlauf](../CHANGELOG.md) ein.

## Ablauf

1. Thread (Design, Frontend, Backend) öffnet einen PR und füllt die Vorlage aus.
2. Qualität prüft den PR anhand der Kriterien unten.
3. Ergebnis als GitHub-Review:
   - **Approve** = abgenommen.
   - **Request changes** = Mängel, mit konkreter Fundstelle und Erwartung.
4. Nach dem Merge: Eintrag unter `[Unreleased]` im CHANGELOG.
5. Release: Wenn ein sinnvoller Stand erreicht ist, wird `[Unreleased]` zu einer
   Version, getaggt (`vX.Y.Z`) und als GitHub-Release veröffentlicht.

## Versionsnummern

- **MAJOR** (`X.0.0`): Neugestaltung oder Bruch bestehender Inhalte/URLs.
- **MINOR** (`0.X.0`): neue Seite, neue Funktion, neuer Bereich.
- **PATCH** (`0.0.X`): Fehlerbehebung, Textkorrektur, kleine Stilanpassung.
- Bis zum ersten öffentlichen Stand bleibt die Version bei `0.y.z`.

## Prüfkriterien

### Funktion
- Die Seite baut und startet ohne Fehler (Build, Tests, Linter grün).
- Alle Links und Navigationspunkte funktionieren, keine 404.
- Formulare und Interaktionen tun, was sie sollen, inkl. Fehlerfälle.
- Keine Fehler oder Warnungen in der Browser-Konsole.

### Design-Konsistenz
- Farben, Schriften, Abstände kommen aus den gemeinsamen Design-Vorgaben.
- Darstellung ist auf Mobil (375 px), Tablet (768 px) und Desktop (1440 px) sauber,
  ohne horizontales Scrollen.
- Hell- und ggf. Dunkelmodus sind lesbar.

### Barrierefreiheit (Ziel: WCAG 2.2 AA)
- Kontrast Text/Hintergrund mindestens 4,5:1 (großer Text 3:1).
- Alle Bedienelemente per Tastatur erreichbar, Fokus sichtbar.
- Bilder haben sinnvolle `alt`-Texte, Formularfelder Labels.
- Überschriften-Hierarchie stimmt, `lang="de"` ist gesetzt.

### Performance
- Lighthouse (Mobil): Performance, Barrierefreiheit, Best Practices, SEO je ≥ 90.
- Bilder in passender Größe und modernem Format, Lazy Loading unterhalb des sichtbaren Bereichs.
- Keine unnötig großen Abhängigkeiten.

### Sicherheit und Inhalt
- Keine Zugangsdaten, Schlüssel oder privaten Daten im Repository.
- Eingaben werden serverseitig geprüft (Backend).
- Texte ohne Platzhalter oder Tippfehler; Impressum/Datenschutz vorhanden, sobald die Seite öffentlich ist.

## Abnahmeprotokoll

Jede Abnahme wird im PR als Review mit dieser Kurzform festgehalten:

```
Abnahme: bestanden | mit Auflagen | abgelehnt
Funktion: ✓/✗  Design: ✓/✗  Barrierefreiheit: ✓/✗  Performance: ✓/✗  Sicherheit: ✓/✗
Befunde: …
```
