import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProduct,
  getProductById,
  updateProductById,
} from "../controllers/productController.js";
import { isLoggedIn } from "../middleware/isLoggedin.js";
import { isAdmin } from "../middleware/isAdmin.js";
import { uploads } from "../middleware/cloudinary.js";

const router = express.Router();

router.post(
  "/createProduct",
  isLoggedIn,
  isAdmin,
  uploads.single("image"),
  createProduct
);

router.get("/getAllProduct", getAllProduct);

router.get("/getProductById/:id", getProductById);

router.delete("/deleteProduct/:id", isLoggedIn, isAdmin, deleteProductById);

router.put(
  "/updateProduct/:id",
  isLoggedIn,
  isAdmin,
  uploads.single("image"),
  updateProductById
);

export default router;
