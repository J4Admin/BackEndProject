const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const booksRoutes = require("./routes/books.js");
const userRoutes = require("./routes/user.js");

async function connectMongo() {
  await mongoose
    .connect(
      "mongodb+srv://Admin:Admin123@cluster0.mmwuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((e) => console.log(e));
}
connectMongo();

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(bodyParser.json());

app.use("/api/books", booksRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
