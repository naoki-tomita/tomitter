export interface User {
  id: number;
  loginName: string;
}

export interface Users {
  users: User[];
}

const BASE_PATH = "http://localhost/v1/users"

export async function login(loginName: string, password: string): Promise<User> {
  const response = await fetch(`${BASE_PATH}/login`, {
    method: "POST",
    headers: { "content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ loginName, password }),
  });
  if (response.ok) {
    return await response.json();
  }
  throw Error("login failed.");
}

export async function create(loginName: string, password: string): Promise<User> {
  const response = await fetch(`${BASE_PATH}`, {
    method: "POST",
    headers: { "content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ loginName, password }),
  });
  if (response.ok) {
    return await response.json();
  }
  throw Error("create failed.");
}

export async function list(): Promise<Users> {
  const response = await fetch(`${BASE_PATH}`);
  if (response.ok) {
    return await response.json();
  }
  throw Error("list failed.");
}

export async function identify(): Promise<User> {
  const response = await fetch(`${BASE_PATH}/identify`);
  if (response.ok) {
    return await response.json();
  }
  throw Error("list failed.");
}

export async function user(userId: number): Promise<User> {
  const response = await fetch(`${BASE_PATH}/${userId}`);
  if (response.ok) {
    return await response.json();
  }
  throw Error("list failed.");
}
