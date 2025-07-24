import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendMail } from "../utils/sendMails.js";
import Otp from "../models/Otp.js";

const register = async (data) => {
  const hashedPassword = bcrypt.hashSync(data.password, 10);

  // console.log(hashedPassword)

  const email = data.email;

  const userExist = await User.findOne({ email });
  console.log(userExist);

  if (userExist) {
    throw new Error("user already exists.");
  }

  return await User.create({
    email: data.email,
    password: hashedPassword,
    name: data.name,
    phone: data.phone,
  });
};

const login = async (data) => {
  const doEmailExist = await User.find({ email: data.email });

  if (!doEmailExist.length > 0) {
    throw new Error("Invalid email user doesn't exist");
  }

  const dbPassword = doEmailExist[0].password;

  const isPasswordMatch = bcrypt.compareSync(data.password, dbPassword);

  if (isPasswordMatch) {
    return doEmailExist[0];
  } else {
    throw new Error("Invalid password");
  }
};

const forgotPassword = async (data) => {
  const isUserValid = await User.findOne({ email: data.email });

  if (!isUserValid) {
    throw new Error("User is not registered !");
  }

  const otp = generateOtp();

  const doesExist = await Otp.findOne({ email: data.email });

  let newOtp;

  if (!doesExist) {
    newOtp = await Otp.create({
      email: data.email,
      otp: otp,
    });
  } else {
    newOtp = await Otp.findOneAndUpdate(
      { email: data.email },
      {
        otp: otp,
        createdAt: new Date(),
      },
      { new: true }
    );
  }

  sendMail(data.email, otp);

  return newOtp;
  
};

const verifyOtp = async ({ email, otp }) => {
  const doesExist = await Otp.findOne({ email });

  if (!doesExist) {
    throw new Error("OTP Expired ! ");
  }

  if (doesExist.otp !== otp) {
    throw new Error("Invalid OTP");
  }

  await User.findOneAndUpdate(
    { email },
    { otpExpiresAt: new Date (Date.now () + 60 * 1000)},
    {new: true}

  );

  //optional
  await Otp.deleteOne({ email });

  return "OTP verified :) ";


};


export default { register, login, forgotPassword, verifyOtp };