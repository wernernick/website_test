<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import { site } from '#lib/site.ts';
	import { enhanceWithFocus } from '#lib/forms.ts';
	import type { FormFailure } from '#lib/types.ts';
	import FormField from '#lib/components/FormField.svelte';

	/** Die Action (Backend) liefert bei Fehlern ein FormFailure, z. B. `fail(400, { message })`. */
	let { form }: { form?: FormFailure | null } = $props();

	let formElement: HTMLFormElement | undefined = $state();
	let pending = $state(false);
</script>

<svelte:head>
	<title>Anmelden · {site.name}</title>
</svelte:head>

<form
	bind:this={formElement}
	class="auth-card"
	method="POST"
	novalidate
	use:enhance={enhanceWithFocus(
		() => formElement,
		(value) => (pending = value)
	)}
>
	<div class="stack auth-card__head">
		<a class="app-brand" href={resolve('/(site)')}>{site.name}</a>
		<h1 class="display-2 auth-card__title">Willkommen zurück</h1>
		<p class="muted text-sm">Melde dich mit deiner E-Mail-Adresse an.</p>
	</div>

	{#if form?.message}
		<div class="alert alert--danger" role="alert" tabindex="-1">
			<div><strong>{form.message}</strong></div>
		</div>
	{/if}

	<div class="form">
		<FormField
			label="E-Mail"
			name="email"
			type="email"
			autocomplete="email"
			required
			value={form?.values?.email}
			error={form?.errors?.email}
		/>
		<FormField
			label="Passwort"
			name="password"
			type="password"
			autocomplete="current-password"
			required
			error={form?.errors?.password}
		/>
		<label class="check"><input name="remember" type="checkbox" /> Angemeldet bleiben</label>
		<button
			class="btn btn--primary btn--lg btn--block"
			type="submit"
			disabled={pending}
			aria-busy={pending}>{pending ? 'Wird angemeldet' : 'Anmelden'}</button
		>
	</div>

	<p class="text-sm muted auth-card__switch">
		Noch kein Konto? <a href={resolve('/(auth)/registrieren')}>Registrieren</a>
	</p>
</form>
