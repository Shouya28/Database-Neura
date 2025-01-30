/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */

import fetch from "node-fetch";
async function AgentGpt(question) {
  const url = "https://mylangchain.vercel.app/api/agentchat";
  const headers = {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36",
    Referer: "https://mylangchain.vercel.app/?page=1",
  };
  const data = {
    bot: "",
    question: question,
    history: [],
    toolsSelect: [
      "Google Search", "WebPilot", "URL Reader", "Creature Generator",
      "Pinecone Store", "Medium plugin", "Filtir", "AI Agents",
      "Xpapers", "getit.ai plugins finder", "Eightify Insights",
      "Ukr-School-Books", "Welt NewsVerse", "Stories",
      "My Writing Companion", "Video Summary", "Check Website Down",
      "Paxi AI",
    ],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });
  const result = await response.text();
  const parsedResult = JSON.parse("{" + result.split("\n").slice(2, 5).join(""));
  return parsedResult.action_input;
}

const neura = async (m, { conn, args, usedPrefix, command}) => {
  if (!db.data.dbai) db.data.dbai = {};
  if (!db.data.dbai.agentgpt) db.data.dbai.agentgpt = {};

  const inputText = args.length ? args.join(" ") : m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;

  if (!inputText) return conn.reply(m.chat, `✦ *Example:* ${usedPrefix + command} Halo`, m);

  if (db.data.dbai.agentgpt[m.key.id]) return;

  db.data.dbai.agentgpt[m.key.id] = true;
  const answer = await AgentGpt(inputText);

  if (!answer) throw new Error("Response is empty or invalid.");

  await conn.reply(m.chat, `*Answer from ${command} AI:*\n`+ answer, fwa);

  db.data.dbai.agentgpt[m.sender] = { key: { id: m.key.id } };
  delete db.data.dbai.agentgpt[m.key.id];
};

neura.before = async (m, { conn }) => {
  if (!db.data.dbai?.agentgpt || m.isBaileys || !(m.sender in db.data.dbai.agentgpt)) return;

  const { key: { id: keyId } } = db.data.dbai.agentgpt[m.sender];

  if (m.quoted?.id === keyId && m.text.trim()) {
    if (db.data.dbai.agentgpt[m.key.id]) return;

    db.data.dbai.agentgpt[m.key.id] = true;
    const answer = await AgentGpt(m.text.trim());

    if (!answer) throw new Error("Response is empty or invalid.");

    await conn.reply(m.chat, `*Answer from ${command} AI:*\n` + answer, fwa);
    db.data.dbai.agentgpt[m.sender].key.id = m.key.id;
  }
};

neura.help = ["agentgpt"];
neura.tags = ["ai"];
neura.command = ["agentgpt"];
neura.error = 0;

export default neura;