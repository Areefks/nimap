const express = require("express");
const {
  addCategory,
  getAllCategory,
} = require("../controllers/categoryController");
const router = express.Router();

//Category routes
router.route("/categories").get(getAllCategory);
router.route("/category/add").post(addCategory);

module.exports = router;
