import { list as userList, user, identify } from "./Users";
import { list as profileList, Profile, profile as fetchProfile } from "./Profiles";
import { userTweet } from "./Tweets";
import { getLinks } from "./Links";

export interface UserComposite {
  id: number;
  displayName: string;
  description: string;
}

export async function list(): Promise<UserComposite[]> {
  const [{ users }, { profiles }] = await Promise.all([userList(), profileList()]);
  return users.map<UserComposite>(user => {
    const profile = profiles.find(profile => profile.userId === user.id);
    return {
      id: user.id,
      displayName: profile && profile.displayName || user.loginName,
      description: profile && profile.description || "",
    };
  });
}

export async function usersList(userIds: number[]): Promise<UserComposite[]> {
  const [users, profiles] = await Promise.all([
    Promise.all(userIds.map(user)),
    Promise.all(userIds.map(fetchProfile)),
  ]);
  return users.map<UserComposite>(user => {
    const profile = profiles.find(profile => profile.userId === user.id);
    return {
      id: user.id,
      displayName: profile && profile.displayName || user.loginName,
      description: profile && profile.description || "",
    };
  });
}

async function linkedProfiles() {
  const { links } = await getLinks();
  return await usersList(links.map(link => link.id));
}

async function profiles(userIds: number[]): Promise<Profile[]> {
  const profiles = await await Promise.all(userIds.map(id => fetchProfile(id)));
  return profiles;
}

export interface TweetComposite {
  id: number;
  displayName: string;
  tweet: string;
}

async function myProfile() {
  const myUser = await identify();
  return await usersList([myUser.id]);
}

export async function myTweetList(): Promise<TweetComposite[]> {
  const [tweets, profiles, profile] = await Promise.all([
    userTweet("me"),
    linkedProfiles(),
    myProfile(),
  ]);
  const map = [...profile, ...profiles].reduce<{ [key: number]: UserComposite }>(
    (prev, current) => ({ ...prev, [current.id]: current }), {});

  return tweets.map(({ userId, tweet }) => ({ id: userId, displayName: map[userId].displayName, tweet, }));
}

export async function tweetList(userId: number): Promise<TweetComposite[]> {
  const [tweets, profile] = await Promise.all([
    userTweet(userId.toString()),
    fetchProfile(userId),
  ]);
  return tweets.map(({ userId, tweet }) => ({ id: userId, displayName: profile.displayName, tweet, }));
}
