/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
const neura = async (m, { conn, text, participants }) => {
const users = participants.map(u => conn.decodeJid(u.id)); 
const quotedMsg = m.quoted || m; 
const messageContent = text || quotedMsg.text; 

await conn.sendMessage(
m.chat,
{
text: messageContent,
mentions: users, 
},
{
quoted: fkontak, 
}
);
};

neura.help = ["hidetag"];
neura.tags = ["group"];
neura.command = ["pengumuman", "announce", "hidetag", "h"];
neura.group = true;
neura.admin = true;

export default neura;