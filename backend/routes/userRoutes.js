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

const { protect, ifBlocked, ifAdmin,ifOwner } = require("../middleware/authMiddleware");

// router.route("/").get(ifBlocked2, getAllRegisteredUsers).post(registerUser);
router.route("/").get(getAllRegisteredUsers).post(registerUser);
router.post("/login", loginUser);
router.route("/me").get(protect, ifBlocked, getMe);
router
  .route("/me/:id")
  .put(ifAdmin, blockUser)
  .delete(ifAdmin,deleteUser);

module.exports = router;
