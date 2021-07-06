const Mail = require("../models/mail.model.js");
const Conversation = require("../models/Conversation.model.js");

exports.findAll = (req, res) => {
  Mail.findAllByConversationId(req.params.conversationId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        Conversation.create(req.params.conversationId, (err, data) => {
          if (err) {
            res.status(500).send({
              message: "Error starting a new conversation yeahhh"
            });
          } else res.send(data);
        })
      } else {
        res.status(500).send({
          message: "Error retrieving Conversation with id " + req.params.conversationId
        });
      }
    } else res.send(data);
  });
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const mail = new Mail({
    from_id: req.body.fromId,
    to_id: req.body.toId,
    conversation_id: req.body.conversationId,
    content: req.body.content,
  });

  Mail.create(mail, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Erreur serveur"
      });

    } else res.send(data);
  });
};