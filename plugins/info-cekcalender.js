/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
const neura = async (m, { conn }) => {
    const apiUrl = "https://fgsi-kalender.hf.space";

    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Referer': 'https://hf.space/',
      'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
      'Content-Type': 'image/png'
    };

    const imageResponse = await fetch(apiUrl, { headers });
    const imageData = await imageResponse.arrayBuffer();

    await conn.sendMessage(m.chat, {
      image: Buffer.from(imageData),
      caption: "🗓️ Neura Calendar"
    }, { quoted: m });
}

neura.help = ["cekkalender"];
neura.tags = ["tools"];
neura.command = /^(cekkalender)$/i;

export default neura;