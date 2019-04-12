import * as React from "react";
import styled from "styled-components";
import { RouteComponentProps, Link, Route, match } from "react-router-dom";
import { LabeledInput } from "../../../components/LabeledInput";
import { t } from "../../../utils/I18n";
import { Button } from "../../../elements/Button";
import { send, userTweet } from "../../../api/Tweets";
const { useState, useEffect } = React;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface Props {
  userId: string;
}

const ListContainer = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ListItem = styled.li`
  padding: 0;
  margin: 0;
`;

const TweetContent = styled.div`
  background-color: #eee;
  border-radius: 12px;
  padding: 12px;
  color: black;
  margin-bottom: 8px;
  transition: 0.3s;

  &:hover {
    box-shadow: 0px 2px 3px #bbb;
  }
`;

export const TweetList: React.FunctionComponent<Props> = ({ userId }) => {
  const [ tweets, setTweets ] = useState<string[]>([]);

  async function fetchTweet() {
    const tweets = await userTweet(userId);
    setTweets(tweets);
  }

  useEffect(() => { fetchTweet() }, []);

  return (
    <ListContainer>
    {tweets.map((t, i) => <ListItem key={i}><TweetContent>{t}</TweetContent></ListItem>)}
    </ListContainer>
  );
}
