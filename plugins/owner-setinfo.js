/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
const validParameters = [
  'versi',
  'ownername',
  'nomorown',
  'wm',
  'nomorbot',
  'namabot',
  'author',
  'chtext',
  'sambutan',
];

const neura = async (m, { text, args, usedPrefix, command }) => {
  if (!text) {
    const parameterList = validParameters.map((param) => `- ${param}`).join('\n');
    const inputMessage = `✦ *Format Tidak Valid*\n\nSilakan masukkan nama informasi yang ingin diatur.\n*Daftar parameter yang dapat diatur:*\n${parameterList}\n\n> Contoh penggunaan:\n> ${usedPrefix + command} wm Neura`;
    return m.reply(inputMessage);
  }

  const [infoType, ...newInfoParts] = args;
  const newInfo = newInfoParts.join(' ');

  if (!infoType || !newInfo) {
    return m.reply('Mohon masukkan tipe informasi dan teks baru dengan benar.');
  }

  const infoTypeLower = infoType.toLowerCase();

  if (validParameters.includes(infoTypeLower)) {
    global.db.data.bots.info[infoTypeLower] = newInfo;
    m.reply(`Berhasil mengganti "${infoTypeLower}" menjadi "${newInfo}".`);
  } else {
    m.reply('*404* Not found\ntipe link tidak valid');
  }
};

neura.command = ['setinfo'];
neura.help = ['setinfo'];
neura.tags = ['owner'];
neura.owner = true;

export default neura;