/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */

let neura = async (m, { conn }) => {
  const { sticker } = global.db.data.users[m.sender];

  if (!sticker || Object.keys(sticker).length === 0) {
    return conn.reply(
      m.chat,
      "Anda belum memiliki perintah stiker.\nKetik *.setcmd* untuk menambahkan perintah baru.",
      m
    );
  }

  const hashList = Object.entries(sticker)
    .map(
      ([key, { locked, text }], index) =>
      `${index + 1}. ${locked ? `${key} *(Locked)*` : key} : ${text}`
    )
    .join('\n');

  const replyOptions = {
    mentions: Object.values(sticker).flatMap(({ mentionedJid }) => mentionedJid),
    smlcap: true,
    except: Object.keys(sticker),
  };

  const message = `乂 *Daftar Hash Anda:*\n${hashList}\n\n` +
    `Ketik *.delcmd all* untuk menghapus semua perintah.\n` +
    `Ketik *.delcmd [nomor]* untuk menghapus perintah tertentu.\n\n` +
    `Contoh: *.delcmd 2* untuk menghapus perintah nomor 2.`.trim();

  conn.reply(m.chat, message, m, replyOptions);
};

neura.help = ['listcmd'];
neura.tags = ["db"];
neura.command = ["listcmd"];

export default neura;