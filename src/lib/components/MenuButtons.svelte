<script>
	// import mapStore from './stores/map-store';

	import { createEventDispatcher, onMount } from 'svelte';
	export let value = null;
	export let zoom = 0;
	export let coords = [];
	export let background;
	let map;
	let dispatch = createEventDispatcher();
	let btn;
</script>

<button
	type="button"
	{value}
	{zoom}
	{coords}
	style="--random-color:{background}"
	bind:this={btn}
	on:mouseover={() => dispatch('onmouseover', { coords, zoom })}
	on:focus={() => dispatch('onfocus', { coords, zoom })}
	on:mouseout
	on:blur
	on:click={() => dispatch('onclick', value)}>
	<slot />
</button>

<style lang="scss">
	button {
		width: 6em;
		height: 6em;
		border-radius: 50%;
		border: transparent;
		background-color: rgba(254, 254, 254, 0.8);
		color: $color-secondary;
		font-size: 2.3rem;
		font-weight: 300;
		transition: all 0.5s;
		word-spacing: 5rem;
		transition: background-color 0.5s;
		&:hover,
		&active {
			background-color: var(--random-color);
		}
	}
	@media (max-width: 991px) {
		button {
			font-size: 2.1rem;
		}
	}
	@media (max-width: 480px) {
		button {
			width: 90%;
			height: auto;
			padding: 1rem;
			border-radius: 25px;
			word-spacing: 0.3rem;
		}
	}
</style>
