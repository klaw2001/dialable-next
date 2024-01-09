import NextCors from "nextjs-cors";
import connectDB from "../../../../src/dbConfig/dbConfig";
import Blog from "../../../src/models/blogModel";
connectDB()
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("not connected");
  });

export default async function GET(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  try {
    const blogData = await Blog.find();

    if (blogData) {
      return res.status(200).json({
        data: blogData,
        message: "Blog fetched Successfully",
      });
    } else {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
