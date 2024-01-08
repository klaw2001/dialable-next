// pages/api/auth/get-current-user/[id].js

import getCurrentUser from "../get-single-user";

export default async function GET(req, res) {
  try {
    const userID = req.query.id;

    const user = await getCurrentUser(userID);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: `User does not exist with Id: ${userID}`,
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}
