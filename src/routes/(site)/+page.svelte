<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { replaceState } from '$app/navigation';
	import { site } from '#lib/site.ts';
	import { toasts } from '#lib/toast.svelte.ts';
	import ButtonLink from '#lib/components/ButtonLink.svelte';

	/** Das Backend leitet nach dem Löschen eines Kontos auf /?konto-geloescht weiter. */
	const ACCOUNT_DELETED_PARAM = 'konto-geloescht';

	const features = [
		{
			title: 'Schnell eingerichtet',
			text: 'Registrieren, anmelden, loslegen. Keine Installation.'
		},
		{
			title: 'Deine Daten bleiben bei dir',
			text: 'Gehostet in der EU, Konto jederzeit vollständig löschbar.'
		},
		{ title: 'Hell und dunkel', text: 'Passt sich automatisch an dein Gerät an.' }
	];

	onMount(() => {
		if (page.url.searchParams.has(ACCOUNT_DELETED_PARAM)) {
			toasts.show('Dein Konto wurde gelöscht.');
			replaceState(resolve('/(site)'), page.state);
		}
	});
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<div class="container">
	<section class="hero" aria-labelledby="hero-title">
		<span class="eyebrow">Neu</span>
		<h1 id="hero-title" class="display-1">Alles Wichtige an <mark>einem</mark> Ort.</h1>
		<p class="lead">{site.description}</p>
		<div class="cluster">
			<ButtonLink href={resolve('/(auth)/registrieren')} size="lg">Konto erstellen</ButtonLink>
			<ButtonLink href={resolve('/(auth)/login')} variant="secondary" size="lg">Anmelden</ButtonLink
			>
		</div>
	</section>

	<section class="features" aria-labelledby="features-title">
		<h2 id="features-title" class="visually-hidden">Vorteile</h2>
		<div class="feature-grid">
			{#each features as feature (feature.title)}
				<div class="feature">
					<h3>{feature.title}</h3>
					<p class="muted text-sm">{feature.text}</p>
				</div>
			{/each}
		</div>
	</section>
</div>

<style>
	.features {
		padding-bottom: var(--space-section);
	}
</style>
