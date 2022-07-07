const sqlDb = require("mssql/msnodesqlv8");
const settings = require("./settings");

exports.executeSql = function (sql, callback) {
  var conn = new sqlDb.ConnectionPool(settings.dbConfig);
  conn
    .connect()
    .then(function () {
      var req = new sqlDb.Request(conn);
      req
        .query(sql)
        .then(function (recordset) {
          callback(recordset);
        })
        .catch(function (err) {
          callback(null, err);
        });
    })
    .catch(function (err) {
      callback(null, err);
    });
};
