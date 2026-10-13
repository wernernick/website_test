import { expect, test } from '@playwright/test';

test.describe('Landingpage', () => {
	test('zeigt Hero, Vorteile, Kopf- und Fußzeile', async ({ page }) => {
		await page.goto('/');

		await expect(page.locator('html')).toHaveAttribute('lang', 'de');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
		await expect(page.getByRole('heading', { level: 3 })).toHaveCount(3);
		await expect(page.getByRole('banner')).toBeVisible();
		await expect(page.getByRole('contentinfo')).toBeVisible();
	});

	test('führt zu Anmeldung und Registrierung', async ({ page }) => {
		await page.goto('/');
		const nav = page.getByRole('navigation', { name: 'Konto' });

		await nav.getByRole('link', { name: 'Anmelden' }).click();
		await expect(page).toHaveURL('/login');
		await expect(page.getByRole('heading', { level: 1, name: 'Willkommen zurück' })).toBeVisible();

		await page.getByRole('link', { name: 'Registrieren' }).click();
		await expect(page).toHaveURL('/registrieren');
		await expect(page.getByRole('heading', { level: 1, name: 'Konto erstellen' })).toBeVisible();
	});

	test('zeigt nach dem Löschen eines Kontos einen Hinweis', async ({ page }) => {
		await page.goto('/?konto-geloescht');
		await expect(page.getByRole('status')).toContainText('Dein Konto wurde gelöscht.');
		await expect(page).toHaveURL('/');
	});
});

test.describe('Anmeldeseiten', () => {
	test('Anmeldung hat beschriftete Felder mit Autocomplete', async ({ page }) => {
		await page.goto('/login');
		await expect(page.getByLabel('E-Mail')).toHaveAttribute('autocomplete', 'email');
		await expect(page.getByLabel('Passwort')).toHaveAttribute('autocomplete', 'current-password');
		await expect(page.getByLabel('Angemeldet bleiben')).toBeVisible();
	});

	test('Registrierung zeigt die Passwortregel am Feld', async ({ page }) => {
		await page.goto('/registrieren');
		const password = page.getByLabel('Passwort');
		await expect(password).toHaveAttribute('autocomplete', 'new-password');
		await expect(password).toHaveAccessibleDescription('Mindestens 12 Zeichen.');
		await expect(page.getByLabel('Name (optional)')).toHaveAttribute('autocomplete', 'name');
	});
});

test.describe('App-Bereich', () => {
	test('Dashboard zeigt Begrüßung und leeren Zustand', async ({ page }) => {
		await page.goto('/app');
		await expect(page.getByRole('heading', { level: 1, name: 'Willkommen' })).toBeVisible();
		await expect(page.getByText('Hier erscheinen deine Einträge')).toBeVisible();
	});

	test('Seitenleiste markiert die aktuelle Seite', async ({ page }) => {
		await page.setViewportSize({ width: 1440, height: 900 });
		await page.goto('/app/einstellungen');
		const sidebar = page.getByRole('navigation', { name: 'Hauptnavigation' });
		await expect(sidebar.getByRole('link', { name: 'Einstellungen' })).toHaveAttribute(
			'aria-current',
			'page'
		);
		await expect(page.getByRole('button', { name: 'Menü öffnen' })).toBeHidden();
	});

	test('mobile Navigation öffnet als Schublade und schließt mit Esc', async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 800 });
		await page.goto('/app');
		const opener = page.getByRole('button', { name: 'Menü öffnen' });

		await opener.click();
		const drawer = page.getByRole('dialog', { name: 'Navigation' });
		await expect(drawer).toBeVisible();
		await page.keyboard.press('Escape');
		await expect(drawer).toBeHidden();
		await expect(opener).toBeFocused();

		await opener.click();
		await drawer.getByRole('link', { name: 'Einstellungen' }).click();
		await expect(page).toHaveURL('/app/einstellungen');
		await expect(drawer).toBeHidden();
	});

	test('Einstellungen zeigen den Gefahrenbereich', async ({ page }) => {
		await page.goto('/app/einstellungen');
		await expect(page.getByRole('heading', { name: 'Konto löschen' })).toBeVisible();
		await expect(page.getByRole('button', { name: 'Konto löschen …' })).toBeVisible();
	});
});

for (const width of [375, 768, 1440]) {
	test(`kein horizontales Scrollen bei ${width} px`, async ({ page }) => {
		await page.setViewportSize({ width, height: 800 });
		for (const path of ['/', '/login', '/registrieren', '/app', '/app/einstellungen']) {
			await page.goto(path);
			const overflow = await page.evaluate(
				() => document.documentElement.scrollWidth > document.documentElement.clientWidth
			);
			expect(overflow, path).toBe(false);
		}
	});
}
