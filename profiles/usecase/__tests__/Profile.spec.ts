import { register } from "omusubi";
import { when } from "jest-when";

import { ProfileUsecase } from "../Profile";
import { ProfilePort } from "../../port/ProfilePort";
import { UsersPort } from "../../port/UsersPort";
import { Cookie } from "../../domain/Cookie";
import { Id } from "../../domain/Id";
import { Name } from "../../domain/Name";
import { Profile, Description } from "../../domain/Profiles";
import { User } from "../../domain/Users";

describe("usecase test.", () => {
  let profileUsecase = new ProfileUsecase();
  let profilePort: ProfilePort = {
    getIdentifiedUser: jest.fn(),
    findByUserId: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    list: jest.fn(),
  } as unknown as ProfilePort;
  let usersPort: UsersPort = {
    getIdentifiedUser: jest.fn(),
  } as UsersPort;

  beforeEach(() => {
    register(profilePort).as(ProfilePort);
    register(usersPort).as(UsersPort);
  });

  describe("#create", () => {
    it("should create", async () => {
      const cookie = new Cookie("cookie");
      const profile = new Profile(new Id(1), new Id(1), new Name("foo"), new Description("bar"));
      const user = new User(new Id(1), new Name("name"));

      when(usersPort.getIdentifiedUser as jest.Mock).calledWith(cookie).mockReturnValue(user);
      when(profilePort.create as jest.Mock).calledWith().mockReturnValue(profile);

      expect(await profileUsecase.create(cookie, new Name("foo"), new Description("bar")))
        .toEqual(profile);
      expect(profilePort.create)
        .toBeCalledWith(new Profile(new Id(-1), new Id(1), new Name("foo"), new Description("bar")));
    });
  });

  describe("#findByCookie", () => {
    it("should find profile.", async () => {
      const cookie = new Cookie("cookie");
      const user = new User(new Id(0), new Name("foo"));
      const profile = new Profile(new Id(0), new Id(0), new Name("foo"), new Name("bar"));

      when(usersPort.getIdentifiedUser as jest.Mock).calledWith(cookie).mockReturnValue(user);
      when(profilePort.findByUserId as jest.Mock).calledWith().mockReturnValue(profile);

      expect(await profileUsecase.findByCookie(cookie))
        .toEqual(profile);
      expect(usersPort.getIdentifiedUser)
        .toBeCalledWith(cookie);
      expect(profilePort.findByUserId)
        .toBeCalledWith(new Id(0));
    });
  });
});
