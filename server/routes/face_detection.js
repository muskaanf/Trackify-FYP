const router = require('express').Router();

const {
	getIntruders,
	getAll,
	addFace,
	markIntrudersAsSafe
} = require('../controllers/face_detection');

router.get('/getAll', getAll);
router.get('/getIntruders', getIntruders);
router.post('/addFace', addFace);
router.post('/markIntrudersAsSafe', markIntrudersAsSafe);

module.exports = router;
