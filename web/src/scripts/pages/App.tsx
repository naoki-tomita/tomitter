import * as React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginPage } from "./Login";
import { Profile as ProfilePage } from "./Profile";
import { Container } from "./Container";
import { ContentPage } from "./Content";
import { GlobalStateProvider, useGlobalState } from "../Store";
import { GlobalStyle } from "../Style";
import { identify } from "../api/Users";
import { me } from "../api/Profiles";
import { getLinks } from "../api/Links";
const { useEffect } = React;

export const App = () => {
  const [ , setUser ] = useGlobalState("user");
  const [ , setProfile ] = useGlobalState("profile");
  const [ , setLinks ] = useGlobalState("links");

  async function initUser() {
    const user = await identify();
    setUser(user);
    const profile = await me();
    setProfile(profile);
    const { links } = await getLinks();
    setLinks(links);
  }

  useEffect(() => { initUser() }, []);

  return (
    <>
      <GlobalStyle/>
      <GlobalStateProvider>
        <Router>
          <Container>
            <Route path="/app" exact component={() => <Redirect to="/app/content"/>} />
            <Route path="/app/login" component={() => <LoginPage />} />
            <Route path="/app/profile" component={() => <ProfilePage />}/>
            <Route path="/app/content" component={ContentPage}/>
          </Container>
        </Router>
      </GlobalStateProvider>
    </>
  );
};
