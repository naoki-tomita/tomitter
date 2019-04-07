import { FCC } from "./FCC";
import { Id } from "./Id";
import { Name } from "./Name";

export class User {
  id: Id;
  loginName: Name;
  constructor(id: Id, loginName: Name) {
    this.id = id;
    this.loginName = loginName;
  }

  static from(object: {
    id: number;
    loginName: string;
  }) {
    const { id, loginName } = object;
    return new User(new Id(id), new Name(loginName));
  }
}

export class Users extends FCC<User> {}
