import { describe, expect, it } from 'vitest';
import { firstName, initials } from './user.ts';

describe('firstName', () => {
	it('liefert den ersten Namensteil', () => {
		expect(firstName({ name: 'Mira  Schulz', email: 'm@x.de' })).toBe('Mira');
	});

	it('liefert null ohne Namen', () => {
		expect(firstName({ name: null, email: 'm@x.de' })).toBeNull();
		expect(firstName({ name: '  ', email: 'm@x.de' })).toBeNull();
		expect(firstName(undefined)).toBeNull();
	});
});

describe('initials', () => {
	it('nimmt ersten und letzten Namensteil', () => {
		expect(initials({ name: 'Mira Anna Schulz', email: 'm@x.de' })).toBe('MS');
		expect(initials({ name: 'mira', email: 'm@x.de' })).toBe('M');
	});

	it('fällt auf die E-Mail-Adresse zurück', () => {
		expect(initials({ name: null, email: 'lena@x.de' })).toBe('L');
		expect(initials(null)).toBe('?');
	});
});
