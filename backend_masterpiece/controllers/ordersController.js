const Order = require("../models/OrdersModel");

const pendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "pending" })
      .populate("userId")
      .lean();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const completedOrders = async (req, res) => {
  try {
    const orders = await Order.find({ status: "completed" })
      .populate("userId")
      .lean();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const confirmOrder = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const orderUpDate = await Order.findByIdAndUpdate(id, {
      status: "completed",
    })
      .populate("userId")
      .lean();

    res.json({
      success: ` ${orderUpDate.userId.first_Name} ${orderUpDate.userId.last_Name} order is completed`,
    });
  } catch (error) {
    console.error("error in confirm the order", error);
    res.status(500).json({ error: error.message });
  }
};

const ordersNumber = async (req, res) => {
  try {
    const num = await Order.estimatedDocumentCount();
    res.status(200).json(num);
  } catch (error) {
    res.status(500).json({ error: "error in get user number " });
    console.error(error);
  }
};

module.exports = { pendingOrders, confirmOrder,ordersNumber,completedOrders };
