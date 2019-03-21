import * as React from "react";
import styled from "styled-components";

import { create, login, identify } from "../api/Users";
import { LabeledInput } from "../components/LabeledInput";
import { Button } from "../elements/Button";
import { Redirect } from "react-router-dom";
import console = require("console");
const { useState, useEffect } = React;

interface State {
  loginName: string;
  password: string;
  failedToLogin: boolean;
  failedToCreate: boolean;
  isLoggedIn: boolean;
}

const Flex = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Centered = styled.div`
  margin-top: 42px;
  display: flex;
  justify-content: center;
`;

interface Props {
  onLoggedIn: () => void;
}

const Login: React.FunctionComponent<Props> = ({ onLoggedIn }) => {
  const [state, setState] = useState<State>({
    loginName: "",
    password: "",
    failedToLogin: false,
    failedToCreate: false,
    isLoggedIn: false,
  });
  const { loginName, password, isLoggedIn } = state;

  async function identifyUser() {
    try {
      await identify();
      setState({ ...state, isLoggedIn: true });
      onLoggedIn();
    } catch (e) {}
  }

  useEffect(() => { identifyUser(); }, []);

  async function createUser() {
    try {
      await create(loginName, password);
      await loginUser();
    } catch (e) {
      setState({ ...state, failedToCreate: true });
    }
  }

  async function loginUser() {
    try {
      await login(loginName, password);
      setState({ ...state, loginName: "", password: "", isLoggedIn: true });
      onLoggedIn();
    } catch (e) {
      setState({ ...state, failedToLogin: true });
    }
  }

  if (isLoggedIn) {
    return <Redirect to="/app" />;
  }

  return (
    <Centered>
      <div>
      <LabeledInput
        label="ID"
        value={loginName}
        onChange={({ target }) =>
          setState({ ...state, loginName: target.value })}
      />
      <LabeledInput
        label="Password"
        value={password}
        type="password"
        onChange={({ target }) =>
          setState({ ...state, password: target.value })}
      />
      <Flex>
        <Button onClick={createUser}>create</Button>
        <Button onClick={loginUser}>login</Button>
      </Flex>
      </div>
    </Centered>
  );
}

export const LoginPage: React.FunctionComponent<Props> = ({ onLoggedIn }) => {
  return <Login onLoggedIn={onLoggedIn} />
}
