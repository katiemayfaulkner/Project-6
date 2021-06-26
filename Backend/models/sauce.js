const mongoose = require('mongoose');

//create data scheme containing the wanted fields for each sauce
const sauceSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

//export schema as mongoose model, making it available for Express app
module.exports = mongoose.model('Sauce', sauceSchema);