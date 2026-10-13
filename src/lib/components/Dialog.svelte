<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Steuert, ob der Dialog offen ist. */
		open: boolean;
		title: string;
		/** Klick auf den Hintergrund schließt den Dialog (bei Formularen mit Eingaben abschalten). */
		closeOnBackdrop?: boolean;
		onclose?: () => void;
		children: Snippet;
		actions: Snippet;
	}

	let {
		open = $bindable(),
		title,
		closeOnBackdrop = true,
		onclose,
		children,
		actions
	}: Props = $props();

	const titleId = $props.id();
	let dialog: HTMLDialogElement;
	let returnFocusTo: HTMLElement | null = null;

	$effect(() => {
		if (open && !dialog.open) {
			returnFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : null;
			dialog.showModal();
		} else if (!open && dialog.open) {
			dialog.close();
		}
	});

	function handleClose() {
		open = false;
		returnFocusTo?.focus();
		returnFocusTo = null;
		onclose?.();
	}

	function handleClick(event: MouseEvent) {
		if (closeOnBackdrop && event.target === dialog) open = false;
	}
</script>

<!-- Tastatur (Esc) und Fokusfalle liefert das native dialog-Element. -->
<dialog
	bind:this={dialog}
	class="dialog"
	aria-labelledby="{titleId}-title"
	onclose={handleClose}
	onclick={handleClick}
>
	<div class="dialog__body">
		<h2 class="dialog__title" id="{titleId}-title">{title}</h2>
		{@render children()}
	</div>
	<div class="dialog__actions">
		{@render actions()}
	</div>
</dialog>
