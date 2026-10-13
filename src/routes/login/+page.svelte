<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '#lib/site.ts';
</script>

<svelte:head>
	<title>Anmelden · {site.name}</title>
</svelte:head>

<div class="auth-page">
	<div class="auth-card card">
		<h1 class="display-2">Anmelden</h1>
		<p class="muted">Diese Seite ist in Arbeit. Bald kannst du dich hier anmelden.</p>
		<p><a href={resolve('/')}>Zurück zur Startseite</a></p>
	</div>
</div>
