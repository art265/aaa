import { AnyMap } from "../types";
import pm2 from "pm2";
import Database from "../utils/database";
import { uuid } from "../utils/uuid";

const Router = require("express")();
const DB = new Database();

Router.get("/", (req: AnyMap, res: AnyMap) => {
  pm2.list((err: any, list: any) => {
    if (err) {
      res.status(500).json({ Success: false, Message: err });
    } else {
      res.json({ Success: true, Data: list });
    }
  });
});

Router.post("/create", (req: AnyMap, res: AnyMap) => {
  const { name, script, app_type } = req.body;

  DB.set(
    "instances",
    uuid(),
    {
      name,
      script,
      app_type,
    },
    function () {
      res.json({
        Success: true,
        Message: "Instance created successfully.",
      });
    }
  );
});

export default Router;
