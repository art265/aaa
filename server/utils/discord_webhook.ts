import fetch from "node-fetch";

class DiscordWebhook {
  private webhook: string;
  private HexToDecimal = (hex: string) => {
    return parseInt(hex, 16);
  };

  constructor(webhook: string) {
    this.webhook = webhook;
  }

  public async Test() {
    return new Promise((res, rej) => {
      fetch(this.webhook, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "Centauri",
          embeds: [
            {
              color: this.HexToDecimal("4287F5"),
              description:
                "[Centauri](https://github.com/jareer12/Centauri) - Discord webhook works.",
            },
          ],
        }),
      })
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
}

export default DiscordWebhook;
