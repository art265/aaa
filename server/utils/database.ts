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
    console.log(this.file_path);
  }

  private file_path: string = this.default_path;
  private data: { [key: string]: { [key: string]: any } } = {};

  public get(table: string, value: string) {
    return this.data[table][value];
  }

  public set(table: string, value: string, data: any, cb?: Function) {
    this.data[table][value] = data;
  }

  public save() {
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
