import * as React from "react"
import styled from "styled-components";

export const LabeledInput: React.FunctionComponent<{
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, type, value, onChange }) => {
  return (
    <>
      <div>{label}</div>
      <Input
        placeholder={label}
        type={type}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export const Input = styled.input`
  display: block;
  border-radius: 15px;
  border: solid 1px #AAA;
  outline: none;
  padding: 4px 8px;

  &:hover, &:focus {
    box-shadow: 0px 2px 4px #888;
  }
`;
