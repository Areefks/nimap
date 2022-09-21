const express = require("express");
const {
  addProduct,
  getAllProduct,
  deleteProduct,
  editProduct,
} = require("../controllers/productController");
const router = express.Router();

//Product routes
router.route("/products").get(getAllProduct);
router.route("/product/add").post(addProduct);
router.route("/product/:id").delete(deleteProduct);
router.route("/product/edit").put(editProduct);

module.exports = router;
