import PM2 from "pm2";
import { uuid } from "./uuid";

export interface ResourcesUsageOptions {
  timeout?: number;
}

class ResourcesUsage {
  private options: ResourcesUsageOptions;

  constructor(options: ResourcesUsageOptions) {
    this.options = options;

    setInterval(() => {
      this.$getAsync()
        .then((data) => {
          console.log(
            data.map((ps) => {
              return {
                name: ps.name,
                cpu: ps.monit.cpu,
                memory: ps.monit.memory,
              };
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }, this.options.timeout);
  }

  $getAsync(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      PM2.list((err, list) => {
        if (err) {
          reject({
            Success: false,
            Message: err,
          });
        } else {
          resolve(list);
        }
      });
    });
  }

  $storeAsync() {}
}

export default new ResourcesUsage({
  timeout: 1000,
});
