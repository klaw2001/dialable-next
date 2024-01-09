import mongoose, { Schema } from "mongoose";
import Category from "../models/categoryModel";
import User from "./userModel";
const listingSchema = new Schema(
  {
    placeName: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
    keywords: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    website: {
      type: String,
    },
    designation: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
    images: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      required: true,
    },
    lowestPrice: {
      type: Number,
      required: true,
    },
    highestPrice: {
      type: Number,
      required: true,
    },
=======
    thumbnail:{
      type:String,
      default:null
  },
    images:{
      type:String,
      default:null
  },
>>>>>>> ab9ca313537565b2126e3c3eeda0de4992a60c3e
    company: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linked: {
      type: String,
    },
    skype: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Listing =
  mongoose.models.Listing || mongoose.model("Listing", listingSchema);
export default Listing;
