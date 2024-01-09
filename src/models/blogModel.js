import mongoose, { Schema } from "mongoose";
import User from "./userModel";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
    reviews: [
      {
        user: {
          type: Object,
        },
        rating: {
          type: Number,
        },
        comment: {
          type: String,
        },
        blogID: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

const BlogD = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default BlogD;
