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
  tweetText: string;
  onTweetTextChange: (text: string) => void;
}

export const TweetBox: React.FunctionComponent<TweetProps> = ({ onSend, onTweetTextChange, tweetText }) => {
  return (
    <FlexContainer>
      <LabeledInput
        label={t("tweet.placeholder")}
        value={tweetText}
        onChange={onTweetTextChange}
      />
      <Button onClick={onSend}>{t("tweet.tweet")}</Button>
    </FlexContainer>
  );
}
