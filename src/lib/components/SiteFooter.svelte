<script lang="ts">
	import { site } from '#lib/site.ts';

	const year = new Date().getFullYear();
</script>

<footer class="site-footer">
	<div class="container">
		<p class="text-sm muted">© {year} {site.name}</p>
	</div>
</footer>

<style>
	.site-footer {
		margin-top: auto;
		padding-block: var(--space-6);
		border-top: var(--border-width) solid var(--color-border);
	}
</style>
