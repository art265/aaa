// Description: A tiny JSON-based database to store data.
// Author: Jareer Abdullah
// License: MIT

import fs from "fs";
import path from "path";

class Database {
  private default_path = `${__dirname.replace(
    path.basename(__dirname),
    ""
  )}/database.json`;

  constructor(file_path?: string) {
    this.file_path = file_path || this.default_path;
    this.__init__();
  }

  private file_path: string = this.default_path;
  private data: { [key: string]: { [key: string]: any } } = {};

  public delete = (table: string, value: string, callback: Function) => {
    if (this.data[table] && this.data[table][value]) {
      delete this.data[table][value];
      this.___save__();
      callback();
    }
  };

  public get(table: string, value: string) {
    return this.data[table][value];
  }

  public getAll(table: string) {
    return this.data[table];
  }

  public set(table: string, value: string, data: any, callback: Function) {
    if (this.data[table] == null) {
      this.data[table] = {};
    }

    this.data[table][value] = data;
    this.___save__();

    callback();
  }

  private ___save__() {
    fs.writeFileSync(this.file_path, JSON.stringify(this.data));
  }

  private __init__() {
    if (!fs.existsSync(this.file_path)) {
      fs.writeFileSync(this.file_path, "{}");
    }
    this.data = JSON.parse(fs.readFileSync(this.file_path).toString());
  }
}

export default Database;
