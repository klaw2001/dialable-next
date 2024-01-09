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

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    origin: "*",
    optionsSuccessStatus: 200,
  });

  if (req.method === "GET") {
    try {
      const blogID = req.query.id;
      const blogData = await Blog.findOne({ _id: blogID });

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
      const { title, image, content } = req.body;

      const blog = await Blog.findOne({ _id: blogID });

      if (!blog) {
        return res.status(404).json({
          message: "blog not found",
        });
      }

      const updatedData = await Blog.updateOne(
        { _id: blogID },
        {
          $set: {
            title: title,
            image: image,
            content: content,
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
  } else if (req.method === "POST") {
    const { title, image, content, userID } = req.body;
    try {
      const blogData = await new Blog({
        title,
        image,
        content,
        userID,
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
  } else if (req.method === "DELETE") {
    try {
      const blogID = req.query.id;
      const blog = await Blog.findOne({ _id: blogID });

      if (!blog) {
        return res.status(404).json({
          message: "blog not found",
        });
      }

      const deleteBlog = await Blog.deleteOne(blog);

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
