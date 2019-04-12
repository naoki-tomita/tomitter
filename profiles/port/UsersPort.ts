import { Cookie } from "../domain/cookie";
import { User } from "../domain/users";

export abstract class UsersPort {
  abstract async getIdentifiedUser(cookie: Cookie): Promise<User | undefined>;
}
