const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const sendSuccess = (res, status, message, data = {}) => {
  res.status(status).json({ message, ...data });
};

const handleError = (res, status, message) => {
  res.status(status).json({ message });
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, "RANDOM_TOKEN_SECRET", { expiresIn: "24h" });
};

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then(() => sendSuccess(res, 201, "Utilisateur créé"))
        .catch((error) =>
          handleError(res, 400, "Erreur lors de la création de l’utilisateur")
        );
    })
    .catch((error) =>
      handleError(res, 500, "Erreur lors du hashage du mot de passe")
    );
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return handleError(
          res,
          401,
          "Paire identifiant/mot de passe incorrecte"
        );
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return handleError(
              res,
              401,
              "Paire identifiant/mot de passe incorrecte"
            );
          }

          res.status(200).json({
            userId: user._id,
            token: generateToken(user._id),
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
