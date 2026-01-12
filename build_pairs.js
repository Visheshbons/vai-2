import fs from "fs";

const lines = fs
  .readFileSync("dataset/raw_messages.jsonl", "utf-8")
  .trim()
  .split("\n")
  .map((l) => JSON.parse(l));

const WINDOW = 3;
const pairs = [];

for (let i = WINDOW; i < lines.length; i++) {
  const prompt = lines
    .slice(i - WINDOW, i)
    .map((m) => m.content)
    .join("\n");

  const response = lines[i].content;

  pairs.push({ prompt, response });
}

fs.writeFileSync(
  "dataset/pairs.jsonl",
  pairs.map((p) => JSON.stringify(p)).join("\n"),
);
