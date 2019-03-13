import * as React from "react";
import styled from "styled-components";

import { Label, Value } from "../elements/Label";

const Flex = styled.div`
  display: flex;
`;

export const LabelAndValue: React.FunctionComponent<{
  label: string;
  value: string;
}> = ({ label, value }) => {
  return (
    <Flex>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Flex>
  );
}
