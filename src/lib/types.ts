/**
 * Vertrag zwischen Oberfläche (Frontend) und Serverlogik (Backend).
 * Das Backend liefert diese Formen über load-Funktionen und Form-Actions.
 */

/** Angemeldeter Nutzer, vom Backend als `user` in den Seitendaten geliefert. */
export interface SessionUser {
	name: string | null;
	email: string;
}

/** Felder der Formulare für Anmeldung und Registrierung. */
export type AuthField = 'name' | 'email' | 'password';

/**
 * Antwort einer fehlgeschlagenen Form-Action, z. B. `fail(400, { … })`.
 * - `message`: Zusammenfassung oben im Formular (z. B. falsche Zugangsdaten)
 * - `errors`: Meldung je Feld
 * - `values`: bereits eingegebene Werte zum erneuten Befüllen (nie das Passwort)
 */
export interface FormFailure<F extends string = AuthField> {
	message?: string;
	errors?: Partial<Record<F, string>>;
	values?: Partial<Record<F, string>>;
}
