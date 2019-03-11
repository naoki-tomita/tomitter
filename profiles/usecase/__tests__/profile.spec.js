jest.mock("../../gateway/profiles");
jest.mock("../../gateway/users");
const { User } = require("../../domain/users");
const { Profile, Profiles } = require("../../domain/profiles");
const { getIdentifiedUser } = require("../../gateway/users");
const { create: createProfile, findByUserId } = require("../../gateway/profiles");
const { create, findByCookie } = require("../profile");

describe("usecase test.", () => {
  describe("#create", () => {
    it("should create", async () => {
      const profile = new Profile(1, 1, "foo", "bar");
      createProfile.mockReturnValue(profile);
      expect(await create(1, "foo", "bar"));
      expect(createProfile).toBeCalledWith(new Profile(null, 1, "foo", "bar"));
    });
  });

  describe("#findByCookie", () => {
    it("should find profile.", async () => {
      const user = new User(0, "foo");
      const cookie = "cookie";
      const profile = new Profile(0, 0, "foo", "bar");

      getIdentifiedUser.mockReturnValue(user);
      findByUserId.mockReturnValue(profile);

      expect(await findByCookie(cookie)).toEqual(profile);
      expect(getIdentifiedUser).toBeCalledWith(cookie);
      expect(findByUserId).toBeCalledWith(user);
    });
  });
});
