import * as React from "react";
import { create, login } from "../api/Users";
import { Input } from "../elements/Input";
const { useState } = React;

export const Login = () => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div>
        login name:
        <Input
          value={loginName}
          onChange={
            (x: React.ChangeEvent<HTMLInputElement>) => setLoginName(x.target.value)
          }
        />
      </div>
      <div>
        password:
        <Input
          value={password}
          type="password"
          onChange={
            (x: React.ChangeEvent<HTMLInputElement>) => setPassword(x.target.value)
          }
        />
      </div>
      <div>
        <button onClick={() => create(loginName, password)}>create</button>
        <button onClick={() => login(loginName, password)}>login</button>
      </div>
    </>
  );
}
