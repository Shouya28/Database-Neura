/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */

let neura = m => m;
neura.all = async function(m) {
  const triggerKeywords = [
    'Undangan untuk bergabung',
    'Invitation to join',
    'Buka tautan ini'
  ];
  
const isInvitation = m.mtype === 'groupInviteMessage' || triggerKeywords.some(keyword => m.text.startsWith(keyword));
  if (isInvitation && !m.isBaileys && !m.isGroup) {
    const teks = `
[ *ACCES DENIED* ]

Terima kasih atas minat Anda menggunakan layanan kami.
Kami menyediakan opsi sewa bot dengan harga yang fleksibel 
sesuai kebutuhan Anda. Mulai dari Rp 7.000 per minggu,
Rp 28.000 per bulan, hingga Rp 50.000 per tahun yang sudah termasuk keanggotaan Premium.

*Jika Anda tertarik* 
*silakan langsung hubungi kami untuk informasi lebih lanjut.*
`; this.reply(m.chat, teks, fwa);

const data = global.owner.filter(([id, isCreator]) => id && isCreator);
    this.sendContact(m.chat, data.map(([id, name]) => [id, name]), m);
  }
};

export default neura;