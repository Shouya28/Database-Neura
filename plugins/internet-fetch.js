/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
import fetch from 'node-fetch';
import { format } from 'util';
import path from 'path';

let neura = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`✦ *Format salah !*
*Contoh:*
> ${usedPrefix + command} https://ryzxell-dev.vercel.app`);
  }

  text = /^https?:\/\//.test(text) ? text : 'http://' + text;
  let _url = new URL(text);
  let redirectUrl = _url.href;

  for (let redirectCount = 0; redirectCount < 999999; redirectCount++) {
    let res = await fetch(redirectUrl);

    if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
      res.body.destroy();
      return m.reply(`🚨 *Error:* Konten terlalu besar! (${res.headers.get('content-length')})`);
    }

    const contentType = res.headers.get('content-type');
    let filename = res.headers.get('content-disposition')?.split('filename=')[1]?.trim() || path.basename(_url.pathname);

    if (/^image\//.test(contentType)) {
      await conn.sendFile(m.chat, redirectUrl, filename, `Gambar berhasil diunduh!`, m);
      return;
    }

    if (/^video\//.test(contentType)) {
      await conn.sendFile(m.chat, redirectUrl, filename, `Video berhasil diunduh!`, m);
      return;
    }

    if (/^audio\//.test(contentType)) {
      await conn.sendFile(m.chat, redirectUrl, filename, `Audio berhasil diunduh!`, m);
      return;
    }

    if (/^text\//.test(contentType)) {
      let txt = await res.text();
      m.reply(`${txt.slice(0, 65536)}`);
      await conn.sendFile(m.chat, Buffer.from(txt), 'file.txt', null, m);
      return;
    }

    if (/^application\/json/.test(contentType)) {
      let json = await res.json();
      m.reply(`${format(JSON.stringify(json, null, 2)).slice(0, 65536)}`);
      await conn.sendFile(m.chat, Buffer.from(format(JSON.stringify(json))), 'file.json', null, m);
      return;
    }

    if (/^text\/html/.test(contentType)) {
      let html = await res.text();
      await conn.sendFile(m.chat, Buffer.from(html), 'file.html', null, m);
      return;
    }

    if (/^(application\/zip|application\/x-rar-compressed|application\/x-7z-compressed|application\/x-tar|application\/gzip)/.test(contentType)) {
      await conn.sendFile(m.chat, redirectUrl, filename, `Arsip berhasil diunduh!`, m);
      return;
    }

    await conn.sendFile(m.chat, redirectUrl, filename, `File berhasil diunduh!`, m);
    return;

    if ([301, 302, 307, 308].includes(res.status)) {
      let location = res.headers.get('location');
      if (location) redirectUrl = location;
      else break;
    } else break;
  }

  m.reply(`⚠️ *Terlalu Banyak Pengalihan!* (max: 999999)`);
};

neura.help = ['fetch'];
neura.tags = ['internet'];
neura.command = /^(fetch|get)$/i;
neura.error = 0;

export default neura;