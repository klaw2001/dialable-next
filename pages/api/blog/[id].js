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

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.method === "GET") {
    try {
      const blogID = req.query.id;
      const blogData = await BlogD.findOne({ _id: blogID }).populate(
        "reviews"
      );
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
  } else if (req.method === "PUT" || req.method === "PATCH") {
    try {
      const blogID = req.query.id;
      const { title, image, content, comments, tags } = req.body;

      const blog = await BlogD.findOne({ _id: blogID });

      if (!blog) {
        return res.status(404).json({
          message: "blog not found",
        });
      }

      const updatedData = await BlogD.updateOne(
        { _id: blogID },
        {
          $set: {
            title: title,
            image: image,
            content: content,
            comments: comments,
            tags: tags,
          },
        }
      );

      if (updatedData.acknowledged)
        return res.status(200).json({
          message: "Blog Updated!",
        });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const blogID = req.query.id;
      const blog = await BlogD.findOne({ _id: blogID });

      if (!blog) {
        return res.status(404).json({
          message: "blog not found",
        });
      }

      const deleteBlog = await BlogD.deleteOne(blog);

      if (deleteBlog.acknowledged) {
        return res.status(200).json({
          message: "Blog Deleted Successfully ",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
