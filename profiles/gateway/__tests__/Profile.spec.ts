import { register } from "omusubi";
import { ProfileGateway } from "../ProfileGateway";
import { ProfileDriver } from "../../driver/ProfileDriver";
import { Profiles, Profile, Description } from "../../domain/Profiles";
import { Id } from "../../domain/Id";
import { Name } from "../../domain/Name";

describe("profile test", () => {
  let profileGateway = new ProfileGateway();
  let profileDriver: ProfileDriver = {
    init: jest.fn(),
    findByUserId: jest.fn(),
    findById: jest.fn(),
    deleteByUserId: jest.fn(),
    create: jest.fn(),
    list: jest.fn(),
  } as unknown as ProfileDriver;

  beforeEach(() => {
    register(profileDriver).as(ProfileDriver);
  })

  describe("#init", () => {
    it("should exec create table query.", async () => {
      await profileGateway.init();
      expect(profileDriver.init).toHaveBeenCalledTimes(1);
    });
  });

  describe("#create", () => {
    it("should create and returns Profile object.", async () => {
      (profileDriver.findByUserId as jest.Mock).mockReturnValue({ id: 1, user_id: 5, display_name: "foo", description: "bar" });
      expect(await profileGateway.create(new Profile(new Id(-1), new Id(5), new Name("foo"), new Description("bar"))))
        .toEqual(new Profile(new Id(1), new Id(5), new Name("foo"), new Description("bar")));
      expect(profileDriver.deleteByUserId).toHaveBeenCalledTimes(1);
      expect(profileDriver.findByUserId).toHaveBeenCalledTimes(1);
    });
  });

  describe("#list", () => {
    it("should return Profiles.", async () => {
      (profileDriver.list as jest.Mock).mockReturnValue([
        { id: 1, user_id: 5, display_name: "foo", description: "bar" },
        { id: 2, user_id: 6, display_name: "hoge", description: "fuga" },
      ]);
      expect(await profileGateway.list()).toEqual(new Profiles([
        new Profile(new Id(1), new Id(5), new Name("foo"), new Description("bar")),
        new Profile(new Id(2), new Id(6), new Name("hoge"), new Description("fuga")),
      ]));
      expect(profileDriver.list).toHaveBeenCalledTimes(1);
    });
  });

  describe("#findById", () => {
    it("should return found profile.", async () => {
      (profileDriver.findById as jest.Mock).mockReturnValue({ id: 1, user_id: 5, display_name: "foo", description: "bar" });
      expect(await profileGateway.findById(new Id(1)))
        .toEqual(new Profile(new Id(1), new Id(5), new Name("foo"), new Description("bar")));
      expect(profileDriver.findById).toHaveBeenCalledTimes(1);
    });
  });
});
