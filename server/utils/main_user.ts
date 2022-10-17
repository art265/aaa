import "dotenv/config";

import sha256 from "./sha256";
import Database from "./database";

const DB = new Database();
const SUPER_USER = DB.get("users", "super");

const USERNAME = process.env.SUPER_USERNAME;
const PASSWORD = process.env.SUPER_PASSWORD;

if (SUPER_USER != null) {
  if (SUPER_USER.password != sha256.hash(PASSWORD as string)) {
    SUPER_USER.password = sha256.hash(PASSWORD as string);

    DB.setByKey(
      "users",
      "username",
      USERNAME as string,
      SUPER_USER,
      function () {
        console.log(`Password for super user has been updated.`);
      }
    );
  }

  if (SUPER_USER.username != USERNAME) {
    SUPER_USER.username = USERNAME as string;

    DB.setByKey(
      "users",
      "username",
      USERNAME as string,
      SUPER_USER,
      function () {
        console.log(`Username for super user has been updated.`);
      }
    );
  }
} else {
  DB.set(
    "users",
    "super",
    {
      isAdmin: true,
      username: USERNAME,
      password: sha256.hash(PASSWORD as string),
    },
    function () {
      console.log("Super User Created, Restart the server.");
    }
  );
}
