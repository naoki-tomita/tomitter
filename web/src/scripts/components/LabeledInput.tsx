import * as React from "react"
import { Foldable, Input } from "../elements/Input";
import styled from "styled-components";
const { useState } = React;

const Margin = styled.div`
  margin: 8px 0;
  width: 100%;
`;

const PaddingLeft = styled.div`
  padding-left: 8px;
`;

export const LabeledInput: React.FunctionComponent<{
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, type, value, onChange }) => {
  const [hasFocused, setFocused] = useState(false);
  return (
    <Margin>
      <PaddingLeft>
        <Foldable isFold={(hasFocused || !!value)}>{label}</Foldable>
      </PaddingLeft>
      <Input
        placeholder={label}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </Margin>
  );
};
