const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const perfumeSchema = new Schema({
  perfume_name: { type: String, required: true },
  perfume_category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  perfume_picture: { type: String },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("perfume", perfumeSchema);

// const mongoose = require('mongoose');

// // Define the product schema
// const productSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   category: {
//     type: String,
//     required: true
//   },
//   ratings: {
//     type: Number,
//     required:true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   quantity:{
//     type:Number,
//     required: true
//   }
// });

// // Create the product model based on the schema
// const Product = mongoose.model('Product', productSchema);

// // Export the model
// module.exports = Product;
