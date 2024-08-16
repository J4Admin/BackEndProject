const mongoose = require("mongoose");
const { Schema } = mongoose;

const userReference = {
  type: Schema.Types.ObjectId,
  ref: "User",
  required: true,
};

const ratingSchema = new Schema({
  userId: userReference,
  grade: { type: Number, min: 0, max: 5, required: true },
});

const bookSchema = new Schema([
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: [ratingSchema],
    averageRating: { type: Number, default: 0 },
  },
]);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
