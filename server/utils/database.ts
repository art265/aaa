// Description: A tiny JSON-based database to store data.
// Author: Jareer Abdullah
// License: MIT

import fs from "fs";
import "dotenv/config";
import path from "path";

class Database {
  private __root = __dirname.replace(path.basename(__dirname), "");
  private default_path = `${this.__root}/database.json`;
  private default_data = {
    users: {},
    webhooks: {},
    instances: {},
    ram_usage: {},
    cpu_usage: {},
  };

  constructor(file_path?: string) {
    this.file_path = file_path || this.default_path;
    this.__init__();
  }

  private file_path: string = this.default_path;
  private data: {
    ["users"]: any;
    ["webhooks"]: any;
    ["instances"]: any;
    [key: string]: any;
  } = this.default_data;

  public delete = (table: string, value: string, callback: Function) => {
    if (this.data[table] && this.data[table][value]) {
      delete this.data[table][value];

      this.___save__();
      callback();
    }
  };

  public deleteByKey(
    table: string,
    key: string,
    value: string,
    callback: Function
  ) {
    const table_data = this.data[table] || {};
    const keys = Object.keys(table_data) || [];

    for (let x = 0; x < keys.length; x++) {
      const key_ = keys[x];

      if (table_data[key_][key] === value) delete this.data[table][key_];
    }

    this.___save__();
    callback();
  }

  public get(table: string, value: string) {
    return (this.data[table] || {})[value];
  }

  public getAll(table: string) {
    return this.data[table];
  }

  public getByKey(table: string, key: string, value: string) {
    const table_data = this.data[table] || {};
    const keys = Object.keys(table_data) || [];

    for (let x = 0; x < keys.length; x++) {
      const key_ = keys[x];

      if (table_data[key_][key] === value) {
        return {
          id: key_,
          ...table_data[key_],
        };
      }
    }
  }

  public getMultiByKey(table: string, key: string, value: string) {
    const table_data = this.data[table] || {};
    const keys = Object.keys(table_data) || [];
    const final = [];

    for (let x = 0; x < keys.length; x++) {
      const key_ = keys[x];

      if (table_data[key_][key] === value) {
        final.push({
          id: key_,
          ...table_data[key_],
        });
      }
    }

    return final;
  }

  public setByKey(
    table: string,
    key: string,
    value: any,
    data: any,
    callback: Function
  ) {
    const table_data = this.data[table] || {};
    const keys = Object.keys(table_data) || [];

    for (let x = 0; x < keys.length; x++) {
      const key_ = keys[x];

      if (table_data[key_][key] === value) this.data[table][key_] = data;
    }

    this.___save__();
    callback();
  }

  public set(table: string, value: string, data: any, callback: Function) {
    if (this.data[table] == null) this.data[table] = {};

    this.data[table][value] = data;
    this.___save__();

    callback(this.data[table][value]);
  }

  private ___save__() {
    fs.writeFileSync(this.file_path, JSON.stringify(this.data));
  }

  private __init__() {
    if (!fs.existsSync(this.file_path))
      fs.writeFileSync(this.file_path, JSON.stringify(this.default_data));

    const stringy = fs.readFileSync(this.file_path).toString();

    try {
      this.data = JSON.parse(stringy);
    } catch {
      const backup_name = `broken_${new Date().toISOString()}.json`;
      const backup_path = `${this.__root}${backup_name}`;

      fs.appendFile(backup_path, stringy, function () {
        console.log(
          `Database file is broken, created a backup at ${backup_path}.`
        );
      });

      this.data = this.default_data;
    }
  }
}

export default new Database();
