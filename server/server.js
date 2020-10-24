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

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server connected on PORT ${PORT} `);
});
