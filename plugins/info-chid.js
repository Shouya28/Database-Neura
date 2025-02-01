/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
let neura = async (m, { conn }) => {
  if (!m.quoted) return m.reply('Reply pesan saluran')

  try {
    let id = (await m.getQuotedObj()).msg.contextInfo.forwardedNewsletterMessageInfo
    await conn.reply(m.chat, `\`\`\`Channel Name:\`\`\` \`${id.newsletterName}\`\n\`\`\`Channel Id:\`\`\` \`${id.newsletterJid}\`` , fwa );
  } catch {
    m.reply('Harus chat dari channel')
  }
}

neura.help = ["chid"];
neura.command = ['chid'];
neura.tags = ['info'];
neura.private = true;

export default neura;