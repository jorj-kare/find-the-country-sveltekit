import Continent from '$lib/server/models/continentModel.js';
import Country from '$lib/server/models/countryModel.js';

import { json, error } from '@sveltejs/kit';
export const GET = async ({ params }) => {
	try {
		const continent = await Continent.findOne({ name: params.id }).populate({
			path: 'countries.features'
		});
		if (!continent) throw new error('Something went wrong, please try again');
		return json({ data: { continent } }, { status: 200 });
	} catch (err) {
		throw error(err);
	}
};
