import Order from "../models/order.js";
import axios from "axios";

const createOrder = async (order) => {
  const data = await Order.create(order);
  return data;
};

const getOrderById = (id) => {
  return Order.findById(id);
};

const getOrderByUserId = (userId) => {
  return Order.find({ user: userId });
};

const updateOrderStatus = async (id, status) => {
  await Order.findByIdAndUpdate(
    id,
    {
      orderStatus: status,
    },
    { new: true }
  );
};

const updatePaymentStatus = async (id, status) => {
  await Order.findByIdAndUpdate(
    id,
    {
      paymentStatus: status,
    },
    { new: true }
  );
};

const updateKhaltiPaymentStatus = async (pidx, totalAmount, userId) => {
  const order = await Order.findOne({ pidx });
  if (!order) throw new Error("No order found");

  console.log(order.totalAmount);

  if (order.totalAmount !== totalAmount)
    throw new Error("Some error occured warning !! ");

  const lookupResult = await axios.post(
    "https://dev.khalti.com/api/v2/epayment/lookup/",
    { pidx },
    {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(lookupResult);

  if (lookupResult.data.status !== "Completed")
    throw new Error("Payment is not completed !!");
  if (lookupResult.data.total_amount !== order.totalAmount * 100)
    throw new Error("Amount didn't match !!");

  return await Order.findOneAndUpdate({ pidx }, { paymentStatus: "COMPLETED" });
};

export default {
  createOrder,
  getOrderById,
  getOrderByUserId,
  updateOrderStatus,
  updatePaymentStatus,
  updateKhaltiPaymentStatus,
};
