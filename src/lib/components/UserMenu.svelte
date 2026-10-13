<script lang="ts">
	import { tick } from 'svelte';
	import { resolve } from '$app/paths';
	import type { SessionUser } from '#lib/types.ts';
	import { initials } from '#lib/user.ts';

	interface Props {
		user: SessionUser | null;
	}

	let { user }: Props = $props();

	const menuId = $props.id();
	let expanded = $state(false);
	let root: HTMLDivElement;
	let trigger: HTMLButtonElement;
	let menu: HTMLDivElement | undefined = $state();

	function items(): HTMLElement[] {
		return menu ? Array.from(menu.querySelectorAll<HTMLElement>('[role="menuitem"]')) : [];
	}

	async function openMenu(focus: 'first' | 'last' = 'first') {
		expanded = true;
		await tick();
		const all = items();
		(focus === 'first' ? all[0] : all[all.length - 1])?.focus();
	}

	function closeMenu(returnFocus = true) {
		expanded = false;
		if (returnFocus) trigger.focus();
	}

	function handleTriggerKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown') {
			event.preventDefault();
			openMenu('first');
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			openMenu('last');
		}
	}

	function handleMenuKeydown(event: KeyboardEvent) {
		const all = items();
		const index = all.indexOf(document.activeElement as HTMLElement);
		const focusAt = (i: number) => all[(i + all.length) % all.length]?.focus();

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				focusAt(index + 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				focusAt(index - 1);
				break;
			case 'Home':
				event.preventDefault();
				focusAt(0);
				break;
			case 'End':
				event.preventDefault();
				focusAt(all.length - 1);
				break;
			case 'Escape':
				event.preventDefault();
				closeMenu();
				break;
			case 'Tab':
				closeMenu(false);
				break;
		}
	}

	function handleWindowPointerdown(event: PointerEvent) {
		if (expanded && !root.contains(event.target as Node)) closeMenu(false);
	}
</script>

<svelte:window onpointerdown={handleWindowPointerdown} />

<div class="user-menu" bind:this={root}>
	<button
		bind:this={trigger}
		class="user-menu__trigger"
		type="button"
		aria-haspopup="menu"
		aria-expanded={expanded}
		aria-controls={menuId}
		onclick={() => (expanded ? closeMenu() : openMenu())}
		onkeydown={handleTriggerKeydown}
	>
		<span class="avatar" aria-hidden="true">{initials(user)}</span>
		<span class="visually-hidden">Benutzermenü{user ? ` für ${user.name ?? user.email}` : ''}</span>
	</button>

	{#if expanded}
		<div
			bind:this={menu}
			id={menuId}
			class="menu user-menu__list"
			role="menu"
			aria-label="Benutzermenü"
			tabindex="-1"
			onkeydown={handleMenuKeydown}
		>
			{#if user}
				<div class="user-menu__head">
					{#if user.name}<b class="text-sm">{user.name}</b>{/if}
					<span class="muted text-sm">{user.email}</span>
				</div>
				<div class="menu__sep" role="separator"></div>
			{/if}
			<a
				class="menu__item"
				role="menuitem"
				tabindex="-1"
				href={resolve('/app/einstellungen')}
				onclick={() => closeMenu(false)}>Einstellungen</a
			>
			<div class="menu__sep" role="separator"></div>
			<form method="POST" action="/abmelden">
				<button class="menu__item menu__item--danger" role="menuitem" tabindex="-1" type="submit"
					>Abmelden</button
				>
			</form>
		</div>
	{/if}
</div>

<style>
	.user-menu {
		position: relative;
		margin-left: auto;
	}

	.user-menu__trigger {
		display: inline-grid;
		place-items: center;
		min-width: var(--control-h-md);
		min-height: var(--control-h-md);
		padding: 0;
		border: 0;
		border-radius: var(--radius-pill);
		background: none;
		cursor: pointer;
	}

	.user-menu__list {
		position: absolute;
		top: calc(100% + var(--space-1));
		right: 0;
	}

	.user-menu__head {
		display: flex;
		flex-direction: column;
		padding: var(--space-2) var(--space-3);
	}
</style>
