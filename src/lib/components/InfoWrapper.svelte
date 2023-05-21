<script>
	import { fade } from 'svelte/transition';
	export let isCorrectCountry;
	export let countryToFind;
	let country;

	$: setTimeout(() => {
		country = countryToFind;
	}, 1000);
</script>

<div
	class:wrong={isCorrectCountry === false}
	class:correct={isCorrectCountry}
	transition:fade={{ duration: 500 }}
	class="wrapper">
	<slot />
	{#if country}
		{country}
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 3rem;
		position: absolute;
		top: 1rem;
		left: 50%;
		padding: 2rem 4rem;
		min-width: 30rem;
		transform: translateX(-50%);
		border-radius: 25px;
		background-color: rgba(205, 217, 246, 0.703);
		color: var(--color-secondary);
		font-family: 'Inconsolata';
		font-weight: 400;
		font-size: 2.2rem;
		z-index: 2;
	}
	.wrong {
		background-color: #e94560ca;
	}
	.correct {
		background-color: #3fa796c7;
	}
	@media (max-width: 822px) {
		.wrapper {
			border: 0.5px solid var(--color-secondary);
		}
	}
	@media (max-width: 480px) {
		.wrapper {
			min-width: fit-content;
			gap: 2rem;
			font-size: 2rem;
			padding: 1.5rem 3rem;
		}
	}
</style>
