
/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */

import up from '../lib/uploadImage.js'

const handler = async (m, { conn, text, command }) => {
  const q = m.quoted ? m.quoted : m;
  const mime =
    (q.msg || q).mimetype ||
    q.mediaType ||
    (q.header && q.header.imageMessage && q.header.imageMessage.mimetype) ||
    "";
  let model = await fetch('https://api.itsrose.rest/turnMe/styles', {
    headers: {
      Authorization: 'Bearer Rk-9b79597d0405df275ac88df304f21979'
    }
  })
  let anu = await model.json()
  let { expression } = anu.result
  let tek = expression.map((a, i) => `- ${a}`).join('\n')
  if (!/image\/(jpe?g|png)/.test(mime)) {
    return m.reply(`
  command salah\n> Contoh: .${command} model\n\n*List ekspresi:*\n${tek}
  `)
  }
  if (!q) return m.reply(`
  command salah\n> Contoh: .${command} model\n\n*List ekspresi:*\n${tek}
  `)

  let img = await up(await q.download())
  let req = await fetch('https://api.itsrose.rest/turnMe/expression', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer Rk-9b79597d0405df275ac88df304f21979'
    },
    body: JSON.stringify({
      init_image: img,
      expression: text
    })
  })
  let ckptw = await req.json()
  if (!ckptw.status) return m.reply(ckptw)
  let { images, backend_processing_time } = ckptw.result
  let segs = `*[ AI Expression ]*\n\n`
  segs += `> *\`ekspresi:\`* ${ckptw.result.expression}\n`
  segs += `> *\`Waktu proses:\`* ${backend_processing_time}`
  await conn.sendFile(m.chat, images[0], 'error.jpg', segs, m)
}
neura.command = ['expression', 'ekspresi']
neura.tags = ['ai']
neura.help = ['expression']
neura.premium = true
neura.error = 0;

export default neura;