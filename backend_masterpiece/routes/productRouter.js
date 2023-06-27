const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { upload } = require('../middleware/handleImage');

// add new product
router.post(
  '/addPerfume',
  upload.single('image'),
  productController.addPerfume
);

// update product
router.patch(
  '/updateproduct/:id',
  upload.single('image'),
  productController.updateProduct
);

// get all products
router.get('/allPerfumes', productController.getPerfumes);
module.exports = router;
