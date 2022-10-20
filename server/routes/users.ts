import pm2 from "pm2";

import { AnyMap } from "../types";
import Sha256 from "../utils/sha256";
import { uuid } from "../utils/uuid";
import Database from "../utils/database";
import { GenerateToken } from "../utils/token";

const Router = require("express")();
const DB = new Database();

Router.post("/create", (req: AnyMap, res: AnyMap) => {
  const { username, email, password, is_admin, bot_creation_limit } = req.body;
  const { token } = req.headers;
  const id = uuid();

  const creator = DB.getByKey("users", "token", token);

  if (creator == null) {
    return res.status(401).json({ Success: false, Message: "Invalid token." });
  }

  if (creator.isAdmin == false) {
    return res
      .status(403)
      .json({ Success: false, Message: "Insufficient permissions." });
  }

  DB.set(
    "users",
    id,
    {
      email,
      username,
      bot_creation_limit,
      isAdmin: is_admin,
      token: GenerateToken(256),
      password: Sha256.hash(password),
    },
    function () {
      res.json({
        Success: true,
        Message: "User created successfully.",
        Data: {
          Id: id,
        },
      });
    }
  );
});

Router.post("/delete", (req: AnyMap, res: AnyMap) => {
  const { user_id } = req.body;

  const { token } = req.headers;

  const creator = DB.getByKey("users", "token", token);

  if (creator == null) {
    return res.status(401).json({ Success: false, Message: "Unauthorized" });
  }

  if (creator.id != "super") {
    return res
      .status(403)
      .json({ Success: false, Message: "Insufficient permissions." });
  }

  DB.delete("users", user_id, function () {
    DB.deleteByKey("instances", "owner", user_id, function () {
      res.json({
        Success: true,
        Message: "User deleted successfully.",
      });
    });
  });
});

Router.get("/list", (req: AnyMap, res: AnyMap) => {
  const { token } = req.headers;

  const user = DB.getByKey("users", "token", token);

  if (user == null) {
    return res.status(401).json({ Success: false, Message: "Unauthorized" });
  }

  if (user.id == "super") {
    const users = DB.getAll("users");

    res.json({
      Success: true,
      Data: Object.keys(users).map((user: any) => {
        return {
          id: user,
          ...users[user],
          token: undefined,
          password: undefined,
        };
      }),
    });
  } else {
    if (user.isAdmin == false) {
      return res.status(403).json({
        Success: false,
        Message: "Insufficient permissions. Only owner can create new accounts",
      });
    }
  }
});

export default Router;
