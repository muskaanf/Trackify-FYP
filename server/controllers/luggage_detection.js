const luggageSchema = require('../models/luggage_detection.js');

const getAll = async (req, res) => {
	const luggages = await luggageSchema.find();
	res.status(200).send(luggages);
};

const getUnattended = async (req, res) => {
	const luggages = await luggageSchema.find({"unattended":true});
	res.status(200).send(luggages);
};

const markUnattendedAsSafe = async (req, res) => {
	const luggages = await luggageSchema.updateMany({"_id":req.body.id},{"unattended":false});
	res.status(200).send(luggages);
};


const addLuggage = async (req, res) => {
	const { unattended, luggage_ref } = req.body;
	try {
		const newLuggage = new luggageSchema({
			unattended,
			luggage_ref
		});
		const saved = await newLuggage.save();
		res.status(201).send(saved);
	} catch (error) {
		console.error('Error creating luggage:', error);
		res.status(500).send({ message: 'Error creating luggage.', error: error.message });
	}
};



const deleteUnattendedLuggage = async (req, res) => {
	try {
	  const result = await luggageSchema.deleteMany({ unattended: true });
	  res.status(200).send({ message: 'Unattended luggage records deleted.', deletedCount: result.deletedCount });
	} catch (error) {
	  console.error('Error deleting unattended luggage:', error);
	  res.status(500).send({ message: 'Error deleting unattended luggage.', error: error.message });
	}
  };



module.exports = {
	getAll,
	markUnattendedAsSafe,
	getUnattended,
	addLuggage,
	deleteUnattendedLuggage
};
