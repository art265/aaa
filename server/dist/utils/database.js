"use strict";
// Description: A tiny JSON-based database to store data.
// Author: Jareer Abdullah
// License: MIT
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Database {
    constructor(file_path) {
        this.default_path = `${__dirname.replace(path_1.default.basename(__dirname), "")}/database.json`;
        this.file_path = this.default_path;
        this.data = {};
        this.file_path = file_path || this.default_path;
        this.__init__();
        console.log(this.file_path);
    }
    get(table, value) {
        return this.data[table][value];
    }
    set(table, value, data, cb) {
        this.data[table][value] = data;
    }
    save() {
        fs_1.default.writeFileSync(this.file_path, JSON.stringify(this.data));
    }
    __init__() {
        if (!fs_1.default.existsSync(this.file_path)) {
            fs_1.default.writeFileSync(this.file_path, "{}");
        }
        this.data = JSON.parse(fs_1.default.readFileSync(this.file_path).toString());
    }
}
exports.default = Database;
