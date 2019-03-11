const { Database } = require("sqlite3");
const db = new Database("./data.db");

exports.exec = function exec(sql) {
  return new Promise((ok, ng) => {
    db.exec(sql, e => {
      e && ng(e) || ok();
    })
  });
}

exports.get = function get(sql) {
  return new Promise((ok, ng) => {
    db.get(sql, (e, row) => {
      e && ng(e) || ok(row);
    });
  });
}

exports.all = function all(sql) {
  return new Promise((ok, ng) => {
    db.all(sql, (e, rows) => {
      e && ng(e) || ok(rows);
    });
  });
}
