/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */

import fetch from "node-fetch";

const API_URL = "https://yw85opafq6.execute-api.us-east-1.amazonaws.com/default/boss_mode_15aug";
const USER_AGENT = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Mobile Safari/537.36";

async function Ai4Chat(prompt) {
  const url = new URL(API_URL);
  url.search = new URLSearchParams({
    text: prompt,
    country: "Asia",
    user_id: "IWgCVHgf4N",
  }).toString();

  const response = await fetch(url, {
    headers: {
      "User-Agent": USER_AGENT,
      "Referer": "https://www.ai4chat.co/pages/riddle-generator",
    },
  });

  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`);
    return null;
  }

  const data = await response.text();
  return JSON.parse(data);
}

const neura = async (m, { conn, args, usedPrefix, command }) => {
  if (!db.data.dbai) db.data.dbai = {};
  if (!db.data.dbai.ai4chat) db.data.dbai.ai4chat = {};

  const inputText = args.length ?
    args.join(" ") :
    m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;

  if (!inputText) {
    return conn.reply(m.chat,
      `✦ *Format salah !*\n\n` +
      `*Masukan teks atau reply pesan yang ingin*\n` +
      `*kamu tanyakan kepada ai4chat*\n\n` +
      `> Example:\n` +
      `> ${usedPrefix}${command} Halo`,
      m
    );
  }

  const answer = await Ai4Chat(inputText);
  if (!answer) {
    return conn.reply(m.chat, `*404* Gagal mendapatkan jawaban dari ${command}.`, fwa);
  }

  const { key } = await conn.reply(
    m.chat,
     `*Answer from ${command}:*\n${answer}`,
    fwa
  );

  db.data.dbai.ai4chat[m.sender] = { key: { id: key.id } };
};

neura.before = async (m, { conn, command }) => {
  if (
    !db.data.dbai?.ai4chat ||
    m.isBaileys ||
    !(m.sender in db.data.dbai.ai4chat)
  ) {
    return;
  }

  const prevKeyId = db.data.dbai.ai4chat[m.sender]?.key?.id;

  if (m.quoted?.id === prevKeyId && m.text?.trim()) {
    const answer = await Ai4Chat(m.text.trim());
    if (!answer) {
      return conn.reply(m.chat, `*404* Gagal mendapatkan jawaban dari ${command}.`, fwa);
    }

    const { key } = await conn.reply(
      m.chat,
      `*Answer from ${command}:*\n${answer}`,
      fwa
    );

    db.data.dbai.ai4chat[m.sender].key.id = key.id;
  }
};

neura.help = ["ai4chat"];
neura.tags = ["ai"];
neura.command = ["ai4chat", "aichat"]
neura.error = 0;

export default neura