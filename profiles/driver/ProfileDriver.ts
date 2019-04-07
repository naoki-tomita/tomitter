import { all, get, exec } from "./database";

export interface ProfileEntity {
  id: number;
  user_id: number;
  display_name: string;
  description: string;
}

export class ProfileDriver {
  async init() {
    await exec(`
      create table if not exists profile (
        id integer primary key,
        user_id integer unique,
        display_name text,
        description text
      );
    `);
  }

  async list() {
    return await all(`
      select * from profile;
    `) as Promise<ProfileEntity[]>;
  }

  async findByUserId(userId: number) {
    return await get(`
      select * from profile where user_id = ${userId};
    `) as Promise<ProfileEntity | undefined>
  }

  async findById(id: number) {
    return await get(`
      select * from profile where id = ${id};
    `) as Promise<ProfileEntity | undefined>;
  }

  async create(profile: ProfileEntity) {
    const { user_id, display_name, description } = profile;
    await exec(`
      insert into profile (user_id, display_name, description)
        values (${user_id}, "${display_name}", "${description}");
    `);
  }

  async deleteByUserId(userId: number) {
    await exec(`delete from profile where user_id = ${userId}`);
  }
}
