import mongoose, { Schema } from "mongoose";
import User from "./userModel";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: false,
    },
    image: {
      type: String,
      default: null,
    },
    comments: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: User,
        },
        userComment: {
          type: String,
        },
      },
    ],
    tags: {
      type: String,
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
