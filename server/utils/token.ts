// Generate User Token

export function GenerateToken(length: number) {
  let chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
  let str = "";

  while (str.length < length) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }

  return str;
}
