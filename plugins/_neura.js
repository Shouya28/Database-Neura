import speed from "performance-now";
import fs from "fs";
import axios from "axios";
import moment from "moment-timezone";

let neura = (m) => m;

neura.all = async function(m) {
  let name = await conn.getName(m.sender);

  global.doc = pickRandom([
    "application/vnd.ms-excel", 
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", 
    "application/msword", 
    "application/pdf",
    "image/png",
    "image/jpeg", 
    "text/plain", 
    "application/zip", 
    "application/json", 
]);
  
  global.menu = global.db.data.bots.menuthumb;
  global.infoo = global.db.data.bots.info;
  global.linkk = global.db.data.bots.link;
  global.thumbb = global.db.data.bots.thumbb;
  global.ucapan = ucapan();
  global.ephemeral = "2025"; 
  
  global.fetch = (await import("node-fetch")).default;
  global.urlToBuffer = await toBuffer

  async function toBuffer(url) {
    try {
      const response = await axios.get(url, {
        responseType: "arraybuffer",
      });
      return Buffer.from(response.data, "binary");
    } catch (error) {
      console.error("Error converting URL to buffer:", error);
      throw error;
    }
  }
  
  let timestamp = speed();
  let latensi = speed() - timestamp;
  let ms = latensi.toFixed(4);
  const _uptime = process.uptime() * 1000;
  const more = String.fromCharCode(8206);
  const readMore = more.repeat(4001);
  global.readmore = readMore;

  global.adCh = {
    contextInfo: {
      forwardingScore: 2025,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: global.linkk.chid,
        serverMessageId: null,
        newsletterName: global.infoo.wm,
      },
    },
  };

  global.adReply = {
    contextInfo: {
      forwardingScore: 2025,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: global.linkk.chid,
        serverMessageId: null,
        newsletterName: global.infoo.wm,
      },
      externalAdReply: {
        title: ucapan(),
        body: global.infoo.wm,
        thumbnailUrl: "https://files.catbox.moe/n2n8ml.jpg",
        sourceUrl: global.linkk.group,
        mediaType: 1,
        renderLargerThumbnail: false,
      },
    },
  };

  global.floc = {
    key: {
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo",
    },
    message: {
      documentMessage: {
        title: "Neura — Community",
        jpegThumbnail: "https://files.catbox.moe/n2n8ml.jpg",
      },
    },
  };
  global.fwa = {
        key: { participant: "0@s.whatsapp.net", remoteJid: "0@s.whatsapp.net" },
        message: { conversation: `${infoo.wm} Terverifikasi Oleh WhatsApp`},
      },
      
  global.fkontak = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      ...(m.chat ? { remoteJid: "status@broadcast" } : {}),
    },
    message: {
      contactMessage: {
        displayName: m.pushName,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${global.infoo.wm},;;;\nFN:${global.infoo.wm},\nitem1.TEL;waid=${m.sender.split(
          "@"
        )[0]}:${m.sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        jpegThumbnail: fs.readFileSync("./media/thumbnail.jpg"),
        thumbnail: fs.readFileSync("./media/thumbnail.jpg"),
        sendEphemeral: true,
      },
    },
  };
};

export default neura;

function ucapan() {
  const time = moment.tz("Asia/Jakarta").format("HH");
  if (time >= 4 && time < 10) return "Selamat pagi ";
  if (time >= 10 && time < 15) return "Selamat siang ";
  if (time >= 15 && time < 18) return "Selamat sore ";
  return "Selamat malam ";
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}