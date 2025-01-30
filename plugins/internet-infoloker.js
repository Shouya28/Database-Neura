import * as cheerio from "cheerio";
import fetch from "node-fetch";

const handler = async (m, { conn, usedPrefix, text, command }) => {
  if (!text) {
    return m.reply(`*Masukkan query pencarian!*\nContoh: ${usedPrefix + command} `);
  }

  await conn.sendReact(m.chat, '✨', m.key);

  const results = await searchJobs(text);
  const resultsText = formatSearchResults(results);
  await conn.sendReact(m.chat, ' ', m.key);
  m.reply(resultsText || "Tidak ada hasil yang ditemukan.");
};

handler.help = ["infoloker"];
handler.tags = ["internet"];
handler.command = /^(infoloker)$/i;

export default handler;

async function searchJobs(query) {
  const url = `https://www.jobstreet.co.id/id/job-search/${query}-jobs/`;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  return $("article").map((_, article) => {
    const $article = $(article);
    return {
      title: $article.find("h3 a").text().trim() || "Tidak diketahui",
      company: $article.find("span:contains('di')").next("a").text().trim() || "Tidak diketahui",
      location: $article.find("span[data-automation='jobCardLocation']")
        .map((_, el) => $(el).text().trim())
        .get()
        .join(", ") || "Tidak diketahui",
      detailLink: new URL($article.find("h3 a").attr("href"), url).href || "Tidak diketahui",
      uploadDate: $article.find("span[data-automation='jobListingDate']").text().trim() || "Tidak diketahui",
      salary: $article.find("span[data-automation='jobSalary']").text().trim() || "Tidak diketahui",
      jobType: $article.find("p:contains('Full time')").text().trim() || "Tidak diketahui",
      classification: $article.find("span:contains('classification:')").next("a").text().trim() || "Tidak diketahui",
      subClassification: $article.find("span:contains('subClassification:')").next("a").text().trim() || "Tidak diketahui"
    };
  }).get();
}

function formatSearchResults(results) {
  if (!results.length) return "Tidak ada hasil yang ditemukan.";

  return results.map((item, index) =>
    `*Hasil ${index + 1}*\n\n` +
    `*Title:* ${item.title}\n` +
    `*Perusahaan:* ${item.company}\n` +
    `*Daerah:* ${item.location}\n` +
    `*Link Detail:* ${item.detailLink}\n` +
    `*Upload:* ${item.uploadDate}\n` +
    `*Gaji:* ${item.salary}\n` +
    `*Jenis Pekerjaan:* ${item.jobType}\n` +
    `*Klasifikasi:* ${item.classification}\n` +
    `*Sub Klasifikasi:* ${item.subClassification}`
  ).join("\n________________________\n");
}