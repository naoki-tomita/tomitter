import { FCC } from "./FCC";
import { Id } from "./Id";
import { Name } from "./Name";
import { ProfileEntity } from "../driver/ProfileDriver";

export class Description {
  value: string;
  constructor(value: string) {
    this.value = value;
  }
}

export class Profile {
  id: Id;
  userId: Id;
  displayName: Name;
  description: Name;
  constructor(id: Id, userId: Id, displayName: Name, description: Description) {
    this.id = id;
    this.userId = userId;
    this.displayName = displayName;
    this.description = description;
  }

  static from(entity: ProfileEntity) {
    const { id, user_id, display_name, description } = entity;
    return new Profile(new Id(id), new Id(user_id), new Name(display_name), new Description(description));
  }
}

export class Profiles extends FCC<Profile> {}
