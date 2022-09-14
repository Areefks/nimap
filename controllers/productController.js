const Product = require("../models/product");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const WhereClause = require("../utils/whereClause");

exports.addProduct = BigPromise(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

exports.getAllProduct = BigPromise(async (req, res, next) => {
  const resultPerPage = req.query.perPage || 3;
  const totalcountProduct = await Product.countDocuments();

  const productsObj = new WhereClause(Product.find(), req.query)
    .search()
    .filter();

  let products = await productsObj.base;
  const filteredProductNumber = products.length;

  productsObj.pager(resultPerPage);
  products = await productsObj.base.clone();

  if (products.length === 0) {
    return res.status(404).json({
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    products,
    filteredProductNumber,
    totalcountProduct,
    resultPerPage,
  });
});
