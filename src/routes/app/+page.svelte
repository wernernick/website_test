<script lang="ts">
	import { page } from '$app/state';
	import { site } from '#lib/site.ts';
	import type { SessionUser } from '#lib/types.ts';
	import { firstName } from '#lib/user.ts';

	const name = $derived(firstName(page.data.user as SessionUser | undefined));
</script>

<svelte:head>
	<title>Übersicht · {site.name}</title>
</svelte:head>

<div class="page-header">
	<div>
		<h1 class="page-title">{name ? `Willkommen, ${name}` : 'Willkommen'}</h1>
		<p class="muted text-sm">Dein Konto ist bereit.</p>
	</div>
</div>

<div class="empty empty--lg">
	<h2 class="section-title">Hier erscheinen deine Einträge</h2>
	<p class="text-sm">
		Sobald du etwas anlegst, siehst du es an dieser Stelle. Du kannst alles später jederzeit ändern
		oder löschen.
	</p>
</div>

<style>
	.empty--lg {
		padding-block: var(--space-9);
	}
</style>
