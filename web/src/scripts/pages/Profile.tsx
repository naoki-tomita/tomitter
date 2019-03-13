import * as React from "react";
import { LabelAndValue } from "../components/LabelAndValue";
import { Button } from "../elements/Button";
import { create, me, list, profile } from "../api/Profiles";
import { LabeledInput } from "../components/LabeledInput";
const { useState } = React;

interface State {
  displayNameInput: string;
  descriptionInput: string;
  displayName: string;
  description: string;
  userId: number;
}

export const Profile: React.FunctionComponent = () => {
  const [state, setState] = useState<State>({
    displayNameInput: "",
    descriptionInput: "",
    displayName: "",
    description: "",
    userId: 0,
  });
  const {
    displayNameInput, descriptionInput,
    displayName, description,
    userId,
  } = state;

  async function createProfile() {
    await create(displayNameInput, descriptionInput);
    await myProfile();
  }

  async function myProfile() {
    const { displayName, description } = await me();
    setState({
      ...state,
      displayName,
      description,
    });
  }

  async function specifiedProfile(userId: number) {
    const { displayName, description } = await profile(userId);
    setState({
      ...state,
      displayName,
      description,
    })
  }

  return (
    <>
      <LabeledInput
        label="displayName"
        value={displayNameInput}
        onChange={(e) => setState({ ...state, displayNameInput: e.target.value })}
      />
      <LabeledInput
        label="description"
        value={descriptionInput}
        onChange={(e) => setState({ ...state, descriptionInput: e.target.value })}
      />
      <LabeledInput
        label="userId"
        value={userId.toString()}
        onChange={(e) => setState({ ...state, userId: parseInt(e.target.value, 10) })}
      />
      <LabelAndValue label="id" value={displayName}/>
      <LabelAndValue label="id" value={description}/>
      <Button onClick={() => createProfile()}>create</Button>
      <Button onClick={() => myProfile()}>me</Button>
      <Button onClick={() => specifiedProfile(userId)}>id</Button>
    </>
  );
}
