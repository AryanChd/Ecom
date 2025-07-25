import authService from "../services/authService.js";
import { createToken } from "../helper/token.js";
import User from "../models/User.js";

const register = async (req, res) => {
  try {
    const { email, phone, name, password, confirmPassword } = req.body;

    // Basic validation
    if (!password || !email || !phone || !confirmPassword || !name) {
      return res.status(400).json({ message: "⚠️ All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "⚠️ Password and Confirm Password do not match.",
      });
    }

    // 🛑 Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "⚠️ Email already exists. Please try logging in.",
      });
    }

    // ✅ Call service to register user
    const data = await authService.register({
      email,
      phone,
      name,
      password,
    });

    // 🎉 Success
    res.status(200).json({
      message: "🎉 User registered successfully.",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "❌ Error occurred during registration.",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    //login function
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("User credential is missing.");
    }

    const data = await authService.login({ email, password });

    const payload = {
      id: data._id,
      userName: data.userName,
      role: data.role,
      phone: data.phone,
      email: data.email,
    };

    //Webtoken generation
    // const token = jwt.sign(payload, "secretkey")
    const token = createToken(payload);
    res.cookie("authToken", token);

    res.status(200).json({
      message: "Login successful",
      data,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    res.cookie("userEmail", email, {
      maxAge: 5 * 60 * 1000,
      httpOnly: true,
    });

    if (!email) {
      throw new Error("Email is required");
    }

    const data = await authService.forgotPassword({ email });
    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const email = req.cookies.userEmail;

    if (!email || !otp) {
      throw new Error(" Email and Otp required ! ");
    }

    const data = await authService.verifyOtp({ email, otp });
    res.status(200).json({ data });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

export { register, login, forgotPassword, verifyOtp };
