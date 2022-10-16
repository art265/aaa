import "dotenv/config";
import express from "express";
import Instances from "../routes/instances";

const app = express();

app.use("/instances", Instances);

app.listen(process.env.PORT, function () {
  console.log(`Listening on http://127.0.0.1:${process.env.PORT}`);
});
