import { IncomingForm } from "formidable";
import fs from "fs";
import path from "path";
import Category from "../../../src/models/categoryModel.js";
import Cors from 'cors';
import NextCors from "nextjs-cors";
import connectDB from "../../../src/dbConfig/dbConfig.js";
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
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE' , 'OPTIONS'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  const { name, image } = req.body;
  try {
    console.log(name , image)
    const categoryData = await new Category({
      name,
      image,
    }).save();
    
    if (categoryData) {
      return res.status(201).json({
        data: categoryData,
        message: "Category Added Successfully",
      });
    }
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
    console.log(err);
  }
}
