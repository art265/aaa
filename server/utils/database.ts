// Description: A tiny JSON-based database to store data.
// Author: Jareer Abdullah
// License: MIT

import fs from "fs";

class Database {
  private path: string = "./data.json";
  private data: { [key: string]: { [key: string]: any } } = {};

  constructor(path: string) {
    this.path = path;
  }

  public get(table: string, value: string) {
    return this.data[table][value];
  }

  public set(table: string, value: string, data: any) {
    this.data[table][value] = data;
  }

  public save() {
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

export default Database;
