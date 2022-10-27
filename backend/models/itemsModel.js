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
    // userDefinedInt1: {
    //   type: [String, Number],
    // },
    // userDefinedInt2: {
    //   type: Number,
    // },
    // userDefinedInt3: {
    //   type: Number,
    // },
    // userDefinedString1: {
    //   type: String,
    // },
    // userDefinedString2: {
    //   type: String,
    // },
    // userDefinedString3: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemsSchema);
