/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
import fetch from 'node-fetch';

const API_ENDPOINTS = {
  EDITION_AUDIO: 'https://api.alquran.cloud/v1/edition/format/audio',
  SURAH_AUDIO: 'https://raw.githubusercontent.com/islamic-network/cdn/master/info/cdn_surah_audio.json',
  AYAH: (ayah, edition) => `https://api.alquran.cloud/v1/ayah/${ayah}/${edition}`,
  SURAH: (surah, edition) => `https://api.alquran.cloud/v1/surah/${surah}/${edition}`,
  IMAGE: (surah, ayah) => `https://cdn.islamic.network/quran/images/high-resolution/${surah}_${ayah}.png`,
  AUDIO: (edition, number) => `https://cdn.islamic.network/quran/audio-surah/128/${edition}/${number}.mp3`,
};

const fetchJson = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw new Error('Gagal mengambil data. Cek koneksi internet Anda.');
  }
};

const createAudioMessage = (url) => ({
  audio: { url },
  seconds: 2025,
  ptt: true,
  mimetype: 'audio/mpeg',
  fileName: 'vn.mp3',
});

const getEditions = async () => {
  const data = await fetchJson(API_ENDPOINTS.EDITION_AUDIO);
  return data.data.map((item, index) => ({
    id: index + 1,
    name: item.name,
    englishName: item.englishName,
    identifier: item.identifier,
  }));
};

const handleAyat = async (conn, m, ayatNumber, editionNumber) => {
  if (!ayatNumber || isNaN(ayatNumber)) {
    return m.reply('Masukkan nomor ayat yang valid. Contoh: .ngaji ayat 12');
  }

  const editions = await getEditions();
  if (!editionNumber) {
    const list = editions.map(
      (e) => `${e.id}. ${e.englishName} (${e.name})`
    ).join('\n');
    return m.reply(`Pilih edisi:\n${list}`);
  }

  const selectedEdition = editions[editionNumber - 1];
  if (!selectedEdition) {
    return m.reply('Nomor edisi tidak valid.');
  }

  const response = await fetchJson(API_ENDPOINTS.AYAH(ayatNumber, selectedEdition.identifier));
  if (response.code !== 200) {
    return m.reply('Ayat tidak ditemukan.');
  }

  const { text, surah, edition, audio } = response.data;
  const image = API_ENDPOINTS.IMAGE(surah.number, response.data.number);

  const caption = `
*Surah:* ${surah.name} (${surah.englishName})
*Ayat:* ${response.data.number}
*Teks:* ${text}
*Edisi:* ${edition.englishName}
`;

  await conn.reply(m.chat, caption, fwa);
  await conn.sendMessage(m.chat, createAudioMessage(audio), { quoted: m });
};

const handleSurah = async (conn, m, surahNumber, editionNumber) => {
  if (!surahNumber || isNaN(surahNumber) || surahNumber > 114) {
    return m.reply('Masukkan nomor surah yang valid. Contoh: .ngaji surah 23');
  }

  const editions = await getEditions();
  if (!editionNumber) {
    const list = editions.map(
      (e) => `${e.id}. ${e.englishName} (${e.name})`
    ).join('\n');
    return m.reply(`Pilih edisi:\n${list}`);
  }

  const selectedEdition = editions[editionNumber - 1];
  if (!selectedEdition) {
    return m.reply('Nomor edisi tidak valid.');
  }

  const response = await fetchJson(API_ENDPOINTS.SURAH(surahNumber, selectedEdition.identifier));
  if (response.code !== 200) {
    return m.reply('Surah tidak ditemukan.');
  }

  const { name, englishName, number, numberOfAyahs, edition } = response.data;
  const audio = API_ENDPOINTS.AUDIO(selectedEdition.identifier, number);

  const caption = `
*Surah:* ${name} (${englishName})
*Total Ayat:* ${numberOfAyahs}
*Edisi:* ${edition.englishName}
`;
  
  await conn.reply(m.chat, caption, fwa);
  await conn.sendMessage(m.chat, createAudioMessage(audio), { quoted: m });
};

const neura = async (m, { conn, args }) => {
  const [type, param1, param2] = args;
  const number = parseInt(param1);
  const edition = parseInt(param2);

  if (!type || !['ayat', 'surah'].includes(type)) {
    return m.reply('✦ *Example:* .ngaji ayat/surah 1 1 ');
  }

  if (type === 'ayat') {
    await handleAyat(conn, m, number, edition);
  } else if (type === 'surah') {
    await handleSurah(conn, m, number, edition);
  }
};

neura.help = ['ngaji'];
neura.tags = ['islamic'];
neura.command = /^ngaji$/i;

export default neura;