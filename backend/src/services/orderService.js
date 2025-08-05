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

const updateKhaltiPaymentStatus = async(pidx, totalAmount, userId) => {
  const order = await order.findOne({pidx});
  if (!order) {throw new Error ("No order found")}
  if (order.totalAmount !== totalAmount){throw new Error("Some error occured warning !!")}
  if (order.user !== userId) {throw new Error ("Invalid Operation")}

  const result = await order.findOneAndUpdate({pidx}, {paymentStatus : "COMPLETED"})

}

export default {
  createOrder,
  getOrderById,
  getOrderByUserId,
  updateOrderStatus,
  updatePaymentStatus,
  updateKhaltiPaymentStatus
};
