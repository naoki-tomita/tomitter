interface User {
  id: number;
  loginName: string;
}

export async function login(loginName: string, password: string): Promise<User> {
  const response = await fetch("http://localhost/users/login", {
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
  const response = await fetch("http://localhost/users", {
    method: "POST",
    headers: { "content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify({ loginName, password }),
  });
  if (response.ok) {
    return await response.json();
  }
  throw Error("create failed.");
}

export async function list(): Promise<User[]>{
  const response = await fetch("http://localhost/users");
  if (response.ok) {
    return await response.json();
  }
  throw Error("list failed.");
}
