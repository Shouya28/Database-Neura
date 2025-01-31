/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
let neura = async (m, { conn, text, usedPrefix, command }) => {
  if (!m.quoted) return m.reply("Reply Sticker!");
  if (!m.quoted.fileSha256) throw "SHA256 Hash Missing";
  let sticker = global.db.data.users[m.sender].sticker;
  let hash = m.quoted.fileSha256.toString("hex");
  if (!(hash in sticker)) return m.reply("Hash not found in database");
  sticker[hash].locked = !/^un/i.test(command);
  m.reply("Done!");
};
neura.help = ["unlockcmd", "lockcmd"];
neura.tags = ["db"];
neura.command = ["lockcmd", "unlockcmd"]
neura.premium = true; 
neura.error = 0;

export default neura;