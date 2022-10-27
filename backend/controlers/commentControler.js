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
//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// nwm po co to jest/////////////////////////////
const updateComment = asyncHandler(async (req, res) => {
  const { commentID, itemID, actionToDo } = req.body;
  const item = await Item.find({ _id: itemID });
  // sprawdzam czy chcemy usuwać czy dodawać
  // const actionToDo = req.query.actionToDo;
  if (!item) {
    res.status(400);
    throw new Error("goal notfound");
  }
  // console.log(actionToDo);
  if (actionToDo === "delete") {
    // const updatedItemID = await Collection.findByIdAndDelete({
    //   "items.itemID": itemID,
    // });
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
    //   tutaj próbowałem jak wyszukać jakiś item -  to się przyda przy usuwaniu
    // const updatedItemID = await Collection.find({ "items.itemID": itemID });
    res.status(200).json(result);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
const deleteComment = asyncHandler(async (req, res) => {
  const deletedComment = await Item.findByIdAndDelete(req.body.itemID);
  res.status(200).json(deletedComment);
});

const likesComment = asyncHandler(async (req, res) => {
  const { commentID, actionToDo } = req.body;
  const user = req.user;
  // console.log(user, "commentID ", commentID, actionToDo);

  const comment = await Comment.find({ _id: commentID });
  const comment2 = await Comment.findOne({ whoLikes: { userID: user._id } });
  // console.log("aaaaaaaaaaaaaaaaaaaaa ", comment, comment2);

  // sprawdzam czy chcemy usuwać czy dodawać
  // const actionToDo = req.query.actionToDo;
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  let commentif = await Comment.findOne({ _id: commentID });

  const ids2 = [...commentif.whoLikes];
  console.log(ids2);
  // let commentIf = await Comment.findOne({ whoLikes: { userID: user._id } });
  // let commentIf = await Comment.findOne({ whoLikes: { userID: user._id } });

  // const ids2 = [...comment.whoLikes];
  // console.log(ids2);
  const ids = ids2.map(({ userID }) => userID.toString());
  console.log(ids, "user._id  ", user._id.toString());

  console.log(ids.includes(user._id.toString()));
  // const items = await ids2.findOne({ userID: user._id });

  // console.log("itemsitemsitemsitemsitems", items);
  // commentIf
  //   ? console.log("commentIf", commentIf)
  //   : console.log("not yet given the like");

  // console.log("ids2 ids2 ids2", ids2);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if (!comment) {
    res.status(400);
    throw new Error("comment not found");
  }
  // console.log(actionToDo);

  if (ids.includes(user._id.toString()) === false) {
    // console.log(
    //   "aaaaaaaaaaaa  ",
    //   commentIf.userID === user._id.toString(),
    //   commentIf.userID,
    //   user._id.toString()
    // );
    // if (commentIf.userID !== user._id.toString()) {
    if (actionToDo === "add") {
      let result = await Comment.findByIdAndUpdate(
        commentID,
        { $push: { whoLikes: { userID: user._id } } },
        { upsert: true, new: true }
      );
      //   tutaj próbowałem jak wyszukać jakiś item -  to się przyda przy usuwaniu
      // const updatedItemID = await Collection.find({ "items.itemID": itemID });
      res.status(200).json(result);
    }
    // } else if (commentIf.userID === user._id.toString()) {
    //   console.log("already liked");
  } else if (ids.includes(user._id.toString()))
    if (actionToDo === "delete") {
      // const updatedItemID = await Collection.findByIdAndDelete({
      //   "items.itemID": itemID,
      // });
      let result = await Comment.findByIdAndUpdate(
        commentID,
        { $pull: { whoLikes: { userID: user._id } } },
        { upsert: true, new: true }
      );
      console.log("result: ", result);
      res.status(200).json(result);
    }
});

const getCommentsForID = asyncHandler(async (req, res) => {
  // console.log(req.query.itemID);
  const itemID = req.query.itemID;
  // console.log(itemID);
  //   find nie pozwala na collection.items bo jakby było więcej o tym samym id (czysto teoretycznie) to by się nie dało collection.items wyprintować od wszystkich
  //  dlatego jest takie coś jak findOne które pasuje tutaj idealnie
  const item = await Item.findOne({ _id: itemID });
  // console.log(colleciton.items);
  // console.log(item);
  const ids2 = [...item.comments];
  // console.log("ids2:  ", ids2);
  // https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
  const ids = ids2.map(({ commentID }) => commentID);
  // console.log("ids:  ", ids);
  // Object.values(...collection.items);
  // https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array
  const comments = await Comment.find({
    _id: {
      $in: ids,
    },
  });
  // console.log(ids, comments);
  // console.log(comments);
  res.status(200).json(comments);
});
module.exports = {
  createComment,
  updateComment,
  deleteComment,
  getCommentsForID,
  likesComment,
};
