<script lang="ts">
	import { resolve } from '$app/paths';
	import { site } from '#lib/site.ts';
	import type { NavItem } from '#lib/nav.ts';
	import NavLinks from './NavLinks.svelte';

	interface Props {
		items: NavItem[];
	}

	let { items }: Props = $props();

	let drawer: HTMLDialogElement;
	let trigger: HTMLButtonElement;

	function open() {
		drawer.showModal();
	}

	function close() {
		drawer.close();
	}

	function handleClick(event: MouseEvent) {
		if (event.target === drawer) close();
	}
</script>

<button
	bind:this={trigger}
	class="btn btn--ghost btn--sm app-menu-btn"
	type="button"
	aria-label="Menü öffnen"
	aria-haspopup="dialog"
	onclick={open}
>
	<svg class="icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 6h14M3 10h14M3 14h14" /></svg
	>
</button>

<dialog
	bind:this={drawer}
	class="drawer"
	aria-label="Navigation"
	onclick={handleClick}
	onclose={() => trigger.focus()}
>
	<div class="drawer__head">
		<a class="app-brand" href={resolve('/app')} onclick={close}>{site.name}</a>
		<button
			class="btn btn--ghost btn--sm"
			type="button"
			aria-label="Menü schließen"
			onclick={close}
		>
			<svg class="icon" viewBox="0 0 20 20" aria-hidden="true"
				><path d="M5 5l10 10M15 5L5 15" /></svg
			>
		</button>
	</div>
	<nav class="drawer__nav" aria-label="Hauptnavigation">
		<NavLinks {items} onnavigate={close} />
	</nav>
</dialog>

<style>
	.icon {
		width: var(--icon-md);
		height: var(--icon-md);
		fill: none;
		stroke: currentColor;
		stroke-width: 1.75;
		stroke-linecap: round;
	}
</style>
