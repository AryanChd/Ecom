import express from 'express';
import { createProduct, deleteProductById, getAllProduct, getProductById } from '../controllers/productController.js';


const router = express.Router()


router.post('/createProduct',createProduct);

router.get('/getAllProduct', getAllProduct);

router.get('/getProductById/:id', getProductById);

router.delete('/deleteProduct/:id', deleteProductById);


export default router;