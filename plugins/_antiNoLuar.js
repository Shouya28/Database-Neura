/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
let neura = m => m
neura.before = async function(m) {
  const countryCode = m.sender.slice(0, m.sender.startsWith('62') ? 2 : 3)
  const allowedCodes = ['62', '60']

  if (!allowedCodes.includes(countryCode)) {
    global.db.data.users[m.sender].banned = true
    conn.reply(`[System Detects]
Unfortunately, our system cannot accommodate numbers from outside the supported region at this time.We appreciate your understanding, and we look forward to serving you in the future.`)
    conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
  }
}

export default neura

