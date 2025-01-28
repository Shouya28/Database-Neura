/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
import PhoneNumber from 'awesome-phonenumber'
import {
  createHash
} from 'crypto'
import fetch from 'node-fetch'
let neura = async function(m, {
  text,
  usedPrefix,
  command
}) {
  let g = ["cowok", "cewek"]
  let ha = g.getRandom()
  let user = global.db.data.users[m.sender]
  if (user.registered !== false) return m.reply( 'Kamu Sudah mendaftar!!\nIngin daftar ulang? ketik .unreg')
  let nama = conn.getName(m.sender)
  const pp = await conn.profilePictureUrl(m.sender, "image").catch((_) => "https://i.ibb.co/3Fh9V6p/avatar-contact.png")
  let ran = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
  let age = ran.getRandom() * 2
  user.age = age
  user.gender = ha
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender
  user.registered = true
  let name = global.db.data.users[m.sender].name
  let sn = `${name}-` + createHash('md5').update(m.sender).digest('hex')
  let p = 
`*Nama:* ${name}
*Serial Number(SN):* _${sn}_

Terimakasih telah mendaftar
■ Data kamu telah disimpan dengan aman
 
*Sekarang kamu dapat menggunakan fitur - fitur*
*khusus yang hanya tersedia untuk pengguna terdaftar*`

  let fkon = {
    key: {
      fromMe: false,
      participant: `${m.sender}`,
      ...(m.chat ? {
        remoteJid: m.sender
      } : {})
    },
    message: {
      contactMessage: {
        displayName: `${nama}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${nama}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    }
  }
  const arr = [
  {
    text: `\n*[ V ]*\n\n${p}`,
    timeout: 100
    },
  {
    text: `\n*[ V E ]*\n\n${p}`,
    timeout: 100
    },
  {
    text: `\n*[ V E R ]*\n\n${p}`,
    timeout: 100
    },
  {
    text: `\n*[ V E R I ]*\n\n${p}`,
    timeout: 100
    },
  {
    text: `\n*[ V E R I F ]*\n\n${p}`,
    timeout: 100
    },
  {
    text: `\n*[ V E R I F Y ]*\n\n${p}`,
    timeout: 100
    },
  {
    text: `\n*[ V E R I F Y   S ]*\n\n${p}`,
    timeout: 100
    },
  {
    text: `\n*[ V E R I F Y   S U ]*\n\n${p}`,
    timeout: 100
    },
  {
    text: `\n*[ V E R I F Y   S U C ]*\n\n${p}`,
    timeout: 100
    },
  {
    text: `\n*[ V E R I F Y   S U C C ]*\n\n${p}`,
    timeout: 100
    },
  {
    text: `\n*[ V E R I F Y   S U C C E ]*\n\n${p}`,
    timeout: 100
    },
  {
    text: `\n*[ V E R I F Y   S U C C E S ]*\n\n${p}`,
    timeout: 100
    },
  {
    text: `\n*[ V E R I F Y   S U C C E S S ]*\n\n${p}`,
    timeout: 100
    },
];

  const lll = await conn.sendMessage(m.chat, {
    text: 'Sedang menverifikasi....'
  }, {
    quoted: fkon
  });

  for (let i = 0; i < arr.length; i++) {
    await new Promise(resolve => setTimeout(resolve, arr[i].timeout));
    await conn.relayMessage(m.chat, {
      protocolMessage: {
        key: lll.key,
        type: 14,
        editedMessage: {
          conversation: arr[i].text
        }
      }
    }, {});
  }
}

neura.help = ['verify']
neura.tags = ['main']
neura.customPrefix = /^(@verify)$/i
neura.command = new RegExp

export default neura;