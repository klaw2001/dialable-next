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
  const { title, image, content, userID, comments, tags } = req.body;
  try {
    const blogData = await new BlogD({
      title,
      image,
      content,
      userID,
      tags,
    }).save();

    if (blogData) {
      return res.status(201).json({
        data: blogData,
        message: "Blog Added Successfully",
      });
    }
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
    console.log(err);
  }
}
