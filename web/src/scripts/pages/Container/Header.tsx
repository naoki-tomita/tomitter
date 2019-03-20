import * as React from "react";
import styled from "styled-components";

const TitleEl = styled.div`
  font-weight: bold;
  font-size: 32px;
  font-family: 'Baloo Chettan', cursive;
`;

const Title = () => {
  return (
    <TitleEl>Tomitter</TitleEl>
  );
};

export const Header = () => {
  return (
    <>
      <Title />
    </>
  );
};
