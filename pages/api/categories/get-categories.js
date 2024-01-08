import Category from "../../../src/models/categoryModel.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import connectDB from "../../../src/dbConfig/dbConfig.js";
connectDB()
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("not connected");
  });



export default async function GET(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    const categoryData = await Category.find();
    if (categoryData) {
      return res.status(200).json({
        data: categoryData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
