const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = (req, res, next) => {
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

}