import { page, userEvent } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import UserMenu from './UserMenu.svelte';

const user = { name: 'Mira Schulz', email: 'mira@beispiel.de' };

describe('UserMenu.svelte', () => {
	it('zeigt die Initialen und öffnet per Klick', async () => {
		render(UserMenu, { user });
		const trigger = page.getByRole('button', { name: /Benutzermenü/ });
		await expect.element(trigger).toHaveTextContent('MS');
		await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');

		await trigger.click();
		await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
		await expect.element(page.getByRole('menu')).toBeVisible();
		await expect.element(page.getByText('mira@beispiel.de')).toBeVisible();
		await expect.element(page.getByRole('menuitem', { name: 'Einstellungen' })).toHaveFocus();
	});

	it('bewegt den Fokus mit den Pfeiltasten und schließt mit Esc', async () => {
		render(UserMenu, { user });
		const trigger = page.getByRole('button', { name: /Benutzermenü/ });
		await trigger.click();

		await userEvent.keyboard('{ArrowDown}');
		await expect.element(page.getByRole('menuitem', { name: 'Abmelden' })).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await expect.element(page.getByRole('menuitem', { name: 'Einstellungen' })).toHaveFocus();

		await userEvent.keyboard('{Escape}');
		await expect.element(page.getByRole('menu')).not.toBeInTheDocument();
		await expect.element(trigger).toHaveFocus();
	});
});
