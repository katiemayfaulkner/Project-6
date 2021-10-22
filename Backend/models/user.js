// MongoDB object modeling tool
const mongoose = require('mongoose');
// Tool for unique emails
const uniqueValidator = require('mongoose-unique-validator'); 

// Data scheme containing the required fields for each user
const userSchema = mongoose.Schema({
    email: { type: String, required : true, unique: true},
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

// Export schema as mongoose model, making it available for Express app
module.exports = mongoose.model('User', userSchema);