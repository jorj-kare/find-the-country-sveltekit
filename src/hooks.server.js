import { startMongoDB } from '$lib/server/mongoDB.js';

startMongoDB().then(async () => {
	console.log('You have successfully connected to the database!');
});
