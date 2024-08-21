const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const booksRoutes = require("./routes/books.js");
const userRoutes = require("./routes/user.js");
const booksRatingRoutes = require("./routes/booksRating.js");

mongoose
  .connect(
    "mongodb+srv://Admin:Admin123@cluster0.mmwuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((e) => console.log(e));

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

app.use(bodyParser.json());
app.use("/api", booksRatingRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
