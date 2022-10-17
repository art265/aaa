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
        this.__root = __dirname.replace(path_1.default.basename(__dirname), "");
        this.default_path = `${this.__root}/database.json`;
        this.file_path = this.default_path;
        this.data = {};
        this.delete = (table, value, callback) => {
            if (this.data[table] && this.data[table][value]) {
                delete this.data[table][value];
                this.___save__();
                callback();
            }
        };
        this.file_path = file_path || this.default_path;
        this.__init__();
    }
    get(table, value) {
        return (this.data[table] || {})[value];
    }
    getAll(table) {
        return this.data[table];
    }
    getByKey(table, key, value) {
        const table_data = this.data[table] || {};
        const keys = Object.keys(table_data) || [];
        for (let x = 0; x < keys.length; x++) {
            const key_ = keys[x];
            if (table_data[key_][key] === value) {
                return table_data[key_];
            }
        }
    }
    getMultiByKey(table, key, value) {
        const table_data = this.data[table] || {};
        const keys = Object.keys(table_data) || [];
        const final = [];
        for (let x = 0; x < keys.length; x++) {
            const key_ = keys[x];
            if (table_data[key_][key] === value) {
                final.push(table_data[key_]);
            }
        }
        return final;
    }
    setByKey(table, key, value, data, callback) {
        const table_data = this.data[table] || {};
        const keys = Object.keys(table_data) || [];
        for (let x = 0; x < keys.length; x++) {
            const key_ = keys[x];
            if (table_data[key_][key] === value) {
                this.data[table][key_] = data;
            }
        }
        this.___save__();
        callback();
    }
    set(table, value, data, callback) {
        if (this.data[table] == null) {
            this.data[table] = {};
        }
        this.data[table][value] = data;
        this.___save__();
        callback();
    }
    ___save__() {
        fs_1.default.writeFileSync(this.file_path, JSON.stringify(this.data));
    }
    __init__() {
        if (!fs_1.default.existsSync(this.file_path)) {
            fs_1.default.writeFileSync(this.file_path, "{}");
        }
        const stringy = fs_1.default.readFileSync(this.file_path).toString();
        try {
            this.data = JSON.parse(stringy);
        }
        catch (_a) {
            const backup_name = `broken_${new Date().toISOString()}.json`;
            const backup_path = `${this.__root}${backup_name}`;
            fs_1.default.appendFile(backup_path, stringy, function () {
                console.log(`Database file is broken, created a backup at ${backup_path}.`);
            });
            this.data = {};
        }
    }
}
exports.default = Database;
