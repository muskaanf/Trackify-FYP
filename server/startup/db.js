const appLogger = require('../utils/logger');
const mongoose = require('mongoose');

module.exports = function () {
	mongoose
		.connect(process.env.DB_URI)
		.then(() => appLogger.info('Connected to MongoDB'))
		.catch((e) => appLogger.error('Error connecting to MongoDB', e));
};

//mongodb://127.0.0.1:27017/trackify