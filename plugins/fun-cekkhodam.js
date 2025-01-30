
const neura = async (m, { conn, command, text }) => {
  if (!text) {
    return conn.reply(m.chat, `✦ *Example:* ${usedPrefix + command} Agus`, m);
  }

  const khodamList = [
    'Macan Tutul', 'Gajah Sumatera', 'Orangutan', 'Harimau Putih', 'Badak Jawa',
    'Pocong', 'Kuntilanak', 'Genderuwo', 'Wewe Gombel', 'Kuyang',
    'Lembuswana', 'Anoa', 'Komodo', 'Elang Jawa', 'Burung Cendrawasih',
    'Tuyul', 'Babi Ngepet', 'Sundel Bolong', 'Jenglot', 'Lele Sangkuriang',
    'Kucing Hutan', 'Ayam Cemani', 'Cicak', 'Burung Merak', 'Kuda Lumping',
    'Buaya Muara', 'Banteng Jawa', 'Monyet Ekor Panjang', 'Tarsius',
    'Cenderawasih Biru', 'Setan Merah', 'Kolor Ijo', 'Palasik', 'Nyi Roro Kidul',
    'Siluman Ular', 'Kelabang', 'Beruang Madu', 'Serigala', 'Hiu Karang',
    'Rajawali', 'Lutung Kasarung', 'Kuda Sumba', 'Ikan Arwana', 'Jalak Bali',
    'Kambing Etawa', 'Kelelawar', 'Burung Hantu', 'Ikan Cupang'
  ];

  const waktuMendampingiList = [
    '1 tahun lalu', '2 tahun lalu', '3 tahun lalu', '4 tahun lalu', 'dari lahir'
  ];

  const expiredList = [
    '2024', '2025', '2026', '2027', '2028', '2029', '2030',
    '2031', '2032', '2033', '2034', '2035'
  ];

  const khodam = pickRandom(khodamList);
  const waktuMendampingi = pickRandom(waktuMendampingiList);
  const expired = pickRandom(expiredList);

  const replyMessage = `
乂 *Khodam ${text}*
- Nama : ${text}
- Khodam : ${khodam}
- Mendampingi dari : ${waktuMendampingi}
- Expired : ${expired}
  `.trim();

  await conn.reply(m.chat, replyMessage, m);
};

neura.help = ['cekkhodam'];
neura.command = ['cekkhodam'];
neura.tags = ['fun'];

export default neura;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}