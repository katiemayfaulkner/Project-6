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
  User.findOne({ email: req.body.email }).then( //check if entered email corresponds to an existing user in database
    (user) => {
        if (!user) { //if not, return error, if corresponds, continue
        return res.status(401).json({
          error: new Error('User not found!')
        });
      }
      bcrypt.compare(req.body.password, user.password).then( //compare entered password with saved hash in database
        (valid) => {
          if (!valid) { //if invalid, return error, if valid, users credentials = valid
            return res.status(401).json({
              error: new Error('Incorrect password!')
            });
          }
          res.status(200).json({ // if valid, return 200 response, id, and token
            userId: user._id,
            token: 'token'
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