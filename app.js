const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

//custom error middleware for easy front end
const productionError = require("./middlewares/productionError");

//regular middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//temp check
app.set("view engine", "ejs");

const category = require("./routes/category");
const product = require("./routes/product");

//router middleware
app.use("/api/v1", category);
app.use("/api/v1", product);

app.get("/", (req, res) => {
  res.send("home");
});

//to handle production error
app.use(productionError);

// export app js
module.exports = app;
