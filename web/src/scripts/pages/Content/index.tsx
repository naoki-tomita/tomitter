import * as React from "react";
import styled from "styled-components";
import { RouteComponentProps, Link, Route, match } from "react-router-dom";
import { me, send as sendTweet } from "../../api/Tweets";
import { Input } from "../../elements/Input";
import { Button } from "../../elements/Button";
import { LabeledInput } from "../../components/LabeledInput";
const { useEffect, useState } = React;

const ListContainer = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ListItem = styled.li`
  padding: 0;
  margin: 0;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

interface TweetProps {
  onSend: () => void;
}

const Tweet: React.FunctionComponent<TweetProps> = ({ onSend }) => {
  async function send() {
    value && await sendTweet(value);
    onSend();
  }

  const [value, setValue] = useState("");
  return (
    <Flex>
      <LabeledInput value={value} label="How about you?" onChange={e => setValue(e.target.value)} />
      <Button onClick={send}>tweet</Button>
    </Flex>
  );
}

type Tweet = string;

interface AllContentProps {
  match: match,
  tweets: Tweet[]
}

const AllContent: React.FunctionComponent<AllContentProps> = ({ match, tweets }) => {
  return (
    <ListContainer>
      {tweets.map((value, key) => (
        <ListItem key={key}>
          <Link to={`${match.url}/${key}`}>{value}</Link>
        </ListItem>
      ))}
    </ListContainer>
  );
}

interface ContentProps {
  tweet: Tweet;
}

const Content: React.FunctionComponent<ContentProps> = ({ tweet }) => {
  return <div>{tweet}</div>;
}

export const ContentPage: React.ComponentType<RouteComponentProps<{}>> = ({ match }) => {
  const [ tweets, setTweets ] = useState([]);

  async function fetchTweets() {
    const tweets = await me();
    setTweets(tweets);
  }

  useEffect(() => { fetchTweets() }, []);

  return (
    <>
      <Tweet onSend={fetchTweets} />
      <Route exact path={`${match.url}`} component={({ match }) => <AllContent match={match} tweets={tweets} />} />
      <Route path={`${match.url}/:id`} component={({ match }) => <Content tweet={tweets[match.params.id]}/>} />
    </>
  );
}
