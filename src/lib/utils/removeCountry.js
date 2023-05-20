export default (countries, country) => {
	const countriesArray = countries.filter((c) => c.ISO_A3 !== country);
	return countriesArray;
};
