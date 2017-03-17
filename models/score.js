const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const scoreSchema = new Schema({
  name: { type: String, lowercase: true },
  score: Number
});

// Create the model class
const ModelClass = mongoose.model('score', scoreSchema);

// Export the model
module.exports = ModelClass;
