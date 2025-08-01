import productService from "../services/productService.js";

const createProduct = async (req, res) => {
  if (!req.file) {
    throw new Error("Image of the product is required !!");
  }

  console.log(req.file);

  const filePath = req.file.path;
  const fileName = req.file.filename;

  console.log(fileName);
  console.log(filePath);

  try {
    const product = req.body;

    product.imageUrl = filePath;
    product.imageName = fileName;

    if (!product) {
      return res.status(400).send("Product Required");
    }
    if (!product.price) {
      return res.status(400).send("Price is Required");
    }

    console.log(product);
    const data = await productService.createProduct(product);

    res.status(200).json({
      message: "Product created sucessfully",
      data: data,
    });
  } catch (error) {
    console.log(error.message);

    res.status(501).send("error occured while creating Product");
  }
};

const getAllProduct = async (req, res) => {
  try {
    console.log(req.query);

    const data = await productService.getAllProduct(req.query);

    res.status(200).json({
      message: "All Product fetched !",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error occured while fetching all products !");
  }
};

const getProductById = async (req, res) => {
  try {
    if (!req.params.id) {
      return new Error("Product id is required ");
    }

    const id = req.params.id;
    const data = await productService.getProductById(id);

    res.status(200).json({
      message: "product fetched sucessfully !",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error occured while fetching all products !");
  }
};

const deleteProductById = async (req, res) => {
  try {
    if (!req.params.id) {
      return new Error("Product id is required");
    }

    const id = req.params.id;
    const data = await productService.deleteProductById(id);

    res.status(200).json({
      message: "product deleted sucessfully !",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Error occured while deleting product !");
  }
};

const updateProductById = async (req, res) => {
  try {
    if (req.file) {
      const newFilePath = req.file.path;
      const newFileName = req.file.filename;
      req.body.imageName = newFileName;
      req.body.imagePath = newFilePath;
    }

    const productid = req.params.id;
    const product = req.body;

    const data = await productService.updateProductById(product, productid);

    res.status(200).json({
      message: "product updated sucessfully !",
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
};

export {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
  updateProductById,
};
