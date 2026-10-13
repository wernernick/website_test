<script lang="ts">
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<div class="site">
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

	main {
		flex: 1;
	}
</style>
