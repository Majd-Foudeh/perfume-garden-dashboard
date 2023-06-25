const express = require("express");
const router = express.Router();
const quotesController = require("../controllers/quotesController");

// add new product
router.post("/addquote", quotesController.addQuote);

// update product
router.patch("/updatequote/:id", quotesController.updateQuote);

// get all products
router.get("/allquotes", quotesController.showQuotes);
module.exports = router;
