import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    
    },
    price: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
    },
    imageUrl: {
      type: String, // You can store Cloudinary URL, S3 URL, or local path

    },
    imagePath:{
      type: String,
    },
    ram: {
      type: String,
    },
    rom: {
      type: String,
    },
    display: {
      type: String,
    },
    processor: {
      type: String,
    },
    gen: {
      type: Number,
    },
    brand: {
      type: String,
    },
    use: {
      type: String,
      enum: ['GAMING',
        'PROFESSIONAL',
        'STUDENT',
        'PERFORMANCE',
        'BUDGET',
      ]
    },
    stock: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true

    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;