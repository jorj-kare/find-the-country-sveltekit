import { model, Schema } from 'mongoose';

const continentSchema = new Schema({
	name: { type: String, required: true },
	centroids: {
		type: {
			type: String,
			default: 'Point',
			enum: ['Point']
		},
		coordinates: [Number]
	},
	zoomLevel: { type: Number },
	countries: {
		type: {
			type: String,
			require: true,
			default: 'FeatureCollection',
			enum: ['FeatureCollection']
		},
		features: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Country'
			}
		]
	}
});

const Continent = model('Continent', continentSchema);
export default Continent;
