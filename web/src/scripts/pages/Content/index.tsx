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
  const [value, setValue] = useState("");

  async function send() {
    value && await sendTweet(value);
    setValue("");
    onSend();
  }

  return (
    <Flex>
      <LabeledInput value={value} label="How about you?" onChange={e => setValue(e.target.value)} />
      <Button onClick={send}>tweet</Button>
    </Flex>
  );
}

type TweetData = string;

interface AllContentProps {
  parentPath: string,
  tweets: TweetData[]
}

const AllContent: React.FunctionComponent<AllContentProps> = ({ parentPath, tweets }) => {
  return (
    <ListContainer>
      {tweets.map((value, key) => (
        <ListItem key={key}>
          <Link to={`${parentPath}/${key}`} style={{ textDecoration: "none" }}>
            <Content>{value}</Content>
          </Link>
        </ListItem>
      ))}
    </ListContainer>
  );
}

interface ContentProps {
}

const TweetContents = styled.div`
  background-color: #eee;
  border-radius: 12px;
  padding: 12px;
  color: black;
  margin-bottom: 8px;
`;

const Content: React.FunctionComponent<ContentProps> = ({ children }) => {
  return <TweetContents>{children}</TweetContents>;
}

export const ContentPage: React.ComponentType<RouteComponentProps<{}>> = ({ match }) => {
  const [ tweets, setTweets ] = useState([]);

  async function fetchTweets() {
    try {
      const tweets = await me();
      setTweets(tweets);
    } catch (e) {}
  }

  useEffect(() => { fetchTweets() }, []);

  return (
    <>
      <Tweet onSend={fetchTweets} />
      <Route exact path={`${match.url}`} component={({ match }) => <AllContent parentPath={match.url} tweets={tweets} />} />
      <Route path={`${match.url}/:id`} component={({ match }) => <Content>{tweets[match.params.id]}</Content>} />
    </>
  );
}
