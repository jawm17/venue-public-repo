const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config();
const router = require("./routes");
const app = express();
const PORT = process.env.PORT || 5001;
const cookieParser = require("cookie-parser");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(router);

// Connect to the Mongo DB
if (process.env.NODE_ENV === "production") {
  mongoose.connect(process.env.DB_PROD, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
} else {
  mongoose.connect(process.env.DB_DEV, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
}

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎 ==> Ayo LET'S GO! API Server on PORT ${PORT}!`);
});