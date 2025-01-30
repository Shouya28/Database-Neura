/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
import fetch from "node-fetch";

const neura = async (m, { conn, args, usedPrefix, command }) => {

  const cmdText = args.length > 0 ? args.join(" ") : "";
  const replyText = m.quoted?.text || m.quoted?.caption || m.quoted?.description || "";

  const text = [cmdText, replyText].filter(Boolean).join(" ").trim();
  
  if (!text) {
    return m.reply(
      `✦ *Format salah !*\n\n*Masukkan teks atau balas pesan yang ingin*\n*kamu tanyakan kepada ${command}*\n\n> Contoh:\n> ${usedPrefix + command} Halo`);
  };
  
  const res = await groq(text);
  await m.reply(`*Jawaban dari ${command}:*\n` + res, m.chat, { quoted: fwa });
};

neura.help = ["aigroq"];
neura.tags = ["ai"];
neura.command = ["aigroq"];
neura.error = 0;

export default neura;

async function groq(q) {
  const { data } = await (await fetch("https://api-zenn.vercel.app/api/ai/groq?q=" + encodeURIComponent(q))).json();
  return data;
}