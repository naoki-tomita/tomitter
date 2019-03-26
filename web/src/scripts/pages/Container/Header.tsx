import * as React from "react";
import styled from "styled-components";
import { Input } from "../../elements/Input";
import { Link } from "react-router-dom";
import { Profile } from "../Profile";
import { MiniProfile } from "./MiniProfile";
const { useState } = React;

const TitleEl = styled.div`
  font-weight: bold;
  font-size: 32px;
  padding: 0 12px;
  font-family: 'Baloo Chettan', cursive;
  background-color: #fff;
  border-radius: 40px;
  color: #000;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 3px 3px #ccc;
  }
`;

const Flex1 = styled.div`
  flex: 1;
`;

const Flex1Right = styled(Flex1)`
  display: flex;
  justify-content: flex-end;
`;

const Flex3 = styled.div`
  flex: 3;
`;

const TitleWrap = styled(Flex1)`
  display: flex;
`;

const Title = () => {
  return (
    <TitleWrap>
      <Link to="/app/content" style={{ textDecoration: "none" }}>
        <TitleEl>Tomitter</TitleEl>
      </Link>
    </TitleWrap>
  );
};

interface Props {
}

const Margin = styled.div`
  margin: 0px 16px;
`;

const Search = () => {
  return (
    <Flex3>
      <Margin>
        <Input onChange={() => ({})} placeholder="Search"/>
      </Margin>
    </Flex3>
  );
}

const Background = styled.div`
  position: fixed;
  background-color: #eee;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 6px 0px 6px #aaa;
`;

const FlexWrap = styled.div`
  position: relative;
  display: flex;
  width: 768px;
  height: 60px;
  margin: auto;
  justify-content: space-between;
  align-items: center;
`;

const MenuBox = styled.div`
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

const Menu = styled.div`
  position: absolute;
  padding: 16px;
  top: 56px;
  right: 0;
  box-shadow: 0 4px 6px #999;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const MenuContent: React.FunctionComponent<{ onClose: () => void; }> = ({ onClose }) => {
  return (
    <>
      <Backdrop onClick={onClose}/>
      <Menu>
        <MiniProfile />
        <Link
          to="/app/profile"
          style={{ textDecoration: "none" }}
          onClick={onClose}
        >
          プロフィールを編集
        </Link>
      </Menu>
    </>
  );
}

const ProfileMenu = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <Flex1Right>
      <MenuBox onClick={() => setIsShow(true)}/>
      { isShow && <MenuContent onClose={() => setIsShow(false)}/> }
    </Flex1Right>
  );
}

export const Header: React.FunctionComponent<Props> = () => {
  return (
    <Background>
      <FlexWrap>
        <Title />
        <Search />
        <ProfileMenu />
      </FlexWrap>
    </Background>
  );
};
