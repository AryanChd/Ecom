import mongoose from "mongoose"

import { adminSeeder } from "../seeders/adminSeeders.js"
import constant from "./constant.js"


const connectDb = async ()=> {
  
        console.log(constant.MONGO_URI)
        await mongoose.connect(constant.MONGO_URI)
        console.log("db connected sucessfully ! ")

        
adminSeeder()

       
}


export default connectDb;