<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '#lib/site.ts';
	import Hero from '#lib/components/Hero.svelte';
	import ButtonLink from '#lib/components/ButtonLink.svelte';
</script>

<svelte:head>
	<title>{site.name}</title>
	<meta name="description" content={site.description} />
</svelte:head>

<Hero
	eyebrow="Willkommen"
	title={site.name}
	lead="{site.description} Lege jetzt ein kostenloses Konto an oder melde dich an, wenn du schon eins hast."
>
	{#snippet actions()}
		<ButtonLink href={resolve('/registrieren')} size="lg">Kostenlos registrieren</ButtonLink>
		<ButtonLink href={resolve('/login')} variant="secondary" size="lg">Anmelden</ButtonLink>
	{/snippet}
</Hero>
