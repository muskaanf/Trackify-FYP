const router = require('express').Router();

// controller
const {
	userDetails,
	unApprovedUsers,
	signup,
	login,
	updateUser,
	approveUser,
	grantAdmin,
	fetchUsers,
	deleteUser
} = require('../controllers/users');

// middlewares
const { validateToken } = require('../middlewares/validate-token');
const { validateRequest } = require('../middlewares/validate-request');
const { validateAdmin } = require('../middlewares/validate-admin');

// validation
const { loginSchema, signupSchema, updateSchema } = require('../utils/validations/users-schema');

// routes
router.get('/details', validateToken, userDetails);
router.get('/unapproved', [validateToken, validateAdmin], unApprovedUsers);
router.get('/getUsers', [validateToken, validateAdmin], fetchUsers);
router.post('/login', validateRequest(loginSchema), login);
router.post('/signup', validateRequest(signupSchema), signup);
router.put('/update/:id', [validateToken, validateRequest(updateSchema)], updateUser);
router.patch('/grant-admin/:id', [validateToken, validateAdmin], grantAdmin);
router.patch('/approve/:id', [validateToken, validateAdmin], approveUser);
router.delete('/:id', [validateToken, validateAdmin], deleteUser);

module.exports = router;