/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */

import jimp from "jimp";
import uploadImage from "../lib/uploadImage.js";

const neura = async (m, { conn }) => {
  try {
    const targetMessage = m.quoted || m;
    const mediaType = (targetMessage.msg || targetMessage).mimetype || "";
    if (!mediaType) throw "Silakan unggah atau balas gambar/video.";

    const isValidMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mediaType);
    if (!isValidMedia) throw "Format file tidak didukung. Hanya mendukung gambar (PNG/JPG/GIF) dan video (MP4).";

    const mediaData = await targetMessage.download();
    const uploadedUrl = await uploadImage(mediaData);

    const imageDetails = await jimp.read(uploadedUrl);
    const dimensions = {
      width: imageDetails.getWidth(),
      height: imageDetails.getHeight(),
    };

    const responseMessage = `
[ *INFORMASI MEDIA* ]

• *Dimensi*: ${dimensions.width} x ${dimensions.height}
• *Lebar*: ${dimensions.width} px
• *Tinggi*: ${dimensions.height} px
        `.trim();

    await conn.reply(m.chat, responseMessage, m);
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, `Terjadi kesalahan: ${error.message}`, m);
  }
};

neura.help = ["cekresolution"];
neura.tags = ["tools"];
neura.command = ["cekresolution"];

export default neura;