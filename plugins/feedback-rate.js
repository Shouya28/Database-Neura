import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, '../lib/rate.json');
const loadRatings = async () => {
  try {
    await fs.access(filePath);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    } else {
      throw error;
    }
  }
};

const saveRatings = async (data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error saat menyimpan rating:', error);
    throw error;
  }
};

const neura = async (m, { conn, text }) => {
  try {
    const rating = parseInt(text.trim(), 10);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      return conn.reply(m.chat, 'Silakan berikan rating antara 1 hingga 5.', m);
    }

    const userId = m.sender;
    const ratings = await loadRatings();

    if (ratings[userId]) {
      return conn.reply(m.chat, 'Anda sudah memberikan rating sebelumnya.', m);
    }

    ratings[userId] = rating;
    await saveRatings(ratings);

    conn.reply(m.chat, 'Terima kasih atas rating Anda!', m);
  } catch (error) {
    console.error('Error dalam neura handler:', error);
    conn.reply(m.chat, 'Terjadi kesalahan saat memproses rating Anda.', m);
  }
};

neura.help = ['rate'];
neura.tags = ['feedback'];
neura.command = ['rate', "rating"];

export default neura;