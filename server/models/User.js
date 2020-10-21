const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
	name: {
		type: String,
		required: [true, 'Please add a name']
	},
	gender: {
		type: String,
		enum: ['Male', 'Female']
	},
	email: {
		type: String,
		required: [true, 'Please enter an email!'],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'Please enter a valid email'
		]
	},
	password: {
		type: String,
		required: [true, 'Please add a password'],
		minlength: 6
	}
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
