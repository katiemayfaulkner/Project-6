//MongDB PASSWORD : ECQ2bUTSde9LBnP

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//connect MongoDB Atlas
mongoose.connect('mongodb+srv://CallMeSid:ECQ2bUTSde9LBnP@cluster0.xewwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

//add headers to response object
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//convert body into useable json object
app.use(bodyParser.json());

//POST request
app.post('api/sauces', (req, res, next) => {
    console.log(req.body); //request
    res.status(201).json({ //response
        message: 'Sauce created successfully!'
    });
});

//GET request
app.use( '/api/sauces', (req, res, next) => {
    const stuff = [
        {
            _id: 'id123', 
            title: 'sauce 1',
            description: 'this is my first sauce',
            imageUrl : '',
            price : '4900',
            userId : 'userId123',
        },

        {
            _id: 'id123', 
            title: 'sauce 2',
            description: 'this is my second sauce',
            imageUrl : '',
            price : '4900',
            userId : 'userId123',
        },   
    ];
    res.status(200).json(stuff);
});

module.exports = app;