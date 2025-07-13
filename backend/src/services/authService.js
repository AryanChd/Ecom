import bcrypt from "bcrypt"
import user from "../models/User.js"
import {hashPassword} from "../utils/utility.js"
import { generateOtp } from "../utils/generateOtp.js"
import { sendMail } from "../utils/sendMails.js"


const register = async (data) => {

    // return data
    const hashedPassword = hashPassword(data.password)

    // const has = $2b$10$t0s.B84ELCaGYLHUsCJFfe4DxSduGSgF1E7yXn952PIZ78C3v0HbO

    const email = data.email

    const userExist = user.find({ email })
    console.log(userExist)




    if (!userExist) {
        new Error('user already exist')
    }
    return await user.create({
        email: email,
        password: hashedPassword,
        name: data.name,
        phone: data.phone
    })
}


const forgetPassword = async (data)=>{

    const userRegistered = await user.findOne({
        email : data.email
        
    })
    if (!userRegistered) {
        throw new Error ("User not registered ! ")
    }

    const otp = generateOtp()

    const newOtp = await otp.create({

        email: data.email,
        otp: otp,

    })

    sendMail(data.email,otp)

    return newOtp;

     
}


const login = async (data) => {

    const doEmailExist = await user.find({ email: data.email })

    if (!doEmailExist.length > 0 ){
        
        throw new Error("Invalid user")
    }

    const dbPassword = doEmailExist[0].password

    const isPasswordMatched = bcrypt.compareSync(data.password, dbPassword)


    if (isPasswordMatched) {
        return doEmailExist[0];

    } else {

        throw new Error("Invalid login ! ")

    }



}



export default { register,login,forgetPassword,}

