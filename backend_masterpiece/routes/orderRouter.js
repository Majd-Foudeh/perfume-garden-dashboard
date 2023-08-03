const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

router.get("/allOrders", ordersController.pendingOrders);
router.get("/completedOrders", ordersController.completedOrders);
router.put("/confirmOrder/:id", ordersController.confirmOrder);

module.exports = router;
