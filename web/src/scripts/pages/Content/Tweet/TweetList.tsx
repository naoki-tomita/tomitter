import * as React from "react";
import styled from "styled-components";
import { Tweet } from "../../../api/Tweets";


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

interface Props {
  tweets: Tweet[];
  onSelect: (id: number) => void;
}

export const TweetList: React.FunctionComponent<Props> = ({ onSelect, tweets }) => {
  return (
    <ListContainer>
    {tweets.map((t, i) =>
      <ListItem
        onClick={() => onSelect(i)} key={i}
      >
        <TweetContent>{t}</TweetContent>
      </ListItem>)}
    </ListContainer>
  );
}
