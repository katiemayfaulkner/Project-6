const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); //jwt = json web token
const User = require('../models/user');

exports.signup = (req, res, next) => {
  User.findOne({ email: req.body.email }).then( //check if entered email corresponds to an existing user in database
  (user) => {
      if (user) { //if not, return error, if corresponds, continue
        return res.status(401).json({
          error: new Error('Email already in use!'),
          message: 'Email already in use!'
        });
      }
    }
  )

  bcrypt.hash(req.body.password, 10).then( //call bycrypt function and ask it to salt password x10 (higher value = more security)
    (hash) => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save().then( //Create new user and save to database
        () => {
          res.status(201).json({
            message: 'User added successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    }
  );
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }).then( //check if entered email corresponds to an existing user in database
    (user) => {
        if (!user) { //if not, return error, if corresponds, continue
        return res.status(401).json({
          error: new Error('User not found!'),
          message: 'User not found!'
        });
      }
      bcrypt.compare(req.body.password, user.password).then( //compare entered password with saved hash in database
        (valid) => {
          if (!valid) { //if invalid, return error, if valid, users credentials = valid
            return res.status(401).json({
              error: new Error('Incorrect password!'),
              message: 'Incorrect password!'
            });
          }
          const token = jwt.sign( //encode new token
              { userId: user._id }, //token contains users id as payload
              'RANDOM_TOKEN_SECRET_WHICH_IS_LONG_BECAUSE_IT_IS_MORE_SECURE', //temp dev secret string to encode token 
              {expiresIn: '24h' }); //valid for 24h
          res.status(200).json({ // if valid, return 200 response, id, and token
            userId: user._id,
            token: token
          });
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
    }
  ).catch(
    (error) => {
      res.status(500).json({
        error: error
      });
    }
  );
}