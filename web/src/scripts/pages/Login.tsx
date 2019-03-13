import * as React from "react";
import { create, login, identify } from "../api/Users";
import { LabeledInput } from "../components/LabeledInput";
import { Button } from "../elements/Button";
const { useState } = React;

export const Login = () => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <LabeledInput
        label="login name"
        value={loginName}
        onChange={
          (x: React.ChangeEvent<HTMLInputElement>) => setLoginName(x.target.value)
        }
      />
      <LabeledInput
        label="password"
        value={password}
        type="password"
        onChange={
          (x: React.ChangeEvent<HTMLInputElement>) => setPassword(x.target.value)
        }
      />
      <div>
        <Button onClick={() => create(loginName, password)}>create</Button>
        <Button onClick={() => login(loginName, password)}>login</Button>
        <Button onClick={
          async () => {
            const user = await identify()
            alert(JSON.stringify(user));
          }
        }>identify</Button>
      </div>
    </>
  );
}
