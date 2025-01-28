/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
import moment from 'moment-timezone'
import fs from 'fs'
import { promisify } from 'util'
import cp, { exec as _exec } from 'child_process'

export async function all(m) {
  let setting = global.db.data.settings[this.user.jid]
  if (setting.backup) {
    if (new Date() * 1 - setting.backupDB > 7200000) {
      let d = new Date()
      let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
      
      let exec = promisify(_exec).bind(cp)
      try {
        let { stdout } = await exec("zip -r tmp/script.zip * -x 'node_modules/*'")

        if (stdout) {
          let fdoc = { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, message: { documentMessage: { title: 'Backup Neura' } } }

          this.reply(info.nomorown + '@s.whatsapp.net', `*🗓️ Backup Script:* ${date}`, null)
          this.sendMessage(info.nomorown + '@s.whatsapp.net', {
            document: fs.readFileSync('./tmp/script.zip'),
            mimetype: 'application/zip',
            fileName: 'script.zip'
          }, { quoted: fdoc })

          setting.backupDB = new Date() * 1
        }

        fs.unlinkSync('./tmp/script.zip')
      } catch (error) {
        console.error('❌ Error during script backup:', error)
      }
    }
  }
  return !0
}