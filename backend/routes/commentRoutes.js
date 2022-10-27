const express = require("express");
const router = express.Router();
const {
  createComment,
  getCommentsForID,
  updateComment,
  likesComment,
  deleteComment,
} = require("../controlers/commentControler");

const { protect, ifOwner } = require("../middleware/authMiddleware");
router.route("/add/:id").put(protect, ifOwner, updateComment);
// router.route("/comments").get(getAllComments).post(protect, createComment);
router.route("/").get(getCommentsForID).post(protect, createComment);
router.route("/like/:id").put(protect, likesComment);
// router.route("/like/:id").put(protect, likesComment);
// deleteComment
module.exports = router;
