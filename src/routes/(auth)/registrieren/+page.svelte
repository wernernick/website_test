<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import { site } from '#lib/site.ts';
	import { enhanceWithFocus } from '#lib/forms.ts';
	import type { FormFailure } from '#lib/types.ts';
	import FormField from '#lib/components/FormField.svelte';

	/** Die Action (Backend) liefert bei Fehlern ein FormFailure, z. B. `fail(400, { errors, values })`. */
	let { form }: { form?: FormFailure | null } = $props();

	let formElement: HTMLFormElement | undefined = $state();
	let pending = $state(false);

	const errorCount = $derived(Object.values(form?.errors ?? {}).filter(Boolean).length);
</script>

<svelte:head>
	<title>Registrieren · {site.name}</title>
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
		<h1 class="display-2 auth-card__title">Konto erstellen</h1>
	</div>

	{#if form?.message || errorCount > 0}
		<div class="alert alert--danger" role="alert" tabindex="-1">
			<div>
				<strong>
					{form?.message ??
						(errorCount === 1 ? 'Eine Angabe fehlt noch' : `${errorCount} Angaben fehlen noch`)}
				</strong>
				{#if errorCount > 0}<p>Bitte prüfe die markierten Felder.</p>{/if}
			</div>
		</div>
	{/if}

	<div class="form">
		<FormField
			label="Name"
			name="name"
			autocomplete="name"
			optional
			value={form?.values?.name}
			error={form?.errors?.name}
		/>
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
			autocomplete="new-password"
			required
			hint="Mindestens 12 Zeichen."
			error={form?.errors?.password}
		/>
		<button
			class="btn btn--primary btn--lg btn--block"
			type="submit"
			disabled={pending}
			aria-busy={pending}>{pending ? 'Konto wird erstellt' : 'Konto erstellen'}</button
		>
	</div>

	<p class="text-sm muted auth-card__switch">
		Schon ein Konto? <a href={resolve('/(auth)/login')}>Anmelden</a>
	</p>
</form>
