import express from 'express';
import userRoutes from '../src/routes/userRoutes.js'
import productRoutes from '../src/routes/productRoutes.js'
import { configDotenv } from 'dotenv';
import connectDb from './config/db.js';
import authRoutes from '../src/routes/authRoutes.js'
import cookieParser from 'cookie-parser'
import constant from './config/constant.js';
import cors from "cors"


const app = express (); 

configDotenv(); 

// this code is necessary for the system to understand json code 
app.use(express.json())
// this code is necessary for the system to understand form code 
app.use(express.urlencoded({extended: true}))

app.use(cookieParser())

connectDb()

app.use(cors({
    origin:"",
    credentials:true
}))

app.get('/', (req,res)=> {      
    res.status(200).json({
        message : 'Heroo'
    })
})

app.use('/api/user',userRoutes);

app.use('/api/product',productRoutes);

app.use('/api/auth',authRoutes);






const port = constant.PORT

app.listen(3000,()=>{
    console.log("port started at 3000")
})