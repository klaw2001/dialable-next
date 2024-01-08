import multer from "multer";
import fs from "fs";
import path from "path";
import Category from "../../../src/models/categoryModel.js";
import NextCors from "nextjs-cors";
import connectDB from "../../../src/dbConfig/dbConfig.js";
connectDB()
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("not connected");
  });



export default async function DELETE(req, res) {
   if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE' , 'OPTIONS'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  try {
    const categoryID = req.params.category_id;
    const category = await Category.findOne({ _id: categoryID });

    const deleteCat = await Category.deleteOne(category);
    console.log(deleteCat)
    if (deleteCat.acknowledged) {
      return res.status(200).json({
        message: "Category Deleted!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
