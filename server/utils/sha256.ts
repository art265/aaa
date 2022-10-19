import crypto from "crypto";

class Sha256 {
  public hash = (value: string, type: "hex" | "base64" = "hex"): string => {
    return crypto.createHash("sha256").update(value).digest(type);
  };
}

export default new Sha256();
