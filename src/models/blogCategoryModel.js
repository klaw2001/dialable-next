import mongoose, { Schema } from "mongoose";

const blogCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BlogCategory =
  mongoose.models.BlogCategory ||
  mongoose.model("BlogCategory", blogCategorySchema);

export default BlogCategory;
