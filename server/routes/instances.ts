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

Router.get("/:uuid", (req: AnyMap, res: AnyMap) => {
  const { uuid } = req.params;
  res.json({ Success: true, Data: DB.get("instances", uuid) });
});

Router.post("/create", (req: AnyMap, res: AnyMap) => {
  const { name, app_type, target_file } = req.body;
  const id = uuid();

  DB.set(
    "instances",
    id,
    {
      name,
      app_type,
      target_file,
    },
    function () {
      res.json({
        Success: true,
        Message: "Instance created successfully.",
        Data: {
          Id: id,
        },
      });
    }
  );
});

Router.post("/start", (req: AnyMap, res: AnyMap) => {
  const { id } = req.body;
  const instance = DB.get("instances", id);

  if (instance != null) {
    pm2.start(instance, (err: any, proc: any) => {
      if (err) {
        res.status(500).json({ Success: false, Message: err });
      } else {
        res.json({
          Success: true,
          Data: {
            Process: proc,
            Instance: instance,
          },
        });
      }
    });
  } else {
    res.status(404).json({ Success: false, Message: "Instance not found." });
  }
});

export default Router;
