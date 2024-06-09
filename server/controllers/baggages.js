const Baggages = require('../models/baggages');

// utils
const { NotFoundError, BadRequestError, UnauthorizedError } = require('../utils/errors');
const { createBucketsIfNotExists, uploadImage, deleteImage } = require('../utils/minio');

const getAllBaggages = async (req, res) => {
	const baggages = await Baggages.find();
	res.status(200).send(baggages);
  };

const getUserBaggages = async (req, res) => {
	const userId = req.params.id;
	const baggages = await Baggages.find({ userId });
	res.status(200).send(baggages);
};

const getBaggageById = async (req, res) => {
	const baggage = await Baggages.findById(req.params.id).populate('userId');
	if (!baggage) throw NotFoundError('Baggage not found');
	res.status(200).send(baggage);
};

const createBaggage = async (req, res) => {
	const { color, category, brand, images } = req.body;
	const userId = req.user.id;
  
	try {
	  const newBaggage = new Baggages({
		userId,
		color,
		category,
		brand,
		images, // Store the array of base64 image strings
	  });
  
	  const saved = await newBaggage.save();
	  res.status(201).send(saved);
	} catch (error) {
	  console.error('Error creating baggage:', error);
	  res.status(500).send({ message: 'Error creating baggage.', error: error.message });
	}
  };
  
const uploadBaggageImages = async (req, res) => {
	const id = req.params.id;
	const userId = req.user.id;

	const baggage = await Baggages.findById(id);
	if (!baggage) throw NotFoundError('Baggage not found');
	if (String(baggage.userId) !== userId) throw UnauthorizedError('User is not authorized');

	if (baggage.images.length + req.files.length > 10) {
		throw BadRequestError('Only 10 images are allowed');
	}

	const uploadPromises = req.files.map((file) =>
		uploadImage(process.env.MINIO_USER_FACES_BUCKET, file)
	);
	const uploadedImages = await Promise.all(uploadPromises);
	baggage.images.push(...uploadedImages);
	await baggage.save();

	res.status(200).send(baggage);
};

const deleteBaggageImage = async (req, res) => {
	let imageHash;
	const userId = req.user.id;
	const { baggageId, imageId } = req.params;

	const baggage = await Baggages.findById(baggageId);
	if (!baggage) throw NotFoundError('Baggage not found');
	if (String(baggage.userId) !== userId) throw UnauthorizedError('User is not authorized');

	const filteredImages = baggage.images.filter((v) => {
		if (String(v._id) === imageId) imageHash = v.fileHash;
		return String(v._id) !== imageId;
	});

	if (!imageHash) throw NotFoundError('Image not found');
	await deleteImage(process.env.MINIO_USER_FACES_BUCKET, imageHash);

	baggage.set({ images: filteredImages });
	await baggage.save();

	res.status(200).send({ message: 'Image deleted successfully' });
};


const deleteBaggage = async (req, res) => {
	const id = req.params.id;
  
	try {
	  const baggage = await Baggages.findByIdAndDelete(id);
	  if (!baggage) {
		return res.status(404).send({ message: 'Baggage not found' });
	  }
	  res.status(200).send({ message: 'Baggage deleted successfully' });
	} catch (error) {
	  console.error('Error deleting baggage:', error);
	  res.status(500).send({ message: 'Error deleting baggage', error: error.message });
	}
  };

  const updateBaggage = async (req, res) => {
	const { id } = req.params;
	const updates = req.body;
  
	try {
	  const updatedBaggage = await Baggages.findByIdAndUpdate(id, updates, { new: true });
	  if (!updatedBaggage) {
		return res.status(404).send({ message: 'Baggage not found' });
	  }
	  res.status(200).send(updatedBaggage); 
	} catch (error) {
	  console.error('Error updating baggage:', error);
	  res.status(500).send({ message: 'Error updating baggage.', error: error.message });
	}
  };
  

module.exports = {
	getAllBaggages,
	getUserBaggages,
	getBaggageById,
	createBaggage,
	updateBaggage,
	uploadBaggageImages,
	deleteBaggageImage,
	deleteBaggage,
};
