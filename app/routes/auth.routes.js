module.exports = app => {
  const user = require("../controllers/user.controller.js");

  app.post("/login", user.findOneByEmail);

  app.post("/inscription", user.create);

};
