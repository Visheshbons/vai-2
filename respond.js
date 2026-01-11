const PREFIX = "!";

export function setupRespond(client) {
  async function generateReply(userText, message) {
    return userText; // echo for now
  }

  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    console.log("User message:", message.content);

    if (!message.content?.startsWith(PREFIX)) return;

    const userText = message.content.slice(PREFIX.length).trim();
    if (!userText) return;

    await message.channel.send(userText);
  });
}
