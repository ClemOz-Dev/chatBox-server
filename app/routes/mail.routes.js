module.exports = app => {
  const mail = require("../controllers/mail.controller.js");
  const conversation = require("../controllers/conversation.controller.js");

  app.get("/conversation/:conversationId", mail.findAll);

  app.post("/conversation/", conversation.findOneByMemberId);

  app.post("/new-mail/", mail.create);

};
