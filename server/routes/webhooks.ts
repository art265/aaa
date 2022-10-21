import { AnyMap } from "../types";
import { uuid } from "../utils/uuid";
import DB from "../utils/database";
import DiscordWebhook from "../utils/discord_webhook";

const Router = require("express")();

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

  const hooks_by_creator = DB.getMultiByKey("webhooks", "owner", user.id);

  if (hooks_by_creator.length >= user.max_instances) {
    return res.status(400).json({
      Success: false,
      Message: "You have reached the maximum amount of webhooks.",
    });
  }

  DB.set(
    "webhooks",
    uuid(),
    {
      owner: user.id,
      webhook_url: webhook_url,
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

Router.post("/test", (req: AnyMap, res: AnyMap) => {
  const { webhook_id } = req.body;
  const user = req.user;

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

  const Discord = new DiscordWebhook(webhook.webhook_url);
  Discord.Test()
    .then((_) => {
      res.json({
        Success: true,
        Message: "Webhook test successful.",
      });
    })
    .catch((_) => {
      res.json({
        Success: false,
        Message: "Webhook test failed.",
      });
    });
});

export default Router;
