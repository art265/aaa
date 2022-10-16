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
Router.get("/:uuid", (req, res) => {
    const { uuid } = req.params;
    res.json({ Success: true, Data: DB.get("instances", uuid) });
});
Router.post("/create", (req, res) => {
    const { name, app_type, target_file } = req.body;
    const id = (0, uuid_1.uuid)();
    DB.set("instances", id, {
        name,
        app_type,
        target_file,
    }, function () {
        res.json({
            Success: true,
            Message: "Instance created successfully.",
            Data: {
                Id: id,
            },
        });
    });
});
Router.post("/start", (req, res) => {
    const { id } = req.body;
    const instance = DB.get("instances", id);
    if (instance != null) {
        pm2_1.default.start(instance, (err, proc) => {
            if (err) {
                res.status(500).json({ Success: false, Message: err });
            }
            else {
                res.json({
                    Success: true,
                    Data: {
                        Process: proc,
                        Instance: instance,
                    },
                });
            }
        });
    }
    else {
        res.status(404).json({ Success: false, Message: "Instance not found." });
    }
});
exports.default = Router;
