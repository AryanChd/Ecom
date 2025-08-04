import orderService from "../services/orderService.js";
import axios from "axios";

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId.id);
    const order = req.body;
    order.user = userId;

    if (order.paymentMethod == "khalti") {
      console.log(order);

      const totalAmount = order.totalAmount;

      const options = {
        return_url: "http://localhost:5173/dashboard",
        website_url: "http://localhost:5173",
        amount: totalAmount * 100,
        purchase_order_id: Date.now(),
        purchase_order_name: `order- ${Date.now()}`,
      };

      const result = await axios.post(
        "https://dev.khalti.com/api/v2/epayment/initiate/",
        options,
        {
          headers: {
            Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result.data);
      return res.status(200).send(result.data);
    }

    const data = await orderService.createOrder(order);
    console.log(data);
    res.status(200).json({ data, message: "Order created sucessfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: error.message, message: " Error while ordering" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await orderService.getOrderById(id);
    if (!data) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ data, message: "Order fetched successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: error.message, message: "Error fetching order" });
  }
};

const getOrderByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await orderService.getOrderByUserId(userId);
    res.status(200).json({ data, message: "Orders fetched successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: error.message, message: "Error fetching user's orders" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const status = req.body.orderStatus;
    const data = await orderService.updateOrderStatus(orderId, status);
    res
      .status(200)
      .json({ data, message: "Order status updated successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: error.message, message: "Error updating order status" });
  }
};

const updatePaymentStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.paymentStatus;
    const data = await orderService.updatePaymentStatus(id, status);
    res
      .status(200)
      .json({ data, message: "Payment status updated successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: error.message, message: "Error updating payment status" });
  }
};

export {
  createOrder,
  getOrderById,
  getOrderByUserId,
  updateOrderStatus,
  updatePaymentStatus,
};
