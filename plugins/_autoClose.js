/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */

import cron from "node-cron";

const neura = (m) => m;
neura.before = async function(m, { conn, isBotAdmin }) {
  let chat = global.db.data.chats[m.chat];

  if (chat.autoClose && isBotAdmin) {
    cron.schedule(
      "0 0 * * *",
      async () => {
        await conn.groupSettingUpdate(m.chat, "announcement");
        await conn.reply(
          m.chat,
          `[!] Pengumuman\n\nGroup telah ditutup otomatis pada jam 12 malam.\n\n*Note*: Group akan dibuka kembali besok pagi jam 5.`,
          null
        );
      },
      {
        scheduled: true,
        timezone: "Asia/Jakarta",
      }
    );
    cron.schedule(
      "0 5 * * *",
      async () => {
        await conn.groupSettingUpdate(m.chat, "not_announcement");
        await conn.reply(
          m.chat,
          `[!] Pengumuman\n\nGroup telah dibuka otomatis pada jam 5 pagi.\n\n*Note*: Selamat beraktivitas!`,
          null
        );
      },
      {
        scheduled: true,
        timezone: "Asia/Jakarta",
      }
    );
  }
};

export default neura;