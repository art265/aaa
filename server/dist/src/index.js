"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const instances_1 = __importDefault(require("../routes/instances"));
const app = (0, express_1.default)();
app.use("/instances", instances_1.default);
app.listen(process.env.PORT, function () {
    console.log(`Listening on http://127.0.0.1:${process.env.PORT}`);
});
