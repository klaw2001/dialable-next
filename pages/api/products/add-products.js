import multer from "multer";
import fs from "fs";
import path from "path";
import Product from "../../../src/models/productModel";
import NextCors from "nextjs-cors";
import connectDB from "../../../src/dbConfig/dbConfig";
connectDB()
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("not connected");
  });

export default async function POST(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    origin: "*",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  try {
    const {
      name,
      category,
      // subcategory,
      quantity,
      price,
      shortdescription,
      description,
      thumbnail,
    } = req.body;

    
    // console.log('Files:', req.files);

    const productData = new Product({
      name,
      category,
      // subcategory,
      quantity,
      price,
      shortdescription,
      description,
      thumbnail,
    });

    console.log(category)
    // const validationError = productData.validateSync();
    // if (validationError) {
    //   return res.status(400).json({ message: validationError.message });
    // }

    productData.save();
    console.log(productData)
    if (productData) {
      return res.status(201).json({
        data: productData,
        message: "Product Added Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
