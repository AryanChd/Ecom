import Order from "../models/order.js";

const createOrder = async (order) => {
  const data = await Order.create(order);
  return data;
};

export default { createOrder };
