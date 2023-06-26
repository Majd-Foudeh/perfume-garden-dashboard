const express = require("express");
const router = express.Router();
const productController = require('../controllers/productController')

// add new product 
router.post("/addPerfume"  , productController.addPerfume);


// update product
router.patch('/updateproduct/:id' , productController.updateProduct);

// get all products
router.get('/allPerfumes', productController.getPerfumes)
module.exports = router ;