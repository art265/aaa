import pm2 from "pm2";

import { AnyMap } from "../types";
import DB from "../utils/database";

const Router = require("express")();

Router.get("/me", (req: AnyMap, res: AnyMap) => {
  pm2.list((err: any, list: any) => {
    console.log(list);
  });

  const { token } = req.headers;

  if (token == null) {
    return res.status(401).json({ Success: false, Message: "Unauthorized" });
  }

  const user = DB.getByKey("users", "token", token);

  if (user == null) {
    return res.status(401).json({ Success: false, Message: "Unauthorized" });
  }

  const instances = DB.getMultiByKey("instances", "owner", user.id);
  const webhooks = DB.getMultiByKey("webhooks", "owner", user.id);

  console.log(instances);
  console.log(user);

  res.json({
    Success: true,
    Data: {
      Webhooks: {
        Count: webhooks.length,
        Limit: user.max_webhooks,
        Left: user.max_webhooks - webhooks.length,
      },
      Instances: {
        Count: instances.length,
        Limit: user.max_instances,
        Left: user.max_instances - instances.length,
      },
    },
  });
});

Router.get("/instances", (req: AnyMap, res: AnyMap) => {});

export default Router;
