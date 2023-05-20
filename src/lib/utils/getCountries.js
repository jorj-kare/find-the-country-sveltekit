export default (data) =>
	data.data.continent.countries.features.map((country) => country.properties);
