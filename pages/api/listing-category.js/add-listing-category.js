import dbConnect from "../../../src/dbConfig/dbConfig";
import ListingCategory from "../../../src/models/listingCategoryModel";

export default async function handler(req, res) {
  await dbConnect()
    .then(() => {
      console.log("connected from listing categories");
    })
    .catch(() => {
      console.log("not connected");
    });

  if (req.method === "POST") {
    try {
      const { name, image } = req.body;

      // Validate the required fields
      if (!name) {
        return res
          .status(400)
          .json({ success: false, error: "Name is required" });
      }

      // Create a new ListingCategory instance
      const newListingCategory = new ListingCategory({
        name,
        image: image || null,
      });

      // Save the new listing category to the database
      const savedListingCategory = await newListingCategory.save();

      return res
        .status(201)
        .json({ success: true, data: savedListingCategory });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }
}
