const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // if header has 'authorization' part and start with 'Bearer': the hash token
    try {
      // split by space and take the latter
      token = req.headers.authorization.split(" ")[1];
      // decrypt the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password"); // find user by ID in model, add all fields exclude password field
      if (!user) {
        res.status(401);
        throw new Error("Not authorized: user not found");
      }
      req.user = user; // assign user info to req.user for later use

      return next(); // move on to the controller procedure and not do the following steps
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("You are not authorized!");
    }
  }
  // Nếu không có header Authorization
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
