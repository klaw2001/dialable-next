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
      const { userID } = req.params;
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
  }
}
