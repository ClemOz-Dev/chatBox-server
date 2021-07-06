const Conversation = require("../models/conversation.model.js");

exports.findAll = (req, res) => {
  Conversation.findAllByUserId(req.params.userId, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving conversations."
      });
    else res.send(data);
  });
};

exports.findOneByMemberId = (req, res) => {
  Conversation.findById(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        const conversation = new Conversation({
          user1: req.body.myId,
          user2: req.body.interlocutorId,
        });

        Conversation.create(conversation, (err, data) => {
          if (err) {
            res.status(500).send({
              message: "Erreur serveur"
            });
          } else res.send(data);
        });

      } else {
        res.status(500).send({
          message: "Error retrieving Conversation with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};