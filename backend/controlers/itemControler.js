const asyncHandler = require("express-async-handler");
const Collection = require("../models/collectionsModel");
const Item = require("../models/itemsModel");
const Comment = require("../models/commentsModel");

const createItem = asyncHandler(async (req, res) => {
  const { collectionID, name, tags } = req.body;
  console.log(collectionID, name, tags);
  const user = req.user;
  // console.log(req.user);
  if (!collectionID || !name || !tags) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }
  //   const collection = await Collection.find({ _id: collectionID });
  //   collection.items = [...collection.items, { id: item._id }];

  const item = await Item.create({
    userID: user._id,
    collectionID: collectionID,
    name,
    tags: tags,
    comments: [],
  });
  // console.log(item);
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
  console.log(item);
  console.log(...item.tags);
});
const updateCollection = asyncHandler(async (req, res) => {
  console.log("updateCollection");
  const { collectionID, itemID, actionToDo } = req.body;
  console.log(req.body);
  const collection = await Collection.find({ _id: collectionID });
  // sprawdzam czy chcemy usuwać czy dodawać
  // const actionToDo = req.query.actionToDo;

  if (!collection) {
    res.status(400);
    throw new Error("goal notfound");
  }
  // console.log(actionToDo);
  if (actionToDo === "delete") {
    // const updatedItemID = await Collection.findByIdAndDelete({
    //   "items.itemID": itemID,
    // });
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
    //   tutaj próbowałem jak wyszukać jakiś item -  to się przyda przy usuwaniu
    // const updatedItemID = await Collection.find({ "items.itemID": itemID });
    res.status(200).json(result);
  }
});
const deleteItem = asyncHandler(async (req, res) => {
  // console.log("deleteItem: ");
  // console.log("deleteItem: ", req.body);

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
  // console.log(updateditem);

  res.status(200).json(updateditem);
});
const getItems = asyncHandler(async (req, res) => {
  const collectionID = req.query.collectionID;
  //   find nie pozwala na collection.items bo jakby było więcej o tym samym id (czysto teoretycznie) to by się nie dało collection.items wyprintować od wszystkich
  //  dlatego jest takie coś jak findOne które pasuje tutaj idealnie
  const collection = await Collection.findOne({ _id: collectionID });
  // console.log(colleciton.items);
  const ids2 = [...collection.items];
  // https://stackoverflow.com/questions/19590865/from-an-array-of-objects-extract-value-of-a-property-as-array
  const ids = ids2.map(({ itemID }) => itemID);
  // Object.values(...collection.items);
  // https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array
  const items = await Item.find({
    _id: {
      $in: ids,
    },
  });
  // console.log(ids, items);

  res.status(200).json(items);
});
const getItem = asyncHandler(async (req, res) => {
  const itemID = req.query.itemID;

  const item = await Item.findOne({ _id: itemID });
  console.log("getItemgetItemgetItemgetItemgetItem", item);
  res.status(200).json(item);
});
const getAllTags = asyncHandler(async (req, res) => {
  console.log("getAllTags");
  const collections = await Collection.find({});
  //////////////////////////////////////////////////////////  all tags  /////////////////////////////////////////////////////////////////////////////////
  Item.aggregate(
    [
      {
        $group: { _id: "$tags.text" },
      },
    ],
    function (err, results) {
      const ids = results.map(({ _id }) => _id);
      const merge = ids.flat(1);
      // results in here
      const unique = [...new Set(merge)];

      // console.log("unique ", unique);
      // let unique = merge.filter((item, i, ar) => ar.indexOf(item) === i);
      console.log(unique);
      res.status(200).json(unique);
    }
  );
});
const findUsingTags = asyncHandler(async (req, res) => {
  const tag = req.query.tag;
  console.log(tag);
  console.log("findUsingTags findUsingTags findUsingTags findUsingTags");
  // const collections = await Collection.find({});
  ////////////////////////////////////////////////////////////  szukanie po tagu  ///////////////////////////////////////////////////////////////////////////////////
  // https://stackoverflow.com/questions/14040562/how-to-search-in-array-of-object-in-mongodb
  // const name = "India";
  const collections = await Item.find({
    tags: { $elemMatch: { text: tag } },
  });
  res.status(200).json(collections);
  console.log(collections);
});
const findForString = asyncHandler(async (req, res) => {
  console.log("findForString");
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
