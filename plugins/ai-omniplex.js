/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */

import axios from "axios";

const BASE_URL = "https://omniplex.ai/api";
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

async function omniplexAi(prompt) {
  const headers = {
    origin: BASE_URL.replace("/api", ""),
    "user-agent": USER_AGENT,
    "Content-Type": "application/json",
  };

  const chatJSON = {
    frequency_penalty: 0,
    max_tokens: 512,
    messages: [
      { role: "system", content: "You are an AI Assistant created by Ryzxell, your name is Neura, your speech style is just like a human, If someone asks who the current president of Indonesia is, you answer the current president of Indonesia, Prabowo Subianto." },
      { role: "user", content: prompt },
    ],
    model: "gpt-3.5-turbo",
    presence_penalty: 0,
    temperature: 1,
    top_p: 1,
  };

  const response = await axios.post(`${BASE_URL}/chat`, chatJSON, { headers });

  if (!response.data) {
    console.error("Tidak ada data yang diterima dari Omniplex AI.");
    return null;
  }

  return response.data;
}

const neura = async (m, { args, usedPrefix, command }) => {
  const cmdText = args.length > 0 ? args.join(" ") : "";
const replyText = m.quoted?.text || m.quoted?.caption || m.quoted?.description || "";

const text = [cmdText, replyText].filter(Boolean).join(" ").trim();

if (!text) {
  return m.reply(
    `✦ *Format salah !*\n\n*Masukkan teks atau balas pesan yang ingin*\n*kamu tanyakan kepada ${command}*\n\n> Contoh:\n> ${usedPrefix + command} Halo sahabat`);
};

  const res = await omniplexAi(text);
  await m.reply(`*Answer from ${command}:*\n${res}`, m.chat, { quoted: fwa });
};

neura.command = ["omniplex"];
neura.tags = ["ai"];
neura.help = ["omniplex"];
neura.error = 0;

export default neura;