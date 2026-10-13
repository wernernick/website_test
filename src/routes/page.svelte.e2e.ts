import { expect, test } from '@playwright/test';

test('Startseite zeigt Hero, Kopfzeile und Fußzeile', async ({ page }) => {
	await page.goto('/');

	await expect(page.locator('html')).toHaveAttribute('lang', 'de');
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	await expect(page.getByRole('banner')).toBeVisible();
	await expect(page.getByRole('contentinfo')).toBeVisible();
});

test('Anmelden und Registrieren führen auf eigene Seiten', async ({ page }) => {
	await page.goto('/');
	await page
		.getByRole('navigation', { name: 'Konto' })
		.getByRole('link', { name: 'Anmelden' })
		.click();
	await expect(page).toHaveURL('/login');
	await expect(page.getByRole('heading', { level: 1, name: 'Anmelden' })).toBeVisible();

	await page.goto('/');
	await page
		.getByRole('navigation', { name: 'Konto' })
		.getByRole('link', { name: 'Registrieren' })
		.click();
	await expect(page).toHaveURL('/registrieren');
	await expect(page.getByRole('heading', { level: 1, name: 'Registrieren' })).toBeVisible();
});

test('Seite scrollt auf 375 px nicht horizontal', async ({ page }) => {
	await page.setViewportSize({ width: 375, height: 800 });
	await page.goto('/');
	const overflow = await page.evaluate(
		() => document.documentElement.scrollWidth > document.documentElement.clientWidth
	);
	expect(overflow).toBe(false);
});
