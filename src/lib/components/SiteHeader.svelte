<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '#lib/site.ts';
	import ButtonLink from './ButtonLink.svelte';
</script>

<header class="site-header">
	<div class="container inner">
		<a class="brand" href={resolve('/')}>{site.name}</a>
		<nav aria-label="Konto">
			<ul>
				<li><ButtonLink href={resolve('/login')} variant="secondary">Anmelden</ButtonLink></li>
				<li><ButtonLink href={resolve('/registrieren')}>Registrieren</ButtonLink></li>
			</ul>
		</nav>
	</div>
</header>

<style>
	.site-header {
		border-bottom: var(--border-width) solid var(--color-border);
	}

	.inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		padding-block: var(--space-3);
	}

	.brand {
		color: var(--color-text);
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
		text-decoration: none;
	}

	ul {
		display: flex;
		gap: var(--space-2);
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>
