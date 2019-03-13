const { Profile } = require("../domain/profiles");
const {
  create: createProfile,
  findByUserId: findProfileByUserId,
  list,
} = require("../gateway/profiles");
const { getIdentifiedUser } = require("../gateway/users");

exports.create = async function create(cookie, displayName, description) {
  const user = await getIdentifiedUser(cookie);
  if (!user) {
    throw Error("user not found.");
  }
  return await createProfile(new Profile(null, user.id, displayName, description));
}

exports.findByUserId = async function findByUserId(userId) {
  return await findProfileByUserId(userId);
}

exports.findByCookie = async function findByCookie(cookie) {
  return await findProfileByUserId(await getIdentifiedUser(cookie));
}

exports.list = async function() {
  return await list();
}
