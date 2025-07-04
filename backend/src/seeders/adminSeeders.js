import user from "../models/User.js"



const adminSeeder = async () =>{
    try{
     const adminFound = await user.findOne({email:"admin@gmail.com"})

        console.log(adminFound)

        if(!adminFound){
            await user.create({
                name: "admin",
                password: "admin",
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