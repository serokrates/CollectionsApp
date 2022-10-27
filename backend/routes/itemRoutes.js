const express = require("express");
const router = express.Router();
const {
  createItem,
  updateCollection,
  deleteItem,
  editItem,
  getItems,
  getItem,
  getAllTags,
  findUsingTags,
  findForString,
} = require("../controlers/itemControler");
const {} = require("../controlers/commentControler");
const {
  protect,
  ifBlocked,
  ifBlocked2,
  ifOwner,
} = require("../middleware/authMiddleware");

router.route("/:id").get(getItems);
router.route("/item/:id").get(getItem);
router.route("/tags/Alltags").get(getAllTags);
router.route("/tags/findUsingTags").get(findUsingTags);
router.route("/main/findForString").get(findForString);
router
  .route("/me/:id")
  .post(protect, createItem)
  .put(ifOwner, updateCollection)
  // .delete(deleteItem)
  .delete(ifOwner, deleteItem)
  .get(getItems);
module.exports = router;
