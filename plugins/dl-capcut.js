/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */

import axios from 'axios';
import cheerio from 'cheerio';

async function capcutdl(url) {
  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);

  const videoElement = $('video.player-o3g3Ag');
  const videoSrc = videoElement.attr('src');
  const posterSrc = videoElement.attr('poster');
  const title = $('h1.template-title').text().trim();
  const actionsDetail = $('p.actions-detail').text().trim();
  const [date, uses, likes] = actionsDetail.split(',').map(item => item.trim());
  const authorAvatar = $('span.lv-avatar-image img').attr('src');
  const authorName = $('span.lv-avatar-image img').attr('alt');

  if (!videoSrc || !posterSrc || !title || !date || !uses || !likes || !authorAvatar || !authorName) {
    console.error('Beberapa elemen penting tidak ditemukan di halaman.');
    return null;
  }

  return {
    title: title,
    date: date,
    pengguna: uses,
    likes: likes,
    author: {
      name: authorName,
      avatarUrl: authorAvatar
    },
    videoUrl: videoSrc,
    posterUrl: posterSrc
  };
}

export async function neura(m, { conn, text }) {
  if (!text) {
    return m.reply(`✦ *Example:* ${usedPrefix + command} https://www.capcut.com/t/Zs8UJ97oD/`);
  }

  const result = await capcutdl(text);
  if (!result) {
    return m.reply('*404* Gagal mengambil video');
  }

  const caption = `*CAPCUT DOWNLOADER*\n` +
    `📽️ Judul: ${result.title}\n` +
    `📅 Tanggal: ${result.date}\n` +
    `👥 Pengguna: ${result.pengguna}\n` +
    `❤️ Likes: ${result.likes}\n`;

  await conn.sendFile(m.chat, result.videoUrl, 'capcut_video.mp4', caption, m);
}

neura.command = ['capcut'];
neura.help = ['capcut'];
neura.tags = ['dl'];
neura.error = 0;

export default neura;