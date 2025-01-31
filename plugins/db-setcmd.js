/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
let neura = async (m, { conn, text, usedPrefix, command }) => {
  if (!m.quoted) return m.reply(`Balas stiker dengan perintah *${usedPrefix + command}*`);
  if (!m.quoted.fileSha256) return m.reply("SHA256 Hash Missing");
  if (!text) return m.reply(`Penggunaan:\n${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} tes`);

  let user = global.db.data.users[m.sender];
  let sticker = user.sticker || (user.sticker = {});
  let hash = m.quoted.fileSha256.toString("base64");

  if (sticker[hash] && sticker[hash].locked && sticker[hash].creator !== m.sender) {
    return m.reply("Kamu tidak memiliki izin untuk mengubah perintah stiker ini");
  }

  sticker[hash] = {
    text,
    mentionedJid: m.mentionedJid,
    creator: m.sender,
    at: +new Date(),
    locked: sticker[hash]?.locked || false, 
  };

  m.reply("✓ *Succes!*");
};

neura.help = ["setcmd"];
neura.tags = ["db"];
neura.command = ["setcmd"];
neura.premium = true;
neura.error = 0;

export default neura;