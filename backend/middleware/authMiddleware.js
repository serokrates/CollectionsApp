const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Collection = require("../models/collectionsModel");
const Item = require("../models/itemsModel");
const Comment = require("../models/commentsModel");

const protect = asyncHandler(async (req, res, next) => {
  console.log("protect", req.body);
  let token;
  console.log(req.headers.authorization);
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
      console.log(error);
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
  console.log("req.body: ",req.body)
  if (req.headers.authorization ) {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    console.log(user)
    if (user && user.role === "admin") {
      console.log("User have admin role");
      next();
    } else {
      res.status(401);
      throw new Error("User is not an admin");
    }
  } else {
    const { email, name } = req.body;
    const user = await User.findOne({ email: email });

    if (user && user.role === "admin") {
      console.log("User have admin role");
      next();
    } else {
      res.status(401);
      throw new Error("User is not an admin");
    }
  }
});
const ifOwner = asyncHandler(async (req, res, next) => {
  console.log("ifOwner");
  let token;
  const { itemID, collectionID, commentID, type, actionToDo } = req.body;
  if (type === "comment" && actionToDo === "add") {
    console.log("only add");
    next();
  }
  console.log(itemID, collectionID, commentID, type, actionToDo);
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
  console.log("item: ", item, "collection: ", collection, "comment: ", comment);
  if (req.headers.authorization) {
    console.log("req.headers.authorization");
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    // console.log("useruseruseruseruseruseruser", user);
    console.log(comment.userID, user._id);
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
    // console.log(user);
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
  // console.log("ifOwner", req.body);
  next();
});
// const ifBlocked2 = asyncHandler(async (req, res, next) => {
//   // console.log(req.query.id);
//   // const userrr = await User.findById(req.query.id);
//   // console.log(userrr.status);

//   // if (userrr.status === "active") {
//   //   // console.log("authorized");
//   //   // next();

//   //   try {
//   //     console.log("authorized");
//   //     next();
//   //   } catch (error) {
//   //     // }else {
//   //     //   // console.log(error);
//   //     //   // res.status(401).send({ error: "Something failed!" });

//   //     res.status(400);
//   //     throw new Error("invalid credentials");
//   //   }
//   // }
//   // console.log(req.body.currentUserID);
//   // console.log(req.query.id);
//   console.log("req.query.id: ", req.query.id);
//   const userrr = await User.findById(req.query.id);
//   const cu = await User.findById(req.body.currentUserID);
//   // console.log(userrr.status);
//   console.log("cu: ", cu);
//   if (userrr) {
//     console.log("userrr: ", userrr);
//     if (userrr.status === "active") {
//       // console.log("authorized");
//       // next();

//       console.log("authorized");
//       const users = await User.find({});
//       res.status(200).json(users);
//     } else {
//       // }else {
//       //   // console.log(error);
//       //   // res.status(401).send({ error: "Something failed!" });
//       res.status(401).send({ error: "Something failed!" });
//       return new Error("invalid credentials");
//     }
//   }
//   if (cu) {
//     console.log("cu");
//     if (cu.status === "active") {
//       // console.log("authorized");
//       // next();

//       console.log("authorized");
//       next();
//     } else {
//       // }else {
//       //   // console.log(error);
//       //   // res.status(401).send({ error: "Something failed!" });
//       res.status(401).send({ error: "Something failed!" });
//       return new Error("invalid credentials");
//     }
//   }
// });
module.exports = {
  protect,
  ifBlocked,
  ifAdmin,
  ifOwner,
};
