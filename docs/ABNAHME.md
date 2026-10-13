# Abnahme und Qualitätssicherung

Jede Änderung kommt als Pull Request gegen `main`. Der Qualitäts-Thread prüft
sie nach dieser Liste, gibt ein Review ab und trägt sie nach der Abnahme in den
[Versionsverlauf](../CHANGELOG.md) ein.

## Ablauf

1. Thread (Design, Frontend, Backend) öffnet einen PR und füllt die Vorlage aus.
2. Qualität prüft den PR anhand der Kriterien unten.
3. Ergebnis als GitHub-Review vom Typ Kommentar mit dem Abnahmeprotokoll (siehe unten).
   Alle PRs laufen über Nicks Account, und GitHub erlaubt kein Approve des eigenen PRs.
   - **Abnahme: bestanden** = darf gemergt werden.
   - **Abnahme: mit Auflagen** = darf gemergt werden, Auflagen werden als Folgeaufgabe erledigt.
   - **Abnahme: abgelehnt** = Mängel, mit konkreter Fundstelle und Erwartung; erst nach Nachbesserung erneut prüfen.
4. Gemergt wird erst nach der Abnahme; wer mergt, entscheidet Nick.
5. Nach dem Merge: Eintrag unter `[Unreleased]` im CHANGELOG.
6. Release: Wenn ein sinnvoller Stand erreicht ist, wird `[Unreleased]` zu einer
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

### Automatische Tests
- Lint, Typprüfung (`svelte-check`), Vitest und Build laufen in der CI grün.
- Playwright-Ende-zu-Ende-Tests unter `tests/` laufen grün; neue Seiten und Abläufe
  bringen mindestens einen Test mit (Seite lädt, keine Konsolenfehler, Hauptablauf funktioniert).

### Datenbank
- Jede Schemaänderung kommt mit einer versionierten Drizzle-Migration unter `drizzle/`;
  Migrationen werden nach dem Merge nicht mehr verändert, Korrekturen sind neue Migrationen.
- Migrationen laufen auf einer leeren Datenbank von Anfang bis Ende durch (CI).
- Der Zweck jeder Migration ist im PR beschrieben und im CHANGELOG nachvollziehbar.

### Sicherheit
- Keine Zugangsdaten, Schlüssel oder privaten Daten im Repository; `.env` ist in
  `.gitignore`, nur `.env.example` mit Platzhaltern ist eingecheckt.
- Eingaben werden serverseitig validiert, Datenbankzugriffe nur über das ORM bzw. parametrisiert.
- Anmeldung: Passwörter mit Argon2id gehasht, Sitzungs-Cookies `HttpOnly`, `Secure`, `SameSite=Lax`,
  Sitzungen laufen ab und werden beim Abmelden ungültig.
- Autorisierung: Geschützte Seiten und Endpunkte prüfen serverseitig die Sitzung; ein Test
  belegt, dass nicht angemeldete Besucher keinen Zugriff bekommen.
- Ratenbegrenzung bei Anmeldung und Registrierung.

### Datenschutz (DSGVO) und Inhalt
- Es werden nur personenbezogene Daten erhoben, die für die Funktion nötig sind.
- Impressum und Datenschutzerklärung sind vorhanden, bevor die App öffentlich erreichbar ist.
- Nutzer können ihr Konto und ihre Daten löschen lassen, sobald Konten existieren.
- Keine Einbindung externer Dienste (Schriften, Statistik, CDNs) ohne Erwähnung in der Datenschutzerklärung.
- Texte ohne Platzhalter oder Tippfehler.

## Abnahmeprotokoll

Jede Abnahme wird im PR als Review mit dieser Kurzform festgehalten:

```
Abnahme: bestanden | mit Auflagen | abgelehnt
Funktion: ✓/✗  Tests: ✓/✗  Design: ✓/✗  Barrierefreiheit: ✓/✗  Performance: ✓/✗
Datenbank: ✓/✗/–  Sicherheit: ✓/✗  Datenschutz: ✓/✗/–
Befunde: …
```
