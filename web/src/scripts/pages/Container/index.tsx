import * as React from "react";
import { Header } from "./Header";

export const Container: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Header></Header>
      {children}
    </>
  );
};
