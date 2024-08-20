const Book = require("../models/Book");

exports.addRating = (req, res) => {
  const userId = req.auth.userId;
  const bookId = req.params.id;
  const grade = req.body.rating;

  Book.findById(bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Livre inexistant !" });
      }

      const existingRating = book.ratings.find(
        (rating) => rating.userId.toString() === userId.toString()
      );
      if (existingRating) {
        return res
          .status(400)
          .json({ message: "Vous avez déjà noté ce livre" });
      }

      const newRatings = { userId: userId.toString(), grade };
      book.ratings.push(newRatings);

      const totalRatings = book.ratings.length;
      const sumRatings = book.ratings.reduce(
        (sum, rating) => sum + rating.grade,
        0
      );
      book.averageRating = sumRatings / totalRatings;

      return book.save();
    })
    .then((updatedBook) => {
      res.status(200).json(updatedBook);
    })
    .catch((error) => {
      console.error("Erreur lors de la notation du livre :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la notation du livre", error });
    });
};
