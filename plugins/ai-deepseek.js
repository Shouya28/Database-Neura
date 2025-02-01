/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
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

  const res = await claude(text);
  await m.reply(`*Answer from ${command}:*\n` + res, m.chat, { quoted: m });
};

neura.help = ["deepseek"];
neura.tags = ["ai"];
neura.command = ["deepseek"];
neura.error = 0;

export default neura;

async function claude(content) {
  const { data } = await (await fetch("https://api.siputzx.my.id/api/ai/deepseek-r1?content=" + encodeURIComponent(content))).json();
  return data;
}