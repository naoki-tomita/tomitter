import * as React from "react";
import styled from "styled-components";

import { create, login, identify } from "../api/Users";
import { LabeledInput } from "../components/LabeledInput";
import { Button } from "../elements/Button";
import console = require("console");
const { useState, useEffect } = React;

interface State {
  loginName: string;
  password: string;
  failedToLogin: boolean;
  failedToCreate: boolean;
}

const Flex = styled.div`
  display: flex;
`;

export const Login: React.FunctionComponent<{
  onLoggedIn: () => void;
}> = ({ onLoggedIn }) => {
  const [state, setState] = useState<State>({
    loginName: "",
    password: "",
    failedToLogin: false,
    failedToCreate: false,
  });
  const { loginName, password } = state;

  async function createUser() {
    try {
      await create(loginName, password);
      setState({ ...state, loginName: "", password: "" });
    } catch (e) {
      setState({ ...state, failedToCreate: true });
    }
  }

  async function loginUser() {
    try {
      await login(loginName, password);
      setState({ ...state, loginName: "", password: "" });
      onLoggedIn();
    } catch (e) {
      setState({ ...state, failedToLogin: true });
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await identify();
        onLoggedIn();
      } catch (e) {}
    })();
  });

  return (
    <>
      <LabeledInput
        label="login name"
        value={loginName}
        onChange={({ target }) =>
          setState({ ...state, loginName: target.value })}
      />
      <LabeledInput
        label="password"
        value={password}
        type="password"
        onChange={({ target }) =>
          setState({ ...state, password: target.value })}
      />
      <Flex>
        <Button onClick={createUser}>create</Button>
        <Button onClick={loginUser}>login</Button>
      </Flex>
    </>
  );
}
