import pm2 from "pm2";
import fs from "fs";

import { AnyMap } from "../types";
import DB from "../utils/database";
import { uuid } from "../utils/uuid";
import { GenerateToken } from "../utils/token";
import TemplatesMaker, { StoragePath } from "../utils/templates";

const Templates = new TemplatesMaker();
const Router = require("express")();

Router.get("/", (_req: AnyMap, res: AnyMap) => {
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

  const instances = DB.getMultiByKey("instances", "owner", req.user.id).map(
    (instance) => {
      if (instance.id == instance_id) {
        const instance_storage = `${StoragePath}/${instance.instance_location}`;

        return {
          ...instance,
          files: fs.readdirSync(instance_storage).map((dir) => {
            const stats = fs.lstatSync(`${instance_storage}/${dir}`);
            return {
              name: dir,
              size: stats.size,
              isDir: stats.isDirectory(),
            };
          }),
        };
      }
    }
  );

  const instance = instances.filter((instance) => instance != null)[0];

  res.json({
    Success: true,
    Data: {
      full_path: `${StoragePath}/${instance.instance_location}`.replace(
        "//",
        "/"
      ),
      ...instance,
    },
  });
});

Router.post("/create", (req: AnyMap, res: AnyMap) => {
  const {
    name,
    app_type,
    target_file,
    max_memory,
    detached,
    watch,
    logs_dir,
    auto_restart,
  } = req.body;

  const dir_id = GenerateToken(16);
  const id = uuid();

  const creator = req.user;
  const instances_by_creator = DB.getMultiByKey(
    "instances",
    "owner",
    creator.id
  );

  if (instances_by_creator.length >= creator.max_instances) {
    return res.status(400).json({
      Success: false,
      Message: "You have reached the maximum amount of instances.",
    });
  }

  if (
    name == null ||
    app_type == null ||
    target_file == null ||
    max_memory == null ||
    detached == null ||
    watch == null ||
    logs_dir == null ||
    auto_restart == null
  )
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
        max_memory,
        detached,
        watch,
        logs_dir,
        auto_restart,
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
          name: `${instance.name}`,
          interpreter: "node",
          env: {
            CENTAURI_owner: req.user.id,
            CENTAURI_instance: instance.id,
          },
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
