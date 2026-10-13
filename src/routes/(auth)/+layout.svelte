<script lang="ts">
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<main id="inhalt" class="auth-page" tabindex="-1">
	{@render children()}
</main>
