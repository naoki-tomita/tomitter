import * as React from "react";
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";

import { LoginPage } from "./Login";
import { Profile as ProfilePage } from "./Profile";
import { Container } from "./Container";
import { ContentPage } from "./Content";
const { useState } = React;

interface State {
  isLoggedIn: boolean;
}

export const App = () => {
  const [state, setState] = useState<State>({
    isLoggedIn: false,
  });
  const { isLoggedIn } = state;
  function onLoggedIn() {
    setState({
      ...state,
      isLoggedIn: true,
    });
  }

  return (
    <Router>
      <Container isLoggedIn={isLoggedIn}>
        <Route path="/app" exact component={() => <Redirect to="/app/content"/>} />
        <Route path="/app/login" component={() => <LoginPage onLoggedIn={onLoggedIn} />} />
        <Route path="/app/profile" component={() => <ProfilePage />}/>
        <Route path="/app/content" component={ContentPage}/>
      </Container>
    </Router>
  );
};
