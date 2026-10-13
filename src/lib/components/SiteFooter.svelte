<script lang="ts">
	import { site } from '#lib/site.ts';

	const year = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="container">
		<p>© {year} {site.name}</p>
	</div>
</footer>

<style>
	.site-footer {
		margin-top: auto;
		border-top: var(--border-width) solid var(--color-border);
		color: var(--color-text-muted);
		font-size: var(--font-size-sm);
	}

	p {
		margin: 0;
		padding-block: var(--space-6);
	}
</style>
