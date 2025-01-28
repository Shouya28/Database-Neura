/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */

import { generateWAMessageContent } from "@adiwajshing/baileys";
const neura = async (m, { conn, usedPrefix, command, args }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (m.quoted ? m.quoted : m.msg).mimetype || '';

  if (!/video/g.test(mime)) {
    return m.reply(`✦ *Example:*${usedPrefix + command} all/id group`);
  }

  const media = await q.download?.();
  await m.reply('Memulai broadcast PTV...');

  const groups = Object.entries(await conn.groupFetchAllParticipating())
    .map(entry => entry[1]);

  const msg = await generateWAMessageContent({
    video: media
  }, {
    upload: conn.waUploadToServer
  });

  let targetGroups = [];
  if (args[0] === "all") {
    
    targetGroups = groups;
  } else {
    const groupIds = args.filter(arg => arg.endsWith("@g.us")); 
    if (groupIds.length === 0) {
     return m.reply(`✦ *Example:*${usedPrefix + command} all or id group`);
    }
    targetGroups = groups.filter(group => groupIds.includes(group.id));
  }

  if (targetGroups.length === 0) {
    return m.reply("*404* No groups found with the given ID.");
  }

  let successCount = 0;
  for (const group of targetGroups) {
    await conn.relayMessage(group.id, {
      ptvMessage: msg.videoMessage
    }, {});
    successCount++;
    await new Promise(resolve => setTimeout(resolve, 1000)); 
  }

  await m.reply(`*Broadcast PTV selesai*\nBerhasil terkirim ke ${successCount} dari ${targetGroups.length} grup`);
};

neura.help = ['bcptv'];
neura.tags = ['owner'];
neura.command = /^(broadcastptv|bcptv)$/i;
neura.owner = true;
neura.error = 0;

export default neura;