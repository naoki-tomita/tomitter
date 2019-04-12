const BASE_URL = "http://localhost/v1/profiles";

export interface Profile {
  id: number;
  userId: number;
  displayName: string;
  description: string;
}

interface Profiles {
  values: Profile;
}

export async function profile(userId: number): Promise<Profile> {
  const response = await fetch(`${BASE_URL}/${userId}`);
  if (response.ok) {
    return await response.json();
  }
  throw Error("Failed to fetch profile.");
}

export async function me(): Promise<Profile> {
  const response = await fetch(`${BASE_URL}/me`);
  if (response.ok) {
    return await response.json();
  }
  throw Error("Failed to fetch profile.");
}

export async function list(): Promise<Profiles> {
  const response = await fetch(`${BASE_URL}`);
  if (response.ok) {
    return await response.json();
  }
  throw Error("Failed to fetch profiles.");
}

export async function create(displayName: string, description: string) {
  const response = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { "content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ displayName, description }),
  });
  if (response.ok) {
    return await response.json();
  }
  throw Error("Failed to create profiles.");
}
