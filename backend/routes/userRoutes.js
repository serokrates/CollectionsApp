const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getAllRegisteredUsers,
  blockUser,
  deleteUser,
} = require("../controlers/userControler");

const { protect, ifBlocked, ifAdmin } = require("../middleware/authMiddleware");

// router.route("/").get(ifBlocked2, getAllRegisteredUsers).post(registerUser);
router.route("/").get(getAllRegisteredUsers).post(registerUser);
router.post("/login", loginUser);
router.route("/me").get(protect, ifBlocked, getMe);
router
  .route("/me/:id")
  .put(protect, ifAdmin, blockUser)
  .delete(protect, ifAdmin, deleteUser);

module.exports = router;
