<script>
	import '/src/styles/main.scss';
	import Menu from '../lib/components/Menu.svelte';
	import MenuButtons from '../lib/components/MenuButtons.svelte';
	import Map from '$components/MapBox/Map.svelte';
	import Layer from '$components/MapBox/Layer.svelte';
	import InfoWrapper from '$components/InfoWrapper.svelte';
	import Timer from '$components/Timer.svelte';
	import Spinner from '$components/Spinner.svelte';
	import RadioButton from '$components/RadioButton.svelte';
	import EndGameButton from '$components/EndGameButton.svelte';
	import CongratulationMsg from '$components/CongratulationMsg.svelte';
	import { generateRandomColor, getCountries, getRandomCountry, removeCountry } from '$utils';
	import { countriesStore, continentStore, timerStore, clickedCountryStore } from '$stores';
	let map;
	let m;
	let randomColor;
	let page = 'menu';
	let polygons = undefined;
	let isCorrectCountry = null;
	let countryToFind;
	let disabled;
	let loading;

	function onmouseover(e) {
		randomColor = generateRandomColor('light');
		map.flyTo(e.detail.coords, e.detail.zoom);
	}

	function onmouseout() {
		if (window.matchMedia('(max-width: 600px)').matches) {
			map.flyTo([0, 0], 1);
		} else {
			map.flyTo([0, 0], 2);
		}
	}

	async function startGame(e) {
		try {
			loading = true;
			const continentName = e.detail.replace(' ', '_');
			const res = await fetch(`/api/continents/${continentName}`);
			const data = await res.json();

			if (!res.ok) throw new Error(data.message);
			page = 'game';
			polygons = data.data.continent.countries.features;
			// data.data.continent.countries.features.splice(1);
			// data.data.continent.countries.features.length - 5;
			$countriesStore = getCountries(data);
			countryToFind = getRandomCountry($countriesStore);
		} catch (err) {
			alert(err.message);
		}
	}

	function endGame() {
		location.reload();
	}

	$: if ($clickedCountryStore && $clickedCountryStore === countryToFind.ISO_A3) {
		randomColor = generateRandomColor('light');
		m.setPaintProperty($clickedCountryStore, 'fill-color', randomColor);
		disabled = true;
		isCorrectCountry = true;
		$countriesStore = removeCountry($countriesStore, countryToFind?.ISO_A3);
		countryToFind = getRandomCountry($countriesStore);
	} else if ($clickedCountryStore && $clickedCountryStore !== countryToFind.ISO_A3) {
		disabled = true;
		isCorrectCountry = false;
		countryToFind = getRandomCountry($countriesStore);
	}
	$: if (map) m = map.getMap();

	$: if ($timerStore === 0) {
		countryToFind = getRandomCountry($countriesStore);
	}

	$: if (isCorrectCountry !== null) {
		setTimeout(() => {
			isCorrectCountry = null;
			disabled = false;
		}, 1000);
	}
	$: if (page === 'game' && $countriesStore.length === 0) {
		page = 'congratulations';
	}
</script>

<div class:disabled>
	<Map bind:this={map}>
		{#if polygons}
			{#each polygons as polygon}
				<Layer {polygon} />
			{/each}
		{/if}
	</Map>
</div>
{#if page !== 'menu'}
	<EndGameButton on:click={endGame} />
{/if}
{#if page === 'menu'}
	<Menu>
		<RadioButton map={m} />
		<svelte:fragment slot="btn-wrapper">
			{#each $continentStore as continent}
				<MenuButtons
					background={randomColor}
					on:onmouseover={onmouseover}
					on:focus={onmouseover}
					on:onclick={startGame}
					zoom={continent.zoom}
					coords={continent.coords}
					value={continent.name}>
					{continent.name}
				</MenuButtons>
			{/each}
		</svelte:fragment>
	</Menu>
	{#if loading}
		<Spinner />{/if}
{:else if page === 'game'}
	<InfoWrapper {isCorrectCountry} countryToFind={countryToFind?.ADMIN}>
		{#key countryToFind}
			<Timer />
		{/key}
	</InfoWrapper>
{:else if page === 'congratulations'}
	<CongratulationMsg />
{/if}

<style>
	.disabled {
		pointer-events: none;
	}
</style>
