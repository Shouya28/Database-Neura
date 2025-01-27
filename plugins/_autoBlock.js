/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
const neura = m => m;
neura.before = async function(m) {
  const allowedCountryCodes = ['62', '60'];
  const countryCode = m.sender.match(/^(\d+)/)?.[1];
  if (countryCode && !allowedCountryCodes.includes(countryCode)) {
    global.db.data.users[m.sender].banned = true;
  }
};

export default neura;