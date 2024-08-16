const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const sharpImage = async (req, res, next) => {
  if (req.file) {
    const inputPath = path.join(__dirname, "../images", req.file.filename);
    const outputPath = path.join(
      __dirname,
      "../images",
      `converted_${req.file.filename}.webp`
    );
    try {
      await sharp(inputPath).toFormat("webp").toFile(outputPath);
      fs.unlink(inputPath, (err) => {
        if (err) console.error("error lors de la suppression de l'image", err);
      });
      req.file.filename = `converted_${req.file.filename}.webp`;
      next();
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la conversion de l'image" });
    }
  } else {
    next();
  }
};

module.exports = sharpImage;
