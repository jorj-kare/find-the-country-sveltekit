<script>
	import { getContext, onDestroy } from 'svelte';
	import { mapKey } from '$components/MapBox/keys.js';
	import { clickedCountryStore } from '$stores';

	export let polygon;

	let countryCode = polygon?.properties.ISO_A3;
	const { getMap } = getContext(mapKey);
	const map = getMap();

	map.addSource(countryCode, {
		type: 'geojson',
		data: polygon
	});
	map.addLayer({
		id: countryCode,
		type: 'fill',
		source: countryCode,
		paint: {
			'fill-color': 'rgb(250, 250 ,250)',
			'fill-outline-color': 'rgb(3, 55, 95)'
		}
	});

	map.on('click', countryCode, (e) => {
		$clickedCountryStore = undefined;
		$clickedCountryStore = e.features[0].properties.ISO_A3;
	});

	map.on('mouseenter', countryCode, () => {
		map.getCanvas().style.cursor = 'pointer';
	});
	map.on('mouseleave', countryCode, () => {
		map.getCanvas().style.cursor = '';
	});
</script>
