import type { SubmitFunction } from '$app/forms';
import { tick } from 'svelte';

/**
 * Gemeinsames Verhalten für Formulare mit use:enhance:
 * meldet den Sendezustand und setzt danach den Fokus auf das erste fehlerhafte Feld
 * bzw. auf die Fehlerzusammenfassung.
 */
export function enhanceWithFocus(
	form: () => HTMLFormElement | undefined,
	setPending: (pending: boolean) => void
): SubmitFunction {
	return () => {
		setPending(true);
		return async ({ update }) => {
			await update({ reset: false });
			setPending(false);
			await tick();
			const target =
				form()?.querySelector<HTMLElement>('[aria-invalid="true"]') ??
				form()?.querySelector<HTMLElement>('[role="alert"]');
			target?.focus();
		};
	};
}
