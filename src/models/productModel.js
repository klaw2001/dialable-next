import mongoose, { Schema } from "mongoose";

import Category from "./categoryModel";
import SubCategory from "./subCategoryModel";
import User from "./userModel";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: Category,
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: SubCategory,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  shortdescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
    maxLength: 1000,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  images: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
