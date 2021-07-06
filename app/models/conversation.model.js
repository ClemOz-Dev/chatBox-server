const sql = require("./db.js");

// constructor
const Conversation = function (conversation) {
  this.user1 = conversation.user1;
  this.user2 = conversation.user2;
};

Conversation.create = (newConversation, result) => {
  sql.query("INSERT INTO conversation SET ?", newConversation, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created conversation: ", {
      id: res.insertId,
      ...newConversation
    });
    result(null, {
      message: 'Conversation créée avec succès !'
    });
  });
};

Conversation.findById = (reqBody, result) => {
  sql.query(`SELECT * FROM conversation WHERE user1 = ${reqBody.myId} AND user2 = ${reqBody.interlocutorId} OR user2 = ${reqBody.myId} AND user1 = ${reqBody.interlocutorId}`, (err, res) => {
    console.log("result: ", res);
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found conversation: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({
      kind: "not_found"
    }, null);
  });
};


Conversation.getAll = result => {
  sql.query("SELECT * FROM conversation", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("conversations : ", res);
    result(null, res);
  });
};

Conversation.findAllByUserId = (userId, result) => {
  sql.query(
    `SELECT c.id, c.user1, c.user2, u1.nickname user1Nickname, u2.nickname user2Nickname
    from conversation c
    left join user u1 on (c.user1 = u1.id)
    left join user u2 on (c.user2 = u2.id)
    WHERE c.user1 = ${userId} OR c.user2 =${userId}`, (err, res) => {
      console.log("result !!!!!: ", res);
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found conversations !!! : ", res);
        result(null, res);
        return;
      }

      // not found User with the id
      result({
        kind: "not_found"
      }, null);
    });
};


module.exports = Conversation;