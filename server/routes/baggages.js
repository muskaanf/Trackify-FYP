const router = require('express').Router();
const multer = require('../configs/multerConfig')();

// controller
const {
	getAllBaggages,
	getUserBaggages,
	getBaggageById,
	createBaggage,
	updateBaggage,
	uploadBaggageImages,
	deleteBaggageImage,
	deleteBaggage,
} = require('../controllers/baggages');

// middlewares
const { validateToken } = require('../middlewares/validate-token');
const { validateImage } = require('../middlewares/validate-image');
const { validateAdmin } = require('../middlewares/validate-admin');
const { validateRequest } = require('../middlewares/validate-request');

// validation
const { baggageSchema } = require('../utils/validations/baggages-schema');

// routes
router.get('/user/:id',	validateToken, getUserBaggages);
router.get('/:id', validateToken, getBaggageById);
router.post('/', [validateToken, validateImage, validateRequest(baggageSchema)], createBaggage);
router.patch('/:id', [validateToken, validateRequest(baggageSchema)], updateBaggage);
router.delete('/:id', [validateToken], deleteBaggage);

// New routes for admin to access all data
router.get('/admin/all', [validateToken, validateAdmin], getAllBaggages);
router.delete('/admin/:id', [validateToken, validateAdmin], deleteBaggage);

module.exports = router;
