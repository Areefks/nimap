const Category = require("../models/category");
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

exports.getAllCategory = BigPromise(async (req, res, next) => {
  let category = await Category.find();

  if (category.length === 0) {
    return res.status(404).json({
      success: false,
    });
  }

  res.status(200).json({
    success: true,
    category,
  });
});
