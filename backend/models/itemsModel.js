const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: [true, "please add the creator ID"],
      unique: false,
    },
    collectionID: {
      type: String,
      required: [true, "please add the collection ID"],
      unique: false,
    },
    name: {
      type: String,
      required: [true, "Please assign a name to the collection"],
      unique: false,
    },
    tags: {
      type: [],
      required: [true, "Please assign a name to the collection"],
      unique: false,
    },
    comments: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemsSchema);
