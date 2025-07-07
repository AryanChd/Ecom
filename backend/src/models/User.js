import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,      unique: true,
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
  },
  { timestamps: true }
);

const user = mongoose.model("User", userSchema);

export default user;