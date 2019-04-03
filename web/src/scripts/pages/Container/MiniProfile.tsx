import * as React from "react";
import styled from "styled-components";
import { me } from "../../api/Profiles";
import { t } from "../../utils/I18n";
import { useGlobalState } from "../../Store";
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
  const [ profile ] = useGlobalState("profile");
  const { displayName, description } = profile;

  return (
    <>
      <DisplayName>{t("profile.displayName")}: {displayName}</DisplayName>
      <Description>{t("profile.description")}: {description}</Description>
    </>
  );
}
