module.exports = app => {
  const conversation = require("../controllers/conversation.controller.js");

  app.get("/conversations/:userId", conversation.findAll);

};