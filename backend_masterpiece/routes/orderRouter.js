const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

router.get("/allOrders", ordersController.pendingOrders);
router.put("/confirmOrder/:id", ordersController.confirmOrder);

module.exports = router;
