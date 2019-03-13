import * as React from "react"
import { Foldable, Input } from "../elements/Input";
import styled from "styled-components";
const { useState } = React;

const Margin8 = styled.div`
  margin: 8px 0;
`;

const PaddingLeft6 = styled.div`
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
    <Margin8>
      <PaddingLeft6>
        <Foldable isFold={(hasFocused || !!value)}>{label}</Foldable>
      </PaddingLeft6>
      <Input
        placeholder={label}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </Margin8>
  );
};
