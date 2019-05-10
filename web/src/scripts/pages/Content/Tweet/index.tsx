import * as React from "react";
import { match } from "react-router-dom";
import { TweetBox } from "./TweetBox";
import { TweetList } from "./TweetList";
import { send, Tweet, userTweet } from "../../../api/Tweets";
import { TweetDialog } from "./TweetDialog";
const { useState, useEffect } = React;

interface MyTweetState {
  tweetText: string,
  tweets: Tweet[],
  selectedTweetId: number;
}

interface UserTweetState {
  tweets: Tweet[];
  selectedTweetId: number;
}

export const MyTweetPage: React.FunctionComponent = () => {
  const [ state, setState ] = useState<MyTweetState>({ tweetText: "", tweets: [], selectedTweetId: -1 });
  const { tweetText, tweets, selectedTweetId } = state;

  let fetchCancel = false;
  async function fetchTweets() {
    const tweets = await userTweet("me");
    fetchCancel || setState({ ...state, tweets });
  }

  async function sendTweet() {
    tweetText && await send(tweetText);
    const tweets = await userTweet("me");
    setState({ ...state, tweets, tweetText: "" });
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

export const UserTweetPage: React.FunctionComponent<{ match: match; userId: string; }> = ({ userId }) => {
  const [ state, setState ] = useState<UserTweetState>({ tweets: [], selectedTweetId: -1 });
  const { tweets, selectedTweetId } = state;

  let fetchCancel = false;
  async function fetchTweets() {
    const tweets = await userTweet(userId);
    fetchCancel || setState({ ...state, tweets });
  }

  useEffect(() => (fetchTweets(), function() { fetchCancel = true; }), []);

  return (
    <>
      <TweetList onSelect={id => setState({ ...state, selectedTweetId: id })} tweets={tweets}/>
      {selectedTweetId > -1 && <TweetDialog onClose={() => setState({ ...state, selectedTweetId: -1 })}>{tweets[selectedTweetId]}</TweetDialog>}
    </>
  );
}
