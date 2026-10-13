<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '#lib/site.ts';
	import ButtonLink from './ButtonLink.svelte';
</script>

<header class="site-header">
	<div class="container site-header__inner">
		<a class="app-brand" href={resolve('/')}>{site.name}</a>
		<nav aria-label="Konto">
			<ul class="cluster">
				<li><ButtonLink href={resolve('/login')} variant="ghost">Anmelden</ButtonLink></li>
				<li><ButtonLink href={resolve('/registrieren')}>Registrieren</ButtonLink></li>
			</ul>
		</nav>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: var(--z-sticky);
		background: var(--color-surface);
		border-bottom: var(--border-width) solid var(--color-border);
	}

	.site-header__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		min-height: var(--topbar-h);
	}

	ul {
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>
