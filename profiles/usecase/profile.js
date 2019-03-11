const { Profile } = require("../domain/profiles");
const { create: createProfile, findByUserId: findProfileByUserId } = require("../gateway/profiles");
const { getIdentifiedUser } = require("../gateway/users");

exports.create = async function create(userId, displayName, description) {
  return await createProfile(new Profile(null, userId, displayName, description));
}

exports.findByUserId = async function findByUserId(userId) {
  return await findProfileByUserId(userId);
}

exports.findByCookie = async function findByCookie(cookie) {
  return await findProfileByUserId(await getIdentifiedUser(cookie));
}
