import express from "express";
import userRoutes from "../src/routes/userRoutes.js";
import productRoutes from "../src/routes/productRoutes.js";
import authRoutes from "../src/routes/authRoutes.js";
import orderRoutes from "../src/routes/orderRoutes.js";
import { configDotenv } from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import constant from "./config/constant.js";
import cors from "cors";

const app = express();

configDotenv();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/test", (req, res) => {
  res.cookie("name", "name", {
    maxAge: 10 * 60 * 1000,
    httpOnly: true,
  });
  res
    .status(200)
    .send(
      "<b><a style='color: white; background: black; padding: 2px'>Hello</a>, Welcome to my app!</b>"
    );
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Heroo",
  });
});

app.get("/api/clear-cookie", (req, res) => {
  res.clearCookie("name", {
    maxAge: 10 * 60 * 1000,
    httpOnly: true,
  });
  res.status(200).send("cookie cleared");
});

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);

// 404 route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const port = constant.PORT;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
