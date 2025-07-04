import Product from "../models/Product.js";


const createProduct = async (data) => {

    return await Product.create(data);


};

const getAllProduct = async ()=> {

    return await Product.find();
};

const getProductById = async(id) =>{
 
    return await Product.findById(id);
    
};

const deleteProductById = async (id) => {

    return await Product.findByIdAndDelete(id);

}

const updateProduct = async (data, id) => {

    return await Product.findByIdAndUpdate(id,data, {new: true});
}


export default {createProduct, getAllProduct, getProductById, deleteProductById, updateProduct};

