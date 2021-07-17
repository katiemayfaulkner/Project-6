const mongoose = require('mongoose');

//create data scheme containing the wanted fields for each sauce
const sauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  _id: { type: String, required: true },
  manufacturer: { type: String, required: true },
  mainPepper: { type: String, required: true },
  heat: { type: String, required: true },
  likes: { type: Number },
  Dislikes: { type: Number },
  usersLiked: { type: String },
  usersDisliked: { type: String },
});

//export schema as mongoose model, making it available for Express app
module.exports = mongoose.model('Sauce', sauceSchema);