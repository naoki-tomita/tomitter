const { FCC } = require("../domain/fcc");

exports.User = class User {
  constructor(id, loginName) {
    this.id = id;
    this.loginName = loginName;
  }

  static from(object) {
    const { id, loginName } = object;
    return new User(id, loginName);
  }
}

exports.Users = class Users extends FCC {}
