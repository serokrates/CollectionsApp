const mongoose = require("mongoose");

const collectionsSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: [true, "please add the creator ID"],
    },
    name: {
      type: String,
      required: [true, "Please assign a name to the collection"],
    },
    description: {
      type: String,
      required: [true, "Please assign a description to the collection"],
    },
    topic: {
      type: String,
      required: [true, "Please assign a topic to the collection"],
    },
    items: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Collection", collectionsSchema);
