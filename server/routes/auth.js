const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/auth');

router.use(function(req, res, next) {
	console.log('Time:', Date.now());
	next();
});

router.post('/signup', signup);

module.exports = router;
