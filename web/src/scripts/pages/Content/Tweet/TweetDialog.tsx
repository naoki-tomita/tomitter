import * as React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Backdrop = styled.div`
  position: fixed;
  background-color: rgba(1, 1, 1, 0.3);
  top: -100px; bottom: -100px; right: -100px; left: -100px;
`;

const Dialog = styled.div`
  position: fixed;
  height: 200px;
  width: 420px;
  background-color: white;
  top: 0; bottom: 0; right: 0; left: 0;
  margin: 200px auto;
  padding: 16px;
  border-radius: 12px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 48px;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  outline: none;
  transition: 0.2s;

  &:hover {
    box-shadow: 0px 2px 4px #888;
  }

  &:active {
    background-color: #ddd;
  }
`;

interface Props {
  title?: string;
  onClose: () => void;
}

export const TweetDialog: React.FunctionComponent<Props> = ({ title, children, onClose }) => {
  return (
    <>
      <Backdrop onClick={onClose}/>
      <Dialog>
        <Header>
          <div>{title}</div>
          <CloseButton onClick={onClose}>
            <FontAwesomeIcon icon="times" />
          </CloseButton>
        </Header>
        {children}
      </Dialog>
    </>
  );
}
