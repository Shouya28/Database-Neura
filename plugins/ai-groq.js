/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
import fetch from "node-fetch";

const neura = async (m, { conn, args, usedPrefix, command }) => {
  const text = args.length >= 1 ?
    args.slice(0).join(" ") :
    m.quoted?.text || m.quoted?.caption || m.quoted?.description || null;

  if (!text) return m.reply(
    `✦ *Format salah !*\n\n*Masukan teks atau reply pesan yang ingin*\n*kamu tanyakan kepada ${command}*\n\n> Example:\n> ${usedPrefix + command} Halo`,
    m.chat, { quoted: m }
  );

  const res = await groq(text);
  await m.reply(`*Answer from ${command}:*\n` + res, m.chat, { quoted: fwa });
};

neura.help = ["aigroq"];
neura.tags = ["ai"];
neura.command = ["aigroq"]
neura.error = 0;

export default neura;

async function groq(q) {
  const { data } = await (await fetch("https://api-zenn.vercel.app/api/ai/groq?q=" + q)).json();
  return data;
}