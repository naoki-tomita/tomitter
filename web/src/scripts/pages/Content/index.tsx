import * as React from "react";
import { RouteComponentProps, Route, Redirect, match } from "react-router-dom";
import { UserTweetPage, MyTweetPage } from "./Tweet";
import { useGlobalState } from "../../Store";
import { UserPage } from "./User";

export const ContentPage: React.ComponentType<RouteComponentProps> = ({ match }) => {
  const [ user ] = useGlobalState("user");
  return (
    <>
      <Route
        path={match.path} exact
        component={() => <Redirect to={`${match.path}/tweets`}/>}
      />
      <Route
        path={`${match.path}/users/`}
        component={UsersContentPage}
      />
      <Route
        path={`${match.path}/tweets`} exact
        component={() =>
          <MyTweetPage />}
      />
    </>
  );
}

const UsersContentPage: React.ComponentType<RouteComponentProps> = ({ match }) => {
  return (
    <>
      <Route
        path={`${match.url}/`} exact
        component={() => <UserPage />}
      />
      <Route
        path={`${match.url}/:id`} exact
        component={({ match }: { match: match }) =>
          <Redirect to={`${match.url}/tweets`}/>}
      />
      <Route
        path={`${match.url}/:id/tweets`} exact
        component={({ match }: { match: match<{id: string}>}) =>
          <UserTweetPage match={match} userId={match.params.id}/>}
      />
    </>
  );
}
