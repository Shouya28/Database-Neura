/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
import axios from 'axios';
import cheerio from 'cheerio';

const base = 'https://jkt48.com';
async function schedule(month, year) {
  const now = new Date();
  if (!month) month = now.getMonth() + 1;
  if (!year) year = now.getFullYear();
  const res = await axios.get(`${base}/calendar/list/y/${year}/m/${month}`);
  const $ = cheerio.load(res.data);
  const bulan = $('.entry-schedule__header--center').text().trim();
  const schedule = [];

  $('tr').each((index, element) => {
    let day = {};
    day.hari = $(element).find('h3').text().trim();
    day.events = [];

    $(element).find('.contents').each((index, element) => {
      let event = {};
      event.icon = base + $(element).find('img').attr('src');
      event.name = $(element).find('a').text().trim();
      event.link = base + $(element).find('a').attr('href');
      day.events.push(event);
    });

    schedule.push(day);
  });

  return { bulan, schedule };
}

async function member(q = '') {
  const res = await axios.get(`${base}/member/list?lang=id`);
  const $ = cheerio.load(res.data);
  const member = {};

  $('.row-all-10').each((index, element) => {
    let list = [];

    $(element).find('div').each((index2, element) => {
      if (index2 % 2 === 1) return;

      let orang = {};
      orang.image = base + $(element).find('img').attr('src');
      orang.nama = ("" + $(element).find('p a').html()).replace(/<br>(<\/br>)?/g, ' ');
      orang.link = base + $(element).find('a').attr('href');
      orang.tipe = index === 0 ? 'anggota' : 'trainee';
      list.push(orang);
    });

    if (index === 0) member.anggota = list.filter(_ => _.nama.toLowerCase().includes(q.toLowerCase()));
    else member.trainee = list.filter(_ => _.nama.toLowerCase().includes(q.toLowerCase()));
  });

  if (q) member.search = [...member.anggota, ...member.trainee];
  return member;
}

const neura = async (m, { conn, command, text }) => {
  switch (command) {
    case 'jkt48jadwal':
      const scheduleResult = await schedule();
      let scheduleMsg = `*Jadwal JKT48 Bulan:* ${scheduleResult.bulan}\n\n`;

      scheduleResult.schedule.forEach(day => {
        if (day.events.length > 0) {
          scheduleMsg += `*${day.hari}*\n`;
          day.events.forEach(event => {
            scheduleMsg += `- ${event.name}\n`;
          });
          scheduleMsg += '\n';
        }
      });

      m.reply(scheduleMsg);
      break;

    case 'jkt48member':
      const memberResult = await member(text);
      let memberMsg = '';

      if (memberResult.anggota) {
        memberMsg += "*Anggota JKT48:*\n";
        memberResult.anggota.forEach(mbr => {
          memberMsg += `- ${mbr.nama}\n`;
        });
        memberMsg += '\n';
      }

      if (memberResult.trainee) {
        memberMsg += "*Trainee JKT48:*\n";
        memberResult.trainee.forEach(mbr => {
          memberMsg += `- ${mbr.nama}\n`;
        });
      }

      m.reply(memberMsg);
      break;

    default:
      m.reply('Perintah tidak dikenali');
  }
};

neura.command = ['jkt48jadwal', 'jkt48member'];
neura.tags = ['info'];
neura.help = ['jkt48jadwal', 'jkt48member'];
neura.error = 0;

export default neura;