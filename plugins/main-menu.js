/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */

import { promises } from "fs";
import { join } from "path";
import moment from "moment-timezone";
import fs from "fs";
import { xpRange } from "../lib/levelling.js";

const tags = {
  main: "Main Features",
  game: "Game Features",
  rpg: "RPG Games",
  xp: "Experience & Limits",
  sticker: "Sticker Tools",
  owner: "Owner Features",
  group: "Group Management",
  downloader: "Download Tools",
  tools: "Utility Menu",
  ai: "AI Tools",
  internet: "Internet Features",
  islami: "Islamic Tools",
  maker: "Creative Tools",
};

const defaultMenu = {
  before: `
乂 *Information user*
- *Name:* %name
- *Status:* %status
- *Umur:* %age
- *Limit:* %limit
- *Role:* %role
- *Level:* %level [ %xp4levelup Xp For LevelUp]
- *Xp:* %exp / %maxexp
- *Total Exp:* %totalexp

乂 *Information Neura*
- *Bot Name:* %me
- *Mode:* %mode
- *Platform:* Linux
- *Type:* Node.Js
- *Baileys:* Multi Device
- *Uptime:* %muptime
- *Database:* %rtotalreg dari %totalreg
- *Total hit:* %totalHits
%readmore`,
  header: "*—%category*",
  body: "⳺ %cmd",
  footer: "",
  after: "",
};

const getUptime = () => {
  const _uptime = process.uptime() * 1000;
  return clockString(_uptime);
};

const getMuptime = async () => {
  if (process.send) {
    process.send("uptime");
    const _muptime = await new Promise((resolve) => {
      process.once("message", resolve);
      setTimeout(resolve, 1000);
    });
    return clockString(_muptime * 1000);
  }
  return clockString(0);
};

const getDateTime = () => {
  const d = new Date();
  const locale = "id";
  const weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][Math.floor(d / 84600000) % 5];
  const week = d.toLocaleDateString(locale, { weekday: "long" });
  const date = d.toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
  const dateIslamic = Intl.DateTimeFormat(locale + "-TN-u-ca-islamic", { day: "numeric", month: "long", year: "numeric" }).format(d);
  const time = d.toLocaleTimeString(locale, { hour: "numeric", minute: "numeric", second: "numeric" });
  return { weton, week, date, dateIslamic, time };
};

const clockString = (ms) => {
  const h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
  const m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
  const s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
};

const neura = async (m, { conn, usedPrefix, __dirname }) => {
  try {
    const { age, exp, level, role } = global.db.data.users[m.sender];
    const { min, xp, max } = xpRange(level, global.multiplier);
    const tag = `@${m.sender.split("@")[0]}`;
    const mode = global.opts["self"] ? "Self" : "Public";
    const user = global.db.data.users[m.sender];
    const limit = user.premiumTime >= 1 || m.sender.split`@` [0] == infoo.nomorown ? "Infinity" : user.limit;
    const name = user.registered ? user.name : conn.getName(m.sender);
    const status = m.sender.split`@` [0] == infoo.nomorown ? "Developer" : user.premiumTime >= 1 ? "Premium User" : user.level >= 1000 ? "Elite User" : "Free User";
    const totalHits = Object.values(global.db.data.stats).reduce((acc, stat) => acc + stat.total, 0);
    const totalreg = Object.keys(global.db.data.users).length;
    const rtotalreg = Object.values(global.db.data.users).filter(user => user.registered).length;
    const { weton, week, date, dateIslamic, time } = getDateTime();
    const uptime = getUptime();
    const muptime = await getMuptime();

    const replace = {
      "%": "%",
      p: usedPrefix,
      uptime,
      muptime,
      me: conn.getName(conn.user.jid),
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      level,
      limit,
      name,
      weton,
      week,
      date,
      dateIslamic,
      time,
      totalreg,
      rtotalreg,
      role,
      tag,
      status,
      mode,
      wib: moment.tz("Asia/Jakarta").format("HH:mm:ss"),
      age,
      totalHits,
      readmore: readMore,
    };

    let text = defaultMenu.before;
    Object.keys(tags).forEach(tag => {
      text += `\n${defaultMenu.header.replace(/%category/g, tags[tag])}\n`;
      text += help
        .filter(menu => menu.tags && menu.tags.includes(tag) && menu.help)
        .map(menu => menu.help.map(help => defaultMenu.body
          .replace(/%cmd/g, menu.prefix ? help : "%p" + help)
          .replace(/%islimit/g, menu.limit ? "�" : "")
          .replace(/%isPremium/g, menu.premium ? "🅟" : "")
          .trim()
        ).join("\n")).join("\n");
      text += `\n${defaultMenu.footer}`;
    });
    text += `\n${defaultMenu.after}`;

    text = text.replace(
      new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, "g"),
      (_, name) => "" + replace[name]
    );

    await conn.sendMessage(m.key.remoteJid, {
      document: fs.readFileSync("./package.json"),
      mimetype: global.doc,
      fileName: ucapan,
      name,
      fileLength: 2025,
      pageCount: 2025,
      caption: text,
      footer: `${infoo.wm} ` + infoo.versi,
      buttons: [
        { buttonId: '.owner', buttonText: { displayText: 'My Owner' }, type: 1 },
        { buttonId: '.sewa', buttonText: { displayText: 'Sewa Bot' }, type: 1 },
        {
          buttonId: 'action',
          buttonText: { displayText: 'ini pesan interactiveMeta' },
          type: 4,
          nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
              title: 'Menu list',
              sections: [{
                title: infoo.wm,
                highlight_label: 'Favorite',
                rows: [{ header: infoo.wm, title: 'coming soon', description: '404 ', id: '.logs' }]
              }]
            })
          }
        }
      ],
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          thumbnailUrl: thumbnail.getRandom(),
          mediaUrl: thumbnail.getRandom(),
          mediaType: 1,
          sourceUrl: linkk.tt,
          renderLargerThumbnail: true,
          title: infoo.wm,
          body: `Halo ` + name
        }
      },
      headerType: 1,
      viewOnce: true
    }, { quoted: fwa });
  } catch (e) {
    throw e;
  }
};

neura.help = ["menu"];
neura.tags = ["main"];
neura.command = /^(menu)$/i;
neura.register = true;

export default neura;
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);