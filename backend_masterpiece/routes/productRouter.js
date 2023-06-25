const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController')

// add new product 
router.post("/addproduct"  , productController.addProduct);


// update product
router.patch('/updateproduct/:id' , productController.updateProduct);

// get all products
router.get('/allproducts', productController.showProducts)
module.exports = router ;