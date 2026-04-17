import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Common token verifier (from cookies)
const verifyToken = async (req) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return { error: "No token found in cookies" };
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Get user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return { error: "User not found" };
    }

    return { user };

  } catch (error) {
    return { error: "Invalid or expired token" };
  }
};



// VERIFY ADMIN
export const verifyAdmin = async (req, res, next) => {
  const result = await verifyToken(req);

  if (result.error) {
    return res.status(401).json({
      message: result.error,
    });
  }

  if (result.user.role !== "admin") {
    return res.status(403).json({
      message: "Access denied. Admin only.",
    });
  }

  req.user = result.user;
  next();
};



// VERIFY WORKER
export const verifyWorker = async (req, res, next) => {
  const result = await verifyToken(req);

  if (result.error) {
    return res.status(401).json({
      message: result.error,
    });
  }

  if (result.user.role !== "worker") {
    return res.status(403).json({
      message: "Access denied. Worker only.",
    });
  }

  req.user = result.user;
  next();
};



// VERIFY EMPLOYER
export const verifyEmployer = async (req, res, next) => {
  const result = await verifyToken(req);

  if (result.error) {
    return res.status(401).json({
      message: result.error,
    });
  }

  if (result.user.role !== "employer") {
    return res.status(403).json({
      message: "Access denied. Employer only.",
    });
  }

  req.user = result.user;
  next();
};
