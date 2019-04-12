const BASE_PATH = "http://localhost/v1/tw"

type Tweet = string;

export async function me() {
  const response = await fetch(`${BASE_PATH}/users/me/tweets`);
  if (response.ok) {
    return await response.json();
  }
  throw Error("tweet error");
}

export async function userTweet(userId: string): Promise<Tweet[]> {
  const response = await fetch(`${BASE_PATH}/users/${userId}/tweets`);
  if (response.ok) {
    return await response.json();
  }
  throw Error("tweet error");
}

export async function send(tweet: string) {
  const response = await fetch(`${BASE_PATH}/users/me/tweets`, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ tweet }),
  });
  if (response.ok) {
    return await response.json();
  }
  throw Error("failed to tweet");
}
