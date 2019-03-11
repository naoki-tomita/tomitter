jest.mock("../../driver/database");
const { Profile, Profiles } = require("../../domain/profiles");
const { init, create, list, findById, findByUserId } = require("../profiles");
const { get, all, exec } = require("../../driver/database");

describe("profile test", () => {
  describe("#init", () => {
    it("should exec create table query.", async () => {
      await init();
      expect(exec).toHaveBeenCalledTimes(1);
    });
  });

  describe("#create", () => {
    it("should create and returns Profile object.", async () => {
      get.mockReturnValue({ id: 1, user_id: 5, display_name: "foo", description: "bar" });
      expect(await create(5, "foo", "bar")).toEqual(new Profile(1, 5, "foo", "bar"));
    });
  });

  describe("#list", () => {
    it("should return Profiles.", async () => {
      all.mockReturnValue([
        { id: 1, user_id: 5, display_name: "foo", description: "bar" },
        { id: 2, user_id: 6, display_name: "hoge", description: "fuga" },
      ]);
      expect(await list()).toEqual(new Profiles([
        new Profile(1, 5, "foo", "bar"),
        new Profile(2, 6, "hoge", "fuga"),
      ]));
    });
  });

  describe("#findById", () => {
    it("should return found profile.", async () => {
      get.mockReturnValue({ id: 1, user_id: 5, display_name: "foo", description: "bar" });
      expect(await findById(1)).toEqual(new Profile(1, 5, "foo", "bar"));
    });
  });
});
