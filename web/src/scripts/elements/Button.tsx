import styled from "styled-components";

export const Button = styled.button`
  display: block;
  border: none;
  background-color: #ccc;
  color: #333;
  font-size: 16px;
  border-radius: 4px;
  margin: 4px 4px;
  padding: 4px;
  outline: none;
  word-break: keep-all;

  &:active {
    background-color: #ddd;
  }
`;
