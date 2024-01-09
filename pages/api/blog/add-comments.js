import NextCors from "nextjs-cors";
import connectDB from "../../../../src/dbConfig/dbConfig";
import BlogD from "../../../src/models/blogModel";

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
    const { userId, userComment } = req.body;

    // Validate the required fields
    if (!userComment || userId) {
      return res
        .status(400)
        .json({ success: false, error: "userComment or userId is missing" });
    }

    const newBlogComment = new BlogD({
      userId,
      userComment,
    });

    const savedBlogComment = await newBlogComment.save();

    return res.status(201).json({ success: true, data: savedBlogComment });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}
