import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Hero from './Hero.svelte';

describe('Hero.svelte', () => {
	it('zeigt Überschrift und Einleitung', async () => {
		render(Hero, { title: 'Hallo', lead: 'Kurzer Einleitungstext.' });

		await expect.element(page.getByRole('heading', { level: 1 })).toHaveTextContent('Hallo');
		await expect.element(page.getByText('Kurzer Einleitungstext.')).toBeInTheDocument();
	});
});
