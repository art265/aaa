import "dotenv/config";

import sha256 from "./sha256";
import Database from "./database";
import { GenerateToken } from "./token";

const DB = new Database();
const SUPER_USER = DB.get("users", "super");

const USERNAME = process.env.SUPER_USERNAME as string;
const PASSWORD = process.env.SUPER_PASSWORD as string;

if (SUPER_USER != null) {
  if (SUPER_USER.password != sha256.hash(PASSWORD)) {
    SUPER_USER.password = sha256.hash(PASSWORD);

    DB.setByKey("users", "username", USERNAME, SUPER_USER, function () {
      console.log(`Password for super user has been updated.`);
    });
  }

  if (SUPER_USER.username != USERNAME) {
    SUPER_USER.username = USERNAME;

    DB.setByKey("users", "username", USERNAME, SUPER_USER, function () {
      console.log(`Username for super user has been updated.`);
    });
  }

  if (SUPER_USER.token == null) {
    SUPER_USER.token = GenerateToken(256);

    DB.setByKey("users", "token", USERNAME, SUPER_USER, function () {
      console.log(`Token for super user has been updated.`);
    });
  }
} else {
  DB.set(
    "users",
    "super",
    {
      isAdmin: true,
      username: USERNAME,
      token: GenerateToken(256),
      password: sha256.hash(PASSWORD),
    },
    function () {
      console.log("Super User Created, Restart the server.");
    }
  );
}
