import express from "express";
import { isLoggedIn } from "../middleware/isLoggedin.js";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/createOrder", isLoggedIn, createOrder);

export default router;
