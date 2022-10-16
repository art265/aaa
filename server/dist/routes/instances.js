"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pm2_1 = __importDefault(require("pm2"));
const database_1 = __importDefault(require("../utils/database"));
const uuid_1 = require("../utils/uuid");
const Router = require("express")();
const DB = new database_1.default();
Router.get("/", (req, res) => {
    pm2_1.default.list((err, list) => {
        if (err) {
            res.status(500).json({ Success: false, Message: err });
        }
        else {
            res.json({ Success: true, Data: list });
        }
    });
});
Router.post("/create", (req, res) => {
    const { name, script, app_type } = req.body;
    DB.set("instances", (0, uuid_1.uuid)(), {
        name,
        script,
        app_type,
    }, function () {
        res.json({
            Success: true,
            Message: "Instance created successfully.",
        });
    });
});
exports.default = Router;
