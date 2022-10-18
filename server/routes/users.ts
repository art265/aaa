import pm2 from "pm2";

import { AnyMap } from "../types";
import Sha256 from "../utils/sha256";
import { uuid } from "../utils/uuid";
import Database from "../utils/database";
import { GenerateToken } from "../utils/token";

const Router = require("express")();
const DB = new Database();

Router.get("/create", (req: AnyMap, res: AnyMap) => {
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

Router.get("/delete", (req: AnyMap, res: AnyMap) => {
  const { user_id } = req.body;

  DB.delete("users", user_id, function () {
    const instances_object = DB.getAll("instances");
    const instances = Object.keys(instances_object).map((key) => {
      return {
        ...instances_object[key],
        id: key,
      };
    });

    for (let x = 0; x < instances.length; x++) {
      const ins = instances[x];

      if (ins.owner === user_id) {
        DB.delete("instances", ins.id, function () {});
      }
    }

    res.json({
      Success: true,
      Message: "User deleted successfully.",
    });
  });
});

export default Router;
