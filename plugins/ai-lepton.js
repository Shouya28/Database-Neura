/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
import axios from "axios";
import _ from "lodash";

class AI {
  constructor() {
    this.api = axios.create({
      baseURL: "https://search.lepton.run/api/",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  generateRandomID = (length) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    return _.sampleSize(characters, length).join("");
  };

  leptonAi = async (query) => {
    const rid = this.generateRandomID(10);
    const postData = { query: query, rid: rid };
    const response = await this.api.post("query", postData);
    const llmResponseRegex = /__LLM_RESPONSE__([\s\S]*?)__RELATED_QUESTIONS__/;
    const llmResponseMatch = response.data.match(llmResponseRegex);

    if (llmResponseMatch?.[1]) {
      return llmResponseMatch[1].trim();
    }
    throw new Error("No LLM response found.");
  };
}

const ai = new AI();
const neura = async (m, { args, usedPrefix, command }) => {
  const cmdText = args.length > 0 ? args.join(" ") : "";
const replyText = m.quoted?.text || m.quoted?.caption || m.quoted?.description || "";

const text = [cmdText, replyText].filter(Boolean).join(" ").trim();

if (!text) {
  return m.reply(
    `✦ *Format salah !*\n\n*Masukkan teks atau balas pesan yang ingin*\n*kamu tanyakan kepada ${command}*\n\n> Contoh:\n> ${usedPrefix + command} Halo`);
};

  const res = await ai.leptonAi(text);
  await m.reply(`*Answer from ${command} AI:*\n` + res, m.chat, { quoted: fwa });
};

neura.command = ['lepton'];
neura.tags = ['ai'];
neura.help = ['lepton'];
neura.limit = true;
neura.error = 0;

export default neura;