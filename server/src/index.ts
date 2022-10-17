import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";

import "../utils/main_user";
import Instances from "../routes/instances";
import Users from "../routes/users";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", Users);
app.use("/instances", Instances);

app.listen(process.env.PORT, function () {
  console.log(`Listening on http://127.0.0.1:${process.env.PORT}`);
});
