const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Create storage constant
const storage = multer.diskStorage({ //to be passed to multer as config (contains necessary logic to tell multer where to store incoming files)
  destination: (req, file, callback) => { //tells multer to save files in "images" folder
    callback(null, 'images');
  },
  filename: (req, file, callback) => { //tells multer to use original name, but..
    const name = file.originalname.split(' ').join('_'); // spaces become underscores
    const extension = MIME_TYPES[file.mimetype]; // uses MIME type map constant to resolve appropriate file extension
    callback(null, name + Date.now() + '.' + extension); // timestamp is added
  }
});

module.exports = multer({storage: storage}).single('image'); // export configured multer, pass to storage constant, & handled uploads = single images