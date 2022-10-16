import crypto from "crypto";

class Sha256 {
  public hash = (value: string): string => {
    return crypto.createHash("sha256").update(value).digest("hex");
  };
}

export default new Sha256();
