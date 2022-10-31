const express = require("express");
const router = express.Router();
const {
  createComment,
  getCommentsForID,
  updateComment,
  likesComment,
} = require("../controlers/commentControler");

const { protect, ifOwner } = require("../middleware/authMiddleware");
router.route("/add/:id").put(protect, ifOwner, updateComment);
router.route("/").get(getCommentsForID).post(protect, createComment);
router.route("/like/:id").put(protect, likesComment);
module.exports = router;
