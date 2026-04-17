import ApiError from "./ApiError.js";

// ✅ role-based access middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    // check if user exists (from protect middleware)
    if (!req.user) {
      throw new ApiError(401, "Not authorized");
    }

    // check role
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Access denied. Role (${req.user.role}) not allowed`
      );
    }

    next();
  };
};

export default authorize;