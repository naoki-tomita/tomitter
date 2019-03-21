import * as React from "react";
import styled from "styled-components";

import { Header } from "./Header";
import { Mode } from "../../Types";

const CenteredContainer = styled.div`
  width: 768px;
  margin: 0 auto;
`;

const PaddedContent = styled.div`
  padding-top: 68px;
`;

interface Props {
}

export const Container: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <CenteredContainer>
      <Header />
      <PaddedContent>
        {children}
      </PaddedContent>
    </CenteredContainer>
  );
};
