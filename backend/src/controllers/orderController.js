import orderService from "../services/orderService.js";

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    console.log(userId.id);

    const order = req.body;

    order.user = userId;

    const data = await orderService.createOrder(order);

    console.log(data);

    res.status(200).json({ data, message: "Order created sucessfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({ error: error.message, message: " error while ordering" });
  }
};

export { createOrder };
