import { inject } from "omusubi";
import { Profiles, Profile } from "../domain/profiles";
import { ProfileDriver } from "../driver/ProfileDriver";
import { ProfileNotFoundError } from "../domain/errors";
import { Id } from "../domain/Id";
import { ProfilePort } from "../port/ProfilePort";

export class ProfileGateway implements ProfilePort {

  @inject(ProfileDriver)
  profileDriver!: ProfileDriver;

  async init() {
    this.profileDriver.init();
  }

  async list() {
    return new Profiles((await this.profileDriver.list()).map(Profile.from));
  }

  async findByUserId(userId: Id) {
    const profile = await this.profileDriver.findByUserId(userId.value);
    return profile ? Profile.from(profile) : undefined;
  }

  async findById(id: Id) {
    const entity = await this.profileDriver.findById(id.value);
    if (!entity) {
      throw new ProfileNotFoundError(`Profile for ${id.value} is not found.`)
    }
    return Profile.from(entity);
  }

  async create(profile: Profile) {
    const { userId, displayName, description } = profile;
    await this.profileDriver.deleteByUserId(userId.value);
    await this.profileDriver.create({
      id: 0,
      user_id: userId.value,
      display_name: displayName.value,
      description: description.value,
    });
    const entitiy = await this.profileDriver.findByUserId(userId.value);

    return Profile.from(entitiy!);
  }

}
