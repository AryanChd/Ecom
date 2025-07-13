import express from "express"
import { forgetPassword, register,} from "../controllers/authController.js"
import { login } from "../controllers/authController.js"
import { generateOtp } from "../utils/generateOtp.js";
import Otp from "../models/Otp.js";
import { sendMail } from "../utils/sendMails.js";


const router  = express.Router()

router.post('/register',register);

router.post('/login',login);

// router.post('/forgetPassword',forgetPassword);


router.post('/forgetPassword',async (req, res) =>{
    try {
        
        const {email} = req.body;
        console.log("email", email)
        if (!email) {
            throw new Error (" Email is required ! ")
        }
        const otp = generateOtp();

        const doesExist = await Otp.findOne ({ email });

        let newOtp; 

        if (!doesExist){

            newOtp = await Otp.create({
                email: email,
                 otp : otp,
            });
        } else {

            newOtp = await Otp.findOneAndUpdate(
                { email },
                {
                otp: otp,
                createdAt: new Date(),
                },
                { new : true }
            )

        }

        
        sendMail (email,otp);

        res.send (newOtp);


    } catch (error) {

        console.log(error.message)
         res.status(400).send(error.message)

        
    }
});

router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        const doesExist = await Otp.findOne({ email });

        if (!doesExist) {
            throw new Error("OTP expired !");
        }

        if (doesExist.otp !== otp) {
            throw new Error("Invalid OTP!");
        }


        await Otp.deleteOne({ email });


        res.status(200).json({
            message: "OTP validated",
            data: doesExist,
        });

    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
});




export default router;
