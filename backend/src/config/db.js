import mongoose from "mongoose"

import { adminSeeder } from "../seeders/adminSeeders.js"


const connectDb = async ()=> {
  
        console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected sucessfully ! ")

        
adminSeeder()

       
}


export default connectDb;