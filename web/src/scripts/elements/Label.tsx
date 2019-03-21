import styled from "styled-components";

export const Label = styled.div`
  font-size: 16px;
  color: #666;

  &::after {
    content: ": "
  }
`

export const Value = styled.div`
  padding-left: 4px;
  font-size: 16px;
  color: #666;
`;
