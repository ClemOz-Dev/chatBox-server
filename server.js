require('dotenv').config();

const express = require("express");
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  // response to preflight request
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

// parse requests of content-type: application/json
// app.use(bodyParser.json());
express.json();

// parse requests of content-type: application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
express.urlencoded();

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to ChatBox API !"
  });
});
app.use(express.json());

require("./app/routes/mail.routes.js")(app);
require("./app/routes/conversation.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/auth.routes.js")(app);
// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
