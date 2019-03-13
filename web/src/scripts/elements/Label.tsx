import styled from "styled-components";

export const Label = styled.div`
  font-size: 16px;
  color: #ccc;

  &::after {
    content: ": "
  }
`

export const Value = styled.div`
  font-size: 16px;
  color: #ccc;
`;
