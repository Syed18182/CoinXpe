const { Pool } = require("pg");
const settings = require("./settings");

exports.executeSql = function (sql, callback) {
  const client = new Pool(settings.dbConfigpg);
  client.connect();
  client
    .query(sql)
    .then((res) => {
      callback(res.rows);
    })
    .catch((err) => {
      callback(err.message);
    })
    .then(() => {
      client.end();
    });
};
