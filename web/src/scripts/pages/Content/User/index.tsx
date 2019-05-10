import * as React from "react";
import { Link } from "react-router-dom";
import { UserComposite, list } from "../../../api/Composite";
const { useState, useEffect } = React;

export const UserPage = () => {
  const [profiles, setProfiles] = useState<UserComposite[]>([]);

  async function fetchUsers() {
    const profiles = await list();
    setProfiles(profiles);
  }

  useEffect(() => { fetchUsers() }, []);

  return (
    <ul>
    {profiles.map(profile =>
      <Link key={profile.id} to={`${location.pathname}/${profile.id}`}>
        <li>{profile.displayName}</li>
      </Link>)}
    </ul>
  );
}
