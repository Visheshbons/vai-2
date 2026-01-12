import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";

const PREFIX = "!";

export function startRespondBot() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once("ready", () => {
    console.log(`🤖 Respond module logged in as ${client.user.tag}`);
  });

  async function generateReply(userText, message) {
    // Placeholder — AI goes here later
    return userText;
  }

  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (!message.content) return;
    if (!message.content.startsWith(PREFIX)) return;

    const userText = message.content.slice(PREFIX.length).trim();

    if (!userText) return;

    const reply = await generateReply(userText, message);
    if (!reply) return;

    await message.channel.send(reply);
  });

  client.login(process.env.DISCORD_TOKEN);
}
