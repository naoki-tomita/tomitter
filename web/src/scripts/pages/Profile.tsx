import * as React from "react";

import { LabelAndValue } from "../components/LabelAndValue";
import { me } from "../api/Profiles";
import { t } from "../utils/I18n";
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
      <LabelAndValue label={t("profile.displayName")} value={displayName}/>
      <LabelAndValue label={t("profile.description")} value={description}/>
    </>
  );
}
