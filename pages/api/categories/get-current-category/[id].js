import multer from "multer";
import fs from "fs";
import path from "path";
import NextCors from "nextjs-cors";
import Category from "../../../../src/models/categoryModel";
import connectDB from "../../../../src/dbConfig/dbConfig";
connectDB()
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("not connected");
  });

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.method === "GET") {
    // Handle GET request
    try {
      const categoryID = req.query.id;
      const categoryData = await Category.findOne({ _id: categoryID });

      if (categoryData) {
        return res.status(200).json({
          data: categoryData,
          message: "Success",
        });
      } else {
        return res.status(404).json({
          message: "Category not found",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    // Handle DELETE request
    try {
      const categoryID = req.query.id;
      const category = await Category.findOne({ _id: categoryID });

      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      const deleteCat = await Category.deleteOne(category);

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
  } else if (req.method === "PUT" || req.method === "PATCH") {
    // Handle PUT or PATCH request for update
    try {
      const categoryID = req.query.id;
      const { name, image } = req.body;

      const category = await Category.findOne({ _id: categoryID });

      if (!category) {
        return res.status(404).json({
          message: "Category not found",
        });
      }

      const updatedData = await Category.updateOne(
        { _id: categoryID },
        {
          $set: {
            name: name,
            image: image,
          },
        }
      );
      console.log(updatedData, name, image, req.body);
      if (updatedData.acknowledged)
        return res.status(200).json({
          message: "Category Updated!",
        });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  } else {
    // Handle other HTTP methods
    return res.status(405).json({
      message: "Method Not Allowed",
    });
  }
}
