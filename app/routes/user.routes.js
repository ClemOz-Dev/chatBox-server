module.exports = app => {
  const user = require("../controllers/user.controller.js");
  // Create a new User
  app.post("/user", user.create);

  // Retrieve all Users
  app.get("/users", user.findAll);

  // Retrieve all Users with Keyword
  app.post("/users", user.findAllCustom);

  // Retrieve a single User with userId
  app.get("/user/:userId", user.findOneById);

  // Update a User with userId
  app.put("/user/:userId", user.update);

  // Delete a User with userId
  app.delete("/user/:userId", user.delete);

};
