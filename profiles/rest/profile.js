const express = require("express");
const bodyParser = require("body-parser");
const { create, findByUserId, findByCookie } = require("../usecase/profile");

const app = express();
app.use(bodyParser.json());
app.get("/v1/profiles/:userId", async (req, res) => {
  try {
    const userId = req.param("userId");
    const profile = await findByUserId(userId);
    res.json(profile);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "unexpected_error", message: e });
  }
});

app.post("/v1/profiles", async (req, res) => {
  try {
    const { userId, displayName, description } = req.body;
    const profile = await create(userId, displayName, description);
    res.json(profile);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "unexpected_error", message: e });
  }
});

app.get("/v1/profiles", async (req, res) => {
  try {
    const cookie = req.header("cookie");
    const profile = await findByCookie(cookie);
    res.json(profile);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "unexpected_error", message: e });
  }
});

app.listen(8082);
