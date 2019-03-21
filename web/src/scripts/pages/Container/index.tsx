import * as React from "react";
import styled from "styled-components";

import { Header } from "./Header";
import { Mode } from "../../Types";

const CenteredContainer = styled.div`
  width: 768px;
  margin: 0 auto;
`;

interface Props {
  isLoggedIn: boolean;
}

export const Container: React.FunctionComponent<Props> = ({ children, isLoggedIn }) => {
  return (
    <CenteredContainer>
      <Header isLoggedIn={isLoggedIn}/>
      {children}
    </CenteredContainer>
  );
};
