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

const neura = async (m, { text, usedPrefix, command }) => {
  // Jika pengguna membalas pesan dan tidak ada teks yang diberikan
  if (m.quoted && !text) {
    text = m.quoted.text; // Gunakan teks dari pesan yang dibalas
  }

  // Jika tidak ada teks yang diberikan dan tidak ada pesan yang dibalas
  if (!text) {
    return m.reply(
      `✦ *Format salah !*

*Masukkan teks atau balas pesan yang ingin*
*kamu tanyakan kepada ${command}*

> Contoh:
> ${usedPrefix + command} Halo`, m.chat, { quoted: m });
  }

  const ai = new AI();
  const res = await ai.GoodyAI(text);

  if (res) {
    await m.reply(`*Jawaban dari ${command}:*\n` + res, m.chat, { quoted: m });
  } else {
    console.error("Tidak ada respons dari GoodyAI");
    await m.reply("Terjadi kesalahan saat memproses permintaan", m.chat, { quoted: m });
  }
}

neura.command = ['goody'];
neura.tags = ['ai'];
neura.help = ['goody'];
neura.error = 0;

export default neura;