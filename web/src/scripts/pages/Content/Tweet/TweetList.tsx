import * as React from "react";
import styled from "styled-components";
import { Tweet } from "../../../api/Tweets";
import { TweetComposite } from "../../../api/Composite";


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
  display: flex;

  &:hover {
    box-shadow: 0px 2px 3px #bbb;
  }
`;

const TweetIcon = styled.div`
  width: 40px;
  height: 40px;
  margin: 4px;
  background-color: #ccc;
  border: solid 1px #bbb;
  border-radius: 4px;
  min-width: 40px;
`;

const TweetUser = styled.div`
  font-size: 16px;
`;

const Tweet = styled.div`
  font-size: 18px;
`;

interface Props {
  tweets: TweetComposite[];
  onSelect: (id: number) => void;
}

export const TweetList: React.FunctionComponent<Props> = ({ onSelect, tweets }) => {
  return (
    <ListContainer>
    {tweets.map((t, i) =>
      <ListItem
        onClick={() => onSelect(i)} key={i}
      >
        <TweetContent>
          <TweetIcon />
          <div>
            <TweetUser>{t.displayName}</TweetUser>
            <Tweet>{t.tweet}</Tweet>
          </div>
        </TweetContent>
      </ListItem>)}
    </ListContainer>
  );
}
