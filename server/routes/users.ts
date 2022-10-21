import DB from "../utils/database";
import { AnyMap } from "../types";
import Sha256 from "../utils/sha256";
import { uuid } from "../utils/uuid";
import { GenerateToken } from "../utils/token";

const Router = require("express")();

Router.post("/create", (req: AnyMap, res: AnyMap) => {
  const { username, email, password, is_admin, max_instances, max_webhooks } =
    req.body;

  const { token } = req.headers;
  const id = uuid();

  const creator = DB.getByKey("users", "token", token);
  const options = {
    email,
    username,
    max_webhooks,
    max_instances,
    isAdmin: is_admin,
    token: GenerateToken(256),
    password: Sha256.hash(password),
  };

  if (creator == null) {
    return res.status(401).json({ Success: false, Message: "Invalid token." });
  }

  // User's can't create admins/users
  if (creator.isAdmin == false) {
    return res
      .status(403)
      .json({ Success: false, Message: "Insufficient permissions." });
  }

  // Admins can't create admins
  if (creator.id != "super") {
    options.isAdmin = false;
  }

  DB.set("users", id, options, function () {
    res.json({
      Success: true,
      Message: "User created successfully.",
      Data: {
        Id: id,
      },
    });
  });
});

Router.post("/delete", (req: AnyMap, res: AnyMap) => {
  const { user_id } = req.body;
  const { token } = req.headers;

  if (user_id == "super") {
    return res
      .status(401)
      .json({ Success: false, Message: "Cannot delete super user." });
  }

  const user = DB.get("users", user_id);
  const creator = DB.getByKey("users", "token", token);

  if (creator == user) {
    return res.status(401).json({ Success: false, Message: "User not found" });
  }

  if (creator == null) {
    return res.status(401).json({ Success: false, Message: "Unauthorized" });
  }

  if (creator.id != "super") {
    return res
      .status(403)
      .json({ Success: false, Message: "Insufficient permissions." });
  }

  DB.delete("users", user_id, function () {
    DB.deleteByKey("instances", "owner", user_id, function () {
      res.json({
        Success: true,
        Message: "User deleted successfully.",
      });
    });
  });
});

Router.get("/list", (req: AnyMap, res: AnyMap) => {
  const { token } = req.headers;

  const user = DB.getByKey("users", "token", token);

  if (user == null) {
    return res.status(401).json({ Success: false, Message: "Unauthorized" });
  }

  if (user.id == "super") {
    const users = DB.getAll("users");

    res.json({
      Success: true,
      Data: Object.keys(users).map((user: any) => {
        return {
          id: user,
          ...users[user],
          token: undefined,
          password: undefined,
        };
      }),
    });
  } else {
    if (user.isAdmin == false) {
      return res.status(403).json({
        Success: false,
        Message: "Insufficient permissions. Only owner can create new accounts",
      });
    }
  }
});

export default Router;
