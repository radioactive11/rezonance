const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const secret = process.env.JWT_SECRET;
console.log(secret, 'secret');

module.exports = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return next(new ErrorResponse('No headers provided', 401));
	}

	//Else get the token from the authorization bearer
	const token = authorization.replace('Bearer ', '');
	//Verifying the token for accessing the protectd pages
	const payload = await jwt.verify(token, secret);
	//Payload sent at the time of signnign in

	if (payload) {
		const { _id } = payload;
		const userData = await User.findById({
			_id
		});
		req.user = userData;

		console.log(req.user._id);
		next();
	} else {
		return next(new ErrorResponse('You must be logged in', 401));
	}
};
