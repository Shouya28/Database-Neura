/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
import axios from "axios";
import axios from "axios";

const douyin = async (url) => {
  const api = "https://lovetik.app/api/ajaxSearch";
  const payload = { q: url, lang: "en" };

  const { data } = await axios.post(api, payload, {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      origin: "https://lovetik.app",
      priority: "u=1, i",
      referer: "https://lovetik.app/en",
      "sec-ch-ua": '"Not A(Brand";v="8", "Chromium";v="132", "Microsoft Edge";v="132"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0",
      "x-requested-with": "XMLHttpRequest",
    },
    transformRequest: [
      (data) =>
        Object.keys(data)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
          .join("&"),
    ],
  });

  const extractData = data.data;

  const downloadUrls =
    extractData.match(/https:\/\/(dl\.snapcdn\.app|v\d+-cold\.douyinvod\.com)\/get\?token=[^"]+/g) || [];

  const thumbnailMatch = /<img src="([^"]+)"/.exec(extractData);
  const thumbnail = thumbnailMatch ? thumbnailMatch[1] : null;

  const titleMatch = /<h3>(.*?)<\/h3>/.exec(extractData);
  const title = titleMatch ? titleMatch[1] : null;

  const imageUrls = extractData.match(/https:\/\/[^\s"]+\.(?:jpg|jpeg|png|webp)[^\s"']*/gi) || [];
  const uniqueImageUrls = [...new Set(imageUrls)].filter(url => url !== thumbnail);

  return {
    title,
    thumbnail,
    downloadUrls,
    images: uniqueImageUrls,
    isSlidePost: uniqueImageUrls.length > 0
  };
};

const neura = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) {
    return m.reply(
      `*Gunakan format:*\n${usedPrefix} ${command} *<url>*\n\n*Contoh:*\n${usedPrefix}${command} https://v.douyin.com/ifQXocns/`
    );
  }

  const result = await douyin(text);

  if (result.error) {
    return m.reply(result.error);
  }

  const { title, downloadUrls, images, isSlidePost } = result;

  if (!isSlidePost && downloadUrls.length > 0) {
    const videoUrl = downloadUrls[0];
    const video = await axios.get(videoUrl, { responseType: "arraybuffer" });
    const videoBuffer = Buffer.from(video.data);
    await conn.sendReact(m.chat, '✨', m.key);
    await conn.sendFile(m.chat, videoBuffer, "video.mp4", `*Judul:* ${title}`, m);

    const musicUrl = downloadUrls[downloadUrls.length - 1];
    const music = await axios.get(musicUrl, { responseType: "arraybuffer" });
    const musicBuffer = Buffer.from(music.data);
    await conn.sendFile(m.chat, musicBuffer, "music.mp3", "Ryzxell", m, false, {
      mimetype: "audio/mpeg",
    });
  }

  if (isSlidePost && images.length > 0) {
    let sentCount = 0;
    for (const imageUrl of images) {
      const image = await axios.get(imageUrl, { responseType: "arraybuffer" });
      const imageBuffer = Buffer.from(image.data);
      await conn.sendFile(m.sender, imageBuffer, "slide.jpg", `*Bagian ${++sentCount} dari:* ${title}`);
    }
    await m.reply('Semua gambar slide telah dikirim di private chat');
  }
};

neura.command = ["douyin", "dy", "tiktok", "tt"];
neura.help = ["douyin", "tiktok"];
neura.tags = ["dl"];
neura.error = 0;

export default neura;