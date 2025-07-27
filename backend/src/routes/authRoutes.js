// 📦 External Imports
import express from "express";
import bcrypt from "bcrypt";

// 🧩 Internal Imports
import {
  register,
  login,
  forgotPassword,
  verifyOtp,
} from "../controllers/authController.js";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import { verifyToken } from "../helper/token.js";

const router = express.Router();

// 🛣️ Auth Routes
router.post("/register", register);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.post("/verify-otp", verifyOtp);

// 🔐 Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    console.log("Cookies:", req.cookies);
    const { password } = req.body;
    const email = req.cookies.userEmail;

    if (!email || !password) {
      throw new Error("Time to reset password is expired :( ");
    }

    const doesUserExist = await User.findOne({ email });

    if (!doesUserExist) {
      throw new Error("User not registered!");
    }

    if (!doesUserExist.otpExpiresAt || doesUserExist.otpExpiresAt < new Date()) {
      throw new Error("Please verify OTP first 😊");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword, otpExpiresAt: null },
      { new: true }
    );

    res.clearCookie("userEmail");

    res.status(200).json({
      message: "Password changed successfully 😊",
      email: updatedUser.email,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// 🔎 Utility: Get All OTPs
router.get("/get-all-otps", async (req, res) => {
  try {
    const data = await Otp.find();
    res.json({ message: "OTPs fetched successfully!", data });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

// ✅ Verification Steps (1 = Token, 2 = Email, 3 = OTP)
router.get("/verify/:step", async (req, res) => {
  try {
    const { step } = req.params;
    const userEmail = req.cookies.userEmail;
    const authToken = req.cookies.authToken;

    if (step === "1") {
      if (!authToken) throw new Error("Please login first!");
      const isValid = verifyToken(authToken);
      if (!isValid) {
        res.clearCookie("authToken");
        throw new Error("Token expired!");
      }
    }

    if (step === "2") {
      if (!userEmail) throw new Error("Please send forgot password request first!");
      const isUserValid = await User.findOne({ email: userEmail });
      if (!isUserValid) throw new Error("User not registered!");
    }

    if (step === "3") {
      const isOtpVerified = await Otp.findOne({ email: userEmail });
      if (!isOtpVerified || new Date() > isOtpVerified.otpExpiresAt) {
        throw new Error("Please verify OTP first!");
      }
    }

    res.status(200).json({ message: `Verification step ${step} passed!` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
