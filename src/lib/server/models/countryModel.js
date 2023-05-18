import { model, Schema } from 'mongoose';
const countrySchema = new Schema({
	type: {
		type: String,
		default: 'Feature'
	},
	properties: {
		ADMIN: { type: String },
		ISO_A3: { type: String }
	},
	geometry: {
		type: { type: String, default: 'MultiPolygon' },
		coordinates: { type: [[[[Number]]]] }
	},
	continent: {
		type: Schema.Types.ObjectId,
		ref: 'Continent'
	}
});
const Country = model('Country', countrySchema);
export default Country;
