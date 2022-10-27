const asyncHandler = require("express-async-handler");
const Collection = require("../models/collectionsModel");
const Item = require("../models/itemsModel");
const Comment = require("../models/commentsModel");
const createCollection = asyncHandler(async (req, res) => {
  // console.log(req.body);
  // console.log(req.body[1].data);
  // console.log("createCollection");
  const { name, description, topic } = req.body[1].data;
  // console.log(name, description, topic);
  const user = req.user;
  // console.log(user._id);
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
  // console.log(collection);
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
  // console.log(collections);
  res.status(200).json(collections);
});
const getUserCollections = asyncHandler(async (req, res) => {
  const collections = await Collection.find({ userID: req.query.userID });
  // console.log(collections, req.query.userID);
  res.status(200).json(collections);
});
const deleteCollection = asyncHandler(async (req, res) => {
  const deletedCollection = await Collection.findByIdAndDelete(
    req.body.collectionID
  );
  // console.log(req.body.collectionID);
  res.status(200).json(deletedCollection);
});
const editCollection = asyncHandler(async (req, res) => {
  // console.log(req.query.collectionID);
  // console.log(req.body);
  // req.params.id ------- tutaj zawsze jest id tego kto wysyła zapytanie, dlatego też nie trzeba przesyłać w query id sendera
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
  // console.log("getTopFiveCollections");
  const collections = await Collection.find({});

  // https://stackoverflow.com/questions/32063941/how-to-sort-documents-based-on-length-of-an-array-field
  Collection.aggregate(
    [
      {
        $project: {
          length: { $size: "$items" },
          // userID: { userID },
          // name: { name },
          // description: { description },
          // topic: { topic },
          // items: { items },
          // createdAt: { createdAt },
          // updatedAt: { updatedAt },
        },
      },
      { $sort: { length: -1 } },
      { $limit: 5 },
    ],
    async function (err, results) {
      // results in here
      // console.log(results);
      const ids = results.map(({ _id }) => _id);
      // console.log(ids);
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
      // console.log(collections);
      res.status(200).json([collections, results]);
      // console.log(results);
    }
  );
});

// https://stackoverflow.com/questions/32063941/how-to-sort-documents-based-on-length-of-an-array-field

//   Collection.aggregate(
//     [
//       {
//         $regexMatch: { input: "$name", regex: "one1" },
//       },
//       // { $sort: { length: -1 } },
//       // { $limit: 5 },
//     ],
//     async function (err, results) {
//       // // results in here
//       // const ids = results.map(({ _id }) => _id);
//       // // console.log(ids);
//       // const collections = await Collection.find({
//       //   _id: {
//       //     $in: ids,
//       //   },
//       // });
//       res.status(200).json(results);
//       console.log(results);
//     }
//   );
// });

module.exports = {
  getAllCollections,
  createCollection,
  getUserCollections,
  deleteCollection,
  editCollection,
  getTopFiveCollections,
};
