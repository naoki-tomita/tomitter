import * as React from "react";
import { LabelAndValue } from "../components/LabelAndValue";
import { Button } from "../elements/Button";
import { create, me, list, profile } from "../api/Profiles";
import { LabeledInput } from "../components/LabeledInput";
const { useState } = React;

export const Profile: React.FunctionComponent = () => {
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(0);

  async function createProfile() {
    await create(displayName, description);
    await myProfile();
  }

  async function myProfile() {
    const profile = await me();
    setDisplayName(profile.displayName);
    setDescription(profile.description);
  }

  async function specifiedProfile(userId: number) {
    const fetchedProfile = await profile(userId);
    setDisplayName(fetchedProfile.displayName);
    setDescription(fetchedProfile.description);
  }

  return (
    <>
      <LabeledInput
        label="displayName"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <LabeledInput
        label="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <LabeledInput
        label="userId"
        value={userId.toString()}
        onChange={(e) => setUserId(parseInt(e.target.value, 10))}
      />
      <LabelAndValue label="id" value={displayName}/>
      <LabelAndValue label="id" value={description}/>
      <Button onClick={() => createProfile()}>create</Button>
      <Button onClick={async () => myProfile()}>me</Button>
      <Button onClick={async () => specifiedProfile(userId)}>id</Button>
    </>
  );
}
