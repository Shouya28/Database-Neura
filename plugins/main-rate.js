const rateHandler = async (m, { conn, text }) => {
  try {
    const rating = parseInt(text.trim(), 10);

    // Validasi rating harus antara 1 hingga 5
    if (isNaN(rating) || rating < 1 || rating > 5) {
      await conn.reply(m.chat, 'Silakan berikan rating antara 1 hingga 5.', m);
      return;
    }

    const userId = m.sender;
    const user = db.data.users[userId] || {};

    // Memastikan user.ratings adalah array
    if (!Array.isArray(user.ratings)) {
      user.ratings = [];
    }

    // Cek apakah pengguna sudah pernah memberikan rating
    if (user.ratings.length > 0) {
      await conn.reply(m.chat, 'Anda sudah memberikan rating sebelumnya. Terima kasih!', m);
      return;
    }

    // Menambahkan rating ke dalam array
    user.ratings.push(rating);
    db.data.users[userId] = user;

    await conn.reply(m.chat, 'Terima kasih atas rating Anda!', m);
  } catch (error) {
    console.error('Error dalam rateHandler:', error);
    await conn.reply(m.chat, 'Terjadi kesalahan saat memproses rating Anda.', m);
  }
};

rateHandler.help = ['rate'];
rateHandler.tags = ['feedback'];
rateHandler.command = /^rate$/i;

export default rateHandler;