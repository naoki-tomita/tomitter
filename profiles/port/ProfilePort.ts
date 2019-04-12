import { Profiles, Profile } from "../domain/profiles";
import { Id } from "../domain/Id";

export abstract class ProfilePort {
  abstract async init(): Promise<void>;
  abstract async list(): Promise<Profiles>;
  abstract async findByUserId(userId: Id): Promise<Profile | undefined>;
  abstract async findById(id: Id): Promise<Profile | undefined>;
  abstract async create(profile: Profile): Promise<Profile>;
}
