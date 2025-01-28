/*
 * Neura — Community  
 * WhatsApp Channel: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28  
 * Contact: https://wa.me/62895324429899  
 * Please retain this watermark. Thank you!  
 */
 
import axios from 'axios';
async function getToken(url) {
  const response = await axios.get(url);
  const cookies = response.headers['set-cookie'];
  const joinedCookies = cookies ? cookies.join('; ') : null;

  const csrfTokenMatch = response.data.match(/<meta name="csrf-token" content="(.*?)">/);
  const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : null;

  if (!csrfToken || !joinedCookies) {
    throw new Error('Gagal mendapatkan CSRF token atau cookie.');
  }

  return { csrfToken, joinedCookies };
}

async function mlStalk(userId, zoneId) {
  const { csrfToken, joinedCookies } = await getToken('https://www.gempaytopup.com');

  const payload = {
    uid: userId,
    zone: zoneId,
  };

  const { data } = await axios.post(
    'https://www.gempaytopup.com/stalk-ml',
    payload,
    {
      headers: {
        'X-CSRF-Token': csrfToken,
        'Content-Type': 'application/json',
        'Cookie': joinedCookies,
      },
    }
  );

  return data;
}

export async function neura(m, { text, usedPrefix, command }) {
  if (!text) {
    return m.reply(`✦ *Example:* ${usedPrefix}${command} 696964467 8770`);
  }

  const [userId, zoneId] = text.split(' ');
  const stalkData = await mlStalk(userId, zoneId);

  if (stalkData) {
    const formattedResult = `*Mobile Legends Player Info* 

- Username: ${stalkData.username || 'Tidak Diketahui'}
- Wilayah: ${stalkData.region || 'Tidak Diketahui'}
- User ID: ${userId}
- Zone ID: ${zoneId}

${stalkData.success ? '✓ Pencarian Berhasil' : '❌ Pencarian Gagal'}`;

    conn.reply(m.chat, formattedResult, fwa);
  } else {
    m.reply('*404* Failed to get stalk data');
  }
}

neura.command = ['mlstalk'];
neura.help = ['mlstalk'];
neura.tags = ['internet']; 
neura.error = 0;

export default neura;