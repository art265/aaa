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

Router.use("*", (req: AnyMap, res: AnyMap, next: Function) => {
  const { token } = req.headers;
  const user = DB.getByKey("users", "token", token);

  if (user == null) {
    return res.status(401).json({ Success: false, Message: "Unauthorized" });
  }

  req.user = user;
  next();
});

Router.get("/by/me", (req: AnyMap, res: AnyMap) => {
  const { token } = req.headers;

  if (token == null) {
    return res.status(401).json({ Success: false, Message: "Unauthorized" });
  }

  res.json({
    Success: true,
    Data: DB.getMultiByKey("instances", "owner", req.user.id),
  });
});

Router.post("/create", (req: AnyMap, res: AnyMap) => {
  const { name, app_type, target_file } = req.body;
  const id = uuid();

  if (name == null || app_type == null || target_file == null) {
    return res
      .status(400)
      .json({ Success: false, Message: "Please fill in all the fields" });
  }

  DB.set(
    "instances",
    id,
    {
      name,
      app_type,
      target_file,
      owner: req.user.id,
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
