const { User } = require("../domain/users");
const { identify } = require("../driver/http");
const { UserNotFoundError } = require("../domain/errors");

exports.getIdentifiedUser = async function getIdentifiedUser(cookie) {
  const user = await identify(cookie);
  if (!user) {
    throw new UserNotFoundError("User not found.");
  }
  return User.from(user);
}
