<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		lead: string;
		actions?: Snippet;
	}

	let { title, lead, actions }: Props = $props();
</script>

<section class="hero" aria-labelledby="hero-title">
	<div class="container">
		<h1 id="hero-title">{title}</h1>
		<p class="lead">{lead}</p>
		{#if actions}
			<div class="actions">{@render actions()}</div>
		{/if}
	</div>
</section>

<style>
	.hero {
		padding-block: var(--space-16);
		background: var(--color-surface);
	}

	h1 {
		max-width: 20ch;
		margin: 0 0 var(--space-4);
		font-size: var(--font-size-xl);
	}

	.lead {
		max-width: 60ch;
		margin: 0 0 var(--space-8);
		color: var(--color-text-muted);
		font-size: var(--font-size-lg);
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
	}
</style>
