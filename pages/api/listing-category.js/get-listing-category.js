import dbConnect from "../../../src/dbConfig/dbConfig";
import ListingCategory from "../../../src/models/listingCategoryModel";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const { id } = req.query;

      // Validate the required fields
      if (!id) {
        return res
          .status(400)
          .json({ success: false, error: "ID is required" });
      }

      // Find the listing category by ID
      const listingCategory = await ListingCategory.findById(id);

      if (!listingCategory) {
        return res
          .status(404)
          .json({ success: false, error: "Listing category not found" });
      }

      return res.status(200).json({ success: true, data: listingCategory });
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
