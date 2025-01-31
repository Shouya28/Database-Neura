/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */

let neura = async (m, { conn, usedPrefix, text, command }) => {
  let user = global.db.data.users[m.sender];
  if (!user || !user.sticker) return m.reply("Tidak ada perintah yang tersimpan.");

  let stickerList = Object.keys(user.sticker);

  if (!text) return m.reply(`Gunakan:\n- *${usedPrefix}delcmd <nomor>*\n- *${usedPrefix}delcmd <hash>*\n- *${usedPrefix}delcmd all*`);

  if (text.toLowerCase() === "all") {
    user.sticker = {};
    return m.reply("Semua perintah telah dihapus!");
  }

  let hash = text;
  if (m.quoted && m.quoted.fileSha256) {
    hash = m.quoted.fileSha256.toString("hex");
  }

  if (!isNaN(text)) {
    let index = parseInt(text) - 1;
    if (index < 0 || index >= stickerList.length) return m.reply("Nomor tidak valid!");
    hash = stickerList[index];
  }

  if (!user.sticker[hash]) return m.reply("Hash tidak ditemukan!");

  if (user.sticker[hash].locked) return m.reply("Kamu tidak memiliki izin untuk menghapus perintah ini.");

  delete user.sticker[hash];
  m.reply("Perintah berhasil dihapus!");
};

neura.help = ["delcmd"];
neura.tags = ["db"];
neura.command = ["delcmd"]
neura.premium = true;
neura.error = 0;

export default neura;