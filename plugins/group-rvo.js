const neura = async (m, { conn }) => {
    if (!m.quoted) {
        return m.reply("Silakan balas ke pesan 'view once'.");
    }

    const quoted = m.quoted;
    const messageType = Object.keys(quoted.message)[0];
    const isViewOnce = quoted.message[messageType]?.viewOnce;

    if (!isViewOnce) {
        return m.reply("Pesan yang dibalas bukan 'view once'.");
    }

    const buffer = await quoted.download().catch(() => null);
    if (!buffer) {
        return m.reply("Gagal mengunduh media.");
    }

    const mediaType = /image/.test(quoted.mimetype) ? 'image' : 'video';
    const options = { quoted: m };
    if (quoted.caption) {
        options.caption = quoted.caption;
    }

    await conn.sendMessage(m.chat, { [mediaType]: buffer }, options);
};

neura.help = ["readviewonce"];
neura.tags = ["tools"];
neura.command = ["readviewonce", "rvo"];

export default neura;