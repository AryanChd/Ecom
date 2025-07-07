
import authService from "../services/authService.js"


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

export {register}

