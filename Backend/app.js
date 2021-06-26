console.log('hey')

const express = require('express');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

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