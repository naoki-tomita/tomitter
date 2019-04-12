import { Database } from "sqlite3";

const db = new Database("./data.db");

export function exec(sql: string) {
  return new Promise((ok, ng) => db.exec(sql, e => e && ng(e) || ok()));
}

export function get(sql: string) {
  return new Promise((ok, ng) => db.get(sql, (e, row) => e && ng(e) || ok(row)));
}

export function all(sql: string) {
  return new Promise((ok, ng) => db.all(sql, (e, rows) => e && ng(e) || ok(rows)));
}
