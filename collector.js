import fs from "fs";
import path from "path";

/**
 * Starts message collection
 * @param {Client} client - discord.js client
 */
export function startCollector(client) {
  const dataDir = path.resolve("./data");
  const dataFile = path.join(dataDir, "messages.txt");

  // Ensure data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  client.on("messageCreate", (message) => {
    // Ignore bots
    if (message.author.bot) return;

    // Ignore empty messages
    if (!message.content || !message.content.trim()) return;

    // OPTIONAL: ignore commands (recommended)
    if (message.content.startsWith("!")) return;

    const cleanText = message.content
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    const line = `User: ${cleanText}\n`;

    fs.appendFile(dataFile, line, (err) => {
      if (err) {
        console.error("Failed to write message:", err);
      }
    });

    console.log("Collected:", cleanText);
  });

  console.log("Message collector started");
}
