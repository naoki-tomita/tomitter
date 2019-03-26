import * as React from "react";
import styled from "styled-components";
import { me } from "../../api/Profiles";
const { useEffect, useState } = React;

const DisplayName = styled.div`
  color: #888;
`;

const Description = styled.div`
  color: #888;
`;

interface State {
  displayName: string;
  description: string;
}

export const MiniProfile = () => {
  const [state, setState] = useState<State>({
    displayName: "",
    description: "",
  });
  const { displayName, description } = state;

  async function fetchProfile() {
    const { displayName, description } = await me();
    setState({
      ...state,
      displayName,
      description,
    });
  }

  useEffect(() => { fetchProfile(); }, [])

  return (
    <>
      <DisplayName>なまえ: {displayName}</DisplayName>
      <Description>プロフィール: {description}</Description>
    </>
  );
}
