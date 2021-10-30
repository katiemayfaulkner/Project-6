// Library for password hashing
const bcrypt = require('bcrypt');

// Secret or private key (token) generator for verification purpose
const jwt = require('jsonwebtoken');

// Import user model
const User = require('../models/user');

// Signup controller
exports.signup = (req, res, next) => {
  //Check if entered email corresponds to an existing user in database
  User.findOne({ email: req.body.email }).then( 
  (user) => {
      if (user) {
        return res.status(401).json({
          error: error,
          message: 'Email already in use!'
        });
      }
    }
  )
  
  const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

  if(strongPassword.test(req.body.password) && req.body.password.length >= 8) {
    // It's a strong password
    
    // If no existing user is found, call bycrypt function and ask it to salt password x10 (higher value = more security)
    bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        // Create new user and save to database
        user.save().then(
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

  } else {
    // It's a weak password
    res.status(400).json({
        message: "Weak password. Password must be at least 8 character, and contain at least one uppercase, one lowercase, one number and a special character!"
    });
  };
};

// Login controller
exports.login = (req, res, next) => {
  // Check if entered email corresponds to an existing user in database
  User.findOne({ email: req.body.email }).then(
    (user) => {
        if (!user) {
        return res.status(401).json({
          error: error,
          message: 'User not found!'
        });
      }
      // Compare entered password with saved hash in database
      bcrypt.compare(req.body.password, user.password).then(
        // If valid, login, if invalid, return error
        (valid) => {
          if (!valid) {
            return res.status(401).json({
              error: error,
              message: 'Incorrect password!'
            });
          }
          const token = jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET_WHICH_IS_LONG_BECAUSE_IT_IS_MORE_SECURE',
              {expiresIn: '24h' });
          res.status(200).json({
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