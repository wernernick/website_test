<script lang="ts">
	import { page } from '$app/state';
	import type { NavItem } from '#lib/nav.ts';

	interface Props {
		items: NavItem[];
		onnavigate?: () => void;
	}

	let { items, onnavigate }: Props = $props();
</script>

{#each items as item (item.href)}
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href kommt bereits über resolve() -->
	<a
		class="nav-item"
		href={item.href}
		aria-current={page.url.pathname === item.href ? 'page' : undefined}
		onclick={onnavigate}>{item.label}</a
	>
{/each}
