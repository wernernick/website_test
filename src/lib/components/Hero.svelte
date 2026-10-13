<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		lead: string;
		eyebrow?: string;
		actions?: Snippet;
	}

	let { title, lead, eyebrow, actions }: Props = $props();
</script>

<section class="section" aria-labelledby="hero-title">
	<div class="container stack hero">
		{#if eyebrow}
			<p class="eyebrow">{eyebrow}</p>
		{/if}
		<h1 id="hero-title" class="display-1">{title}</h1>
		<p class="lead">{lead}</p>
		{#if actions}
			<div class="cluster hero__actions">{@render actions()}</div>
		{/if}
	</div>
</section>

<style>
	.hero {
		align-items: flex-start;
		gap: var(--space-5);
	}

	.hero__actions {
		margin-top: var(--space-3);
	}
</style>
