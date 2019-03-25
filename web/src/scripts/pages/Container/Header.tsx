import * as React from "react";
import styled from "styled-components";
import { Input } from "../../elements/Input";
import { Link } from "react-router-dom";
import { Profile } from "../Profile";
const { useState } = React;

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

const ProfileMenu: React.FunctionComponent<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <div style={{ position: "relative", right: 0 }}>
      <Square onClick={onClick}/>
    </div>
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

// export const Header: React.FunctionComponent<Props> = () => {
//   const [state, setState] = useState(false);
//   return (
//     <Background>
//       <HeaderSpace>
//         <Flex>
//           <Link to="/app/content" style={{ textDecoration: "none" }}>
//             <Title />
//           </Link>
//           <Search />
//         </Flex>
//           {/* <Link to="/app/profile">
//             <ProfileMenu />
//           </Link> */}
//           <div>
//           <ProfileMenu onClick={() => setState(!state)}/>
//           {state ? <Flex><Menu/></Flex> : null}
//           </div>
//       </HeaderSpace>
//     </Background>
//   );
// };

export const Header: React.FunctionComponent<Props> = () => {
  const [state, setState] = useState(false);
  return (
    // 外枠。色と高さと位置とpositionを指定する
    <div style={{ backgroundColor: "#888", position: "fixed", top: 0, left: 0, right: 0 }}>
      {/* flexの為の内枠。コンテンツと同様に横幅を768pxに設定し、中央寄せにする。
          3分割し、左、真ん中、右でそれぞれ 1:3:1のスペースにする
          */}
      <div style={{
        position: "relative",
        display: "flex",
        width: 768,
        height: 60,
        margin: "auto",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{ flexGrow: 1 }}>
          {/* 幅がタイトルよりも長くなってしまうのでflexすることで、小さくする */}
          {/* <div style={{ display: "flex" }}><Title/></div> */}
        </div>
        <div style={{ flexGrow: 3 }}>
          <Input />
        </div>
        <div style={{ flexGrow: 1 }}>bar</div>
      </div>
    </div>
  );
};

const MenuContainer = styled.div`
  background-color: #fff;
  position: relative;
  width: 100px;
  height: 100px;
  border: solid 1px #bbb;
`;

const Menu = () => {
  return <MenuContainer>Hello?</MenuContainer>
}
