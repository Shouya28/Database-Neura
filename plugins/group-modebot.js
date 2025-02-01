/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
const neura = async (m, { conn, text, usedPrefix, command }) => {
  const chat = global.db.data.chats[m.chat];
  
  if (!m.isGroup) return;
  const lowerText = text.toLowerCase();

  if (['off', 'mute'].includes(lowerText)) {
    if (chat.mute) {
      return;
    }
    chat.mute = true;
    await conn.reply(m.chat, '✓ *Bot telah dinonaktifkan di grup ini*.', m);
  } else if (['on', 'unmute'].includes(lowerText)) {
    if (!chat.mute) {
      return;
    }
    chat.mute = false;
    await conn.reply(m.chat, '✓ *Bot telah diaktifkan kembali di grup ini*.', m);
  } else {
    await conn.reply(
      m.chat,
      `*Format perintah salah!*\n\nContoh penggunaan:\n${usedPrefix}${command} on\n${usedPrefix}${command} off`,
      m
    );
  }
};

neura.help = ['botmode'];
neura.tags = ['group'];
neura.command = ["botmode", "modebot"]
neura.group = true;
neura.admin = true;

export default neura;