/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
import fetch from "node-fetch";
async function Dukun(content) {
  const url = `https://api.siputzx.my.id/api/ai/dukun?content=${encodeURIComponent(content)}`;
  const response = await fetch(url);
  const result = await response.json();
  return result.data;
}

const neura = async (m, { conn, args, usedPrefix, command }) => {
  const inputText = args.join(" ") || m.quoted?.text || null;

  if (!inputText) {
    return conn.sendMessage(
      m.chat,
      { text: `✦ *Format salah!*\n_Masukkan nama atau teks untuk bertanya kepada dukun._\n\nContoh:\n> ${usedPrefix}${command} Nama Anda` },
      { quoted: m }
    );
  }

  const response = await Dukun(inputText);

  if (!response) {
    return conn.sendMessage(
      m.chat,
      { text: "*404* Tidak dapat memproses permintaan Anda." },
      { quoted: m }
    );
  }

  await conn.reply(
    m.chat,
    `*Answer from ${command}:*\n${response}`,
    fwa
  );
};

neura.help = ["dukun"];
neura.tags = ["ai"];
neura.command = /^(dukun)$/i;
neura.error = 0;

export default neura;