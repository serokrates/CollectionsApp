const asyncHandler = require("express-async-handler");
const Comment = require("../models/commentsModel");
const Item = require("../models/itemsModel");

const createComment = asyncHandler(async (req, res) => {
  const { text, itemID } = req.body;
  const user = req.user;

  if (!itemID || !text) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const comment = await Comment.create({
    userID: user.id,
    itemID: itemID,
    text: text,
    whoLikes: [],
  });

  if (comment) {
    res.status(201).json({
      _id: comment.id,
      userID: comment.userID,
      itemID: comment.itemID,
      text: comment.text,
      whoLikes: comment.whoLikes,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentID, itemID, actionToDo } = req.body;
  const item = await Item.find({ _id: itemID });

  if (!item) {
    res.status(400);
    throw new Error("goal notfound");
  }
  if (actionToDo === "delete") {
    let result = await Item.findByIdAndUpdate(
      itemID,
      { $pull: { comments: { commentID: commentID } } },
      { upsert: true, new: true }
    );
    await Comment.findByIdAndDelete(commentID);
    res.status(200).json(result);
  } else if (actionToDo === "add") {
    let result = await Item.findByIdAndUpdate(
      itemID,
      { $push: { comments: { commentID: commentID } } },
      { upsert: true, new: true }
    );

    res.status(200).json(result);
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  const deletedComment = await Item.findByIdAndDelete(req.body.itemID);
  res.status(200).json(deletedComment);
});

const likesComment = asyncHandler(async (req, res) => {
  const { commentID, actionToDo } = req.body;
  const user = req.user;

  const comment = await Comment.find({ _id: commentID });

  let commentif = await Comment.findOne({ _id: commentID });

  const ids2 = [...commentif.whoLikes];
  const ids = ids2.map(({ userID }) => userID.toString());

  if (!comment) {
    res.status(400);
    throw new Error("comment not found");
  }

  if (ids.includes(user._id.toString()) === false) {
    if (actionToDo === "add") {
      let result = await Comment.findByIdAndUpdate(
        commentID,
        { $push: { whoLikes: { userID: user._id } } },
        { upsert: true, new: true }
      );

      res.status(200).json(result);
    }
  } else if (ids.includes(user._id.toString()))
    if (actionToDo === "delete") {
      let result = await Comment.findByIdAndUpdate(
        commentID,
        { $pull: { whoLikes: { userID: user._id } } },
        { upsert: true, new: true }
      );
      res.status(200).json(result);
    }
});

const getCommentsForID = asyncHandler(async (req, res) => {
  const itemID = req.query.itemID;
  const item = await Item.findOne({ _id: itemID });
  const ids2 = [...item.comments];
  const ids = ids2.map(({ commentID }) => commentID);
  const comments = await Comment.find({
    _id: {
      $in: ids,
    },
  });

  res.status(200).json(comments);
});
module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentsForID,
  likesComment,
};
