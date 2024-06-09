const crowdSchema = require('../models/crowd_detection');

const getAll = async (req, res) => {
	const crowds = await crowdSchema.find();
	res.status(200).send(crowds);
};

const addCrowd = async (req, res) => {
	const { number, video_ref } = req.body;

	try {
		const newCrowd = new crowdSchema({
			number,
			video_ref
		});

		const saved = await newCrowd.save();
		res.status(201).send(saved);
	} catch (error) {
		console.error('Error creating crowd:', error);
		res.status(500).send({ message: 'Error creating Crowd.', error: error.message });
	}
};

const getPlaces = async (req, res) => {
	const crowds = await crowdSchema.find()
	const videoData = {};

	for (const crowd of crowds) {
		const { video_ref, number, time } = crowd;

		if (!videoData[video_ref]) {
			videoData[video_ref] = [];
		}

		videoData[video_ref].push({ number, time });
	}

	// Sort the data by time (newest first)
	for (const video_ref in videoData) {
		videoData[video_ref].sort((a, b) => new Date(b.time) - new Date(a.time));
	}

	const result = Object.entries(videoData).map(([video_ref, data]) => ({
		video_ref,
		data,
	}));

	res.status(200).send(result);
};

const getByTime = async (req, res) => {
	const crowds = await crowdSchema.aggregate([
		{ $match: { video_ref: req.body.video_ref } },
		{ $group: { _id: "$time", sum: { $sum: { "$toInt": "$number" } } } },
	]).sort({ "_id": "desc" })
	res.status(200).send(crowds);
};

const generateRandomData = async (req, res) => {
    const videoRefs = ["North Nazimabad", "Defence Housing Society", "Bahadurabad PECHS", "Malir Cannt"]; 
    const timestamp = new Date();

    try {
        const randomData = videoRefs.map(videoRef => ({
            number: Math.floor(Math.random() * 101) + 200,
            video_ref: videoRef,
            time: timestamp
        }));

        await crowdSchema.insertMany(randomData);

        res.status(201).send({ message: 'Random data generated successfully.' });
    } catch (error) {
        console.error('Error generating random data:', error);
        res.status(500).send({ message: 'Error generating random data.', error: error.message });
    }
};

module.exports = {
	getAll,
	addCrowd,
	getPlaces,
	getByTime,
	generateRandomData,
};
