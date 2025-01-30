import { WAMessageStubType } from "@adiwajshing/baileys";
import PhoneNumber from "awesome-phonenumber";
import ora from "ora";
import chalk from "chalk";
import { watchFile, readFile, writeFile } from "fs";
import terminalImage from "terminal-image";
import urlRegex from "url-regex-safe";
import { sizeFormatter, durationFormatter } from "human-readable";

const formatSize = sizeFormatter({
  std: "JEDEC",
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

const formatTime = (timestamp) => {
  try {
    const date = new Date(1000 * (timestamp?.low || timestamp || 0));
    return date.toLocaleString("en-US", {
      timeZone: "Asia/Makassar",
      hour: "2-digit",
      minute: "2-digit",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "Invalid Time";
  }
};

let messageCount = 0;
const clearLogs = () => {
  if (messageCount >= 999) {
    console.clear();
    messageCount = 0;
    console.log(chalk.blue("✨ Logs cleared"));
  }
};

export default async function handleMessage(m, conn = { user: {}, opts: {} }) {
  try {
    if (!m?.msg || !m?.isCommand) return;

    messageCount++;
    clearLogs();

    const type = m.mtype ?
      m.mtype
      .replace(/message$/i, "")
      .replace("audio", m.msg.ptt ? "PTT" : "audio")
      .replace(/^./, (v) => v.toUpperCase()) :
      "Unknown";

    const id = m.msg?.id || m.key?.id || "N/A";
    const time = formatTime(m.messageTimestamp);
    const size = formatSize(
      m.msg?.vcard?.length ||
      m.msg?.fileLength?.low ||
      m.msg?.fileLength ||
      m.text?.length ||
      0
    );
    const sender = conn.getName(m.sender) || "User";
    const chat = conn.getName(m.chat) || "Chat";

    console.log(chalk.cyan("━".repeat(50)));
    console.log(chalk.yellow(`乂 Message ${messageCount}`));
    console.log(chalk.cyan("┈".repeat(25)));
    console.log(chalk.blue(`🔹 Type   : ${chalk.white(type)}`));
    console.log(chalk.blue(`🔹 Time   : ${chalk.white(time)}`));
    console.log(chalk.blue(`🔹 Size   : ${chalk.white(size)}`));
    console.log(chalk.blue(`🔹 From   : ${chalk.white(sender)}`));
    console.log(chalk.blue(`🔹 Chat   : ${chalk.white(chat)}`));
    console.log(chalk.cyan("━".repeat(50)));
    console.log();

    const antiBotEnabled =
      conn.opts?.antibot || global.db?.data?.chats?.[m.chat]?.antibot;
    if (antiBotEnabled && m.isGroup && m.sender) {
      const msgId = m.msg?.id || m.key?.id;
      const isBotMsg = msgId && ["BAE", "3EB0"].some((p) => msgId.startsWith(p));
      const isNotSelf = m.sender !== conn.user?.jid;

      if (isBotMsg && isNotSelf) {
        await m.reply(
          "✦— *Anti bot*\n> Group ini dilengkapi dengan anti bot!\n> Anda melanggar peraturan bot"
        );
        if (conn.logger) {
          conn.logger.info("Bot detected: " + m.sender.split("@")[0]);
        }
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
      }
    }
  } catch (error) {
    console.error(chalk.red("Error handling message:"), error);
  }
}