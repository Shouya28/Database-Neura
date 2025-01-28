/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */

const neura = async (m, { conn, groupMetadata }) => {
  await conn.reply(m.chat, `${await groupMetadata.id}`, fwa);
};
neura.help = ["cekid"]
neura.tags = ["group"]
neura.command = ["cekid"]
neura.group = true
neura.owner = true

export default neura;