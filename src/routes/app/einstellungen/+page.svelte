<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/state';
	import { site } from '#lib/site.ts';
	import type { FormFailure, SessionUser } from '#lib/types.ts';
	import Dialog from '#lib/components/Dialog.svelte';

	/** Fehler der Action `?/kontoLoeschen` (Backend), z. B. `fail(400, { message })`. */
	let { form }: { form?: FormFailure<'bestaetigung'> | null } = $props();

	const user = $derived((page.data.user as SessionUser | undefined) ?? null);

	let confirmOpen = $state(false);
	let confirmation = $state('');
	let pending = $state(false);

	const confirmationId = $props.id();
	const matches = $derived(
		user !== null && confirmation.trim().toLowerCase() === user.email.toLowerCase()
	);

	function resetConfirmation() {
		confirmation = '';
	}
</script>

<svelte:head>
	<title>Einstellungen · {site.name}</title>
</svelte:head>

<div class="page-header">
	<h1 class="page-title">Einstellungen</h1>
</div>

<section class="card stack" aria-labelledby="konto-title">
	<h2 id="konto-title" class="section-title">Konto</h2>
	{#if user}
		<dl class="account">
			<dt class="label-caps">Name</dt>
			<dd>{user.name ?? '–'}</dd>
			<dt class="label-caps">E-Mail</dt>
			<dd>{user.email}</dd>
		</dl>
	{:else}
		<p class="muted text-sm">Kontodaten werden geladen, sobald du angemeldet bist.</p>
	{/if}
</section>

{#if form?.message}
	<div class="alert alert--danger" role="alert">
		<div><strong>{form.message}</strong></div>
	</div>
{/if}

<section class="danger-zone" aria-labelledby="loeschen-title">
	<div>
		<h2 id="loeschen-title" class="section-title">Konto löschen</h2>
		<p class="muted text-sm">
			Löscht dein Konto und alle deine Daten endgültig. Das lässt sich nicht rückgängig machen.
		</p>
	</div>
	<button
		class="btn btn--danger"
		type="button"
		aria-haspopup="dialog"
		disabled={!user}
		onclick={() => (confirmOpen = true)}>Konto löschen …</button
	>
</section>

<Dialog
	bind:open={confirmOpen}
	title="Konto endgültig löschen?"
	closeOnBackdrop={confirmation === ''}
	onclose={resetConfirmation}
>
	<p class="text-sm">
		Dein Konto und alle deine Daten werden sofort gelöscht. Das lässt sich nicht rückgängig machen.
	</p>
	<form
		id="{confirmationId}-form"
		method="POST"
		action="?/kontoLoeschen"
		use:enhance={() => {
			pending = true;
			return async ({ update }) => {
				await update();
				pending = false;
				confirmOpen = false;
			};
		}}
	>
		<div class="field">
			<label class="field__label" for="{confirmationId}-input">
				Zur Bestätigung <b>{user?.email}</b> eingeben
			</label>
			<input
				id="{confirmationId}-input"
				class="input"
				name="bestaetigung"
				type="email"
				autocomplete="off"
				bind:value={confirmation}
			/>
		</div>
	</form>

	{#snippet actions()}
		<!-- Erstfokus auf „Abbrechen“, weil der Dialog etwas Endgültiges auslöst. -->
		<!-- svelte-ignore a11y_autofocus -->
		<button class="btn btn--secondary" type="button" autofocus onclick={() => (confirmOpen = false)}
			>Abbrechen</button
		>
		<button
			class="btn btn--danger"
			type="submit"
			form="{confirmationId}-form"
			disabled={!matches || pending}
			aria-busy={pending}>{pending ? 'Wird gelöscht' : 'Konto löschen'}</button
		>
	{/snippet}
</Dialog>

<style>
	.account {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: var(--space-2) var(--space-5);
		align-items: baseline;
		margin: 0;
	}

	.account dd {
		margin: 0;
		min-width: 0;
		overflow-wrap: anywhere;
	}
</style>
