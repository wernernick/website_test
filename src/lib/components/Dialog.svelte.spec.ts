import { page, userEvent } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import DialogHarness from './test/DialogHarness.svelte';

describe('Dialog.svelte', () => {
	it('öffnet modal, schließt per Esc und gibt den Fokus zurück', async () => {
		render(DialogHarness);
		const opener = page.getByRole('button', { name: 'Öffnen' });

		await opener.click();
		const dialog = page.getByRole('dialog', { name: 'Wirklich?' });
		await expect.element(dialog).toBeVisible();

		await userEvent.keyboard('{Escape}');
		await expect.element(dialog).not.toBeInTheDocument();
		await expect.element(opener).toHaveFocus();
		await expect.element(page.getByText('Geschlossen: 1')).toBeInTheDocument();
	});

	it('schließt über eine Aktion', async () => {
		render(DialogHarness);
		await page.getByRole('button', { name: 'Öffnen' }).click();
		await page.getByRole('button', { name: 'Abbrechen' }).click();
		await expect.element(page.getByRole('dialog')).not.toBeInTheDocument();
	});
});
