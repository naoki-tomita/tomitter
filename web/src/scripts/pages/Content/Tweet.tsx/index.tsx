import * as React from "react";
import styled from "styled-components";
import { RouteComponentProps, Link, Route, match } from "react-router-dom";
import { LabeledInput } from "../../../components/LabeledInput";
import { t } from "../../../utils/I18n";
import { TweetBox } from "./TweetBox";
import { TweetList } from "./TweetList";
const { useState } = React;

export const TweetContainer = () => {
  return (
    <>
      <TweetBox onSend={() => {}}/>
      <TweetList userId={"me"}/>
    </>
  );
}
