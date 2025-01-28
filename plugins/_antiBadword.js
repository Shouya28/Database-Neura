/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
export async function before(m, { conn, isBotAdmin, isAdmin }) {
  if (m.isBaileys && m.fromMe) return;
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];

  const inappropriateWords = [
    'anjing', 'bangsat', 'kontol', 'memek', 'pepek', 'tetek',
    'goblog', 'tolol', 'idiot', 'jancuk', 'bego', 'babi',
    'monyet', 'asw', 'bangke'
  ];

  let isBadword = inappropriateWords.some(word => m.text.toLowerCase().includes(word));

  if (chat.antiBadword && isBadword && m.isGroup) {
      await conn.sendMessage(m.chat, { delete: m.key });
  m.reply(`*✦ Mari kita jaga kesopanan dalam berbicara*

_"Sungguh Allah benci dengan orang yang lisannya kotor dan kasar"_
- Hadis riwayat Abu Ad-Darda

Mohon gunakan kata-kata yang lebih baik ya! 🙏`);
  }
  return true;
}