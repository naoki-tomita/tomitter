const BASE_PATH = "/v1/links";

export interface Link {
  id: number;
}

interface Links {
  links: Link[];
}

export async function getLinks(): Promise<Links> {
  const result = await fetch(`${BASE_PATH}`);
  if (result.ok) {
    return { links: await result.json() };
  }
  throw Error("Failed to fetch links.");
}

export async function addLinks(friend: number) {
  const result = await fetch(`${BASE_PATH}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id: friend }),
  });
  if (result.ok) {
    return;
  }
  throw Error("Failed to add link.");
}
