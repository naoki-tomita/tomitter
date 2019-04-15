import * as React from "react";
import { RouteComponentProps, Route, Redirect, match } from "react-router-dom";
import { UserTweetPage } from "./Tweet";
import console = require("console");
import { useGlobalState } from "../../Store";

export const ContentPage: React.ComponentType<RouteComponentProps> = ({ match }) => {
  const [ user ] = useGlobalState("user");
  return (
    <>
      <Route
        path={match.path} exact
        component={() => <Redirect to={`${match.path}/tweets`}/>}
      />
      <Route
        path={`${match.path}/tweets`} exact
        component={() =>
          <UserTweetPage match={match} userId={user.id.toString()} />}
      />
      <Route
        path={`${match.path}/users/:id/tweets`}
        component={({ match }: { match: match<{id: string}>}) =>
          <UserTweetPage match={match} userId={match.params.id}/>}
      />
    </>
  );
}

type Foo = string | number;
interface Bar {
  x: string;
  y: number;
}

const UsersPage: React.ComponentType<RouteComponentProps> = ({ match }) => {
  return (
    <>
    <Route
      path={`${match.path}/:id`} exact
      component={() => <Redirect to={`${match.path}/users`}/>}
    />
    <Route
      path={`${match.path}/:id`} exact
    />
    </>
  );
}
