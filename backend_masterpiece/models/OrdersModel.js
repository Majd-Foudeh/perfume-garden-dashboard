const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Order collection schema
const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    products: [
      {
        perfumeId: {
          type: Schema.Types.ObjectId,
          ref: "perfume",
          required: true,
        },
        perfumeName: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    shippingAddress: { type: String },
    date: {
      type: Date,
      default: Date.now,
    },
    // Additional fields like payment method, shipping details, timestamps, etc.
  },
  { timestamp: true }
);

module.exports = mongoose.model("order", orderSchema);
