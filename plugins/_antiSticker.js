/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return;
  let chat = global.db.data.chats[m.chat];
  let isSticker = m.mtype;
  if (chat.antiSticker && isSticker === "stickerMessage" && m.isGroup) {
    if (!isAdmin || isBotAdmin) {
      await this.sendMessage(m.chat, { delete: m.key });
    }
  }
  return !0;
}
