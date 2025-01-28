/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
export async function all(m) {
  const setting = global.db.data.settings[this.user.jid];
  if (setting.autoRestock) {
    if (new Date() * 1 - setting.autoRestockCD > 86400000) {
      let data = Object.entries(global.db.data.bots.stock);
      for (let v of data) {
        if (v[1] == 0) {
          global.db.data.bots.stock[v[0]] += 100000;
        }
      }
      setting.autoRestockCD = new Date() * 1;
    }
  }
  return !0;
}
