import dbConnect from "../../../src/dbConfig/dbConfig";
import ListingCategory from "../../../src/models/listingCategoryModel";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      // Get all listing categories
      const allListingCategories = await ListingCategory.find();

      return res
        .status(200)
        .json({ success: true, data: allListingCategories });
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
