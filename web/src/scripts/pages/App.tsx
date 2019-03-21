import * as React from "react";
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";

import { LoginPage } from "./Login";
import { Profile as ProfilePage } from "./Profile";
import { Container } from "./Container";
import { ContentPage } from "./Content";
import { GlobalStateProvider } from "../Store";
import { GlobalStyle } from "../Style";

interface State {
  isLoggedIn: boolean;
}

export const App = () => {
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
