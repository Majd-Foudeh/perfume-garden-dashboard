const mongoose = require('mongoose');



// Define the product schema
const writerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  job: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required:true,
  },
 
});

// Create the product model based on the schema
const Writer = mongoose.model('Writers', writerSchema);

// Export the model
module.exports = Writer;