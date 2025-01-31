/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
import { createHash } from "crypto";
import moment from "moment-timezone";

const Reg = /^([\w\s]+)\.([0-9]+)\.(cowok|cewek)$/i;

const neura = async (m, { conn, text, usedPrefix, command }) => {
  conn.registrasi = conn.registrasi || {};

  if (conn.registrasi[m.chat]?.[m.sender])
    return m.reply("*Kamu sedang meminta verifikasi!*");

  let user = global.db.data.users[m.sender];
  if (user.registered === true)
    return m.reply(`✦ *Kamu sudah terdaftar*\n> Ingin daftar ulang?\n> Ketik .unreg`);

  const formatSalah =
`✦ *Format salah*

*Penggunaan perintah:*
${usedPrefix + command} nama.umur.gender

*Example:*
> ${usedPrefix + command} shouya.17.cowok/cewek`;
  if (!Reg.test(text)) return m.reply(formatSalah);

  let [_, name, age, gender] = text.match(Reg);
  const parsedAge = parseInt(age);

  if (parsedAge > 30) return m.reply("*Maaf, usia Anda melebihi batas yang ditentukan untuk bot ini.*");
  if (parsedAge < 5) return m.reply("*Maaf, usia Anda belum memenuhi syarat untuk menggunakan bot ini.*");

  if (user.name && user.name.trim() === name.trim()) 
    return m.reply("*Mohon maaf, nama ini sudah terdaftar. Silakan coba nama lain.*");

  let ppUrl;
  try {
    ppUrl = await conn.profilePictureUrl(m.sender, 'image');
  } catch {
    ppUrl = 'https://sgciyvijxjqhcycmoogq.supabase.co/storage/v1/object/public/Ryzxell/1738252644869_IMG_20250130_225707.jpg';
  }

  let sn = createHash("md5").update(m.sender).digest("hex");
  const registrationTime = moment().tz('Asia/Jakarta');
  
  user.name = name.trim();
  user.age = parsedAge;
  user.gender = gender.toLowerCase();
  user.regTime = +new Date();
  user.registered = true;
  user.profilePic = ppUrl;
  user.registrationDate = registrationTime.format('DD/MM/YY HH:mm:ss');
  user.number = m.sender.split('@')[0];
  user.serialNumber = sn;

  let cap = `
*REGISTRASI BERHASIL*

*Informasi pengguna*
*Nama:* ${name}
*Umur:* ${parsedAge} tahun
*Gender:* ${gender}
*Nomor:* ${user.number}
*Serial Number:* ${sn}
  
*Informasi registrasi*
*Tanggal Registrasi:* ${registrationTime.format('DD MMMM YYYY')}
*Waktu Registrasi:* ${registrationTime.format('HH:mm:ss')} WIB

*Terima kasih telah mendaftar.* 
*Data kamu telah tersimpan dengan aman dalam database kami.*

> Ketik *${usedPrefix}allmenu* untuk melihat list command
`;

  let loadingSteps = [
    "「▱▱▱▱▱▱▱▱▱▱」wait",
    "「▰▱▱▱▱▱▱▱▱▱」wait.",
    "「▰▰▱▱▱▱▱▱▱▱」wait..",
    "「▰▰▰▱▱▱▱▱▱▱」wait...", 
    "「▰▰▰▰▱▱▱▱▱▱」wait",
    "「▰▰▰▰▰▱▱▱▱▱」wait.",
    "「▰▰▰▰▰▰▱▱▱▱」wait..",
    "「▰▰▰▰▰▰▰▱▱▱」wait...",
    "「▰▰▰▰▰▰▰▰▱▱」wait.",
    "「▰▰▰▰▰▰▰▰▰▱」wait..",
    "「▰▰▰▰▰▰▰▰▰▰」Selesai!",
  ];

  
  let { key } = await conn.sendMessage(m.chat, { 
    text: "Memulai proses verifikasi..." 
  }, { quoted: fwa });

  for (let step of loadingSteps) {
    await conn.sendMessage(m.chat, { 
      text: step,
      edit: key 
    }, { quoted: fwa });
    await conn.delay(300);
  }

  await conn.sendMessage(
    m.chat, 
    { 
      image: { url: ppUrl },
      caption: cap,
      contextInfo: {
        mentionedJid: [m.sender],
      }
    },
    { quoted: fwa }
  );
};

neura.help = ["daftar"];
neura.tags = ["main"];
neura.command = ["daftar", "register"]

export default neura;