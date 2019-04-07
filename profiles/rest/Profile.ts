import express = require("express");
import bodyParser = require("body-parser");

import { handle } from "./ErrorHandler";
import { inject } from "omusubi";
import { ProfileUsecase } from "../usecase/profile";
import { Cookie } from "../domain/cookie";
import { Description } from "../domain/profiles";
import { Name } from "../domain/Name";

export class ProfileResource {

  @inject(ProfileUsecase)
  profileUsecase!: ProfileUsecase;

  listen() {
    const app = express();
    app.use(bodyParser.json());

    app.get("/v1/profiles/me", async (req, res) => {
      try {
        const cookie = req.header("cookie") || "";
        const profile = await this.profileUsecase.findByCookie(new Cookie(cookie));
        res.json(profile);
      } catch (e) {
        console.error(e);
        const { status, error } = handle(e);
        res.status(status).json(error);
      }
    });

    app.get("/v1/profiles/:userId", async (req, res) => {
      try {
        const { userId } = req.params;
        const profile = await this.profileUsecase.findByUserId(userId);
        res.json(profile);
      } catch (e) {
        console.error(e);
        const { status, error } = handle(e);
        res.status(status).json(error);
      }
    });

    app.post("/v1/profiles", async (req, res) => {
      try {
        const { displayName, description } = req.body;
        const cookie = req.header("cookie") || "";
        const profile = await this.profileUsecase.create(
          new Cookie(cookie),
          new Name(displayName),
          new Description(description),
        );
        res.json(profile);
      } catch (e) {
        console.error(e);
        const { status, error } = handle(e);
        res.status(status).json(error);
      }
    });

    app.get("/v1/profiles", async (_, res) => {
      try {
        const profiles = await this.profileUsecase.list();
        res.json(profiles);
      } catch (e) {
        console.error(e);
        const { status, error } = handle(e);
        res.status(status).json(error);
      }
    });

    app.listen(8082);

  }
}
