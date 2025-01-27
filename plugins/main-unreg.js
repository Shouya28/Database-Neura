/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
import { createHash } from "crypto";
let neura = async function(m, { args, usedPrefix }) {
  let user = global.db.data.users[m.sender]; 
  let sn = createHash("md5").update(m.sender).digest("hex"); 
  m.reply("✓ You have successfully exited the database.").then(() => {
    user.registered = false; 
  });
};

neura.help = ["unreg"];
neura.tags = ["main"];
neura.command = /^unreg(ister)?$/i;
neura.register = true;

export default neura;