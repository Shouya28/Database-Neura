/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */

export async function before(m) {
  this.ev.on("call", async (call) => {
    if (
      call[0].status == "offer" &&
      global.db.data.settings[this.user.jid].anticall
    )
      await this.rejectCall(call[0].id, call[0].from);
  });
  return !0;
}