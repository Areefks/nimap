const express = require("express");
const {
  addCategory,
  getAllCategory,
  deleteCategory,
  editCategory,
} = require("../controllers/categoryController");
const router = express.Router();

//Category routes
router.route("/categories").get(getAllCategory);
router.route("/category/add").post(addCategory);
router.route("/category/edit").put(editCategory);
router.route("/category/:id").delete(deleteCategory);

module.exports = router;
