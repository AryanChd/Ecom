import { cloudinary } from "../middleware/cloudinary.js";
import Product from "../models/Product.js";

const createProduct = async (data) => {
  return await Product.create(data);
};

const getAllProduct = async (query = {}) => {
  const filter = {};

  if (query.brands) {
    filter.brand = { $in: query.brands.split(",") };
  }
  if (query.uses) {
    filter.use = { $in: query.uses.split(",") };
  }

  if (query.ram) {
    filter.ram = { $in: query.ram.split(",").map((n) => parseInt(n)) };
  }
  if (query.rom) {
    filter.rom = { $in: query.rom.split(",").map((n) => parseInt(r)) };
  }
  if (query.gen) {
    filter.gen = { $in: query.gen.split(",").map((n) => parseInt(g)) };
  }
  if (query.productName) {
    filter.productName = { $regex: query.productName, $options: "i" };
  }

  console.log(filter);

  const sort = query.sort || -1;

  console.log(query.sort);

  // console.log(JSON.parse(sort))
  // return sort

  return await Product.find(filter).sort({ sort });
};

const getProductById = async (id) => {
  return await Product.findById(id);
};

const deleteProductById = async (id) => {
  const product = await Product.findOne({ _id: id });
  if (!product) {
    throw new Error("Product not found");
  }
  const imageName = product.imageName;
  if (imageName) {
    try {
      const result = await cloudinary.uploader.destroy(imageName);
      if (result.result === "not found") {
        // Optionally handle not found, but no log
      }
    } catch (error) {
      // Optionally handle error, but no log
    }
  }
  return await Product.findByIdAndDelete(id);
};

const updateProductById = async (data, id) => {
    const product = await Product.findById(id)

    if(data.imageName){
        const oldImageName = product.imageName
        await cloudinary.uploader.destroy(oldImageName)
    }
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

export default {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProductById,
  updateProductById,
};
