/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
import axios from "axios";
import cheerio from "cheerio";

class IslamicScraper {
  async islamicnews() {
    const response = await axios.get("https://islami.co/artikel-terkini/");
    if (response.status !== 200) {
      throw new Error("Gagal mengambil berita terbaru.");
    }

    const $ = cheerio.load(response.data);
    const articles = [];

    $("article").each((index, element) => {
      const summary = $(element).find(".meta-top").text().trim();
      const title = $(element).find(".entry-title a").text().trim();
      const link = $(element).find(".entry-title a").attr("href");

      articles.push({ summary, title, link });
    });

    return articles;
  }

  async islamicsearch(query) {
    const url = `https://islami.co/?s=${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error("Gagal mencari berita berdasarkan query.");
    }

    const $ = cheerio.load(response.data);
    const results = [];

    const count = $(".counter strong").text().trim();
    const summary = `📚 *Hasil ditemukan*: ${count} artikel`;

    $(".content-excerpt").each((_, el) => {
      const title = $(el).find(".entry-title a").text().trim();
      const link = $(el).find(".entry-title a").attr("href");
      const category = $(el).find(".meta-top .post-term a").text().trim();
      const author = $(el).find(".meta-bottom .post-author a").text().trim();
      const date = $(el).find(".meta-bottom .post-date").text().trim();
      const image = $(el).find("picture img").attr("src") || $(el).find("picture img").attr("data-src");

      results.push({ title, link, category, author, date, image });
    });

    return { summary, results };
  }

  async islamicdetail(url) {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error("Gagal mengambil detail artikel.");
    }

    const $ = cheerio.load(response.data);

    const title = $(".post-title span").text().trim();
    const author = $(".post-author a").text().trim();
    const date = $(".post-date").text().trim();
    const category = $(".post-term .termlink").first().text().trim();
    let content = $(".content-post .entry-content").text().trim();

    content = content
      .replace(/<img[^>]*>/g, "")
      .replace(/<script[^>]*>.*?<\/script>/g, "")
      .split("×   (Klik pada gambar)")[0];

    return { title, author, date, category, content };
  }
}

const scraper = new IslamicScraper();

async function neura(m, { command, text }) {
  if (command === "islaminews") {
    const articles = await scraper.islamicnews();
    let message = "*Berita Terbaru Islam*\n\n";
articles.forEach(({ title, summary, link }) => {
  message += `*${title}*\n${summary}\n- Link: ${link}\n\n`;
});
    m.reply(message.trim());
  } else if (command === "islamisearch") {
    const query = text.trim();
    if (!query) return m.reply("*Mohon masukkan kata kunci pencarian!*");
    const { summary, results } = await scraper.islamicsearch(query);
    let message = `*Pencarian: ${query}*\n${summary}\n\n`;
results.forEach(({ title, link, category, author, date }) => {
  message += `*${title}*\n- Kategori: ${category}\n- Penulis: ${author} | ${date}\n- Link: ${link}\n\n`;
});
    m.reply(message.trim());
  } 
}

neura.command = ["islaminews", "islamisearch"];
neura.help = ["islaminews", "islamisearch"];
neura.tags = ["Islamic"];
neura.error = 0;

export default neura;