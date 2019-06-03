import * as React from "react";
import { Link } from "react-router-dom";
import { UserComposite, list } from "../../../api/Composite";
import styled from "styled-components";
import { useGlobalState } from "../../../Store";
import { Button } from "../../../elements/Button";
import { t } from "../../../utils/I18n";
import { addLinks, getLinks } from "../../../api/Links";
const { useState, useEffect } = React;

const Lists = styled.ul`
  list-style: none;
`;

const List = styled.li`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InnerButton = styled(Button)`
  display: inline;
`;

export const UserPage = () => {
  const [profiles, setProfiles] = useState<UserComposite[]>([]);
  const [user] = useGlobalState("user");
  const [links, setLinks] = useGlobalState("links");

  async function fetchUsers() {
    const profiles = await list();
    setProfiles(profiles);
  }

  async function setLink(id: number) {
    await addLinks(id);
    const { links } = await getLinks();
    setLinks(links);
  }

  useEffect(() => { fetchUsers() }, []);

  return (
    <Lists>
    {profiles.map(profile =>
        <List key={profile.id}>
          <Link to={`${location.pathname}/${profile.id}`}>{profile.displayName}</Link>
          {profile.id !== user.id &&
            !links.find(link => profile.id === link.id) &&
            <InnerButton onClick={() => setLink(profile.id)}>
              {t("users.link")}
            </InnerButton>}
        </List>)}
    </Lists>
  );
}
