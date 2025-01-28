/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */

import { performance } from "perf_hooks";

const neura = async (m, { conn }) => {
  const start = performance.now();
  const { key } = await conn.sendMessage(m.chat, { text: "> ..." }, { quoted: fwa });
  const speed = Math.round(performance.now() - start);
  await conn.sendMessage(m.chat, { text: `> Neura on !!\n${speed}ms`, edit: key }, { quoted: fwa });
};
neura.help = ["tes"];
neura.tags = ["info"];
neura.command = [".", "tes"];

export default neura;