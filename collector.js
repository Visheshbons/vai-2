import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";
import fs from "fs";
import path from "path";

// ================= CONFIG =================

// Channels you explicitly allow collection from
const ALLOWED_CHANNELS = new Set([
  "123456789012345678", // replace with real channel IDs
]);

const DATASET_DIR = "./dataset";
const OUTPUT_FILE = path.join(DATASET_DIR, "raw_messages.jsonl");

// ==========================================

// Ensure dataset directory exists
if (!fs.existsSync(DATASET_DIR)) {
  fs.mkdirSync(DATASET_DIR, { recursive: true });
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`📥 Collector logged in as ${client.user.tag}`);
});

// ---------- Helpers ----------

function isValidMessage(msg) {
  if (!msg.content) return false;
  if (msg.content.length < 5) return false;
  if (msg.content.startsWith("!") || msg.content.startsWith("/")) return false;
  if (/^<:\w+:\d+>$/.test(msg.content)) return false; // emoji-only
  return true;
}

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, "<url>")
    .replace(/<@!?(\d+)>/g, "<user>")
    .replace(/\s+/g, " ")
    .trim();
}

// ---------- Message Collector ----------

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!ALLOWED_CHANNELS.has(message.channelId)) return;
  if (!isValidMessage(message)) return;

  const record = {
    timestamp: message.createdAt.toISOString(),
    channel: message.channelId,
    content: normalize(message.content),
  };

  fs.appendFileSync(OUTPUT_FILE, JSON.stringify(record) + "\n");
});

// ---------- Start ----------

client.login(process.env.DISCORD_TOKEN);
