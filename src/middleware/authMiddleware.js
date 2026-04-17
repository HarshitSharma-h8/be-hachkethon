import jwt from "jsonwebtoken";
import ApiError from "./ApiError.js";
import asyncHandler from "./asyncHandler.js";
import User from "../models/User.js";

const protect = asyncHandler(async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new ApiError(401, "Not authorized");
  }

  token = token.split(" ")[1]; // Bearer token

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id).select("-password");

  next();
});

export default protect;