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

exports.deleteProduct = BigPromise(async (req, res, next) => {
  let delProduct = await Product.findByIdAndDelete(req.params.id);
  if (!delProduct) {
    next(new CustomError("No Product found", 400));
    return;
  }

  res.status(200).json({
    success: true,
  });
});

exports.editProduct = BigPromise(async (req, res, next) => {
  const { _id } = req.body;

  // const product = await Product.findOne(req.query.id);
  const newProduct = await Product.findByIdAndUpdate(
    { _id },
    {
      name: req.body.name,
    },
    {
      new: true,
    }
  );

  if (!newProduct) {
    next(new CustomError("No Product found", 400));
    return;
  }

  res.status(200).json({
    success: true,
    newProduct: newProduct,
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
