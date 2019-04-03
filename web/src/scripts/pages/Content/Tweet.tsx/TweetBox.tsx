import * as React from "react";
import styled from "styled-components";
import { RouteComponentProps, Link, Route, match } from "react-router-dom";
import { LabeledInput } from "../../../components/LabeledInput";
import { t } from "../../../utils/I18n";
import { Button } from "../../../elements/Button";
import { send } from "../../../api/Tweets";
const { useState } = React;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface TweetProps {
  onSend: () => void;
}

export const TweetBox: React.FunctionComponent<TweetProps> = ({ onSend }) => {
  const [ tweetText, setTweetText ] = useState("")

  function sendTweet() {
    tweetText && (send(tweetText), onSend());
    setTweetText("");
  }

  return (
    <FlexContainer>
      <LabeledInput
        label={t("tweet.placeholder")}
        value={tweetText}
        onChange={t => setTweetText(t)}
      />
      <Button onClick={sendTweet}>{t("tweet.tweet")}</Button>
    </FlexContainer>
  );
}
