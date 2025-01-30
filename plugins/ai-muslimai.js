/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
import axios from 'axios';

const headers = {
  'authority': 'www.muslimai.io',
  'content-type': 'application/json',
  'user-agent': 'Postify/1.0.0'
};

const muslimai = {
  search: async (query) => {
    const cari = await axios.post('https://www.muslimai.io/api/search', { query }, { headers });
    const passages = cari.data.map(result => result.content).join("\n\n");

    const jawaban = await axios.post('https://www.muslimai.io/api/answer', {
      prompt: `Use the following passages to answer the query to the best of your ability as a world class expert in the Quran. Do not mention that you were provided any passages in your answer in Indonesian: ${query}\n\n${passages}`
    }, { headers });

    return {
      creator: 'Ryzxell',
      status: 'success',
      code: 200,
      data: { search: cari.data, answer: jawaban.data }
    };
  }
};

const neura = async (m, { args, conn, command, usedPrefix }) => {
  const cmdText = args.length > 0 ? args.join(" ") : "";
const replyText = m.quoted?.text || m.quoted?.caption || m.quoted?.description || "";

const text = [cmdText, replyText].filter(Boolean).join(" ").trim();

if (!text) {
  return m.reply(
    `✦ *Format salah !*\n\n*Masukkan teks atau balas pesan yang ingin*\n*kamu tanyakan kepada ${command}*\n\n> Contoh:\n> ${usedPrefix + command} Halo sahabat`);
};

    const result = await muslimai.search(text);
    const { answer } = result.data;
    await m.reply(`*Answer from ${command}:*\n` + answer, m.chat, { quoted: fwa });
};

neura.command = ['muslimai'];
neura.help = ['muslimai'];
neura.tags = ['islamic', 'ai'];
neura.error = 0;

export default neura;