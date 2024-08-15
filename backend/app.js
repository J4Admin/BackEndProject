const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Books = require("./models/books");
const app = express();

async function connectMongo() {
  await mongoose.connect(
      "mongodb+srv://Admin:Admin123@cluster0.mmwuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((e) => console.log(e));
}
connectMongo();

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

app.post("/api/books", (req, res, next) => {
  delete req.body._id;
  const books = new Books({
    ...req.body,
  });
  books
    .save()
    .then(() => res.status(201).json({ message: "Le livre a été ajouté !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/user", (req, res, next) => {
  const User = [
    {
      email: "bob",
      password: "bricoleur",
    },
    {
      email: "mickey",
      password: "moose",
    },
  ];
  res.status(200).json(User);
});

module.exports = app;
