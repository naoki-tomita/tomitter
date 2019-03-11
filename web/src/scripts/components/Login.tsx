import * as React from "react";
import { create, login } from "../api/Users";
const { useState } = React;

export const Login = () => {
  const [loginName, setLoginName] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div>
        login name:
        <input value={loginName} onChange={(x) => setLoginName((x.target as HTMLInputElement).value)}/>
      </div>
      <div>
        password:
        <input value={password} onChange={(x) => setPassword((x.target as HTMLInputElement).value)} type="password"/>
      </div>
      <div>
        <button onClick={() => create(loginName, password)}>create</button>
        <button onClick={() => login(loginName, password)}>login</button>
      </div>
    </>
  );
}
