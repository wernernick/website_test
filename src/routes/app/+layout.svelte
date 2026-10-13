<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { site } from '#lib/site.ts';
	import { appNav } from '#lib/nav.ts';
	import type { SessionUser } from '#lib/types.ts';
	import MobileNav from '#lib/components/MobileNav.svelte';
	import NavLinks from '#lib/components/NavLinks.svelte';
	import UserMenu from '#lib/components/UserMenu.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	/** Liefert das Backend über eine load-Funktion; bis dahin bleibt es leer. */
	const user = $derived((page.data.user as SessionUser | undefined) ?? null);
	const nav = appNav();
</script>

<div class="app-shell">
	<header class="app-topbar">
		<MobileNav items={nav} />
		<a class="app-brand" href={resolve('/app')}>{site.name}</a>
		<UserMenu {user} />
	</header>
	<nav class="app-sidebar" aria-label="Hauptnavigation">
		<NavLinks items={nav} />
	</nav>
	<main id="inhalt" class="app-main" tabindex="-1">
		<div class="app-main__inner">
			{@render children()}
		</div>
	</main>
</div>
