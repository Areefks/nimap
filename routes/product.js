const express = require("express");
const {
  addProduct,
  getAllProduct,
} = require("../controllers/productController");
const router = express.Router();

//Product routes
router.route("/products").get(getAllProduct);
router.route("/product/add").post(addProduct);

module.exports = router;
