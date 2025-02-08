/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
import fetch from "node-fetch";
const userStates = {};

const neura = async (m, { conn, text, command, usedPrefix }) => {
  const sender = m.sender;

  if (!text) return await conn.reply(m.chat, `[!] *Wrong input*\n\nEx : ${usedPrefix + command} bmw`, m);

  try {
    if (/^\d+$/.test(text)) {
      const selectedNumber = parseInt(text);
      const state = userStates[sender];
      if (!state) {
        return await m.reply("Anda belum melakukan pencarian sebelumnya. Silakan ketik `.ttsearch <query>` terlebih dahulu.");
      }

      if (isNaN(selectedNumber) || selectedNumber < 1 || selectedNumber > state.results.length) {
        return await m.reply(`Nomor yang Anda pilih tidak valid. Hanya tersedia ${state.results.length} hasil.`);
      }

      const selectedVideo = state.results[selectedNumber - 1];

      await conn.sendFile(
        m.chat, 
        selectedVideo.media.no_watermark, 
        'video.mp4', 
        `🎥 *Judul:* ${selectedVideo.title}`,
        m 
      );
      delete userStates[sender];
      return;
    }

    await m.reply(wait);
    const response = await fetch(`https://api.diioffc.web.id/api/search/tiktok?query=${encodeURIComponent(text)}`);
    const data = await response.json();

    if (!data.result || data.result.length === 0) {
      return await conn.reply(m.chat, "No results found for the given query.", m);
    }

    let listMessage = `*[ TIKTOK SEARCH RESULTS ]*\n*Query:* ${text}\n\n`;
    data.result.slice(0, 5).forEach((video, index) => {
      listMessage += `${index + 1}. ${video.title}\n`;
    });

    listMessage += `\nPilih nomor video dengan mengetik: ${usedPrefix + command} <nomor> (contoh: ${usedPrefix + command} 1)`;

    await m.reply(listMessage);
    userStates[sender] = {
      chatId: m.chat,
      results: data.result.slice(0, 5),
    };

  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, `Error: ${error.message}`, m);
  }
};

neura.help = ["tiktoksearch"];
neura.tags = ["dl"];
neura.command = ["tiktoksearch", "ttsearch"];
neura.limit = true;

export default neura;