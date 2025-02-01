import _ from 'lodash';

const neura = async (m, { conn, text, command }) => {
  try {
    const { users } = db.data;
    const totalUsers = Object.keys(users).length;
    const registeredUsers = Object.values(users).filter(user => user.registered).length;
    const bannedUsers = Object.values(users).filter(user => user.banned).length;
    const premiumUsers = Object.values(users).filter(user => user.premium).length;

    const allRatings = Object.values(users).flatMap(user => user.ratings || []);
    const totalRatings = allRatings.length;
    const averageRating = totalRatings > 0 ? (allRatings.reduce((sum, rating) => sum + rating, 0) / totalRatings).toFixed(2) : 0;

    let groupMetadata, totalMembers;
    try {
      groupMetadata = await conn.groupMetadata('120363364736900821@g.us');
      totalMembers = groupMetadata.participants.length;
    } catch (err) {
      console.error('Error fetching group metadata:', err);
    }

    const message = `
乂 *DATABASE NEURA*
*Total Pengguna:* ${totalUsers}
*Pengguna Terdaftar:* ${registeredUsers} (${((registeredUsers / totalUsers) * 100).toFixed(2)}%)
*Pengguna Dilarang:* ${bannedUsers} (${((bannedUsers / totalUsers) * 100).toFixed(2)}%)
*Pengguna Premium:* ${premiumUsers} (${((premiumUsers / totalUsers) * 100).toFixed(2)}%)
*Total Anggota Grup:* ${totalMembers !== undefined ? totalMembers : 'Tidak dapat mengambil data'}
*Pengguna Aktif:* ${totalUsers - bannedUsers} (${(((totalUsers - bannedUsers) / totalUsers) * 100).toFixed(2)}%)
*Total Rating Diterima:* ${totalRatings}
*Rata-rata Rating:* ${averageRating} dari 5
    `;

    await conn.reply(m.chat, message, m);
  } catch (error) {
    console.error('Error dalam Neura:', error);
    await conn.reply(m.chat, 'Terjadi kesalahan saat memproses permintaan Anda.', m);
  }
};

neura.help = ['database'];
neura.tags = ['info'];
neura.command = ["database", "db"];

export default neura;