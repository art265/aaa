import pm2 from "pm2";

import { AnyMap } from "../types";
import { uuid } from "../utils/uuid";
import Database from "../utils/database";
import TemplatesMaker, { StoragePath } from "../utils/templates";
import { GenerateToken } from "../utils/token";

const Templates = new TemplatesMaker();
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

Router.use("*", (req: AnyMap, res: AnyMap, next: Function) => {
  const { token } = req.headers;
  const user = DB.getByKey("users", "token", token);

  if (user == null)
    return res.status(401).json({ Success: false, Message: "Unauthorized" });

  req.user = user;
  next();
});

Router.get("/by/me", (req: AnyMap, res: AnyMap) => {
  const { token } = req.headers;

  if (token == null)
    return res.status(401).json({ Success: false, Message: "Unauthorized" });

  res.json({
    Success: true,
    Data: DB.getMultiByKey("instances", "owner", req.user.id),
  });
});

Router.get("/by/me/:instance_id", (req: AnyMap, res: AnyMap) => {
  const { token } = req.headers;
  const { instance_id } = req.params;

  if (token == null) {
    return res.status(401).json({ Success: false, Message: "Unauthorized" });
  }

  res.json({
    Success: true,
    Data: DB.getMultiByKey("instances", "owner", req.user.id).map(
      (instance) => {
        if (instance.id == instance_id) return instance;
      }
    ),
  });
});

Router.post("/create", (req: AnyMap, res: AnyMap) => {
  const { name, app_type, target_file } = req.body;
  const dir_id = GenerateToken(16);
  const id = uuid();

  if (name == null || app_type == null || target_file == null)
    return res
      .status(400)
      .json({ Success: false, Message: "Please fill in all the fields" });

  Templates.Create(dir_id, app_type, (err: any) => {
    if (err != null)
      return res.status(500).json({ Success: false, Message: err });

    DB.set(
      "instances",
      id,
      {
        name,
        app_type,
        target_file,
        owner: req.user.id,
        instance_location: dir_id,
      },
      function () {
        res.json({
          Success: true,
          Message: "Instance created successfully.",
          Data: {
            InstanceLocation: dir_id,
            Id: id,
          },
        });
      }
    );
  });
});

Router.post("/start", (req: AnyMap, res: AnyMap) => {
  const { id } = req.body;
  const instance = DB.get("instances", id);

  if (instance == null) {
    return res
      .status(404)
      .json({ Success: false, Message: "Instance not found" });
  }

  switch (instance.app_type) {
    case "Node":
      pm2.start(
        {
          script: `${StoragePath}/${instance.instance_location}/${instance.target_file}`,
          cwd: `${StoragePath}/${instance.instance_location}`,
          name: instance.name,
          interpreter: "node",
        },
        (err: any, apps: any) => {
          if (err) {
            return res.status(500).json({ Success: false, Message: err });
          } else {
            return res.json({ Success: true, Data: apps });
          }
        }
      );
      break;

    case "Python":
      pm2.start(
        {
          script: `${StoragePath}/${instance.instance_location}/${instance.target_file}`,
          cwd: `${StoragePath}/${instance.instance_location}`,
          name: instance.name,
          interpreter: "python",
        },
        (err: any, apps: any) => {
          if (err) {
            return res.status(500).json({ Success: false, Message: err });
          } else {
            return res.json({ Success: true, Data: apps });
          }
        }
      );
      break;
  }
});

export default Router;
