const { identify } = require("../driver/http");

exports.getIdentifiedUser = async function getIdentifiedUser(cookie) {
  const userObject = await identify(cookie);
  return User.from(userObject);
}
