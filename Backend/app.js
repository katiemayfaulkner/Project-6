// Fast & minimalist web framework
const express = require('express');

// Body parsing middleware : Converts body into useable json object
const bodyParser = require('body-parser');

// Required for database (MongoDB) connection
const mongoose = require('mongoose');

// Path module : provides utilities for working with file and directory paths
const path = require('path');

// Cross origin resource sharing : allows resources on a web page to be requested from a domain outside the domain from which the first resource was served
const cors = require('cors');

// Mongoose Express error handler plugin
const mongooseExpressErrorHandler = require('mongoose-express-error-handler');

// So Pekocko web app
const app = express();

// Access routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

//Connect MongoDB Atlas
mongoose.connect('mongodb+srv://CallMeSid:ECQ2bUTSde9LBnP@cluster0.xewwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

//Add headers to response object
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(cors());
app.use(mongooseExpressErrorHandler);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// Exporting the web application
module.exports = app;