const Sauce = require('../models/sauce');
const fs = require('fs'); //fs = file system, includes functions for deleting (unused) files

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
};

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then( //'find' returns array
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

exports.getOneSauce = (req, res, next) => { //colon is placed in front of id to say that it is dynamic (will change)
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
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id}).then( //use id to access corresponding sauce in database
    (sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1]; //use /images/ segment in img url to separate file name
      fs.unlink('images/' + filename, () => { //use fs package's unlink function to delete file 
        Sauce.deleteOne({_id:req.params.id}).then( //original logic (=deleting sauce from database once file = deleted)
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
    }
  );
};

// exports.likeSauce = (req, res, next) => {
//   req.body = req.body
//   Sauce.findOne({           // Find item by id
//       _id: req.params.id 

//   }).then(sauce => {                                                          
//     if (req.body.likes == 1) {       // Likes
//       sauce.usersLiked
//       .push(req.body.userId)
//       sauce.likes += req.body.likes
//     } 
//       else if (           
//       req.body.likes == 0 && sauce.usersLiked
//       .includes(req.body.userId)
//     ) 
//     {
//       sauce.usersLiked 
//           .remove(req.body.userId)
//           sauce.likes -= 1
//     }  
    
//     else if (req.body.likes == -1) {      // Dislikes
//       sauce.usersDisliked
//       .push(req.body.userId)
//       sauce.dislikes += 1
//     } 
//     else if (      
//       req.body.likes == 0 && sauce.usersDisliked
//       .includes(req.body.userId)
//     ) 
//     {             
//       sauce.usersDisliked
//       .remove(req.body.userId)
//       sauce.dislikes -= 1
//     }
//     Sauce.updateOne({ _id: req.params.id }, sauce).then(
//       () => {
//         res.status(201).json({
//             message: 'Sauce updated successfully!'
//         });
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//             error: error
//         });
//       }
//     );
//   })
// };

// exports.likeSauce = (req, res, next) => {
//     let sauce = new Sauce({ _id: req.params._id });

//     // Like a sauce
//     if(req.body.likes == 1){
//         sauce.likes += 1;
//         sauce.usersLiked.push(req.body.userId);
//     }

//     // Undo like/dislike
//     if(req.body.likes == 0){
//         if(sauce.usersLiked.includes(req.body.userId)){
//             sauce.likes -= 1;
//             sauce.usersLiked.remove(req.body.userId);
//         }else {
//             sauce.dislikes -= 1;
//             sauce.usersDisliked.remove(req.body.userId);
//         }
//     }

//     // Dislike a sauce
//     if (req.body.likes == -1){
//         sauce.dislikes += 1;
//         sauce.usersDisliked.push(req.body.userId);
//     };

//     sauce = {
//         likes: sauce.likes,
//         dislikes: sauce.dislikes,
//         usersLiked: sauce.usersLiked,
//         usersDisliked: sauce.usersDisliked
//     }

//     Sauce.updateOne({ _id: req.params.id }, sauce).then(
//         () => {
//             res.status(201).json({
//                 message: 'Sauce updated successfully!'
//             });
//         }
//     ).catch(
//         (error) => {
//             res.status(400).json({
//                 error: error
//             });
//         }
//     );
// }

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
          message: 'Sauce liked successfully' 
        });
      }).catch(
	  (error) => {
        res.status(400).json({
          error: error
        });
      });
  });
};