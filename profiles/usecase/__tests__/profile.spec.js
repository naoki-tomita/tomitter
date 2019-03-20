jest.mock("../../gateway/profiles");
jest.mock("../../gateway/users");
const { when } = require("jest-when");
const { User } = require("../../domain/users");
const { Profile } = require("../../domain/profiles");
const { getIdentifiedUser } = require("../../gateway/users");
const { create: createProfile, findByUserId } = require("../../gateway/profiles");
const { create, findByCookie } = require("../profile");

describe("usecase test.", () => {
  describe("#create", () => {
    it("should create", async () => {
      const cookie = "cookie";
      const profile = new Profile(1, 1, "foo", "bar");
      const user = new User(1, "name");

      when(getIdentifiedUser).calledWith(cookie).mockReturnValue(user);
      createProfile.mockReturnValue(profile);

      expect(await create(cookie, "foo", "bar"));
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
      expect(findByUserId).toBeCalledWith(0);
    });
  });
});
