import NextCors from "nextjs-cors";
import BlogCategory from "../../../src/models/blogCategoryModel";
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
      const id = req.query.id;

      // Validate the required fields
      if (!id) {
        return res
          .status(400)
          .json({ success: false, error: "ID is required" });
      }

      // Find the listing category by ID
      const blogCategory = await BlogCategory.findById(id);

      if (!blogCategory) {
        return res
          .status(404)
          .json({ success: false, error: "blog Category not found" });
      }

      return res.status(200).json({ success: true, data: blogCategory });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  } else if (req.method === "PUT" || req.method === "PATCH") {
    try {
      const id = req.query.id;
      const { name } = req.body;

      // Validate the required fields
      if (!id || !name) {
        return res
          .status(400)
          .json({ success: false, error: "ID and Name are required" });
      }

      const existingBlogCategory = await BlogCategory.findById(id);

      if (!existingBlogCategory) {
        return res
          .status(404)
          .json({ success: false, error: "Blog Category not found" });
      }

      existingBlogCategory.name = name;

      const updatedBlogCategory = await existingBlogCategory.save();

      return res.status(200).json({ success: true, data: updatedBlogCategory });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { name } = req.body;

      if (!name) {
        return res
          .status(400)
          .json({ success: false, error: "Name is required" });
      }

      const newBlogCategory = new BlogCategory({
        name,
      });

      const savedBlogCategory = await newBlogCategory.save();

      return res.status(201).json({ success: true, data: savedBlogCategory });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  }
}
