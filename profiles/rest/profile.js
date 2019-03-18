const express = require("express");
const bodyParser = require("body-parser");
const { create, findByUserId, findByCookie, list } = require("../usecase/profile");
const { handle } = require("./error-handler");

const app = express();
app.use(bodyParser.json());

app.get("/v1/profiles/me", async (req, res) => {
  try {
    const cookie = req.header("cookie");
    const profile = await findByCookie(cookie);
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: "not_found", message: `userId(${userId}) is not found.` });
    }
  } catch (e) {
    console.error(e);
    const { status, error } = handle(e);
    res.status(status).json(error);
  }
});

app.get("/v1/profiles/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const profile = await findByUserId(userId);
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: "not_found", message: `userId(${userId}) is not found.` });
    }
  } catch (e) {
    console.error(e);
    const { status, error } = handle(e);
    res.status(status).json(error);
  }
});

app.post("/v1/profiles", async (req, res) => {
  try {
    const { displayName, description } = req.body;
    const cookie = req.header("cookie");
    const profile = await create(cookie, displayName, description);
    res.json(profile);
  } catch (e) {
    console.error(e);
    const { status, error } = handle(e);
    res.status(status).json(error);
  }
});

app.get("/v1/profiles", async (req, res) => {
  try {
    const profiles = await list();
    res.json(profiles);
  } catch (e) {
    console.error(e);
    const { status, error } = handle(e);
    res.status(status).json(error);
  }
});

app.listen(8082);
