/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
const neura = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`
    Contoh penggunaan:\n${usedPrefix + command} aku siapa? @62895324429899 Gatau`)
  }

  const mentionIndex = text.indexOf('@');
  if (mentionIndex === -1) {
    return;
  }

  const beforeMention = text.slice(0, mentionIndex).trim();
  const afterMention = text.slice(mentionIndex).trim();
  const mentionMatch = afterMention.match(/^@(\d+)/);
  if (!mentionMatch) {
    return;
  }

  const mentionedNumber = mentionMatch[1] + '@s.whatsapp.net';
  const [fakeMessage, ...realMessageParts] = afterMention.split(' ');
  const realMessage = realMessageParts.join(' ').trim();

  await conn.fakeReply(
    m.chat,
    realMessage,
    mentionedNumber,
    beforeMention,
    m.isGroup ? m.chat : undefined,
    {
      contextInfo: {
        mentionedJid: [mentionedNumber],
      },
    }
  );
};

neura.help = ['fakereply'];
neura.tags = ['group'];
neura.command = ["fitnah", "fakereply"];
neura.group = true;

export default neura;