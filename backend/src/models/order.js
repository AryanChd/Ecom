import mongoose from "mongoose";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderNumber: {
    type: String,
    default: () => uuidv4(),
  },
  cartItems: {
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["pending", "confirmed", "shipping", "delivered", "cancelled"],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "notPaid"],
  },
  paymentMethod: {
    type: String,
    enum: ["cod", "khalti"],
  },
  pidx: {
    type: String,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
