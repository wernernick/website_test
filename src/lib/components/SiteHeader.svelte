<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { site } from '#lib/site.ts';
	import type { SessionUser } from '#lib/types.ts';
	import ButtonLink from './ButtonLink.svelte';

	const user = $derived(page.data.user as SessionUser | undefined);
</script>

<header class="site-top">
	<div class="container site-header">
		<a class="app-brand" href={resolve('/(site)')}>{site.name}</a>
		<nav class="site-header__nav" aria-label="Konto">
			{#if user}
				<ButtonLink href={resolve('/app')} size="sm">Zur App</ButtonLink>
			{:else}
				<ButtonLink href={resolve('/(auth)/login')} variant="ghost" size="sm">Anmelden</ButtonLink>
				<ButtonLink href={resolve('/(auth)/registrieren')} size="sm">Kostenlos starten</ButtonLink>
			{/if}
		</nav>
	</div>
</header>

<style>
	.site-top {
		position: sticky;
		top: 0;
		z-index: var(--z-sticky);
		background: var(--color-bg);
		border-bottom: var(--border-width) solid var(--color-border);
	}
</style>
