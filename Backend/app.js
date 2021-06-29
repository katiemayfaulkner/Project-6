//MongDB PASSWORD : ECQ2bUTSde9LBnP

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

const app = express();

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

//Convert body into useable json object
app.use(bodyParser.json());

app.use('/api/stuff', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;