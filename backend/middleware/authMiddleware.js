const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Collection = require("../models/collectionsModel");
const Item = require("../models/itemsModel");
const Comment = require("../models/commentsModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("not authorized, no token");
  }
});
const ifBlocked = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization && req.body.status) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userr = await User.findById(decoded.id).select("-password");

    if (userr && req.body.status && userr.status === "active") {
      console.log("authorized");
      next();
    } else {
      res.status(401);
      throw new Error("User blocked");
    }
  } else {
    const { email, name } = req.body;
    const userrr = await User.findOne({ email: email });

    if (userrr && req.body.status && userrr.status === "active") {
      console.log("authorized");
      next();
    } else {
      res.status(401);
      throw new Error("User blocked");
    }
  }
});
const ifAdmin = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (user && user.role === "admin") {
      next();
    } else {
      res.status(401);
    }
  } else {
    const { email, name } = req.body;
    const user = await User.findOne({ email: email });

    if (user && user.role === "admin") {
      next();
    } else {
      res.status(401);
      throw new Error("User is not an admin");
    }
  }
});
const ifOwner = asyncHandler(async (req, res, next) => {
  let token;
  const { itemID, collectionID, commentID, type, actionToDo } = req.body;
  if (type === "comment" && actionToDo === "add") {
    next();
  }
  let item = "";
  let collection = "";
  let comment = "";
  if (itemID) {
    item = await Item.findOne({ _id: itemID });
  }
  if (collectionID) {
    collection = await Collection.findOne({ _id: collectionID });
  }
  if (commentID) {
    comment = await Comment.findOne({ _id: commentID });
  }
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (
      (user && user.role === "admin") ||
      (item && item.userID === user._id.toString()) ||
      (collection && collection.userID === user._id.toString()) ||
      (comment && comment.userID === user._id.toString())
    ) {
      console.log("User is an Owner");
      next();
    } else {
      res.status(401);
      console.log("User is not an Owner");
      throw new Error("User is not an Owner");
    }
  } else {
    const { email, name } = req.body;
    const user = await User.findOne({ email: email });
    if (
      (user && user.role === "admin") ||
      (item && item.userID === user._id) ||
      (collection && collection.userID === user._id) ||
      (comment && comment.userID === user._id)
    ) {
      console.log("User Owner");
      next();
    } else {
      res.status(401);
      throw new Error("User is not an Owner");
    }
  }
  next();
});
module.exports = {
  protect,
  ifBlocked,
  ifAdmin,
  ifOwner,
};
