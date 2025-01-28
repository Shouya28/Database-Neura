/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
import axios from 'axios';
import cheerio from 'cheerio';

async function shutterShockSearch(query) {
  const { data } = await axios.get('https://www.shutterstock.com/id/search/' + query, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    }
  });

  const $ = cheerio.load(data);
  const results = [];

  $('a.mui-t7xql4-a-inherit-link').each((index, element) => {
    const title = $(element).attr('aria-label');
    const href = $(element).attr('href');

    results.push({
      title: title,
      link: `https://www.shutterstock.com${href}`,
    });
  });

  return results;
}

async function neura(m, { text, usedPrefix, command }) {
  if (!text) return m.reply(`✦ *Example:* ${usedPrefix}${command} Kucing`);
  const results = await shutterShockSearch(text);

  let response = '*Hasil pencarian dari Shutterstock:*\n\n';
  results.forEach((item, index) => {
    response += `${index + 1}. ${item.title}\n${item.link}\n\n`;
  });

  conn.reply(m.chat, response.trim(), fwa);
}

neura.command = ['shutterstock'];
neura.help = ['shutterstock'];
neura.tags = ['internet'];
neura.error = 0;

export default neura;