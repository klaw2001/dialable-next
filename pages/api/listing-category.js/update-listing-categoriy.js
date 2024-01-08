import dbConnect from "../../../src/dbConfig/dbConfig";
import ListingCategory from "../../../src/models/listingCategoryModel";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const { name, image } = req.body;

      // Validate the required fields
      if (!id || !name) {
        return res
          .status(400)
          .json({ success: false, error: "ID and Name are required" });
      }

      // Find the listing category by ID
      const existingListingCategory = await ListingCategory.findById(id);

      if (!existingListingCategory) {
        return res
          .status(404)
          .json({ success: false, error: "Listing category not found" });
      }

      // Update the listing category
      existingListingCategory.name = name;
      existingListingCategory.image = image || null;

      // Save the updated listing category to the database
      const updatedListingCategory = await existingListingCategory.save();

      return res
        .status(200)
        .json({ success: true, data: updatedListingCategory });
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
