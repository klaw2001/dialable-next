import multer from "multer";
import fs from "fs";
import path from "path";
import Listing from "../../../src/models/listingModel";

export default async function POST(req, res) {
  // let images = [];
  // if (req.files && req.files["images"]) {
  //   req.files["images"].forEach((file) => {
  //     images.push(file.filename);
  //   });
  // }

  const {
    placeName,
    user,
    category,
    keywords,
    description,
    name,
    email,
    phone,
    website,
    designation,
    company,
    location,
    lowestPrice,
    higestPrice,
    images,
    facebook,
    twitter,
    linked,
    skype,
  } = req.body;

  // console.log('Files:', req.files);

  const listingData = new Listing({
    placeName,
    user,
    category,
    keywords,
    description,
    name,
    email,
    phone,
    website,
    designation,
    company,
    location,
    lowestPrice,
    higestPrice,
    images,
    facebook,
    twitter,
    linked,
    skype,
  });

  const validationError = listingData.validateSync();
  if (validationError) 
   return  res.status(400).json({ message: validationError.message });

  listingData.save();
  if (listingData) {
    return res.status(201).json({
      data: listingData,
      message: "Listing Data Added Successfully",
    });
  }
}

const validationError = listingData.validateSync();
if (validationError) 
  return res.status(400).json({ message: validationError.message });


listingData.save();
if (listingData) {
  return res.status(201).json({
    data: listingData,
    message: "Listing Data Added Successfully",
  });
}
