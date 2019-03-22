import * as React from "react";
import styled from "styled-components";
import { isNull } from "util";

const Backdrop = styled.div`
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  transition: 0.5s;
`;

const Absolute = styled.div<{
  width: number;
  height: number;
}>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  padding: 24px;
  background-color: #fff;
  border-radius: 16px;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 8px 8px #777;
  transition: 0.5s;
`;

interface Props {
  isShow: boolean;
  onClose?: () => void;
}

export const Dialog: React.FunctionComponent<Props> = ({ isShow, children, onClose }) => {
  return isShow ? (
    <>
      <Backdrop onClick={onClose}/>
      <Absolute width={600} height={400}>
        {children}
      </Absolute>
    </>
  ) : null;
}
