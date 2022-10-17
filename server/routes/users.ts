import pm2 from "pm2";

import { AnyMap } from "../types";
import Sha256 from "../utils/sha256";
import { uuid } from "../utils/uuid";
import Database from "../utils/database";

const Router = require("express")();
const DB = new Database();

Router.get("/create", (req: AnyMap, res: AnyMap) => {
  const { username, email, password, is_admin, bot_creation_limit } = req.body;
  const id = uuid();

  DB.set(
    "users",
    id,
    {
      username,
      email,
      bot_creation_limit,
      password: Sha256.hash(password),
      isAdmin: is_admin,
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
