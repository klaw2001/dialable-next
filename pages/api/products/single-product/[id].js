import Product from "../../../../src/models/productModel";
import NextCors from "nextjs-cors";
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
  } else if (req.method === "PUT" || req.method === "PATCH") {
    try {
      const product_id = req.params.product_id;

      const {
        name,
        category,
        subcategory,
        quantity,
        price,
        shortdescription,
        description,
      } = req.body;

      // console.log('Files:', req.files);

      const updatedData = await Product.updateOne(
        { _id: product_id },
        {
          $set: {
            name: name,
            category: category,
            subcategory: subcategory,
            quantity: quantity,
            price: price,
            shortdescription: shortdescription,
            description: description,
            thumbnail: thumbnail,
            images: images,
          },
        }
      );

      const validationError = productData.validateSync();
      if (validationError) {
        return res.status(400).json({ message: validationError.message });
      }

      if (updatedData) {
        return res.status(200).json({
          data: updatedData,
          message: "Product Updated Successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const productID = req.params.product_id;

      const removeData = await Product.deleteOne({ _id: productID });
      if (removeData.acknowledged) {
        return res.status(200).json({
          data: removeData,
          message: "Product Deleted Successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        msg: error.msg,
      });
    }
  }
}
