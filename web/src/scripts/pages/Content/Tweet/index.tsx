import * as React from "react";
import { match } from "react-router-dom";
import { TweetBox } from "./TweetBox";
import { TweetList } from "./TweetList";
import { send, Tweet, userTweet } from "../../../api/Tweets";
import { TweetDialog } from "./TweetDialog";
const { useState, useEffect } = React;

interface State {
  tweetText: string;
  tweets: Tweet[];
  selectedTweetId: number;
}

export const UserTweetPage: React.FunctionComponent<{ match: match; userId: string; }> = ({ userId }) => {
  const [ state, setState ] = useState<State>({ tweetText: "", tweets: [], selectedTweetId: -1 });
  const { tweetText, tweets, selectedTweetId } = state;

  function sendTweet() {
    tweetText && send(tweetText);
    setState({ ...state, tweetText: "" });
  }

  let fetchCancel = false;
  async function fetchTweets() {
    const tweets = await userTweet(userId);
    fetchCancel || setState({ ...state, tweets });
  }

  useEffect(() => (fetchTweets(), function() { fetchCancel = true; }), []);

  return (
    <>
      <TweetBox
        onSend={sendTweet}
        tweetText={tweetText}
        onTweetTextChange={tweetText => setState({ ...state, tweetText })}
      />
      <TweetList onSelect={id => setState({ ...state, selectedTweetId: id })} tweets={tweets}/>
      {selectedTweetId > -1 && <TweetDialog onClose={() => setState({ ...state, selectedTweetId: -1 })}>{tweets[selectedTweetId]}</TweetDialog>}
    </>
  );
}
