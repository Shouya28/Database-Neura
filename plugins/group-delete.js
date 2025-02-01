/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
const neura = async (m, { conn, isBotAdmin }) => {
  if (isBotAdmin && m.quoted) {
    const { participant, stanzaId } = m.message.extendedTextMessage.contextInfo;
    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: stanzaId,
        participant,
      },
    });
  }
};

neura.help = ["delete"];
neura.tags = ["group"];
neura.command = ["delete", "d", "hapus"]
neura.group = true;
neura.admin = true;

export default neura;