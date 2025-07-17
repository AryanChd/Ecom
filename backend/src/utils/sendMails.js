import nodemailer from "nodemailer";
import dotenv from "dotenv";
import constant from "../config/constant.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: constant.EMAIL_USER,
    pass: constant.EMAIL_PASS,
  },
});

const sendMail = async (email, otp) => {
  await transporter.sendMail({
    from: `"Aryan Chaudhary 👨‍💻" <${constant.EMAIL_USER}>`,
    to: email,
    subject: "🔐 Your OTP Code for Password Reset",
    text: `Your OTP is: ${otp}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
        <h2 style="text-align: center; color: #4CAF50;">🔐 One-Time Password (OTP)</h2>
        <p>Hello,</p>
        <p>You requested to reset your password. Please use the OTP below to proceed:</p>
        <div style="text-align: center; margin: 20px 0;">
          <span style="font-size: 32px; color: #333; letter-spacing: 2px; font-weight: bold; background: #e0f7fa; padding: 10px 20px; border-radius: 8px; display: inline-block;">
            ${otp}
          </span>
        </div>
        <p>This OTP is valid for the next 10 minutes. If you didn't request this, you can safely ignore this email.</p>
        <p style="margin-top: 30px;">Best regards,<br><strong>Aryan Chaudhary</strong><br>Your Support Team</p>
        <hr style="margin-top: 40px;">
        <p style="font-size: 12px; color: #888; text-align: center;">Please do not share this OTP with anyone for security reasons.</p>
      </div>
    `,
  });
};

export { sendMail };
