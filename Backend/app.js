//MongDB PASSWORD : ECQ2bUTSde9LBnP

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Sauce = require('./models/sauce');
const sauce = require('./models/sauce');

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

//POST request
app.post('api/sauces', (req, res, next) => {
    const Sauce = new Sauce({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.imageUrl,
        userId: req.body.userId
    });

    //SAVE sauces to database
    sauce.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//GET request - retrieving SINGLE sauce
app.get('/api/sauces:id', (req, res, next) => { //colon is placed in front of id to say that it is dynamic (will change)
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (sauce) => {
            res.status(200).json(sauce);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

//UPDATE an existing sauce - CRUD
app.put('/api/sauce/:id', (req, res, next) => {
  const sauce = new Sauce({
    _id: req.params.id, //stops new id being created when sauce is edited
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId
  });
  Sauce.updateOne({_id: req.params.id}, sauce).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

//DELETE a sauce - CRUD
app.delete('/api/sauce/:id', (req, res, next) => {
  Sauce.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

//GET request - retrieving LIST of sauces
app.use( '/api/sauces', (req, res, next) => {
    Sauce.find().then( //'find' returns array
        (sauces) => {
            res.status(200).json(things);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

module.exports = app;