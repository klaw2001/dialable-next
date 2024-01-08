import multer from "multer";
import fs from "fs";
import path from "path";
import Product from "../../../../src/models/productModel";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./uploads";
    const subfolder = "products";

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
    const productID = req.query.id;
    const productData = await Product.findOne({ _id: productID })
      .populate("category")
      .populate("subcategory");

    if (productData) {
      return res.status(200).json({
        data: productData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
