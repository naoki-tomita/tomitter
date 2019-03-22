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

interface Props {
  label: string;
  type?: string;
  value: string;
  onChange: (text: string) => void;
  onEnter?: () => void;
}

export const LabeledInput: React.FunctionComponent<Props>= ({ label, type, value, onChange }) => {
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
        onChange={e => (onChange(e.target.value))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </Margin>
  );
};
