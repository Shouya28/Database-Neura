/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
import moment from "moment-timezone";
import fs from "fs";
let neura = async (
  m,
  { conn, usedPrefix, command, args, isOwner, isAdmin, isMods, isPrems },
) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command);
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  let bot = global.db.data.settings[conn.user.jid] || {};
  if (!isOwner && m.chat.endsWith("@s.whatsapp.net"))
    return global.dfail("group", m, conn);
  let name = user.registered ? user.name : conn.getName(m.sender);
  let type = (args[0] || "").toLowerCase();
  let isAll = false,
    isUser = false;
  let caption = `
${
  !isOwner || m.chat.endsWith("@g.us")
    ? `
乂 *Admin Command:*
- *Welcome:* ${chat.welcome ? "on" : "of"}
- *AdminOnly:* ${chat.adminOnly ? "on" : "off"}
- *AutoLevelup:* ${chat.autolevelup ? "on" : "off"}
- *detect:* ${chat.detect ? "on" : "off"}
- *Antibot:* ${chat.antibot ? "on" : "off"}
- *AntiDelete:* ${chat.antidelete ? "on" : "off"}
- *AntiLink:* ${chat.antiLinks ? "on" : "off"}
- *AntiLinkgc:* ${chat.antiLinkGc ? "on" : "off"}
- *AntiLinkwa:* ${chat.antiLinkWa ? "on" : "off"}
- *Rpg:* ${chat.rpg ? "on" : "off"}
- *AntiSticker:* ${chat.antiVirtex ? "on" : "off"}
- *AntiBadword:* ${chat.antiBadword ? "on" : "off"}
- *Game:* ${chat.game ? "on" : "off"}
- *AutoClose:* ${chat.autoClose ? "on" : "off"}
- *YoutubeUpdate:* ${chat.youtubeupdate ? "on" : "off"}
- *GempaUpdate:* ${chat.gempaupdate ? "on" : "off"}
`
    : ""
}
乂 *Owner Command:*
- *AutoBackup:* ${bot.backup ? "on" : "off"}
- *AutoCleartmp:* ${bot.cleartmp ? "on" : "off"}
- *AutoRead:* ${bot.autoread ? "on" : "off"}
- *AutoRestock:* ${bot.autoRestock ? "on" : "off"}
- *Composing:* ${bot.composing ? "on" : "off"}
- *NoPrint:* ${opts.noprint ? "on" : "off"}
- *AdReply:* ${bot.adReply ? "on" : "off"}
`.trim();
  switch (type) {
    case "welcome":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.welcome = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "adminonly":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.adminOnly = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "autolevelup":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.autolevelup = isEnable;
      } else {
        if (!isPrems) {
          global.dfail("premium", m, conn);
          return false;
        }
        user.autolevelup = isEnable;
      }
      break;
    case "detect":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.detect = isEnable;
      } else return global.dfail("group", m, conn);
      break;
      case "antibot":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antibot = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "antidelete":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antidelete = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "antilink":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antiLinks = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "antilinkgc":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antiLinkGc = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "antilinkwa":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antiLinkWa = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "rpg":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.rpg = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "antisticker":
    if (m.isGroup) {
      if (!(isAdmin || isOwner)) {
        global.dfail("admin", m, conn);
        return false;
      }
    } else return global.dfail("group", m, conn);
    chat.antiSticker = isEnable;
    break;
    case "composing":
      if (!isMods) {
        global.dfail("mods", m, conn);
        return false;
      }
      bot.composing = isEnable;
      break;
    case "adreply":
      if (!isOwner) {
        global.dfail("owner", m, conn);
        return false;
      }
      bot.adReply = isEnable;
      break;
    case "antibadword":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.antiBadword = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "game":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.game = isEnable;
      } else return global.dfail("group", m, conn);
      break;
    case "autoclose":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
        chat.autoClose = isEnable;
      } else return global.dfail("group", m, conn);
      break;
     case "youtubeupdate":
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail("admin", m, conn);
          return false;
        }
      }
      chat.youtubeUpdate = isEnable;
      break;
    case "gempaupdate":
if (m.isGroup) {
  if (!(isAdmin || isOwner)) {
    global.dfail("admin", m, conn);
    return false;
  }
  chat.gempaUpdate = isEnable;
} else {
  if (!isPrems) {
    global.dfail("premium", m, conn);
    return false;
  }
  user.komikUpdate = isEnable;
}
break;
    case "autobackup":
      isAll = true;
      if (!isOwner) {
        global.dfail("owner", m, conn);
        return false;
      }
      bot.backup = isEnable;
      break;
    case "autocleartmp":
      isAll = true;
      if (!isOwner) {
        global.dfail("owner", m, conn);
        return false;
      }
      bot.cleartmp = isEnable;
      break;
    case "autorestock":
      isAll = true;
      if (!isOwner) {
        global.dfail("owner", m, conn);
        return false;
      }
      bot.autoRestock = isEnable;
      break;
    case "autoread":
      isAll = true;
      if (!isMods) {
        global.dfail("mods", m, conn);
        return false;
      }
      bot.autoread = isEnable;
      break;
    case "noprint":
      isAll = true;
      if (!isMods) {
        global.dfail("mods", m, conn);
        return false;
      }
      global.opts["noprint"] = isEnable;
      break;
    default:
      return conn.reply(m.chat, caption, fwa)
  }
  await m.reply(
    `${type} berhasil ${isEnable ? "dinyalakan" : "dimatikan"} untuk ${isAll ? "bot ini" : "chat ini"} !`,
  );
};
neura.help = ["enable", "disable"];
neura.tags = ["tools", "group"];
neura.command = ["on", "off", "enable", "disable", "true", "false"]

export default neura;