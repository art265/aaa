import { AnyMap } from "../types";
import { uuid } from "../utils/uuid";
import Database from "../utils/database";

const Router = require("express")();
const DB = new Database();

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
  res.json({
    Success: true,
    Data: DB.getMultiByKey("webhooks", "owner", req.user.id),
  });
});

Router.post("/create", (req: AnyMap, res: AnyMap) => {
  const user = req.user;
  const { webhook_url } = req.body;

  if (webhook_url == null) {
    return res
      .status(400)
      .json({ Success: false, Message: "Please enter a valid webhook" });
  }

  DB.set(
    "webhooks",
    uuid(),
    {
      owner: user.id,
      webhook_url,
    },
    function () {
      res.json({
        Success: true,
        Message: "Webhook created successfully.",
      });
    }
  );
});

Router.post("/delete", (req: AnyMap, res: AnyMap) => {
  const user = req.user;
  const { webhook_id } = req.body;

  if (webhook_id == null) {
    return res
      .status(400)
      .json({ Success: false, Message: "Please enter a valid webhook id" });
  }

  const webhook = DB.get("webhooks", webhook_id);

  if (webhook == null) {
    return res
      .status(400)
      .json({ Success: false, Message: "Unable to find webhook" });
  }

  if (webhook.owner !== user.id) {
    return res.status(401).json({ Success: false, Message: "Unauthorized" });
  }

  DB.delete("webhooks", webhook_id, function () {
    res.json({
      Success: true,
      Message: "Webhook deleted successfully.",
    });
  });
});

export default Router;
