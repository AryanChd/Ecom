import Order from "../models/order.js";

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

export default {
  createOrder,
  getOrderById,
  getOrderByUserId,
  updateOrderStatus,
  updatePaymentStatus,
};
