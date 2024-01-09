import NextCors from "nextjs-cors";
import Cart from "../../../src/models/cartModel.js";
import connectDB from "../../../src/dbConfig/dbConfig.js";
import Product from "../../../src/models/productModel.js";
connectDB()
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("not connected");
  });

export default async function POST(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  try {
    const { userID, productID } = req.body;
    const proData = await Product.findOne({ _id: productID });
    const existCartItem = await Cart.findOne({
      productID: productID,
      userID: userID,
    });
    if (existCartItem) {
      let quantity = existCartItem.quantity + 1;
      const updatedItem = await Cart.updateOne(
        { _id: existCartItem._id },
        {
          $set: {
            quantity: quantity,
          },
        }
      );
      if (updatedItem.acknowledged) {
        return res.status(200).json({
          data: updatedItem,
          message: "updated",
        });
      }
    }

    const cartData = new Cart({
      userID: userID,
      productID: productID,
      name: proData.name,
      price: proData.price,
      quantity: 1,
      thumbnail: proData.thumbnail,
    });

    cartData.save();
    console.log(cartData);
    if (cartData) {
      return res.status(201).json({
        data: cartData,
        message: "Product Successfully added to Cart",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
