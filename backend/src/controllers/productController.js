import productService from "../services/productService.js";


const createProduct = async (req,res)=>{

    try {

        const product = req.body

        if (!product) {
            return res.status(400).send("Product Required");
        }
        if (!product.price) {

            return res.status(400).send("Price is Required");
        }

        const data = await productService.createProduct(product);

        res.status(200).json({
            message: "Product created sucessfully",
            data: data
        });

    } catch (error) {

        console.log(error.message)

        res.status(501).send("error occured while creating Product");

    }
  
    
};

const getAllProduct = async (req, res) => {

    try {

        const data = await productService.getAllProduct()

        res.status(200).json({
            message: "All Product fetched !",
            data,
        })
    } catch (error) {

        console.log(error.message)
        res.status(400).send("Error occured while fetching all products !")

    }
};

const getProductById = async (req, res) => {

    try {

        if(!req.params.id){
            return new Error('Product id is required ')
            }

        const id = req.params.id
        const data = await productService.getProductById(id);

        res.status(200).json({
            message: "product fetched sucessfully !",
            data
        })
       
    } catch (error) {

        console.log(error.message)
        res.status(400).send("Error occured while fetching all products !")

    }
};

const deleteProductById = async (req,res)=>{

try {
    
    if(!req.params.id){
            return new Error('Product id is required')
            }

        const id = req.params.id;
        const data = await productService.deleteProductById(id);

        res.status(200).json({
            message: "product deleted sucessfully !",
            data
        })

} catch (error) {

    
        console.log(error.message)
        res.status(400).send("Error occured while deleting product !")
    
}


};



export {createProduct, getAllProduct, getProductById, deleteProductById};