<script lang="ts">
	import Dialog from '../Dialog.svelte';

	let open = $state(false);
	let closed = $state(0);
</script>

<button type="button" onclick={() => (open = true)}>Öffnen</button>
<p>Geschlossen: {closed}</p>
<Dialog bind:open title="Wirklich?" onclose={() => closed++}>
	<p>Inhalt des Dialogs</p>
	{#snippet actions()}
		<button type="button" onclick={() => (open = false)}>Abbrechen</button>
	{/snippet}
</Dialog>
