import type { SessionUser } from './types.ts';

/** Vorname für die Begrüßung, oder null, wenn kein Name hinterlegt ist. */
export function firstName(user: SessionUser | null | undefined): string | null {
	const name = user?.name?.trim();
	return name ? name.split(/\s+/)[0] : null;
}

/** Ein bis zwei Initialen für den Avatar, ersatzweise aus der E-Mail-Adresse. */
export function initials(user: SessionUser | null | undefined): string {
	const name = user?.name?.trim();
	if (name) {
		const parts = name.split(/\s+/);
		const letters = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : parts[0][0];
		return letters.toUpperCase();
	}
	return (user?.email?.[0] ?? '?').toUpperCase();
}
