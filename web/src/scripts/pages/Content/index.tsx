import * as React from "react";
import styled from "styled-components";
import { RouteComponentProps, Link, Route, match } from "react-router-dom";
import { me } from "../../api/Tweets";
import { TweetBox } from "./Tweet.tsx/TweetBox";
import { TweetContainer } from "./Tweet.tsx";
const { useEffect, useState } = React;

export const ContentPage: React.ComponentType<RouteComponentProps<{}>> = ({ match }) => {
  return (
    <>
      <TweetContainer />
    </>
  );
}
