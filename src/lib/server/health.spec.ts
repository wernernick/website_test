import { describe, expect, it } from 'vitest';
import { checkHealth } from './health';

describe('checkHealth', () => {
	it('meldet ok, wenn die Datenbank antwortet', async () => {
		expect(await checkHealth(async () => 1)).toEqual({ status: 'ok', database: 'ok' });
	});

	it('meldet einen Fehler, wenn die Datenbank nicht erreichbar ist', async () => {
		const failing = async () => {
			throw new Error('connection refused');
		};
		expect(await checkHealth(failing)).toEqual({ status: 'error', database: 'error' });
	});
});
