const Faces = require('../models/faces');

const getAllFaces = async (req, res) => {
  const faces = await Faces.find();
  res.status(200).send(faces);
};

const getUserFaces = async (req, res) => {
  const userId = req.params.id;
  try {
    const faces = await Faces.find({ userId });
    res.status(200).send(faces);
  } catch (error) {
    console.error('Error fetching faces:', error);
    res.status(500).send({ message: 'Error fetching faces.', error: error.message });
  }
};

const getFaceById = async (req, res) => {
  try {
    const face = await Faces.findById(req.params.id);
    if (!face) throw new Error('Face not found');
    res.status(200).send(face);
  } catch (error) {
    console.error('Error fetching face:', error);
    res.status(500).send({ message: 'Error fetching face.', error: error.message });
  }
};

const createFace = async (req, res) => {
  const { title, id, images } = req.body;
  const userId = req.user.id;

  const newFace = new Faces({
    userId,
    title,
    id,
    images,
  });

  try {
    const savedFace = await newFace.save();
    res.status(201).send(savedFace);
  } catch (error) {
    console.error('Error creating face:', error);
    res.status(500).send({ message: 'Error creating face.', error: error.message });
  }
};

const updateFace = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedFace = await Faces.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedFace) throw new Error('Face not found');
    res.status(200).send(updatedFace);
  } catch (error) {
    console.error('Error updating face:', error);
    res.status(500).send({ message: 'Error updating face.', error: error.message });
  }
};

const deleteFace = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedFace = await Faces.findByIdAndDelete(id);
    if (!deletedFace) throw new Error('Face not found');
    res.status(200).send({ message: 'Face deleted successfully' });
  } catch (error) {
    console.error('Error deleting face:', error);
    res.status(500).send({ message: 'Error deleting face.', error: error.message });
  }
};

module.exports = {
  getAllFaces,
  getUserFaces,
  getFaceById,
  createFace,
  updateFace,
  deleteFace,
};

