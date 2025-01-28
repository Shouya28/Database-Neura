/*
 * Neura — Community 
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
import { sticker } from "../lib/sticker.js";
import axios from "axios";
import uploadFile from "../lib/uploadFile.js";

const neura = async (m, { conn, text, usedPrefix, command }) => {
  try {
    const q = m.quoted;
    const mime = q?.mimetype;
    const allowed = ["image", "video", "webp"];
    const mediaUrl =
      mime && allowed.includes(mime.split("/")[0])
        ? await uploadFile(await q.download())
        : null;

    const senderId = parseInt(m.sender.split("@")[0]);
    const senderName = await conn.getName(m.sender);
    const senderPhotoUrl = await conn
      .profilePictureUrl(m.sender, "image")
      .catch(() => "https://telegra.ph/file/014b20ec0da69848e1c05.jpg");

    const replyMessage = q
      ? {
          entities: [],
          avatar: true,
          id: parseInt(q.sender.split("@")[0]),
          name: await conn.getName(q.sender),
          photo: {
            url: await conn
              .profilePictureUrl(q.sender, "image")
              .catch(() => "https://telegra.ph/file/014b20ec0da69848e1c05.jpg"),
          },
          text:
            q.text ||
            q.caption ||
            q.description ||
            q.message?.documentMessage?.caption ||
            "",
        }
      : null;

    const messageText =
      text ||
      q?.text ||
      q?.caption ||
      q?.description ||
      q?.message?.documentMessage?.caption ||
      m.text ||
      m.caption ||
      m.message?.documentMessage?.caption ||
      "";
    if (!text) {
      const instructions = `✦ \`Format tidak valid\`

Harap masukan teks dan warna background 
yang ingin kamu gunakan

*Daftar warna yang tersedia:*
> merah
> biru 
> hijau
> kuning 
> hitam 
> putih
> ungu
> oranye 
> pink
> coklat 
> abuabu 

*Contoh penggunaan:*
> ${usedPrefix + command} --merah neura`;

      return m.reply(instructions);
    }

    const colors = {
      merah: "#ff0000",
      biru: "#0000ff",
      hijau: "#008000",
      kuning: "#ffff00",
      hitam: "#000000",
      putih: "#ffffff",
      ungu: "#800080",
      oranye: "#ffa500",
      pink: "#ffc0cb",
      coklat: "#a52a2a",
      abuabu: "#808080",
    };

    let backgroundColor = "#ffffff";
    if (messageText.includes("--random")) {
      const colorKeys = Object.keys(colors);
      const randomColor = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      backgroundColor = colors[randomColor];
    } else {
      for (let color in colors) {
        if (messageText.includes(`--${color}`)) {
          backgroundColor = colors[color];
          break;
        }
      }
    }

    const message = {
      entities: [],
      avatar: true,
      from: { id: senderId, name: senderName, photo: { url: senderPhotoUrl } },
      text: messageText.replace(/--\w+/g, ""),
      ...(replyMessage && { replyMessage }),
      ...(mediaUrl && {
        media: { url: `https://wsrv.nl/?url=${mediaUrl}&output=png` },
      }),
    };

    const json = {
      type: "quote",
      format: "png",
      backgroundColor: backgroundColor,
      width: 512,
      height: 768,
      scale: 2,
      messages: [message],
    };

    const buffer = await Quotly(json);
    if (!buffer) return m.reply("Terjadi kesalahan saat membuat gambar quote.");

    const stickerBuffer = await sticker(buffer, false, stickpack, stickauth);
    if (!stickerBuffer) return m.reply("Terjadi kesalahan saat membuat stiker.");

    await conn.sendFile(m.chat, stickerBuffer, "Quotly.webp", "", m);
  } catch (error) {
    console.error("Handler Error:", error);
    m.reply("Terjadi kesalahan saat memproses permintaan Anda.");
  }
};

neura.help = ["qc"];
neura.tags = ["sticker"];
neura.command = ["qc", "fakechat"];
neura.limit = true;
neura.error = 0;

export default neura;

async function Quotly(data) {
  try {
    const response = await axios.post("https://quote.btch.bz/generate", data, {
      headers: { "Content-Type": "application/json" },
    });
    return Buffer.from(response.data?.result?.image, "base64");
  } catch (e) {
    console.error("Quotly Error:", e);
    try {
      const fallbackResponse = await axios.post(
        "https://quotly.netorare.codes/generate",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return Buffer.from(fallbackResponse.data?.result?.image, "base64");
    } catch (e) {
      console.error("Quotly Error (Backup):", e);
      return null;
    }
  }
}