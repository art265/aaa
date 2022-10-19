import "dotenv/config";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import "../utils/main_user";
import "../utils/templates";
import Users from "../routes/users";
import Stats from "../routes/stats";
import Login from "../routes/login";
import Webhooks from "../routes/webhooks";
import Instances from "../routes/instances";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", Users);
app.use("/login", Login);
app.use("/stats", Stats);
app.use("/webhooks", Webhooks);
app.use("/instances", Instances);

app.listen(process.env.PORT, function () {
  console.log(`Listening on http://127.0.0.1:${process.env.PORT}`);
});
