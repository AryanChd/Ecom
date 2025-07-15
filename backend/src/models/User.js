import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,     
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN", "CUSTOMER"],
      default: "CUSTOMER",
    },
    otpExpiresAt:{
      type: Date,
      default: null,

    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;