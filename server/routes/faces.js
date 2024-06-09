const router = require('express').Router();
const multer = require('../configs/multerConfig')();

// controller
const { getAllFaces, getUserFaces, getFaceById, createFace, updateFace, deleteFace } = require('../controllers/faces');

// middlewares
const { validateToken } = require('../middlewares/validate-token');
const { validateImage } = require('../middlewares/validate-image');
const { validateAdmin } = require('../middlewares/validate-admin');

router.get('/user/:id', [validateToken], getUserFaces);
router.get('/:id', [validateToken], getFaceById);
router.post('/', [validateToken], createFace);
router.patch('/:id', [validateToken], updateFace);
router.delete('/:id', [validateToken], deleteFace);

// New routes for admin to access all data
router.get('/admin/all', [validateToken, validateAdmin], getAllFaces);
router.delete('/admin/:id', [validateToken, validateAdmin], deleteFace);

module.exports = router;
