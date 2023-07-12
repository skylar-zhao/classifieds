// general SQLite syntax help: https://www.sqlitetutorial.net/
// implementation help: https://www.npmjs.com/package/sqlite?activeTab=readme
//                      https://github.com/TryGhost/node-sqlite3/wiki/API

import sqlite3 from "sqlite3";
import { open } from "sqlite";

let _db;

export async function getDb() {
  if (!_db) {
    _db = await open({
      filename: "sqlite/posts.db",
      driver: sqlite3.Database,
    });
  }
  return _db;
}

export async function getAllPosts() {
  const db = await getDb();
  const posts = db.all("SELECT * FROM posts ORDER BY time DESC;");
  return posts;
}

export async function getUserPosts(username) {
  const db = await getDb();
  const posts = db.all(
    "SELECT * FROM posts WHERE user = ? ORDER BY time DESC",
    username
  );
  return posts;
}

export async function newPost(user, title, body) {
  const db = await getDb();
  db.run(
    "INSERT INTO posts (user, title, body) VALUES (?,?,?);",
    user,
    title,
    body
  );
}

export async function getPostUser(id) {
  const db = await getDb();
  const user = db.get("SELECT user FROM posts WHERE id=?", id);
  return user;
}

export async function getPost(id) {
  const db = await getDb();
  const post = db.get("SELECT * FROM posts WHERE id=?", id);
  return post;
}

export async function updatePost(id, title, body) {
  const db = await getDb();
  db.run("UPDATE posts SET title = ?, body = ? WHERE id = ?;", title, body, id);
}

export async function deletePost(id) {
  const db = await getDb();
  db.run("DELETE FROM posts WHERE id = ?;", id);
}
