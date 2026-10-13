<script lang="ts">
	import { toasts } from '#lib/toast.svelte.ts';
</script>

<div class="toast-region" role="status" aria-live="polite">
	{#each toasts.items as toast (toast.id)}
		<div
			class="toast toast--{toast.kind}"
			role="presentation"
			onmouseenter={() => toasts.pause(toast.id)}
			onmouseleave={() => toasts.resume(toast.id)}
			onfocusin={() => toasts.pause(toast.id)}
			onfocusout={() => toasts.resume(toast.id)}
		>
			<span class="toast__dot" aria-hidden="true"></span>
			<span class="toast__msg">{toast.message}</span>
			{#if toast.action}
				{@const action = toast.action}
				<button
					class="btn btn--ghost"
					type="button"
					onclick={() => {
						action.run();
						toasts.dismiss(toast.id);
					}}>{action.label}</button
				>
			{/if}
		</div>
	{/each}
</div>
