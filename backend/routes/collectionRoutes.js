const express = require("express");
const router = express.Router();
const {
  createCollection,
  getAllCollections,
  editCollection,
  deleteCollection,
  getUserCollections,
  getTopFiveCollections,
} = require("../controlers/collectionControler");

const { protect, ifOwner } = require("../middleware/authMiddleware");

router.route("/").get(getAllCollections);
router.route("/:id").get(getUserCollections);
router.route("/main/topfive").get(getTopFiveCollections);

router
  .route("/me/:id")
  .post(protect, createCollection)
  .put(protect, ifOwner, editCollection)
  .delete(protect, ifOwner, deleteCollection)
  .get(getUserCollections);
module.exports = router;
