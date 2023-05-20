export default function generateRandomColor(brightness = 'all') {
	let additional = brightness === 'light' ? 1 : 0;
	const divisor = brightness !== 'all' ? 2 : 1;
	const red = Math.floor(((additional + Math.random()) * 256) / divisor);
	const green = Math.floor(((additional + Math.random()) * 256) / divisor);
	const blue = Math.floor(((additional + Math.random()) * 256) / divisor);
	return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
}
