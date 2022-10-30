const asyncHandler = require("express-async-handler");
const Collection = require("../models/collectionsModel");

const createCollection = asyncHandler(async (req, res) => {
  const { name, description, topic } = req.body[1].data;
  const user = req.user;
  if (!name || !description || !topic) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  const collection = await Collection.create({
    userID: user._id,
    name,
    description,
    topic,
    items: [],
  });
  if (collection) {
    res.status(201).json({
      _id: collection.id,
      userID: collection.userID,
      name: collection.name,
      description: collection.description,
      topic: collection.topic,
      items: collection.items,
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});
const getAllCollections = asyncHandler(async (req, res) => {
  const collections = await Collection.find({});
  res.status(200).json(collections);
});
const getUserCollections = asyncHandler(async (req, res) => {
  const collections = await Collection.find({ userID: req.query.userID });
  res.status(200).json(collections);
});
const deleteCollection = asyncHandler(async (req, res) => {
  const deletedCollection = await Collection.findByIdAndDelete(
    req.body.collectionID
  );
  res.status(200).json(deletedCollection);
});
const editCollection = asyncHandler(async (req, res) => {
  const collection = await Collection.findById(req.query.collectionID);
  if (!collection) {
    res.status(400);
    throw new Error("collection notfound");
  }
  const updatedCollection = await Collection.findByIdAndUpdate(
    req.query.collectionID,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedCollection);
});

const getTopFiveCollections = asyncHandler(async (req, res) => {
  Collection.aggregate(
    [
      {
        $project: {
          length: { $size: "$items" },
        },
      },
      { $sort: { length: -1 } },
      { $limit: 5 },
    ],
    async function (err, results) {
      const ids = results.map(({ _id }) => _id);
      const collections = await Collection.find({
        _id: {
          $in: ids,
        },
      });

      const sorter = (a, b) => {
        if (a.items.length > b.items.length) {
          return -1;
        } else {
          return 1;
        }
      };
      collections.sort(sorter);
      res.status(200).json([collections, results]);
    }
  );
});

module.exports = {
  getAllCollections,
  createCollection,
  getUserCollections,
  deleteCollection,
  editCollection,
  getTopFiveCollections,
};
