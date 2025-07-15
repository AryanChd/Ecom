import express from "express"
import { forgotPassword, register, verifyOtp, } from "../controllers/authController.js"
import { login } from "../controllers/authController.js"

import bcrypt from "bcrypt"
import User from "../models/User.js"


const router = express.Router()

router.post('/register', register);

router.post('/login', login);

router.post('/forgotPassword', forgotPassword);

router.post("/verify-otp", verifyOtp);



router.post("/reset-password", async (req, res) => {
  try {
    console.log("Cookies:", req.cookies); 
    const { password } = req.body;
    const email = req.cookies.userEmail;

    if (!email || !password) {

      throw new Error(" Time to reset password is expired :( ");
      
    }

    const doesUserExist = await User.findOne({ email });

    if (!doesUserExist) {

      throw new Error("User not registered!");

    }

    if (!doesUserExist.otpExpiresAt || 
        doesUserExist.otpExpiresAt < new Date()
    ){

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




export default router;

