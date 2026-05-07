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

const subjects = [
  "vibes",
  "attitude",
  "cara ngomong",
  "confidence",
  "ego",
  "konsistensi",
  "mood",
  "effort",
  "sense of humor",
  "cara ngeles",
  "cara pamer",
  "tempo",
  "keputusan",
  "prioritas",
  "cara ngegas",
  "fokus",
  "logika",
  "strategi",
  "eksekusi",
  "problem solving"
];

const intros = [
  "literally kayak",
  "jujurly kayak",
  "lowkey mirip",
  "highkey se-level sama",
  "vibes-nya kayak",
  "nggak jauh dari",
  "jatuhnya tuh kayak",
  "serasa",
  "bentuknya tuh mirip",
  "se-random sama",
  "kayak banget",
  "mirip parah sama"
];

const punchlines = [
  "beta feature yang dilempar ke production pas malem Jumat.",
  "loading bar nyangkut di 99% terus ngilang.",
  "tutorial yang di-skip pas step paling krusial.",
  "patch note bilang fix, bugnya tetep ngegas.",
  "sinyal Wi-Fi 5 bar tapi koneksi jiwa 1 bar.",
  "tugas kelompok yang semua ngilang pas deadline.",
  "speedrun tapi semua jalan salah dicoba.",
  "MVP yang lupa V sama P.",
  "deploy yang ketahan lakban dan optimisme doang.",
  "error message yang pede banget padahal salah.",
  "presentasi panjang tapi inti pesan hilang.",
  "alarm yang snooze-nya lebih rajin dari bangunnya.",
  "chat grup yang isinya cuma 'up'.",
  "UI cakep tapi tiap klik error.",
  "review bintang satu gara-gara 'gak ngerti'.",
  "kamera 4K tapi fokusnya selalu ngaco.",
  "shortcut katanya cepat tapi muter-muter.",
  "OTP yang dateng pas udah gak butuh.",
  "peta lengkap tapi arah tetep kebalik.",
  "podcast 2 jam tapi pesan utamanya nyasar.",
  "autofill yang selalu salah akun.",
  "charger kenceng tapi colokan goyang.",
  "komen 'mantap' padahal belum baca.",
  "kue ulang tahun tanpa lilin.",
  "lag parah pas lagi dibutuhin.",
  "mode hemat yang malah boros.",
  "resume rapi tapi isinya angin.",
  "download cepat tapi filenya corrupt.",
  "notifikasi rame tapi gak ada yang penting.",
  "voice note 7 menit tapi intinya 'yaudah'.",
  "deadline mepet tapi lo masih chill.",
  "thread panjang tapi fact check nol.",
  "story tiap jam tapi progress nol.",
  "promo gede tapi syaratnya 12 halaman."
];

const closers = [
  "Maaf ya bestie, tapi faktanya begitu.",
  "Relax, ini cuma roast.",
  "No offense, tapi ini kebaca banget.",
  "Gue cuma bilangin yang obvious.",
  "Take it easy, masih bisa upgrade.",
  "Sabar ya, lo tetep manusia.",
  "Lucu sih, tapi kejadian.",
  "Jangan baper, ini for fun doang.",
  "Tenang, ini bukan report resmi.",
  "Yaudah, next time lebih niat."
];

const genericRoasts = [
  "vibes lo tuh kayak notif penting tapi kosong.",
  "ego lo sewa penthouse, effort lo masih kos-kosan.",
  "confidence lo 4K, output lo 144p.",
  "ngomong lo mahal, aksi lo diskon.",
  "lo aktif di chat, pas progress malah AFK.",
  "planning lo aesthetic, eksekusi lo arang.",
  "attitude lo highkey, accountability lo lowkey.",
  "lo tuh suka ngegas, tapi bensin tinggal 1 bar.",
  "energy lo muncul pas rame, konsistensi lo ghosting.",
  "lo review orang pedes, tapi self-review skip.",
  "katanya fokus, tapi 5 menit sekali scroll.",
  "bilang sibuk, padahal lagi buffering.",
  "janji lo full HD, hasil lo blur.",
  "serius lo kuat, tapi buktinya lemah."
];

const contextRoasts = [
  "{target}, soal \"{desc}\"... itu kedengeran keren, tapi hasilnya masih {material} versi trial.",
  "{target}, yang \"{desc}\" itu vibes-nya wow, deliver-nya kok draft pertama.",
  "{target}, ngomong \"{desc}\" doang mah gampang, yang susah tuh beneran kejadian.",
  "{target}, \"{desc}\" katanya siap, tapi realitanya masih anget-anget start.",
  "{target}, bagian \"{material}\" dari \"{desc}\" tuh ikonik, sayangnya ikoniknya karena fail.",
  "{target}, \"{desc}\" itu highkey pede, lowkey belum ready.",
  "{target}, soal \"{desc}\", lo gas terus tapi arah belum jelas.",
  "{target}, \"{desc}\" vibes-nya mewah, eksekusinya promo palsu.",
  "{target}, \"{desc}\" tuh kedengeran epic, tapi realitanya antiklimaks.",
  "{target}, \"{desc}\" jadi bukti kalau niat doang gak cukup.",
  "{target}, \"{desc}\" keliatan sibuk, output-nya belum kelihatan.",
  "{target}, \"{desc}\" di kepala lo udah rilis, di real life masih beta."
];

function sanitizeDescription(input) {
  return input
    .replace(/@everyone/gi, "[everyone]")
    .replace(/@here/gi, "[here]")
    .slice(0, 220)
    .trim();
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function extractDescriptionMaterial(description) {
  const words = description
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= 4);

  if (words.length === 0) return "bagian itu";
  return words.slice(0, 3).join(" ");
}

function fillTemplate(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] || "");
}

function buildRandomRoast(targetMention) {
  const subject = pickRandom(subjects);
  const intro = pickRandom(intros);
  const punchline = pickRandom(punchlines);
  const closer = pickRandom(closers);
  const generated = `${targetMention}, ${subject} lo ${intro} ${punchline} ${closer}`;
  const listed = `${targetMention}, ${pickRandom(genericRoasts)}`;
  return pickRandom([generated, listed]);
}

function buildContextRoast(targetMention, description) {
  const subject = pickRandom(subjects);
  const intro = pickRandom(intros);
  const punchline = pickRandom(punchlines);
  const closer = pickRandom(closers);
  const material = extractDescriptionMaterial(description);
  const generated = `${targetMention}, soal "${description}"... ${subject} lo ${intro} ${punchline} Yang bagian "${material}" tuh paling kerasa. ${closer}`;
  const listed = fillTemplate(pickRandom(contextRoasts), {
    target: targetMention,
    desc: description,
    material
  });
  return pickRandom([generated, listed]);
}

client.once("ready", () => {
  console.log(`Bot is online as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith("!l")) return;

  const target = message.mentions.users.first();

  if (!target) {
    await message.reply("Cara pakai: `!l @user (deskripsi opsional)`");
    return;
  }

  const rawDescription = message.content
    .replace(/^!l\s+<@!?\d+>\s*/i, "")
    .trim();
  const description = sanitizeDescription(rawDescription);

  if (!description) {
    await message.channel.send(buildRandomRoast(target.toString()));
    return;
  }

  await message.channel.send(buildContextRoast(target.toString(), description));
});

client.login(token);
