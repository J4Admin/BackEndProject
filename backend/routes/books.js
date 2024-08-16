const express = require("express");
const router = express.Router();
const multer = require("../middlewares/multer-config");
const sharpImage = require("../middlewares/sharp");
const booksCtrl = require("../controllers/books");
const auth = require("../middlewares/auth");

router.post("/", auth, multer, sharpImage, booksCtrl.createBook);
router.put("/:id", auth, multer, sharpImage, booksCtrl.modifyBook);
router.delete("/:id", auth, booksCtrl.deleteBook);
router.get("/:id", booksCtrl.getOneBook);
router.get("/", booksCtrl.getAllBook);

module.exports = router;
