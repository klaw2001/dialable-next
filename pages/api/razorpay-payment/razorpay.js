import Razorpay from "razorpay";
import shortid from "shortid";

export default async function handler(req, res) {
    const { price } = req.body;
    //console.log('price',price*100)
    if (req.method === "POST") {
      // Initialize razorpay object
      const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET,
      });
  
      // Create an order -> generate the OrderID -> Send it to the Front-end
      // Also, check the amount and currency on the backend (Security measure)
      const payment_capture = 1;
      const amount = price;
      const currency = "INR";
      const options = {
        // amount: (amount * 100).toString(),
        amount: amount.toString(),
        currency,
        receipt: shortid.generate(),
        payment_capture,
      };
  
      try {
        const response = await razorpay.orders.create(options);
        res.status(200).json({
          id: response._id,
          currency: response.currency,
          amount: response.amount,
        });
      } catch (err) {
        //console.log(err);
        res.status(400).json(err);
      }
    } else {
      return console.error();
    }
  }