const router = require('express').Router();

const {
	getUnattended,
	getAll,
	addLuggage,
	markUnattendedAsSafe,
	deleteUnattendedLuggage
} = require('../controllers/luggage_detection');

router.get('/getAll', getAll);
router.get('/getUnattended', getUnattended);
router.post('/addLuggage', addLuggage);
router.post('/markUnattendedAsSafe', markUnattendedAsSafe);
router.delete('/deleteUnattendedLuggage', deleteUnattendedLuggage);

module.exports = router;
