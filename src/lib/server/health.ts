export type HealthStatus = {
	status: 'ok' | 'error';
	database: 'ok' | 'error';
};

/** Prüft die Datenbankverbindung mit einer einfachen Abfrage. */
export async function checkHealth(ping: () => Promise<unknown>): Promise<HealthStatus> {
	try {
		await ping();
		return { status: 'ok', database: 'ok' };
	} catch {
		return { status: 'error', database: 'error' };
	}
}
