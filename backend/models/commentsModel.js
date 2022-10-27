const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: [true, "please add the creator ID"],
    },
    itemID: {
      type: String,
      required: [true, "please add the itemID"],
    },
    text: {
      type: String,
      required: [true, "Please assign a text to the comment"],
    },
    whoLikes: {
      type: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", commentsSchema);
