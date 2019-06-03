import { createGlobalState } from "react-hooks-global-state";
import { User } from "./api/Users";
import { Profile } from "./api/Profiles";
import { Link } from "./api/Links";

export interface GlobalState {
  user: User;
  profile: Profile;
  links: Link[];
}

export const { GlobalStateProvider, useGlobalState } = createGlobalState<GlobalState>({
  user: { id: -1, loginName: "" },
  profile: { id: -1, userId: -1, description: "", displayName: "" },
  links: [],
});
