const router = require('express').Router();

const {
	getAll,
	addCrowd,
	getPlaces,
	getByTime,
	generateRandomData
} = require('../controllers/crowd_detection');

router.get('/', getAll);
router.get('/getByTime', getByTime);
router.get('/getPlaces', getPlaces);
router.post('/addCrowd', addCrowd);
router.post('/generateRandomData', generateRandomData);

module.exports = router;
