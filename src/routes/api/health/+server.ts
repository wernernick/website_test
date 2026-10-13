import { json } from '@sveltejs/kit';
import { sql } from 'drizzle-orm';
import { db } from '#lib/server/db/index.js';
import { checkHealth } from '#lib/server/health.js';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const health = await checkHealth(() => db.execute(sql`select 1`));
	return json(health, {
		status: health.status === 'ok' ? 200 : 503,
		headers: { 'cache-control': 'no-store' }
	});
};
