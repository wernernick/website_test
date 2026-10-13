<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '#lib/site.ts';
</script>

<svelte:head>
	<title>Registrieren · {site.name}</title>
</svelte:head>

<div class="auth-page">
	<div class="auth-card card">
		<h1 class="display-2">Registrieren</h1>
		<p class="muted">Diese Seite ist in Arbeit. Bald kannst du dich hier registrieren.</p>
		<p><a href={resolve('/')}>Zurück zur Startseite</a></p>
	</div>
</div>
