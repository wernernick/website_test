<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { resolve } from '$app/paths';

	interface Props {
		/** Mit resolve() aus $app/paths erzeugter Pfad. */
		href: ReturnType<typeof resolve>;
		variant?: 'primary' | 'secondary';
		children: Snippet;
	}

	let { href, variant = 'primary', children }: Props = $props();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- href kommt bereits über resolve() -->
<a {href} class="button {variant}">{@render children()}</a>

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.75rem;
		padding: var(--space-2) var(--space-4);
		border: var(--border-width) solid var(--color-primary);
		border-radius: var(--radius-md);
		font-weight: var(--font-weight-bold);
		text-decoration: none;
		white-space: nowrap;
	}

	.primary {
		background: var(--color-primary);
		color: var(--color-on-primary);
	}

	.primary:hover {
		background: var(--color-primary-hover);
		border-color: var(--color-primary-hover);
		color: var(--color-on-primary);
	}

	.secondary {
		background: transparent;
		color: var(--color-primary);
	}

	.secondary:hover {
		background: var(--color-surface);
		color: var(--color-primary-hover);
	}
</style>
