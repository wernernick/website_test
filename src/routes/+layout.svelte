<script lang="ts">
	import '@fontsource-variable/bricolage-grotesque';
	import '@fontsource-variable/instrument-sans';
	import '@fontsource-variable/jetbrains-mono';
	import '#lib/styles/tokens.css';
	import '#lib/styles/base.css';
	import '#lib/styles/app.css';
	import favicon from '#lib/assets/favicon.svg';
	import ToastRegion from '#lib/components/ToastRegion.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a class="skip-link btn btn--secondary" href="#inhalt">Zum Inhalt springen</a>
{@render children()}
<ToastRegion />

<style>
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

	:global(#inhalt:focus) {
		outline: none;
	}
</style>
