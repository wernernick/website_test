<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { resolve } from '$app/paths';

	interface Props {
		/** Mit resolve() aus $app/paths erzeugter Pfad. */
		href: ReturnType<typeof resolve>;
		variant?: 'primary' | 'secondary' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		children: Snippet;
	}

	let { href, variant = 'primary', size = 'md', children }: Props = $props();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href kommt bereits über resolve() -->
<a {href} class={['btn', `btn--${variant}`, size !== 'md' && `btn--${size}`]}
	>{@render children()}</a
>
