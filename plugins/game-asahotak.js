import fetch from 'node-fetch';

// Inisialisasi handler utama
let handler = async (m, { conn, usedPrefix }) => {
  // Mengambil data dari API
  let url = 'https://api.siputzx.my.id/api/games/asahotak';
  let response = await fetch(url);
  let json = await response.json();

  if (!json.status) throw 'Gagal mengambil data dari API';

  let { soal, jawaban } = json.data;

  // Menampilkan soal ke pengguna
  let pesanSoal = await conn.reply(m.chat, `*Soal:* ${soal}\n\nBalas pesan ini untuk menjawab!\nKetik *hint* untuk mendapatkan petunjuk.`, m);

  // Menyimpan jawaban yang benar dan ID pesan soal
  conn.game = conn.game || {};
  conn.game[m.chat] = {
    jawaban: jawaban,
    idPesanSoal: pesanSoal.key.id, // Menyimpan ID pesan soal
    idTimeout: setTimeout(() => {
      if (conn.game[m.chat]) {
        conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${jawaban}*`, m);
        delete conn.game[m.chat];
      }
    }, 30000) // Waktu habis setelah 30 detik
  };
};

// Command handler
handler.help = ['asahotak'];
handler.tags = ['game'];
handler.command = /^asahotak$/i;

// Handler untuk hint

// Handler untuk menjawab (dengan mereply pesan soal)
