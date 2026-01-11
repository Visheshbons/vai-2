import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import { setupRespond } from "./respond.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

setupRespond(client);

client.login(process.env.DISCORD_TOKEN);
