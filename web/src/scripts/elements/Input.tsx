import styled from "styled-components";

export const Foldable = styled.div<{ isFold: boolean }>`
  max-height: ${({ isFold }) => isFold ? "30px": "0"};
  overflow: hidden;
  transition: 0.3s;
`;

export const Input = styled.input`
  display: block;
  border-radius: 16px;
  border: solid 1px #AAA;
  outline: none;
  padding: 4px 8px;
  font-size: 16px;
  transition: 0.2s;

  &:hover, &:focus {
    box-shadow: 0px 2px 4px #888;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;
