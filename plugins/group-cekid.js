/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */

const neura = async (m, { conn, groupMetadata }) => {
  await conn.sendMessage(m.sender, { text: `${groupMetadata.id}` });
  await conn.reply(m.chat, '✅ Group ID telah dikirim ke chat pribadi', m);
};

neura.help = ["cekid"];
neura.tags = ["group"];
neura.command = ["cekid"];
neura.group = true;
neura.admin = true;

export default neura;