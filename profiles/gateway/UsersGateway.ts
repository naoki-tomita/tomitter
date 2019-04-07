import { UserNotFoundError } from "../domain/errors";
import { Cookie } from "../domain/cookie";
import { User } from "../domain/users";
import { inject } from "omusubi";
import { UsersDriver } from "../driver/UserDriver";
import { UsersPort } from "../port/UsersPort";

export class UsersGateway implements UsersPort {

  @inject(UsersDriver)
  usersDriver!: UsersDriver;

  async getIdentifiedUser(cookie: Cookie) {
      const user = await this.usersDriver.identify(cookie.value);
      if (!user) {
        throw new UserNotFoundError("User not found.");
      }
      return User.from(user);
  }

}
