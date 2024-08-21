const express = require("express");
const router = express.Router();
const ratingCtrl = require("../controllers/booksRating");
const auth = require("../middlewares/auth");

router.post("/books/:id/rating", auth, ratingCtrl.postRating);
router.get("/books/bestrating", ratingCtrl.getBestRating);

module.exports = router;
