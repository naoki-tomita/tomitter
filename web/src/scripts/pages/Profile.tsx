import * as React from "react";
import { LabelAndValue } from "../components/LabelAndValue";
import { Button } from "../elements/Button";
import { create, me, list, profile } from "../api/Profiles";
import { LabeledInput } from "../components/LabeledInput";
const { useState, useEffect } = React;

interface State {
  displayName: string;
  description: string;
}

export const Profile: React.FunctionComponent = () => {
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
      <LabelAndValue label="display name" value={displayName}/>
      <LabelAndValue label="description" value={description}/>
    </>
  );
}
