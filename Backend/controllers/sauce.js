// Import sauce model
const Sauce = require('../models/sauce');

// Import the file system
const fs = require('fs'); //fs = file system, includes functions for deleting (unused) files

// POST : Create a sauce
exports.createSauce = (req, res, next) => {

  req.body.sauce = JSON.parse(req.body.sauce);
  const url = req.protocol + '://' + req.get('host');
  const sauce = new Sauce({
      name: req.body.sauce.name,
      manufacturer: req.body.sauce.manufacturer,
      description: req.body.sauce.description,
      mainPepper: req.body.sauce.mainPepper,
      heat: req.body.sauce.heat,
      userId: req.body.sauce.userId,
      imageUrl: url + '/images/' + req.file.filename,
      likes: 0,
      dislikes: 0,
      usersLiked: req.body.sauce.usersLiked,
      usersDisliked: req.body.sauce.usersDisliked
  });

  // Save to database
  sauce.save().then(
    () => {
      res.status(201).json({
        message: 'Successfully saved post!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

//GET : Retrieve all sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find().then( //'find' returns array of sauces
    (sauces) => {
        res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

//GET : Retrieve a sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
      _id: req.params.id,
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
};

// PUT : Modify a sauce
exports.modifySauce = (req, res, next) => {
  let sauce = new Sauce({ _id: req.params._id });
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = ({
      name: req.body.sauce.name,
      description: req.body.sauce.description,
      imageUrl: url + '/images/' + req.file.filename,
      manufacturer: req.body.sauce.manufacturer,
      mainPepper: req.body.sauce.mainPepper,
      heat: req.body.sauce.heat,
    }); 
  } else {
    sauce = ({
      _id: req.params.id, //stops new id being created when sauce is edited
      userId: req.body.userId,
      name: req.body.name,
      description: req.body.description,
      manufacturer: req.body.manufacturer,
      mainPepper: req.body.mainPepper,
      heat: req.body.heat, 
    });
  }
  Sauce.updateOne({_id: req.params.id}, sauce).then(
    () => {
      res.status(201).json({
        message: 'Successfully updated sauce!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// DELETE : Delete a sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id}).then( //use id to access corresponding sauce in database
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1]; //use /images/ segment in img url to separate file name
      fs.unlink('images/' + filename, () => { //use fs package's unlink function to delete file 
        Sauce.deleteOne({_id:req.params.id}).then( //original logic (=deleting sauce from database once file = deleted)
          () => {
            res.status(200).json({
              message: 'Successfully deleted sauce!'
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
    }
  );
};

// POST : Like or dislike a sauce
exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then
  (sauce => {
	 // Like
    if (req.body.like == 1) {
      sauce.usersLiked.push(req.body.userId);
      sauce.likes += req.body.like;	  
    } 
	  // Remove like
	  else if (req.body.like == 0 && sauce.usersLiked.includes(req.body.userId)) {
      sauce.usersLiked.remove(req.body.userId);
      sauce.likes -= 1;
    } 
	  // Dislike
	  else if (req.body.like == -1) {
      sauce.usersDisliked.push(req.body.userId);
      sauce.dislikes += 1;
    } 
	  // Remove dislike
	  else if (req.body.like == 0 && sauce.usersDisliked.includes(req.body.userId)) {
      sauce.usersDisliked.remove(req.body.userId);
      sauce.dislikes -= 1;
    }
    sauce.save().then(() => {
      res.status(200).json({
        message: 'Successfully liked sauce' 
      });
    }).catch(
	  (error) => {
      res.status(400).json({
        error: error
      });
    });
  });
};