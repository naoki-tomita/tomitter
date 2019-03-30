import * as React from "react";

import { LabeledInput } from "../components/LabeledInput";
import { me } from "../api/Profiles";
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
      <LabeledInput label="display name" value={displayName} onChange={text =>d }/>
      <LabeledInput label="description" value={description}/>
    </>
  );
}
