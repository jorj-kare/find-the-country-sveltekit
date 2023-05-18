<script>
	import { setContext, onMount, onDestroy } from 'svelte';
	import { mapKey } from '$components/MapBox/keys.js';
	import { PUBLIC_MAPBOX_ACCESS_TOKEN, PUBLIC_MAPBOX_STYLE } from '$env/static/public';
	import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

	let container;
	let map = undefined;

	export function flyTo(coords, zoom) {
		map.flyTo({
			center: coords,
			zoom: zoom,
			speed: 0.5,
			curve: 1,
			easing(t) {
				return t;
			},
			essential: true
		});
	}
	export function getMap() {
		return map;
	}

	setContext(mapKey, {
		getMap: () => map
	});

	onMount(() => {
		mapboxgl.accessToken = PUBLIC_MAPBOX_ACCESS_TOKEN;
		map = new mapboxgl.Map({
			container,
			style: PUBLIC_MAPBOX_STYLE,
			zoom: 0,
			center: [0, 0],
			renderWorldCopies: false,
			pitch: 0
		});
		map.touchZoomRotate.disableRotation();
	});
	onDestroy(() => {
		map = undefined;
	});
</script>

<svelte:head>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css" rel="stylesheet" />
</svelte:head>
<div id="map" bind:this={container}>
	{#if map}<slot />{/if}
</div>

<style>
	#map {
		height: 100vh;
		width: 100vw;
	}
</style>
