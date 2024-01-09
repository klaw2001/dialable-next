import NextCors from "nextjs-cors";
import BlogD from "../../../src/models/blogModel";
import connectDB from "../../../src/dbConfig/dbConfig";
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
    const { user, rating, comment, blogID } = req.body;

    const blog = await BlogD.findById(blogID);

    const review = {
      user,
      rating,
      comment,
      blogID,
    };

    const isReviewed = blog.reviews.find(
      (rev) => rev.user._id === req.user._id
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user._id === req.user._id) {
          (rev.rating = rating), (rev.comment = comment), (rev.user = user);
        }
      });
    } else {
      blog.reviews.push(review);
    }

    let avg = 0;

    blog.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    blog.ratings = avg / blog.reviews.length;

    await blog.save({ validateBeforeSave: false });

    // await BlogD.findByIdAndUpdate(
    //   orderId,
    //   { $set: { "cart.$[elem].isReviewed": true } },
    //   { arrayFilters: [{ "elem._id": productId }], new: true }
    // );

    res.status(200).json({
      success: true,
      data: blog,
      message: "Reviwed succesfully!",
    });
  } catch (error) {
    return console.log(error);
  }
}
