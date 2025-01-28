/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
import cp, { exec as _exec } from "child_process";
import { promisify } from "util";
let exec = promisify(_exec).bind(cp);
let handler = async (m, { conn, isOwner, command, text }) => {
  if (global.conn.user.jid != conn.user.jid) return;
  let o;
  try {
    o = await exec(command.trimStart() + " " + text.trimEnd());
  } catch (e) {
    o = e;
  } finally {
    let { stdout, stderr } = o;

    if (stdout.trim()) {
      m.reply(stdout);
    }
    if (stderr.trim()) {
      m.reply(stderr);
    }
  }
};
neura.help = ["exec2"];
neura.tags = ["owner"];
neura.customPrefix = /^[$] /;
neura.command = new RegExp();
neura.owner = true

export default neura;