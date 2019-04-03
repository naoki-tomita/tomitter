import * as React from "react";

import { LabelAndValue } from "../components/LabelAndValue";
import { me, create } from "../api/Profiles";
import { t } from "../utils/I18n";
import { LabeledInput } from "../components/LabeledInput";
import { Button } from "../elements/Button";
import styled from "styled-components";
import { useGlobalState } from "../Store";
const { useState, useEffect } = React;

interface State {
  displayName: string;
  description: string;
}

const Right = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Profile: React.FunctionComponent = () => {
  const [state, setState] = useState<State>({ displayName: "", description: "" });
  const [profile, setProfile] = useGlobalState("profile");
  const { displayName, description } = state;

  async function fetchProfile() {
    const { displayName, description } = await me();
    setState({ displayName, description });
  }

  async function updateProfile() {
    await create(displayName, description);
    setProfile({
      ...profile,
      displayName,
      description,
    });
  }

  useEffect(() => { fetchProfile(); }, [])

  return (
    <>
      <LabeledInput label={t("profile.displayName")} value={displayName} onChange={displayName => setState({ ...state, displayName })}/>
      <LabeledInput label={t("profile.description")} value={description} onChange={description => setState({ ...state, description })}/>
      <Right><Button onClick={() => updateProfile()}>{t("common.change")}</Button></Right>
    </>
  );
}
