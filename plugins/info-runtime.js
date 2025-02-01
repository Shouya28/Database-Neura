/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
const neura = async (m) => {
  const uptime = process.uptime();
  const d = Math.floor(uptime / 86400);
  const h = Math.floor((uptime % 86400) / 3600);
  const y = Math.floor((uptime % 3600) / 60);
  const s = Math.floor(uptime % 60);

  const runtime = `${d} Hari ${h} Jam ${y} Menit ${s} Detik`;
  await m.reply(runtime);
};

neura.help = ["runtime"];
neura.tags = ["info"];
neura.command = ["runtime", "rt"];

export default neura;