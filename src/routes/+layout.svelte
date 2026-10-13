<script lang="ts">
	import '@fontsource-variable/bricolage-grotesque';
	import '@fontsource-variable/instrument-sans';
	import '@fontsource-variable/jetbrains-mono';
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

<div class="site">
	<a class="skip-link btn btn--secondary" href="#inhalt">Zum Inhalt springen</a>
	<SiteHeader />
	<main id="inhalt" tabindex="-1">
		{@render children()}
	</main>
	<SiteFooter />
</div>

<style>
	.site {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	.skip-link {
		position: absolute;
		top: var(--space-2);
		left: var(--space-2);
		z-index: var(--z-toast);
		transform: translateY(-200%);
	}

	.skip-link:focus {
		transform: none;
	}

	main:focus {
		outline: none;
	}
</style>
