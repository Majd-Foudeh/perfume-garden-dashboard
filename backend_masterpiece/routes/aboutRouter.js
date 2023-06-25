const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutusController");

// add new product
router.post("/addabout", aboutController.addAbout);

// update product
router.patch("/updateabout/:id", aboutController.updateAbout);

// get all products
router.get("/about", aboutController.showAbout);
module.exports = router;
