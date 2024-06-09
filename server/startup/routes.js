const express = require('express');
require('express-async-errors');

// routes
const users = require('../routes/users');
const faces = require('../routes/faces');
const face = require('../routes/face_detection');
const luggage = require('../routes/luggage_detection');
const baggages = require('../routes/baggages');
const crowd_detection = require('../routes/crowd_detection');

// middlewares
const invalidRouteMiddleware = require('../middlewares/invalid-route');
const errorMiddleware = require('../middlewares/error');

module.exports = function (app) {
	app.use(express.json());
	app.use('/api/user', users);
	app.use('/api/faces', faces);
	app.use('/api/baggage', baggages);
	app.use('/api/crowd', crowd_detection);
	app.use('/api/face', face);
	app.use('/api/luggage', luggage);
	app.use(errorMiddleware);
};