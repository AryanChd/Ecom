
import authService from "../services/authService.js"

import jwt from 'jsonwebtoken'



const register = async (req,res) => {

    try {

        const {email,phone,password,confirmPassword,name}= req.body

    if (!password || !email || !phone || !confirmPassword || !name){
        return res.status(400).json({message:"User credentials missing ! " })
    }

    if (password !== confirmPassword) {return res.status(400).json({message : "Password did not matched !"})}

    const data =  await authService.register({email,phone,password,name})



    res.status(200).json({
        message: "User Registered Sucessfully !",
        data
    })

    } catch (error) {
        
        console.log(error.message)
        res.status(500).json({
            message : " Error occured while registering !",
            error: error.message
        })

    }

}


const login = async (req,res) => { 

    try {

        const {email,password} = req.body 

    if (!email || !password) { throw new Error ("user credintial missing")}

    const data  = await authService.login({email,password})

    const payload = {

        id: data._id,
        name: data.name,
        role: data.role,
        phone: data.phone,
        email: data.email

    }

    const token = jwt.sign(payload,"secretkey")

    res.cookie('authToken',token)
    
    res.status(200).json({
        message : "Login Sucessful ! " ,
        data,
        token
    })

        
    } catch (error) {

        console.log(error.message) 
        res.status(400).send(error.message) 
        
    }


}



export {register,login}

