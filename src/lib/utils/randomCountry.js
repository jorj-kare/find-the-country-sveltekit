export default (countries) => {
	if (countries.length === 0) return countries;
	const randomNumber = Math.floor(Math.random() * (0, countries.length - 1));
	return countries[randomNumber];
};
