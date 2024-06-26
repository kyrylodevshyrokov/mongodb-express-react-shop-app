const path = require("path");
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/products", productRoutes);
app.use("/", authRoutes);

db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT);
  }
});
