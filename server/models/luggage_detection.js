const mongoose = require('mongoose');

const luggageSchema = new mongoose.Schema(
	{
		unattended: {
			type: Boolean,
			required: true,
		},
		luggage_ref: {
			type: String,
			required: true,
		},
		time: {
			type: Date,
			default: Date.now(),
		},
	},
	{ timestamps: true }
);


module.exports = mongoose.model('luggage_detection', luggageSchema);
