const Sauce = require('../models/sauce');

exports.createSauce = (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  req.body.sauce = JSON.parse(req.body.sauce);
    const Sauce = new Sauce({
        title: req.body.sauce.title,
        description: req.body.sauce. description,
        imageUrl: url + '/images/' + req.file.filename,
        price: req.body.sauce.price,
        userId: req.body.sauce.userId
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
};

exports.modifySauce = (req, res, next) => {

  let sauce = new Sauce({ _id: req.params._id });

  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    req.body.sauce = JSON.parse(req.body.sauce);
    sauce = ({
      _id: req.params.id,
      title: req.body.sauce.title,
      description: req.body.sauce. description,
      imageUrl: url + '/images/' + req.file.filename,
      price: req.body.sauce.price,
      userId: req.body.sauce.userId
    }); 
  } else {
    sauce = ({
      _id: req.params.id, //stops new id being created when sauce is edited
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId
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
};