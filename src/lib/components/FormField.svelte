<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props {
		label: string;
		name: string;
		type?: HTMLInputAttributes['type'];
		autocomplete?: HTMLInputAttributes['autocomplete'];
		value?: string;
		required?: boolean;
		optional?: boolean;
		hint?: string;
		error?: string;
		size?: 'md' | 'lg';
	}

	let {
		label,
		name,
		type = 'text',
		autocomplete,
		value = '',
		required = false,
		optional = false,
		hint,
		error,
		size = 'lg'
	}: Props = $props();

	const id = $props.id();
	const describedBy = $derived(
		[hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
	);
</script>

<div class="field">
	<label class="field__label" for={id}>
		{label}
		{#if optional}<span class="optional">(optional)</span>{/if}
	</label>
	<input
		{id}
		{name}
		{type}
		{autocomplete}
		{value}
		{required}
		class={['input', size === 'lg' && 'input--lg']}
		aria-invalid={error ? 'true' : undefined}
		aria-describedby={describedBy}
	/>
	{#if hint}<span class="field__hint" id="{id}-hint">{hint}</span>{/if}
	{#if error}<span class="field__error" id="{id}-error">{error}</span>{/if}
</div>
