const mongoose = require('mongoose');

const crowdSchema = new mongoose.Schema(
	{
		number: {
			type: Number,
			required: true,
		},
		video_ref: {
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


module.exports = mongoose.model('crowd', crowdSchema);
