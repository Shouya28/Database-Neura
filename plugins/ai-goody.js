/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
import axios from "axios";

class AI {
  constructor() {
    this.headersGoody = {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br, zstd",
      "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,af;q=0.6",
      "Content-Type": "application/json",
      Origin: "https://www.goody2.ai",
      Referer: "https://www.goody2.ai/chat",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
    };
  }

  GoodyAI = async (q) => {
    const params = {
      message: q,
      debugParams: null
    };
    const response = await axios.post("https://www.goody2.ai/send", params, {
      headers: this.headersGoody,
      responseType: "stream"
    });

    if (!response.data) {
      console.error("No data received from GoodyAI");
      return "";
    }

    return new Promise((resolve, reject) => {
      let fullText = "";
      response.data.on("data", (chunk) => {
        const lines = chunk.toString().split("\n");
        for (let line of lines) {
          if (line.startsWith('data: {"content":')) {
            const jsonString = line.slice(6);
            const parsed = JSON.parse(jsonString);
            if (parsed && parsed.content) {
              fullText += parsed.content;
            } else {
              console.error("Invalid JSON structure:", parsed);
            }
          }
        }
      });

      response.data.on("end", () => {
        resolve(fullText);
      });

      response.data.on("error", (err) => {
        console.error("Stream error:", err);
        reject(err);
      });
    });
  };
}

const neura = async (m, { args, usedPrefix, command }) => {
const cmdText = args.length > 0 ? args.join(" ") : "";
const replyText = m.quoted?.text || m.quoted?.caption || m.quoted?.description || "";

const text = [cmdText, replyText].filter(Boolean).join(" ").trim();

  if (!text) {
    return m.reply(
      `✦ *Format salah !*\n\n*Masukkan teks atau balas pesan yang ingin*\n*kamu tanyakan kepada ${command}*\n\n> Contoh:\n> ${usedPrefix + command} Halo`);
  };

  const ai = new AI();
  const res = await ai.GoodyAI(text);
  
    await m.reply(`*Jawaban dari ${command}:*\n` + res, m.chat, { quoted: fwa });
};

neura.command = ['goody'];
neura.tags = ['ai'];
neura.help = ['goody'];
neura.error = 0;

export default neura;