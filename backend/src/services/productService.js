import Product from "../models/Product.js";


const createProduct = async (data) => {

    return await Product.create(data);


};

const getAllProduct = async (query = {})=> {

    const filter = {}

    if(query.brands) { filter.brand = {$in :query.brands.split(',')} }
     if(query.uses) { filter.use = {$in :query.uses.split(',')} }


    if(query.ram) { filter.ram = {$in :query.ram.split(',').map(n=>parseInt(n))} }
    if(query.rom) { filter.rom = {$in :query.rom.split(',').map(n=>parseInt(r))} }
    if(query.gen) { filter.gen = {$in :query.gen.split(',').map(n=>parseInt(g))} }
    if(query.productName) { filter.productName = {$regex:query.productName, $options:"i"}}

    
    console.log(filter)

    const sort = query.sort || -1 

    console.log(query.sort)

    // console.log(JSON.parse(sort)) 
    // return sort 
    
    return await Product.find(filter).sort({sort});

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

