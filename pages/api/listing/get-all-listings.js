import multer from "multer";
import fs from "fs";
import path from "path";
import Listing from "../../../src/models/listingModel.js";
import { log } from "console";
import connectDB from "../../../src/dbConfig/dbConfig.js";
connectDB()
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("not connected");
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./uploads";
    const subfolder = "listing";

    // Create "uploads" folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }

    // Create subfolder inside "uploads"
    const subfolderPath = path.join(uploadPath, subfolder);
    if (!fs.existsSync(subfolderPath)) {
      fs.mkdirSync(subfolderPath);
    }

    cb(null, subfolderPath);
  },
  filename: function (req, file, cb) {
    const name = file.originalname; // abc.png
    const ext = path.extname(name); // .png
    const nameArr = name.split("."); // [abc,png]
    nameArr.pop();
    const fname = nameArr.join("."); //abc
    const fullname = fname + "-" + Date.now() + ext; // abc-12345.png
    cb(null, fullname);
  },
});

const upload = multer({ storage: storage });

export default async function GET(req, res) {
  try {
    // const listingData = await Listing.aggregate([
    //   {
    //     $lookup: {
    //       from: "Category",
    //       localField: "category",
    //       foreignField: "_id",
    //       as: "categories",
    //     },
    //   },
    //   { $unwind: "$categories" },
    // ]);
    const listingData = await Listing.find().populate('category').exec();
    
    if (listingData) {
      return res.status(200).json({
        data: listingData,
        message: "Success",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
}
