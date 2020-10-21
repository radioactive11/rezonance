const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//Middleware
const errorHandler = require('./middleware/error');

//Requiring routes
const authRoute = require('./routes/auth');

dotenv.config();

const db = process.env.MONGO_URI;
console.log(db);

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => {
		console.log('Database connected');
	})
	.catch(err => {
		console.log('error connecting to the database', err);
	});

app.use(
	express.urlencoded({
		extended: false
	})
);

app.use(bodyParser.json());

app.use(cors());

//Definning routes
app.use('/', authRoute);

app.get(
	'/user/:id',
	function(req, res, next) {
		// if the user ID is 0, skip to the next route
		if (req.params.id === '0') next('route');
		// otherwise pass the control to the next middleware function in this stack
		else next();
	},
	function(req, res, next) {
		// send a regular response
		res.send('regular');
	}
);

// handler for the /user/:id path, which sends a special response
app.get('/user/:id', function(req, res, next) {
	res.send('special');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server connected on PORT ${PORT} `);
});
