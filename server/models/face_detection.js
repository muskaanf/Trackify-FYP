const mongoose = require('mongoose');

const faceSchema = new mongoose.Schema(
	{
		intruder: {
			type: Boolean,
			required: true,
		},
		face_ref: {
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


module.exports = mongoose.model('face_detection', faceSchema);
