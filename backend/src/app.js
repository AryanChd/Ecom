import express from 'express';
import userRoutes from '../src/routes/userRoutes.js'
import productRoutes from '../src/routes/productRoutes.js'
import { configDotenv } from 'dotenv';
import connectDb from './config/db.js';
import { getAllProduct } from './controllers/productController.js';


const app = express (); 

configDotenv(); 

// this code is necessary for the system to understand json code 
app.use(express.json())
// this code is necessary for the system to understand form code 
app.use(express.urlencoded({extended: true}))

connectDb()

app.get('/', (req,res)=> {      
    res.status(200).json({
        message : 'Heroo'
    })
})

app.use('/api',userRoutes);

app.use('/api/product',productRoutes);




const port = process.env.PORT

app.listen(3000,()=>{
    console.log("port started at 3000")
})