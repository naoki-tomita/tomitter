import { list as userList } from "./Users";
import { list as profileList } from "./Profiles";

export interface UserComposite {
  id: number;
  displayName: string;
  description: string;
}

export async function list(): Promise<UserComposite[]> {
  const [{ users }, { profiles }] = await Promise.all([userList(), profileList()]);
  return users.map<UserComposite>(user => {
    const profile = profiles.find(profile => profile.userId === user.id);
    return {
      id: user.id,
      displayName: profile ? profile.displayName : user.loginName,
      description: profile ? profile.description : "",
    };
  });
}
