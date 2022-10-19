import fs from "fs";
import "dotenv/config";
import path from "path";
import fse from "fs-extra";

const __root = __dirname.replace(path.basename(__dirname), "");

const storage_dir = process.env.INSTANCE_FILE_STORAGE as string;
const storage_path = `${__root}${storage_dir}`;

if (fs.existsSync(storage_path) == false) fs.mkdirSync(storage_path);

class Templates {
  private node_template = `${__root}/templates/node`;
  private py_template = `${__root}/templates/python`;

  Create(instance_path: string, type: "Node" | "Python", callback: Function) {
    if (fs.existsSync(`${storage_path}/${instance_path}`)) return false;

    switch (type) {
      case "Node":
        fse.copy(
          this.node_template,
          `${storage_path}/${instance_path}`,
          (err) => {
            callback(err);
          }
        );
        break;

      case "Python":
        fse.copy(
          this.py_template,
          `${storage_path}/${instance_path}`,
          (err) => {
            callback(err);
          }
        );
        break;
    }
  }
}

export default Templates;
