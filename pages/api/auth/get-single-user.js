// src/utils/getCurrentUser.js

// import User from "../models/userModel.js";
import User from "../../../src/models/userModel.js";

export default async function getCurrentUser(userID) {
  try {
    const user = await User.findById(userID).exec();
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}
