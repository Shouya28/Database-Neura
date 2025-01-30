/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */

import axios from 'axios'
import FormData from 'form-data'

const hydro = {
  ask: async ({ content, fileBuffer, systemInstruction }) => {
    const formData = new FormData()
    formData.append('content', content)
    formData.append('model', 'yanzgpt-legacy-72b-v3.0')
    if (fileBuffer) formData.append('file', fileBuffer)
    if (systemInstruction) formData.append('system', systemInstruction)

    const { data } = await axios.post('https://hydrooo.web.id/', formData, {
      headers: formData.getHeaders()
    })
    return data.result || 'Error occurred'
  }
}

export async function neura(m, { conn, args, usedPrefix, command }) {
  const cmdText = args.length > 0 ? args.join(" ") : "";
const replyText = m.quoted?.text || m.quoted?.caption || m.quoted?.description || "";

const text = [cmdText, replyText].filter(Boolean).join(" ").trim();

if (!text) {
  return m.reply(
    `✦ *Format salah !*\n\n*Masukkan teks atau balas pesan yang ingin*\n*kamu tanyakan kepada ${command}*\n\n> Contoh:\n> ${usedPrefix + command} Halo`);
};

  const prompt = text.trim()
  const response = await hydro.ask({ content: prompt })
  conn.reply(m.chat, `*Answer from ${command} AI:*\n${response}`, fwa)
}

neura.command = ['yanzgpt'];
neura.help = ['yanzgpt'];
neura.tags = ['ai'];
neura.premium = true;
neura.error = 0;

export default neura