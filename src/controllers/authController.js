import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// ✅ Register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, password } = req.body;

  if (!name || !phone || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const userExists = await User.findOne({ phone });

  if (userExists) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({ name, phone, password });

  res.status(201).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      token: generateToken(user._id),
    },
  });
});

// ✅ Login
export const loginUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ phone });

  if (!user) {
    throw new ApiError(401, "Invalid phone or password");
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid phone or password");
  }

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      phone: user.phone,
      token: generateToken(user._id),
    },
  });
});