import { AnyMap } from "../types";
import Sha256 from "../utils/sha256";
import DB from "../utils/database";

const Router = require("express")();

Router.post("/", (req: AnyMap, res: AnyMap) => {
  const { username, password } = req.body;

  if (username == null || password == null) {
    return res.status(400).send({ error: "Missing username or password" });
  }

  const User = DB.getByKey("users", "username", username);

  if (User == null) {
    return res.status(401).send({ error: "You entered the wrong username" });
  }

  if (User.password !== Sha256.hash(password)) {
    return res.status(401).send({ error: "You entered the wrong password" });
  }

  res.json({
    Success: true,
    Data: {
      Token: User.token,
    },
  });
});

export default Router;
