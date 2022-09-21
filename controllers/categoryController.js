const Category = require("../models/category");
const Product = require("../models/product");
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");
const WhereClause = require("../utils/whereClause");

exports.addCategory = BigPromise(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(200).json({
    success: true,
    category,
  });
});

exports.deleteCategory = BigPromise(async (req, res, next) => {
  const products = await Product.find({ category: req.params.id });
  if (products.length >= 1) {
    res.status(400).json({
      message: "Cannot delete because Category has Products Linked to it.",
    });
  } else {
    await Category.findByIdAndRemove(req.params.id);
    res.status(200).json({
      success: true,
    });
  }
});

exports.editCategory = BigPromise(async (req, res, next) => {
  const { _id } = req.body;

  const newCategory = await Category.findByIdAndUpdate(
    { _id },
    {
      name: req.body.name,
    },
    {
      new: true,
    }
  );

  if (!newCategory) {
    next(new CustomError("No Category found", 400));
    return;
  }

  res.status(200).json({
    success: true,
    newCategory: newCategory,
  });
});

exports.getAllCategory = BigPromise(async (req, res, next) => {
  let categories = await Category.find();

  if (categories.length === 0) {
    return res.status(404).json({
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    categories,
  });
});
