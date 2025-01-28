import axios from 'axios';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { Sticker } from 'wa-sticker-formatter';

let neura = async (m, { conn, text, usedPrefix }) => {
  text = text || (m.quoted && m.quoted.text);

  if (!text) {
    return m.reply(`❗ *Format Salah* ❗\n\nGunakan perintah ini dengan format:\n• *${usedPrefix}brat <teks>*\n• Atau reply pesan dengan perintah tanpa teks.\n\n_Contoh:_\n${usedPrefix}brat Aku suka kucing\nTambahkan *--animated* untuk animasi.`);
  }

  const isAnimated = text.includes('--gif');
  const textWithoutAnimated = text.replace('--gif', '').trim();

  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

  if (isAnimated) {
    const tempDir = path.join(process.cwd(), 'tmp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
    const framePaths = [];
    const words = textWithoutAnimated.split(' ');

    for (let i = 0; i < words.length; i++) {
      const currentText = words.slice(0, i + 1).join(' ');
      const response = await axios.get(`https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(currentText)}`, { responseType: 'arraybuffer' });
      const framePath = path.join(tempDir, `frame${i}.mp4`);
      fs.writeFileSync(framePath, response.data);
      framePaths.push(framePath);
    }

    const fileListPath = path.join(tempDir, 'filelist.txt');
    let fileListContent = framePaths.map((filePath, i) => `file '${filePath}'\nduration 1\n`).join('');
    fileListContent += `file '${framePaths[framePaths.length - 1]}'\nduration 3\n`;
    fs.writeFileSync(fileListPath, fileListContent);

    const outputVideoPath = path.join(tempDir, 'output.mp4');
    execSync(`ffmpeg -y -f concat -safe 0 -i ${fileListPath} -vf "fps=30" -c:v libx264 -preset veryfast -pix_fmt yuv420p -t 10 ${outputVideoPath}`);

    const outputStickerPath = path.join(tempDir, 'output.webp');
    execSync(`ffmpeg -i ${outputVideoPath} -vf "scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease" -c:v libwebp -lossless 1 -qscale 90 -preset default -loop 0 -an -vsync 0 -s 512x512 ${outputStickerPath}`);

    const stickerBuffer = fs.readFileSync(outputStickerPath);
    await conn.sendMessage(m.chat, { sticker: stickerBuffer });

    framePaths.forEach(fs.unlinkSync);
        [fileListPath, outputVideoPath, outputStickerPath].forEach(fs.unlinkSync);
  } else {
    const response = await axios.get(`https://brat.caliphdev.com/api/brat?text=${encodeURIComponent(textWithoutAnimated)}`, { responseType: 'arraybuffer' });
    const sticker = new Sticker(response.data, { pack: stickpack, author: stickauth, type: 'image/png' });
    const stickerBuffer = await sticker.toBuffer();
    await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: m });
  }
};

neura.help = ['brat'];
neura.tags = ['sticker'];
neura.command = ["brat"];
neura.limit = true;
neura.error = 0;

export default neura;