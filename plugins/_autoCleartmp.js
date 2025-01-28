/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
import { readdirSync, rmSync } from "fs";
export async function all(m) {
  let setting = global.db.data.settings[this.user.jid];
  if (setting.cleartmp) {
    if (new Date() * 1 - setting.lastcleartmp > 600000) {
      const dir = "./tmp";
      readdirSync(dir).forEach((f) => rmSync(`${dir}/${f}`));
      setting.lastcleartmp = new Date() * 1;
    }
  }
  return !0;
}