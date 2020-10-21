const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const ErrorResponse = require('../utils/ErrorResponse');
const asyncHandler = require('../middleware/async');
const sendResponse = require('../utils/sendResponse');

module.exports.signup = asyncHandler(async (req, res, next) => {
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
