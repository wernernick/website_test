<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '#lib/site.ts';
</script>

<svelte:head>
	<title>Registrieren · {site.name}</title>
</svelte:head>

<section class="container page">
	<h1>Registrieren</h1>
	<p>Diese Seite ist in Arbeit. Bald kannst du dich hier registrieren.</p>
	<p><a href={resolve('/')}>Zurück zur Startseite</a></p>
</section>

<style>
	.page {
		padding-block: var(--space-12);
	}
</style>
