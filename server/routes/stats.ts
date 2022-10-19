import pm2 from "pm2";

import { AnyMap } from "../types";
import Database from "../utils/database";

const Router = require("express")();
const DB = new Database();

Router.get("/instances", (req: AnyMap, res: AnyMap) => {
  pm2.list((err: any, list: any) => {
    if (err) {
      res.status(500).json({ Success: false, Message: err });
    } else {
      res.json({
        Success: true,
        Data: list.map((ps: any) => {
          return {
            ProcessId: ps.pid,
            ProcessManId: ps.pm_id,
            Name: ps.name,
            Memory: ps.monit.memory,
            Config: {
              Args: ps.pm2_env.args,
              Script: ps.pm2_env.pm_exec_path,
              InstanceVar: ps.pm2_env.instance_var,
              Autostart: ps.pm2_env.autorestart,
              RestartDelay: ps.pm2_env.restart_delay,
            },
          };
        }),
      });
    }
  });
});

export default Router;
