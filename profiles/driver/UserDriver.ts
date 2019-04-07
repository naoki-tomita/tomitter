interface User {
  id: number;
  loginName: string;
}

export class UsersDriver {
  async identify(cookie: string): Promise<User | undefined> {
    const response = await fetch("http://localhost/v1/users/identify", { headers: { cookie } });
    if (response.ok) {
      return await response.json();
    }
    return undefined;
  }
}
