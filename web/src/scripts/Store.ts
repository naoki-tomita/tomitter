import { createGlobalState } from "react-hooks-global-state";

interface User {
  id: number;
  loginName: string;
}

export interface GlobalState {
  isLoggedIn: boolean;
  userInfo?: User;
}

export const { GlobalStateProvider, useGlobalState } = createGlobalState<GlobalState>({
  isLoggedIn: false,
  userInfo: null,
});
