import Listing from "../../../../src/models/listingModel";
import NextCors from "nextjs-cors";
import connectDB from "../../../../src/dbConfig/dbConfig";
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

  if (req.method === "PUT" || req.method === "PATCH") {
    const listingId = req.params.listingId;

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

    const updatedData = await productModel.updateOne(
      { _id: listingId },
      {
        $set: {
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
        },
      }
    );

    const validationError = listingData.validateSync();
    if (validationError) {
      return res.status(400).json({ message: validationError.message });
    }

    if (updatedData) {
      return res.status(200).json({
        data: updatedData,
        message: "Listing Updated Successfully",
      });
    }
  } else if (req.method === "DELETE") {
    try {
      const listingId = req.params.product_id;

      const removeData = await Listing.deleteOne({ _id: listingId });
      if (removeData.acknowledged) {
        return res.status(200).json({
          data: removeData,
          message: "Listing Deleted Successfully",
        });
      }
    } catch (error) {
      return res.status(500).json({
        msg: error.msg,
      });
    }
  } else if (req.method === "GET") {
    try {
      const listingID = req.query.id;
      const listingData = await Listing.findOne({ _id: listingID })
        .populate("category")
        .populate("subcategory");

      if (listingData) {
        return res.status(200).json({
          data: listingData,
          message: "Success",
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}
