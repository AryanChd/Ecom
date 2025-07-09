import user from "../models/User.js"
import { hashPassword } from "../utils/utility.js"



const adminSeeder = async () =>{
    try{
     const adminFound = await user.findOne({email:"admin@gmail.com"})

        // console.log(adminFound)

        if(!adminFound){

                const password = hashPassword('admin')

            await user.create({
                name: "admin",
                password,
                email: "admin@gmail.com",
                phone: "9852090356",
                role: "ADMIN",
            })

            console.log("Admin created sucessfully!")

        }else{
            
            console.log("Admin already exists")

        }

    } catch (error) {
        console.log(error.message)
        
    }



}

export {adminSeeder};

