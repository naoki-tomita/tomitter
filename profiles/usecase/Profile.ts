import { inject } from "omusubi";

import { Cookie } from "../domain/cookie";
import { Name } from "../domain/Name";
import { Id } from "../domain/Id";
import { ProfilePort } from "../port/ProfilePort";
import { UsersPort } from "../port/UsersPort";
import { Profile, Description } from "../domain/Profiles";
import { ProfileNotFoundError, UserNotFoundError } from "../domain/errors";

export class ProfileUsecase {

  @inject(ProfilePort)
  profilePort!: ProfilePort;

  @inject(UsersPort)
  usersPort!: UsersPort;

  async create(cookie: Cookie, displayName: Name, description: Description) {
    const user = await this.usersPort.getIdentifiedUser(cookie);
    if (!user) {
      throw Error("user not found.");
    }
    return await this.profilePort.create(new Profile(new Id(-1), user.id, displayName, description));
  }

  async findByUserId(userId: Id) {
    const profile = await this.profilePort.findByUserId(userId);
    if (!profile) {
      throw new ProfileNotFoundError(`Profile for ${userId.value} is not found.`);
    }
    return profile;
  }

  async findByCookie(cookie: Cookie) {
    const user = await this.usersPort.getIdentifiedUser(cookie);
    if (!user) {
      throw new UserNotFoundError();
    }
    const profile = await this.profilePort.findByUserId(user.id);
    if (!profile) {
      throw new ProfileNotFoundError(`Profile not found by userId: ${user.id}`);
    }
    return profile;
  }

  async list() {
    return await this.profilePort.list();
  }
}
