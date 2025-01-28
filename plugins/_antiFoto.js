/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true;
  let chat = global.db.data.chats[m.chat];
  let sender = global.db.data.chats[m.sender];
  let isFoto = m.mtype;
  let hapus = m.key.participant;
  let bang = m.key.id;
  if (chat.antiFoto && isFoto) {
    if (isFoto === "imageMessage") {
      if (isAdmin || !isBotAdmin) {
      } else {
        m.reply(`✦ *Detected someone has sent a photo*\n> To turn off this feature, type\n> *.disable antifoto*`,
        );
        return this.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: bang,
            participant: hapus,
          },
        });
      }
      return true;
    }
  }
  return true;
}