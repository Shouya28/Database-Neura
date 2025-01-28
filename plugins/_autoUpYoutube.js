/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
import fetch from "node-fetch";
import schedule from "node-schedule";

const neura = (m) => m;
let youtubeUpdateJobs = [];

neura.before = async function(m, { conn }) {
  let chats = global.db.data.chats[m.chat];
  let db = global.db.data.bots;

  const channelUrls = ["https://youtube.com/@anioneid"];

  if (chats.youtubeUpdate) {
    youtubeUpdateJobs.forEach((job) => job.cancel());
    youtubeUpdateJobs = [];

    channelUrls.forEach((channelUrl) => {
      const job = schedule.scheduleJob("* * * * *", async function() {
        try {
          const res = await fetch(
            `https://youtube-notifer.vercel.app/api/updates?channelUrl=${encodeURIComponent(channelUrl)}`
          );
          const json = await res.json();
          const { link_yt, id_yt, data_last, status } = json;
          const teks = `乂 *Youtube Update*\n` +
            `- Title: ${data_last.title}\n` +
            `- Link: ${data_last.link}\n` +
            `- Published: ${data_last.pubDate}\n`;

          const lastUpdateList = chats.youtubeUpdateList || {};
          const lastUpdate = lastUpdateList[channelUrl] || [];
          const newUpdate = !lastUpdate.some(
            (oldData) => oldData.title === data_last.title
          );

          if (newUpdate) {
            await conn.sendMessage(m.chat, {
              text: teks,
              contextInfo: {
                externalAdReply: {
                  title: "Neura — Community",
                  body: data_last.title,
                  thumbnailUrl: data_last.thumbnail,
                  sourceUrl: global.linkk.group,
                  mediaType: 1,
                  renderLargerThumbnail: true,
                },
              },
            });

            lastUpdateList[channelUrl] = [data_last];
            chats.youtubeUpdateList = lastUpdateList;
          }
        } catch (error) {
          await conn.sendMessage(
            global.infoo.nomorown + "@s.whatsapp.net",
            {
              text: `Error fetching YouTube data for ${channelUrl}: ${error.message}`,
            }
          );
          console.error(`Error fetching YouTube data for ${channelUrl}:`, error.message);
        }
      });

      youtubeUpdateJobs.push(job);
    });
  }
  return;
};

export default neura;