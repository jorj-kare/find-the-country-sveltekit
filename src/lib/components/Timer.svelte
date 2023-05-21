<script>
	import { onDestroy, onMount } from 'svelte';
	import timer from '$stores/timer-store.js';

	onMount(() => {
		timer.start(30);
	});
	onDestroy(() => {
		timer.reset();
	});
</script>

<div class="wrapper">
	<ion-icon name="time-outline" />
	{#if !isNaN($timer)}{$timer}{/if}
</div>

<style>
	.wrapper {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
	ion-icon {
		font-size: 3rem;
	}
</style>
