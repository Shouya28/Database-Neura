/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */

import fs from 'fs'
let neura = m => m

neura.all = async function(m) {
  if ((m.mtype === 'groupInviteMessage' || m.text.startsWith('Undangan untuk bergabung') || m.text.startsWith('Invitation to join') || m.text.startsWith('Buka tautan ini')) && !m.isBaileys && !m.isGroup) {
    let teks = `
[ *ACCES DENIED* ]

Terima kasih atas minat Anda menggunakan layanan kami.
Kami menyediakan opsi sewa bot dengan harga yang fleksibel 
sesuai kebutuhan Anda.Mulai dari Rp 7.000 per minggu,
Rp 28.000 per bulan, hingga Rp 50.000 per tahun yang sudah termasuk keanggotaan Premium.

*Jika Anda tertarik* 
*silakan langsung hubungi kami untuk informasi lebih lanjut.*
`
    this.reply(m.chat, teks, fwa)
    const data = global.owner.filter(([id, isCreator]) => id && isCreator)
    this.sendContact(m.chat, data.map(([id, name]) => [id, name]), m)
  }
}

export default neura