import * as React from "react";
import { Login } from "./Login";
import { Profile } from "./Profile";
import { Container } from "./Container";
const { useState } = React;

interface State {
  isLoggedIn: boolean;
}

export const App = () => {
  const [state, setState] = useState<State>({ isLoggedIn: false });
  const { isLoggedIn } = state;
  function onLoggedIn() {
    setState({ ...state, isLoggedIn: true });
  }

  return (
    <Container>
      {!isLoggedIn ?
        <Login onLoggedIn={onLoggedIn}/> :
        <Profile/>}
    </Container>
  );
};
