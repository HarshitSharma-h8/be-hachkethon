import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "./../utils/ApiError.js";
import User from "../models/User.js";

// ✅ GET /api/users/me
export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// ✅ PUT /api/users/me
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.name = req.body.name || user.name;
  user.skills = req.body.skills || user.skills;
  user.location = req.body.location || user.location;

  const updatedUser = await user.save();

  res.status(200).json({
    success: true,
    data: updatedUser,
  });
});