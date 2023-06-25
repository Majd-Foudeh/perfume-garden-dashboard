const express = require("express");
const router = express.Router();
const writerController = require("../controllers/writerController");

// add new product
router.post("/addwriter", writerController.addWriter);

// update product
router.patch("/updatewriter/:id", writerController.updateWriter);

// get all products
router.get("/showwriters", writerController.showWriters);
module.exports = router;
