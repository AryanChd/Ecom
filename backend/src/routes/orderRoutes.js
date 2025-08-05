import express from "express";
import { isLoggedIn } from "../middleware/isLoggedin.js";
import {isAdmin} from "../middleware/isAdmin.js"
import {
  createOrder,
  getOrderById,
  getOrderByUserId,
  updateOrderStatus,
  updatePaymentStatus,
  updateKhaltiPaymentStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/createOrder", isLoggedIn, createOrder);
router.get("/getOrder/:id", isLoggedIn, getOrderById);
router.get("/getOrderByUser", isLoggedIn, getOrderByUserId);

router.post("/updateOrderStatus/:id", isLoggedIn, isAdmin, updateOrderStatus);
router.post("/updatePaymentStatus/:id", isLoggedIn, isAdmin, updatePaymentStatus);
router.post("/updateKhaltiPaymentStatus/:id", isLoggedIn, updateKhaltiPaymentStatus);

export default router;
