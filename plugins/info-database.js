import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import _ from 'lodash';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../lib/rate.json');

const loadRatings = () => {
  try {
    if (!fs.existsSync(filePath)) return {};
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error('Error membaca file rate.json:', error);
    return {}; 
  }
};

const neura = async (m, { conn }) => {
  try {
    const { users } = db.data;
    const totalUsers = Object.keys(users).length;
    const registeredUsers = Object.values(users).filter(user => user.registered).length;
    const bannedUsers = Object.values(users).filter(user => user.banned).length;
    const premiumUsers = Object.values(users).filter(user => user.premium).length;

    const ratings = loadRatings();
    const allRatings = Object.values(ratings);
    const totalRatings = allRatings.length;
    const averageRating = totalRatings > 0 ?
      (allRatings.reduce((sum, rating) => sum + rating, 0) / totalRatings).toFixed(2) :
      0;

    const mostCommonRating = _.chain(allRatings)
      .countBy()
      .toPairs()
      .maxBy(1)
      .value()?.[0] || 'Belum ada rating';

    const leastCommonRating = _.chain(allRatings)
      .countBy()
      .toPairs()
      .minBy(1)
      .value()?.[0] || 'Belum ada rating';

    let groupMetadata, totalMembers;
    try {
      groupMetadata = await conn.groupMetadata('120363364736900821@g.us'); 
      totalMembers = groupMetadata.participants.length;
    } catch (err) {
      console.error('Error fetching group metadata:', err);
      totalMembers = 'Tidak tersedia';
    }

    // Menyusun pesan respons
    const message = `
乂 *DATABASE NEURA*
- *Total Pengguna:* ${totalUsers}
- *Pengguna Terdaftar:* ${registeredUsers} (${((registeredUsers / totalUsers) * 100).toFixed(2)}%)
- *Pengguna Dilarang:* ${bannedUsers} (${((bannedUsers / totalUsers) * 100).toFixed(2)}%)
- *Pengguna Premium:* ${premiumUsers} (${((premiumUsers / totalUsers) * 100).toFixed(2)}%)
- *Anggota Group Neura:* ${totalMembers}
- *Pengguna Aktif:* ${totalUsers - bannedUsers} (${(((totalUsers - bannedUsers) / totalUsers) * 100).toFixed(2)}%)
- *Total Rating Diterima:* ${totalRatings}
- *Rata-rata Rating:* ${averageRating} dari 5
- *Rating Terbanyak:* ${mostCommonRating}
- *Rating Paling Sedikit:* ${leastCommonRating}
    `;

    await conn.reply(m.chat, message, fwa);
  } catch (error) {
    console.error('Error dalam Neura:', error);
    await conn.reply(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda.', m);
  }
};

neura.help = ['database'];
neura.tags = ['info'];
neura.command = ["database", "db"];

export default neura;