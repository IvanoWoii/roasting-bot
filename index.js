require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const token = process.env.DISCORD_TOKEN;

if (!token) {
  console.error("Missing DISCORD_TOKEN in .env file.");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const randomRoasts = [
  "you move like your Wi-Fi is connected through a potato.",
  "your ideas are in beta and somehow still outdated.",
  "you bring loading-screen energy to every conversation.",
  "your confidence is 4K, but your execution is 144p.",
  "you type fast and still miss the point.",
  "you're the human version of a nearly-full recycle bin.",
  "you have premium confidence with trial-version results.",
  "you plan like a genius and deploy like a chaos monkey.",
  "your logic has more plot twists than a soap opera.",
  "you talk like a mentor but debug like an intern."
];

function sanitizeDescription(input) {
  return input
    .replace(/@everyone/gi, "[everyone]")
    .replace(/@here/gi, "[here]")
    .slice(0, 220)
    .trim();
}

function buildContextRoast(targetMention, description) {
  return `${targetMention}, about "${description}" — bold strategy, but it still sounds like a bug report written in panic mode.`;
}

client.once("ready", () => {
  console.log(`Bot is online as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!l")) return;

  const target = message.mentions.users.first();

  if (!target) {
    await message.reply("Usage: `!l @user (optional description)`");
    return;
  }

  const rawDescription = message.content
    .replace(/^!l\s+<@!?\d+>\s*/i, "")
    .trim();
  const description = sanitizeDescription(rawDescription);

  if (!description) {
    const pick = randomRoasts[Math.floor(Math.random() * randomRoasts.length)];
    await message.channel.send(`${target}, ${pick}`);
    return;
  }

  await message.channel.send(buildContextRoast(target.toString(), description));
});

client.login(token);
