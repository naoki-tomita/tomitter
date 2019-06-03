import * as React from "react";
import { match } from "react-router-dom";
import { TweetBox } from "./TweetBox";
import { TweetList } from "./TweetList";
import { send } from "../../../api/Tweets";
import { myTweetList, tweetList, TweetComposite } from "../../../api/Composite";
import { TweetDialog } from "./TweetDialog";
const { useState, useEffect } = React;

interface MyTweetState {
  tweetText: string,
  tweets: TweetComposite[],
  selectedTweetId: number;
}

interface UserTweetState {
  tweets: TweetComposite[];
  selectedTweetId: number;
}

export const MyTweetPage: React.FunctionComponent = () => {
  const [ state, setState ] = useState<MyTweetState>({ tweetText: "", tweets: [], selectedTweetId: -1 });
  const { tweetText, tweets, selectedTweetId } = state;

  let fetchCancel = false;
  async function fetchTweets() {
    const tweets = await myTweetList();
    fetchCancel || setState({ ...state, tweets });
  }

  async function sendTweet() {
    tweetText && await send(tweetText);
    const tweets = await myTweetList();
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
      {selectedTweetId > -1 &&
        <TweetDialog onClose={() => setState({ ...state, selectedTweetId: -1 })}>
          {tweets[selectedTweetId].tweet}
        </TweetDialog>}
    </>
  );
}

export const UserTweetPage: React.FunctionComponent<{ match: match; userId: string; }> = ({ userId }) => {
  const [ state, setState ] = useState<UserTweetState>({ tweets: [], selectedTweetId: -1 });
  const { tweets, selectedTweetId } = state;

  let fetchCancel = false;
  async function fetchTweets() {
    const tweets = await tweetList(parseInt(userId));
    fetchCancel || setState({ ...state, tweets });
  }

  useEffect(() => (fetchTweets(), function() { fetchCancel = true; }), []);

  return (
    <>
      <TweetList onSelect={id => setState({ ...state, selectedTweetId: id })} tweets={tweets}/>
      {selectedTweetId > -1 && <TweetDialog onClose={() => setState({ ...state, selectedTweetId: -1 })}>{tweets[selectedTweetId].tweet}</TweetDialog>}
    </>
  );
}
