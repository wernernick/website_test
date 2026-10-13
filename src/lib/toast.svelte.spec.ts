import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TOAST_DURATION, TOAST_DURATION_WITH_ACTION, toasts } from './toast.svelte.ts';

describe('toasts', () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => {
		for (const toast of [...toasts.items]) toasts.dismiss(toast.id);
		vi.useRealTimers();
	});

	it('verschwindet nach der Standarddauer', () => {
		toasts.show('Gespeichert');
		expect(toasts.items).toHaveLength(1);
		vi.advanceTimersByTime(TOAST_DURATION);
		expect(toasts.items).toHaveLength(0);
	});

	it('bleibt mit Aktion länger stehen', () => {
		toasts.show('Gelöscht', { action: { label: 'Rückgängig', run: () => {} } });
		vi.advanceTimersByTime(TOAST_DURATION);
		expect(toasts.items).toHaveLength(1);
		vi.advanceTimersByTime(TOAST_DURATION_WITH_ACTION - TOAST_DURATION);
		expect(toasts.items).toHaveLength(0);
	});

	it('pausiert und läuft mit der Restzeit weiter', () => {
		const id = toasts.show('Gespeichert');
		vi.advanceTimersByTime(3000);
		toasts.pause(id);
		vi.advanceTimersByTime(10_000);
		expect(toasts.items).toHaveLength(1);
		toasts.resume(id);
		vi.advanceTimersByTime(TOAST_DURATION - 3000);
		expect(toasts.items).toHaveLength(0);
	});

	it('zeigt höchstens drei gleichzeitig, die ältesten fallen weg', () => {
		for (const text of ['a', 'b', 'c', 'd']) toasts.show(text);
		expect(toasts.items.map((toast) => toast.message)).toEqual(['b', 'c', 'd']);
	});
});
