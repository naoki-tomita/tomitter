import * as React from "react";
import styled from "styled-components";

import { create, login, identify } from "../api/Users";
import { LabeledInput } from "../components/LabeledInput";
import { Button } from "../elements/Button";
import { Redirect } from "react-router-dom";
import { useGlobalState } from "../Store";
const { useState, useEffect } = React;

interface State {
  loginName: string;
  password: string;
  failedToLogin: boolean;
  failedToCreate: boolean;
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
}

const Login: React.FunctionComponent<Props> = () => {
  const [state, setState] = useState<State>({
    loginName: "",
    password: "",
    failedToLogin: false,
    failedToCreate: false,
  });
  const [ user, setUser ] = useGlobalState("user");
  const { loginName, password } = state;

  async function identifyUser() {
    try {
      const user = await identify();
      setUser(user);
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
      setState({ ...state, loginName: "", password: "" });
      await identifyUser();
    } catch (e) {
      setState({ ...state, failedToLogin: true });
    }
  }

  if (user.id !== -1) {
    return <Redirect to="/app" />;
  }

  return (
    <Centered>
      <div>
      <LabeledInput
        label="ID"
        value={loginName}
        onChange={t =>
          setState({ ...state, loginName: t })}
      />
      <LabeledInput
        label="Password"
        value={password}
        type="password"
        onChange={t =>
          setState({ ...state, password: t })}
      />
      <Flex>
        <Button onClick={createUser}>create</Button>
        <Button onClick={loginUser}>login</Button>
      </Flex>
      </div>
    </Centered>
  );
}

export const LoginPage: React.FunctionComponent<Props> = () => {
  return <Login />
}
