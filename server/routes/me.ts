import { AnyMap } from "../types";
import Database from "../utils/database";

const Router = require("express")();
const DB = new Database();

Router.get("/", (req: AnyMap, res: AnyMap) => {
  const { token } = req.headers;

  if (token == null) {
    return res.status(401).json({
      Success: false,
      Message: "Missing token",
    });
  }

  const user = DB.getByKey("users", "token", token);

  if (user != null) {
    return res.status(200).json({
      Success: true,
      Data: {
        ...user,
        password: undefined,
      },
    });
  } else {
    return res.status(401).json({
      Success: false,
      Message: "Invalid token",
    });
  }
});

export default Router;
