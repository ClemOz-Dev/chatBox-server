const User = require("../models/user.model.js");
const config = require("../config/db.config");
const jwt = require("jsonwebtoken");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an User
  const user = new User({
    email: req.body.email,
    nickname: req.body.nickname,
    password: req.body.password,
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err) {
      if (err.kind === "already_registered") {
        res.status(409).send({
          message: `Cette adresse email est déjà liée à un compte.`
        });
      } else {
        res.status(500).send({
          message: "Erreur serveur"
        });
      }
    }
    else res.send(data);
  });
};
// ----------------------------------------------------- //
// Retrieve all Users from the database.

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

exports.findAllCustom = (req, res) => {
  User.getAllCustom(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};


// ----------------------------------------------------- //

exports.findOneById = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

exports.findOneByEmail = (req, res) => {
  User.findByEmail(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Identifiant ${req.body.email} incorrect`
        });
      }
      else if (err.kind === "wrong_data") {
        res.status(401).send({
          message: `Mot de passe incorrect`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with email " + req.body.email
        });
      }
    }
    else {
      const token = jwt.sign({ id: data.id, user_mail: data.email }, config.TOKEN_SECRET, { expiresIn: 60 * 60 });
      res.status(200).header("auth-token", token).send({ "id": data.id, "nickname": data.nickname, "token": token });
    }
  });
};
// ----------------------------------------------------- //

// Update an User 
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateById(
    req.params.userId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.userId
          });
        }
      } else res.send(data);
    }
  );
};

// ----------------------------------------------------- //

// Delete an User
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.userId
        });
      }
    } else res.send({
      message: `User was deleted successfully!`
    });
  });
};

// ----------------------------------------------------- //
