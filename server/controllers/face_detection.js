const faceSchema = require('../models/face_detection.js');

const getAll = async (req, res) => {
	const faces = await faceSchema.find();
	res.status(200).send(faces);
};

const getIntruders = async (req, res) => {
	const faces = await faceSchema.find({"intruder":true});
	res.status(200).send(faces);
};

const markIntrudersAsSafe = async (req, res) => {
	const faces = await faceSchema.updateMany({"_id":req.body.id},{"intruder":false});
	res.status(200).send(faces);
};


const addFace = async (req, res) => {
	const { intruder, face_ref } = req.body;
	try {
		const newface = new faceSchema({
			intruder,
			face_ref
		});
		const saved = await newface.save();
		res.status(201).send(saved);
	} catch (error) {
		console.error('Error creating face:', error);
		res.status(500).send({ message: 'Error creating face.', error: error.message });
	}
};



module.exports = {
	getAll,
	markIntrudersAsSafe,
	getIntruders,
	addFace
};
