/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone, this is my watermark, don't delete it!
 */

import os from 'os';
import { performance } from 'perf_hooks';

const neura = async (m, { conn }) => {
  const startTime = performance.now();
  const latency = (performance.now() - startTime).toFixed(4);
  const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
  const totalMemory = Math.round(os.totalmem() / 1024 / 1024);
  const cpuModel = os.cpus()[0].model; 
  const cpuSpeed = os.cpus()[0].speed; 
  const osType = os.type();
  const osRelease = os.release(); 
  const osPlatform = os.platform(); 
  const hostname = os.hostname(); 
  
  const replyMessage = `
• *CPU Model:* ${cpuModel}
• *CPU Speed:* ${cpuSpeed} MHz
• *Kecepatan:* ${latency} _ms_
• *Memory Usage:* ${memoryUsage}MB / ${totalMemory}MB
• *OS Type:* ${osType}
• *OS Release:* ${osRelease}
• *Platform:* ${osPlatform}
• *Hostname:* ${hostname}
  `.trim();

  conn.reply(m.chat, replyMessage, fwa);
};

neura.help = ['ping'];
neura.tags = ['info'];
neura.command = ['ping', 'speed'];

export default neura;