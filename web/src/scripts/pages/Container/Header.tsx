import * as React from "react";
import styled from "styled-components";
import { Input } from "../../elements/Input";
import { Mode } from "../../Types";
import { Link } from "react-router-dom";

const TitleEl = styled.div`
  margin-left: 8px;
  font-weight: bold;
  font-size: 32px;
  padding: 0 12px;
  margin: 4px;
  font-family: 'Baloo Chettan', cursive;
  background-color: #fff;
  border-radius: 40px;
  color: black;
  text-decoration: none;
`;

const Title = () => {
  return (
    <TitleEl>Tomitter</TitleEl>
  );
};

interface Props {
  isLoggedIn: boolean;
}

const Margin = styled.div`
  margin: 0px 16px;
`;

const Search = () => {
  return (
    <Margin>
      <Input onChange={() => ({})} placeholder="Search"/>
    </Margin>
  );
}

const Square = styled.div`
  width: 40px;
  height: 40px;
  margin: 4px;
  background-color: #ccc;
  border: solid 1px #bbb;
  transition: 0.3s;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 2px 3px #aaa;
  }
`;

const ProfileMenu = () => {
  return (
    <Square/>
  );
}

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Background = styled(Flex)`
  background-color: #eee;
  border: 1px solid #bbb;
`;

export const Header: React.FunctionComponent<Props> = ({ isLoggedIn }) => {
  return (
    <Background>
      <Flex>
        <Link to="/app/content" style={{ textDecoration: "none" }}>
          <Title />
        </Link>
        <Search />
      </Flex>
      <Flex>
        <Link to="/app/profile">
          <ProfileMenu />
        </Link>
      </Flex>
    </Background>
  );
};
