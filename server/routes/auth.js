const colors = require('colors');
const express = require('express');
const router = express.Router();
const { register, login, dashboard } = require('../controllers/auth');
const requireLogin = require('../middleware/requireLogin');

router.use(function(req, res, next) {
	console.log(
		colors.green.bold(
			`${req.method} request made at route ${
				req.originalUrl
			} at ${Date.now()}`
		)
	);
	next();
});

router.post('/register', register);

router.post('/login', login);

router.get('/dashboard', requireLogin, dashboard);

module.exports = router;
