<script lang="ts">
	import '#lib/styles/tokens.css';
	import '#lib/styles/base.css';
	import favicon from '#lib/assets/favicon.svg';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a class="skip-link" href="#inhalt">Zum Inhalt springen</a>
<SiteHeader />
<main id="inhalt" tabindex="-1">
	{@render children()}
</main>
<SiteFooter />

<style>
	.skip-link {
		position: absolute;
		top: var(--space-2);
		left: var(--space-2);
		z-index: 10;
		padding: var(--space-2) var(--space-4);
		background: var(--color-bg);
		border-radius: var(--radius-md);
		transform: translateY(-200%);
	}

	.skip-link:focus {
		transform: none;
	}

	main:focus {
		outline: none;
	}
</style>
