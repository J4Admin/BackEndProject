const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
  title: { type: String, require: true },
  image: { type: String, require: true },
});

module.exports = mongoose.model("books", booksSchema);
