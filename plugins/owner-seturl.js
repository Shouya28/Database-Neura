/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
const linkTypes = [
  'ig',
  'group',
  'chid',
  'chlink',
  'fb',
  'gh',
  'tt',
  'website',
];

const neura = async (m, { conn, text }) => {
    if (!text) {
    const setList = linkTypes.map((type) => `- ${type}`).join('\n');
    const inputMessage = `✦ *Format Tidak Valid*\n\nSilakan masukkan nama informasi yang ingin diatur.\n*Daftar parameter yang dapat diatur:*\n${setList}\n\n> Contoh penggunaan:\n> ${usedPrefix + command} wm Neura`;
    return m.reply(inputMessage);
  }

  const [linkType, ...urlParts] = text.trim().split(/\s+/);
  const newLink = urlParts.join(' ');

  if (linkTypes.includes(linkType.toLowerCase())) {
    global.db.data.bots.link[linkType.toLowerCase()] = newLink;
    m.reply(`Berhasil mengubah link ${linkType}`);
  } else {
    m.reply('*404* Not found\ntipe link tidak valid');
  }
};

neura.help = ['seturl'];
neura.tags = ['owner'];
neura.command = /^(seturl)$/i;
neura.owner = true;

export default neura;