import { register } from "omusubi";

import { ProfileResource } from "./rest/Profile";
import { ProfilePort } from "./port/ProfilePort";
import { ProfileGateway } from "./gateway/ProfileGateway";
import { ProfileUsecase } from "./usecase/profile";
import { UsersGateway } from "./gateway/UsersGateway";
import { UsersPort } from "./port/UsersPort";
import { ProfileDriver } from "./driver/ProfileDriver";
import { UsersDriver } from "./driver/UserDriver";

async function main() {
  register(new ProfileGateway()).as(ProfilePort);
  register(new ProfileUsecase()).as(ProfileUsecase);
  register(new UsersGateway()).as(UsersPort);
  const profileDriver = new ProfileDriver();
  await profileDriver.init();
  register(profileDriver).as(ProfileDriver);
  register(new UsersDriver()).as(UsersDriver);

  new ProfileResource().listen();
}

main();
