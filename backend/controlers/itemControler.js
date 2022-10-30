const asyncHandler = require("express-async-handler");
const Collection = require("../models/collectionsModel");
const Item = require("../models/itemsModel");
const Comment = require("../models/commentsModel");

const createItem = asyncHandler(async (req, res) => {
  const { collectionID, name, tags } = req.body;
  const user = req.user;
  if (!collectionID || !name || !tags) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }
  const item = await Item.create({
    userID: user._id,
    collectionID: collectionID,
    name,
    tags: tags,
    comments: [],
  });
  if (item) {
    res.status(200).json({
      _id: item._id,
      userID: item.userID,
      collectionID: item.collectionID,
      name: item.name,
      tags: item.tags,
      comments: item.comments,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});
const updateCollection = asyncHandler(async (req, res) => {
  const { collectionID, itemID, actionToDo } = req.body;
  const collection = await Collection.find({ _id: collectionID });

  if (!collection) {
    res.status(400);
    throw new Error("goal notfound");
  }
  if (actionToDo === "delete") {
    let result = await Collection.findByIdAndUpdate(
      collectionID,
      { $pull: { items: { itemID: itemID } } },
      { upsert: true, new: true }
    );
    res.status(200).json(result);
  } else if (actionToDo === "add") {
    let result = await Collection.findByIdAndUpdate(
      collectionID,
      { $push: { items: { itemID: itemID } } },
      { upsert: true, new: true }
    );
    res.status(200).json(result);
  }
});
const deleteItem = asyncHandler(async (req, res) => {
  const deletedItem = await Item.findByIdAndDelete(req.body.itemID);
  res.status(200).json(deletedItem);
});
const editItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    res.status(400);
    throw new Error("goal notfound");
  }
  const updateditem = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updateditem);
});
const getItems = asyncHandler(async (req, res) => {
  const collectionID = req.query.collectionID;
  const collection = await Collection.findOne({ _id: collectionID });
  const ids2 = [...collection.items];
  const ids = ids2.map(({ itemID }) => itemID);
  const items = await Item.find({
    _id: {
      $in: ids,
    },
  });
  res.status(200).json(items);
});
const getItem = asyncHandler(async (req, res) => {
  const itemID = req.query.itemID;

  const item = await Item.findOne({ _id: itemID });
  res.status(200).json(item);
});
const getAllTags = asyncHandler(async (req, res) => {
  const collections = await Collection.find({});
  Item.aggregate(
    [
      {
        $group: { _id: "$tags.text" },
      },
    ],
    function (err, results) {
      const ids = results.map(({ _id }) => _id);
      const merge = ids.flat(1);
      const unique = [...new Set(merge)];
      res.status(200).json(unique);
    }
  );
});
const findUsingTags = asyncHandler(async (req, res) => {
  const tag = req.query.tag;
  const collections = await Item.find({
    tags: { $elemMatch: { text: tag } },
  });
  res.status(200).json(collections);
});
const findForString = asyncHandler(async (req, res) => {
  const name = req.query.name;
  const regex = new RegExp(`${name}`, "i");
  const comment = await Comment.find({ text: { $regex: regex } });
  const items = await Item.find({ name: { $regex: regex } });

  const ItemIds = comment.map(({ itemID }) => itemID);

  const itemsFromIds = await Item.find({
    _id: {
      $in: ItemIds,
    },
  });
  const combineItems = items.concat(itemsFromIds);
  const unique = [...new Set(combineItems.map((item) => item._id.toString()))];

  const itemsCombined = await Item.find({
    _id: {
      $in: unique,
    },
  });
  res.status(200).json(itemsCombined);
});
module.exports = {
  createItem,
  updateCollection,
  deleteItem,
  editItem,
  getItems,
  getItem,
  getAllTags,
  findUsingTags,
  findForString,
};
