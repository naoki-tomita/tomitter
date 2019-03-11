const { FCC } = require("./fcc");

exports.Profile = class Profile {
  constructor(id, userId, displayName, description) {
    this.id = id;
    this.userId = userId;
    this.displayName = displayName;
    this.description = description;
  }

  static from(object) {
    const { id, user_id, display_name, description } = object;
    return new Profile(id, user_id, display_name, description);
  }
}

exports.Profiles = class Profiles extends FCC {}
