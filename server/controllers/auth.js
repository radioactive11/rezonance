const User = require('../models/User');
const bcrypt = require('bcrypt');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const sendResponse = require('../utils/sendResponse');
const jwt = require('jsonwebtoken');

// @desc register user
// @route POST /register
// @access PUBLIC

module.exports.register = asyncHandler(async (req, res, next) => {
	const { name, email, gender, password } = req.body;

	//Checking if user is already registered or not
	const user = await User.findOne({ email });

	if (user) {
		return next(
			new ErrorResponse('User with that email already exists', 400)
		);
	}

	const hashedPass = await bcrypt.hash(password, 10);

	const newUser = new User({
		name,
		email,
		gender,
		password: hashedPass
	});

	const savedUser = await newUser.save();

	sendResponse(savedUser, 'User successfully registered', res);
});

// @desc login user
// @route POST /login
// @access PUBLIC

module.exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;
	const secret = process.env.JWT_SECRET;
	const user = await User.findOne({ email });

	if (!user) {
		return next(new ErrorResponse('User is not registered'));
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (isMatch) {
		const token = jwt.sign(
			{
				_id: user._id
			},
			secret
		);
		const { _id, email, name, gender } = user;

		res.json({
			token,
			user: { _id, email, name, gender }
		});
	} else {
		return next(new ErrorResponse('Sorry, Incorrect Email/Password', 400));
	}
});

// @desc dashboard
// @route GET /dashboard
// @access Private

module.exports.dashboard = asyncHandler(async (req, res) => {
	const getUser = await User.findById(req.user._id);

	sendResponse(getUser, 'Token verified', res);
});
