import * as React from "react";
import styled from "styled-components";
import { Input } from "../../elements/Input";
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
  transition: 0.3s;

  &:hover {
    box-shadow: 0 3px 3px #ccc;
  }
`;

const Title = () => {
  return (
    <TitleEl>Tomitter</TitleEl>
  );
};

interface Props {
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

const Background = styled.div`
  height: 60px;
  position: fixed;
  background-color: #eee;
  left: 0;
  right: 0;
  box-shadow: 6px 0px 6px #aaa;
`;

const HeaderSpace = styled(Flex)`
  width: 768;
  margin: 0 auto;
`;

export const Header: React.FunctionComponent<Props> = () => {
  return (
    <Background>
      <HeaderSpace>
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
      </HeaderSpace>
    </Background>
  );
};
