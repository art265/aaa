import bodyParser from "body-parser";
import express from "express";
import "dotenv/config";

import Instances from "../routes/instances";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use("/instances", Instances);

app.listen(process.env.PORT, function () {
  console.log(`Listening on http://127.0.0.1:${process.env.PORT}`);
});
