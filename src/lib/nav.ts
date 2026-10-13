import { resolve } from '$app/paths';

export interface NavItem {
	href: ReturnType<typeof resolve>;
	label: string;
}

/** Navigationspunkte des App-Bereichs, gemeinsam für Seitenleiste und mobile Schublade. */
export function appNav(): NavItem[] {
	return [
		{ href: resolve('/app'), label: 'Übersicht' },
		{ href: resolve('/app/einstellungen'), label: 'Einstellungen' }
	];
}
