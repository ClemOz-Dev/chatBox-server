const sql = require("./db.js");

// constructor
const Mail = function (mail) {
  this.from_id = mail.from_id;
  this.to_id = mail.to_id;
  this.conversation_id = mail.conversation_id;
  this.content = mail.content;
};

Mail.create = (newMail, result) => {

  sql.query("INSERT INTO mail SET ?", newMail, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", {
      id: res.insertId,
      ...newMail
    });
    result(null, {
      message: 'Message créé avec succès !'
    });
  });
};

Mail.findAllByConversationId = (conversationId, result) => {
  sql.query(
    `SELECT m.id, m.from_id, m.to_id, m.content, u1.nickname fromNickname, u2.nickname toNickname
    from mail m
    left join user u1 on (m.from_id = u1.id)
    left join user u2 on (m.to_id = u2.id)
    WHERE m.conversation_id = ${conversationId}
    ORDER BY m.id`, (err, res) => {
      console.log("result !!!!!: ", res);
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found messages : ", res);
        result(null, res);
        return;
      }

      // not found User with the id
      result({
        kind: "not_found"
      }, null);
    });
};


module.exports = Mail;