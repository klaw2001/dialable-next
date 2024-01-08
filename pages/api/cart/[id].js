import NextCors from "nextjs-cors";
import connectDB from "../../../../src/dbConfig/dbConfig.js";
import Cart from "../../../src/models/cartModel.js";
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
      const userID = req.params.user_id;
      const cartData = await Cart.find({ userID: userID });
      if (cartData) {
        return res.status(200).json({
          data: cartData,
          message: "Success",
          customers: customers,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  } else if (req.method === "PUT" || req.method === "PATCH") {
    try {
      const cartID = req.params.cart_id;
      const { updatetype } = req.query;
      const cartData = await Cart.findOne({ _id: cartID });

      let quantity = cartData.quantity;

      if (updatetype === "increment") {
        quantity += 1;
      }
      if (updatetype === "decrement") {
        quantity -= 1;
      }

      const updatedItem = await Cart.updateOne(
        { _id: cartID },
        {
          $set: {
            quantity: quantity,
          },
        }
      );

      if (updatedItem.acknowledged) {
        return res.status(200).json({
          message: "Updated",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const cartID = req.params.cart_id;

      const deletedItem = await Cart.deleteOne({ _id: cartID });
      if (deletedItem.acknowledged) {
        return res.status(200).json({
          data: deletedItem,
          message: "Cart Item Deleted Successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
