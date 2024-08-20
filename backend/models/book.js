const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  ratings: [
    {
      userId: { type: String, required: true },
      grade: { type: Number, required: true, default: 1 },
    },
  ],
  averageRating: { type: Number, default: 0 },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
