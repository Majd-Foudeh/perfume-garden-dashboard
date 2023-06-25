const mongoose = require('mongoose');

// Define the product schema
const quotesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  list: {
    type: String,
    required: true
  }
  
},{timestamps:true});

// Create the product model based on the schema
const Quotes = mongoose.model('Quotes', quotesSchema);

// Export the model
module.exports = Quotes;