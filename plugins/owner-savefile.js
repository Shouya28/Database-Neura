/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
import fs from "fs";
import syntaxError from "syntax-error";
import path from "path";

const _fs = fs.promises;
let neura = async (m, { text, usedPrefix, command, __dirname }) => {
  const input = `✦ *Format Tidak Valid!*\n\nHarap masukkan nama file yang ingin disimpan\nlalu balas (reply) pesan yang sesuai.\n\n*Contoh penggunaan:*\n> ${usedPrefix + command} neura.js`;

  if (!text) return m.reply(input);
  if (!m.quoted) return m.reply(input);

  const watermark =
`/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
`;

  if (/p(lugin)?/i.test(command)) {
    const filename = text.replace(/plugin(s)\//i, "") + (/\.js$/i.test(text) ? "" : ".js");
    const fileContent = watermark + m.quoted.text;

    const error = syntaxError(fileContent, filename, {
      sourceType: "module",
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
    });

    if (error) throw error;

    const pathFile = path.join(__dirname, filename);
    await _fs.writeFile(pathFile, fileContent);
    await conn.sendReact(m.chat, '👍🏻', m.key)
  } else {
    const isJavascript = m.quoted.text && !m.quoted.mediaMessage && /\.js/.test(text);

    if (isJavascript) {
      const fileContent = watermark + m.quoted.text;

      const error = syntaxError(fileContent, text, {
        sourceType: "module",
        allowReturnOutsideFunction: true,
        allowAwaitOutsideFunction: true,
      });

      if (error) throw error;

      await _fs.writeFile(text, fileContent);
      await conn.sendReact(m.chat, '👍🏻', m.key)
    } else if (m.quoted.mediaMessage) {
      const media = await m.quoted.download();
      await _fs.writeFile(text, media);
      await conn.sendReact(m.chat, '👍🏻', m.key)
    } else {
      throw "Not supported!";
    }
  }
};

neura.help = ["savefile"];
neura.tags = ["owner"];
neura.command = /^(save|sf)$/i;
neura.owner = true;
neura.error = 0;

export default neura;