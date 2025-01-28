/*
 * Neura — Community 
 * Saluran WhatsApp: https://whatsapp.com/channel/0029VayjbFK4inonCYjGj42l
 * GitHub: https://github.com/Shouya28
 * WhatsApp: https://wa.me/62895324429899
 * Hi everyone this is my wm don't delete it!
 */
 
import { createHash } from 'crypto';
import axios from "axios";

// Constants
const VOICES = ["bella", "echilling", "adam", "prabowo", "thomas_shelby", "michi_jkt48", "jokowi", "megawati", "nokotan", "boboiboy"];
const BASE_URL = "https://omniplex.ai/api";
const USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

// Real-time date and time handling with Asia/Jakarta timezone
const getTimeContext = () => {
  const now = new Date();
  const options = {
    timeZone: 'Asia/Jakarta',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const formatter = new Intl.DateTimeFormat('id-ID', options);
  const formattedDate = formatter.format(now);

  const hours = now.getHours();
  const timeOfDay =
    hours < 12 ? "pagi" :
    hours < 15 ? "siang" :
    hours < 18 ? "sore" : "malam";

  return {
    currentTime: now.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta' }),
    currentDate: now.toLocaleDateString('id-ID', { timeZone: 'Asia/Jakarta' }),
    timeOfDay,
    isWeekend: now.getDay() === 0 || now.getDay() === 6,
    currentMonth: now.toLocaleString('id-ID', { month: 'long', timeZone: 'Asia/Jakarta' }),
    currentYear: now.getFullYear()
  };
};

// Initialize database
global.db.data.autovn = global.db.data.autovn || {};
global.db.data.users = global.db.data.users || {};

// Enhanced AI context generation
const generateAIContext = () => {
  const timeContext = getTimeContext();
  return `You are Neura, an advanced AI Assistant created by Ryzxell. 
Current context: ${timeContext.currentDate} ${timeContext.currentTime} (${timeContext.timeOfDay})

Key traits and capabilities:
- You naturally greet users based on the time of day (${timeContext.timeOfDay})
- You reference current date and time: ${timeContext.currentDate} ${timeContext.currentTime}
- You acknowledge if it's a weekend or weekday
- You know current Indonesian context (${timeContext.currentMonth} ${timeContext.currentYear})
- You know Prabowo Subianto is the current President of Indonesia
- You understand seasonal/cultural events happening now
- You maintain conversational awareness of time passing
- You speak naturally in Indonesian or English based on user preference

Dynamic response guidelines:
- Adapt greetings to time of day
- Reference current events relevant to the date
- Consider weather patterns typical for ${timeContext.currentMonth}
- Acknowledge holidays or events near ${timeContext.currentDate}
- Keep responses contextually appropriate to the time`;
};

// Enhanced omniplexAi function with real-time context
async function omniplexAi(prompt) {
  const headers = {
    origin: BASE_URL.replace("/api", ""),
    "user-agent": USER_AGENT,
    "Content-Type": "application/json",
  };

  const chatJSON = {
    frequency_penalty: 0,
    max_tokens: 512,
    messages: [
      { role: "system", content: generateAIContext() },
      { role: "user", content: prompt },
    ],
    model: "gpt-3.5-turbo",
    presence_penalty: 0,
    temperature: 1,
    top_p: 1,
  };

  try {
    const response = await axios.post(`${BASE_URL}/chat`, chatJSON, { headers });
    return response.data;
  } catch (error) {
    console.error("Error in omniplexAi:", error);
    return null;
  }
}

// Main neura function with enhanced error handling
let neura = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (command === "autovn") {
      if (!text) return m.reply(`✦ *Wrong input*\n\nAuto vn on/off\n\n*Example:*\n> ${usedPrefix}autovn on`);

      const isEnabled = text.toLowerCase() === "on";
      global.db.data.autovn[m.sender] = isEnabled;
      return m.reply(`[ ✓ ] Success ${isEnabled ? 'mengaktifkan' : 'menonaktifkan'} autovn\n\n*Note:* Bot akan merespon ketika pesan di-reply saat autovn aktif`);
    }

    if (!text) {
      return m.reply(`*• Example :* ${usedPrefix}aivoice *question*\n\nSelect Model: *${usedPrefix}aivoice --set [nama model]*\n*List model in database :*\n${VOICES.map((a) => "• " + a).join("\n")}`);
    }

    let [setting, model] = text.split(" ");
    if (setting === "--set") {
      if (!VOICES.includes(model)) {
        return m.reply(`model not found\n\n*List model in database :*\n${VOICES.map((a) => "• " + a).join("\n")}`);
      }
      global.db.data.users[m.sender] = global.db.data.users[m.sender] || {};
      global.db.data.users[m.sender].voice = model;
      return m.reply(`sukses mengatur model voice ${model}`);
    }

    await conn.sendPresenceUpdate("recording", m.chat);

    const res = await omniplexAi(text);
    if (!res) {
      return m.reply(`*404* Gagal mendapatkan jawaban dari ${command}.`);
    }

    const processedResponse = res
      .replace(/([.!?])\s+/g, '$1, ')
      .replace(/(\d+)\s+/g, '$1, ')
      .replace(/([,;])\s*/g, '$1 ')
      .replace(/\s{2,}/g, ' ')
      .trim();

    const selectedVoice = global.db.data.users[m.sender]?.voice || 'bella';

    await conn.sendMessage(m.chat, {
      audio: {
        url: `https://ai.xterm.codes/api/text2speech/elevenlabs?text=${encodeURIComponent(processedResponse)}&key=Diwan&voice=${selectedVoice}`
      },
      mimetype: "audio/mpeg",
      ptt: true,
      contextInfo: {
        externalAdReply: {
          title: "AI - VOICE",
          body: `Ai with ${selectedVoice} voice`,
          mediaType: 1,
          thumbnailUrl: "https://telegra.ph/file/557fc3503c1cdd390d354.jpg",
          renderLangerThumbnail: true
        }
      }
    });
  } catch (error) {
    console.error("Error in neura function:", error);
    m.reply("Terjadi kesalahan dalam pemrosesan permintaan Anda.");
  }
};

// Enhanced message handler
neura.before = async (m, { conn }) => {
  if (m.isBaileys || !m.text || /^[.!#/\\]/.test(m.text)) return;
  if (!global.db.data.autovn[m.sender]) return;
  if (!m.quoted || !m.quoted.fromMe) return;

  await neura(m, {
    conn,
    text: m.text,
    usedPrefix: ".",
    command: "aivoice"
  });
};

neura.help = ["aivoice", "autovn"];
neura.tags = ["ai"];
neura.command = ["aivoice", "autovn"];
neura.limit = true;
neura.error = 0;

export default neura;